import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Modal, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ReportDetail from './ReportDetail';
import { Report } from './reportModel';
import { API_REPORTS_URL } from '../config/api';
import { WebView } from 'react-native-webview';
import Header from './Header';

interface RawReport {
  _id: string;
  title?: string;
  description?: string;
  addressReference?: string;
  location?: {
    type: string;
    coordinates?: [number, number];
  };
  status?: string;
  media?: any[];
  [key: string]: any;
}

const ReportsMap = () => {
  const insets = useSafeAreaInsets();
  const [reports, setReports] = useState<RawReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [webViewError, setWebViewError] = useState<string | null>(null);

  const loadReports = async () => {
    try {
      const res = await fetch(`${API_REPORTS_URL}/api/reports`);
      const data = await res.json();
      setReports(data);
    } catch (e) {
      console.error('Error loading reports for map', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchReportDetail = async (reportId: string) => {
    try {
      setModalLoading(true);
      const res = await fetch(`${API_REPORTS_URL}/api/reports/${reportId}`);
      const data = await res.json();
      
      // Transformar al formato del modelo Report
      const report: Report = {
        ...data,
        id: data._id,
      };
      setSelectedReport(report);
    } catch (e) {
      console.error('Error loading report detail', e);
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    if (selectedReportId) {
      fetchReportDetail(selectedReportId);
    }
  }, [selectedReportId]);

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 40 }} size="large" />;

  // Show a WebView with Leaflet (works on Expo Go)
  let markers = reports
    .map((r) => {
      // support multiple location shapes: { lat, lng } or GeoJSON { type: 'Point', coordinates: [lng, lat] }
      let lat: number | null = null;
      let lng: number | null = null;
      if (r.location && r.location.coordinates) {
          lng = Number(r.location.coordinates[0]);
          lat = Number(r.location.coordinates[1]);
        
      }

      return {
        id: r._id,
        lat,
        lng,
        title: r.title || (r.description?.split('\n')[0] ?? 'Reporte'),
        //address: r.addressReference ?? '',
      };
    })
    .filter((m) => m.lat != null && m.lng != null) as {
    id: string;
    lat: number;
    lng: number;
    title: string;
    address: string;
  }[];

  // Add an example marker for demonstration (near first marker or a default location)
  const exampleMarker = {
    id: 'example-marker',
    lat: markers.length ? markers[0].lat + 0.001 : -0.180653,
    lng: markers.length ? markers[0].lng + 0.001 : -78.467834,
    title: 'Marcador de ejemplo',
    address: 'Ejemplo',
  };
  markers.push(exampleMarker);

  const html = `
      <!doctype html>
      <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" />
        <style>html,body,#map{height:100%;margin:0;padding:0;} .leaflet-popup-content{font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;}</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          (function(){
            function post(obj){
              try{ if(window.ReactNativeWebView && window.ReactNativeWebView.postMessage){ window.ReactNativeWebView.postMessage(JSON.stringify(obj)); } }catch(e){}
            }

            post({ type: 'log', message: 'webview-start' });

            // load leaflet CSS and JS dynamically
            var link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            var script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.onload = function(){
              post({ type: 'log', message: 'leaflet-loaded' });
              try{
                const markers = ${JSON.stringify(markers)};
                var map = L.map('map');
                if(markers.length){ map.setView([markers[0].lat, markers[0].lng], 13); }
                else { map.setView([0,0], 2); }
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                  attribution: '&copy; OpenStreetMap contributors'
                }).addTo(map);

                markers.forEach(function(m){
                  var mk = L.marker([m.lat, m.lng]).addTo(map);
                  mk.bindPopup('<b>' + (m.title || '') + '</b><br/>' + (m.address || '') + '<br/><button id="btn-' + m.id + '">Ver detalle</button>');
                  mk.on('popupopen', function(){
                    setTimeout(function(){
                      var b = document.getElementById('btn-' + m.id);
                      if(b){ b.onclick = function(){ post({ type: 'marker', id: m.id }); } }
                    }, 50);
                  });
                });

                map.whenReady(function(){ post({ type: 'log', message: 'map-ready' }); });
              }catch(err){ post({ type: 'error', error: String(err) }); }
            };
            script.onerror = function(e){ post({ type: 'error', error: 'Failed to load leaflet.js' }); };
            document.body.appendChild(script);
          })();
        </script>
      </body>
      </html>
    `;

  return (
    <View className="flex-1 bg-white">
      
      <Header
        title="Mapa de Reportes"
        subtitle="Gestión y supervisión de denuncias"
      />
      <View style={{ flex: 1 }}>
        {webViewError && (
          <Text style={{ color: 'red', paddingHorizontal: 16 }}>{webViewError}</Text>
        )}
        <View style={{ flex: 1 }}>
          <WebView
            originWhitelist={['*']}
            source={{ html }}
            style={{ flex: 1 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mixedContentMode="always"
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              // eslint-disable-next-line no-console
              console.error('WebView error: ', nativeEvent);
              setWebViewError(nativeEvent.description || 'WebView error');
            }}
            onLoadEnd={() => {
              // eslint-disable-next-line no-console
              console.log('WebView loaded');
            }}
            onMessage={(e) => {
              try {
                const data = JSON.parse(e.nativeEvent.data);
                if (!data) return;
                if (data.type === 'error') {
                  console.error('WebView internal error:', data.error);
                  setWebViewError(String(data.error));
                  return;
                }
                if (data.type === 'log') {
                  // eslint-disable-next-line no-console
                  console.log('WebView log:', data.message);
                  return;
                }
                if (data.type === 'marker') {
                  setSelectedReportId(data.id);
                }
              } catch (err) {
                // ignore
              }
            }}
          />
        </View>

        <Modal visible={!!selectedReport} animationType="slide">
          {modalLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#1E3A8A" />
            </View>
          ) : selectedReport ? (
            <ReportDetail
              report={selectedReport}
              onClose={() => {
                setSelectedReport(null);
                setSelectedReportId(null);
              }}
              onUpdated={loadReports}
            />
          ) : null}
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E8EDFF' },
  header: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  card: { backgroundColor: 'white', padding: 12, borderRadius: 10, marginBottom: 10 },
  openBtn: {
    marginTop: 8,
    backgroundColor: '#2563EB',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default ReportsMap;
