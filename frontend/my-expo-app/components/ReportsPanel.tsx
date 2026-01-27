import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ReportItem from './ReportItem';
import ReportDetail from './ReportDetail';
import FiltersPanel from './FiltersPanel';
import { Report } from './reportModel';
import { API_REPORTS_URL } from '../config/api';

/* API → UI */
const mapStatusFromApi = (status: string) => {
  switch (status) {
    case 'pending': return 'PENDING';
    case 'in_review': return 'IN_REVIEW';
    case 'resolved': return 'RESOLVED';
    case 'rejected': return 'REJECTED';
    default: return 'PENDING';
  }
};

const ReportsPanel = () => {
  const [query, setQuery] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  /* =========================
     LOAD REPORTS (API REAL)
     ========================= */
  const loadReports = async () => {
    try {
      const res = await fetch(`${API_REPORTS_URL}/api/reports`);
      const data = await res.json();

      setReports(
        data.map((r: any) => ({
          ...r,
          id: r._id ?? r.id,
          status: mapStatusFromApi(r.status),
          media: r.media ?? [],
        }))
      );
    } catch (e) {
      console.error('Error loading reports', e);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     AUTO REFRESH cada 5 segundos
     ========================= */
  useEffect(() => {
    loadReports(); // carga inicial
    const interval = setInterval(() => {
      loadReports();
    }, 5000); // cada 5 segundos

    return () => clearInterval(interval); // limpiar al desmontar
  }, []);

  /* =========================
     FILTERS & STATS
     ========================= */
  const filtered = useMemo(() => {
    if (!query) return reports;
    return reports.filter(
      (r) =>
        r.id.toLowerCase().includes(query.toLowerCase()) ||
        r.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, reports]);

  const counts = useMemo(() => {
    const out = { PENDING: 0, IN_REVIEW: 0, RESOLVED: 0, REJECTED: 0 };
    reports.forEach((r) => {
      out[r.status] = (out[r.status] || 0) + 1;
    });
    return out;
  }, [reports]);

  /* =========================
     LOADING
     ========================= */
  if (loading) {
    return <ActivityIndicator style={{ marginTop: 60 }} size="large" />;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#E8EDFF' }}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* FILTERS MODAL */}
      <Modal visible={showFilters} animationType="slide">
        <FiltersPanel
          onClose={() => setShowFilters(false)}
          onApply={() => setShowFilters(false)}
        />
      </Modal>

      {/* DETAIL MODAL */}
      <Modal visible={!!selectedReport} animationType="slide">
        {selectedReport && (
          <ReportDetail
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
            onUpdated={loadReports} // actualiza al cerrar detalle
          />
        )}
      </Modal>

      {/* HEADER */}
      <View style={{ backgroundColor: '#1e40af', padding: 20 }}>
        <Text className="text-2xl text-white font-bold">Panel de Reportes</Text>
        <Text className="text-white">Gestión y supervisión de denuncias</Text>
      </View>

      <View className="px-4 py-4">
        {/* SEARCH + FILTER */}
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center bg-white rounded-full px-4 py-3 flex-1">
            <MaterialCommunityIcons name="magnify" size={20} color="#6b7280" />
            <TextInput
              placeholder="Buscar por ID o descripción"
              value={query}
              onChangeText={setQuery}
              className="ml-2 flex-1"
            />
          </View>

          <TouchableOpacity
            className="bg-blue-900 px-4 py-3 rounded-full"
            onPress={() => setShowFilters(true)}
          >
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="filter-variant" size={18} color="white" />
              <Text className="text-white ml-2">Filtros</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* STATS */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 16,
            justifyContent: 'space-between',
          }}
        >
          {[
            { label: 'Pendiente', value: counts.PENDING, color: 'text-yellow-600' },
            { label: 'En Revisión', value: counts.IN_REVIEW, color: 'text-blue-600' },
            { label: 'Resuelto', value: counts.RESOLVED, color: 'text-green-600' },
            { label: 'Rechazado', value: counts.REJECTED, color: 'text-red-600' },
          ].map((c) => (
            <View key={c.label} style={{ width: '48%', marginBottom: 12 }}>
              <View className="bg-white rounded-xl p-4">
                <Text className={`${c.color} font-bold text-xl`}>{c.value}</Text>
                <Text className="text-gray-500">{c.label}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* REPORTS LIST */}
        <View className="mt-6">
          {filtered.map((r) => (
            <ReportItem key={r.id} report={r} onPress={() => setSelectedReport(r)} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportsPanel;
