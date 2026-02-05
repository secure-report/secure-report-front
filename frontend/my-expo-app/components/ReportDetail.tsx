import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Report } from './reportModel';
import { Video, ResizeMode } from "expo-av";


import { API_REPORTS_URL } from '../config/api';

/* Mapeo del estado de UI al API */
const mapStatusToApi = (status: string) => {
  switch (status) {
    case 'PENDING': return 'pending';
    case 'IN_REVIEW': return 'in_review';
    case 'RESOLVED': return 'resolved';
    case 'REJECTED': return 'rejected';
    default: return 'pending';
  }
};

/* Componente para cada opción de estado */
const StatusOption = ({ label, color, icon, selected, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={{
      width: '47%',
      marginVertical: 6,
      marginHorizontal: '1.5%',
      borderRadius: 16,
      borderWidth: selected ? 2 : 1,
      borderColor: selected ? color : '#E2E8F0',
      backgroundColor: selected ? `${color}15` : 'white',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 18,
      paddingHorizontal: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: selected ? 0.2 : 0.08,
      shadowRadius: 6,
      elevation: selected ? 3 : 1,
    }}
  >
    <View
      style={{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: selected ? color : '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={selected ? 'white' : color}
      />
    </View>

    <Text
      numberOfLines={1}
      adjustsFontSizeToFit
      style={{
        color: selected ? color : '#0F172A',
        fontWeight: selected ? '800' : '600',
        fontSize: 14,
        textAlign: 'center',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);



/* Componente principal del detalle del reporte */
const ReportDetail = ({
  report,
  onClose,
  onUpdated,
}: {
  report: Report;
  onClose: () => void;
  onUpdated: (newStatus: string) => void;

}) => {
  const [status, setStatus] = useState(report.status);
  const [loading, setLoading] = useState(false);

  const applyChanges = async () => {
    try {
      setLoading(true);

      console.log("🔵 Enviando cambio de estado...");
      console.log("Report ID:", report.id);
      console.log("Nuevo estado:", status);

      const response = await fetch(
        `${API_REPORTS_URL}/api/reports/${report.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        }
      );

      console.log("🟣 Response status:", response.status);

      const data = await response.json();
      console.log("🟢 Respuesta del backend:", data);

      if (!response.ok) {
        throw new Error("Error en backend");
      }

      Alert.alert("Éxito", "Estado actualizado");

      onUpdated(status);
      onClose();
    } catch (error) {
      console.log("🔴 ERROR al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar el estado");
    } finally {
      setLoading(false);
    }
  };


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#E8EDFF' }} contentContainerStyle={{ padding: 16 }}>
      {/* Header */}
      <View style={{ backgroundColor: '#1e40af', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Panel de Administración</Text>
        <Text style={{ color: '#D1D5DB', marginTop: 4 }}>Gestionar estado del reporte</Text>
      </View>

      {/* Información general */}
      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>ID de Reporte</Text>
        <Text style={{ fontWeight: '700', marginTop: 6 }}>{report.id}</Text>

        <View style={{ height: 12 }} />
        <Text style={{ color: '#6B7280' }}>Fecha de Reporte</Text>
        <Text style={{ marginTop: 6 }}>
          {new Date(report.createdAt).toLocaleString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Categoría</Text>
        <Text style={{ fontWeight: '700', marginTop: 6 }}>{report.category}</Text>
      </View>


      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Descripción</Text>
        <Text style={{ marginTop: 6 }}>{report.description}</Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Ubicación</Text>
        <Text style={{ marginTop: 6 }}>{report.addressReference}</Text>
      </View>

      {/* Evidencia Fotográfica */}
          <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
            <Text style={{ color: '#6B7280' }}>
              Evidencia Fotográfica ({report.media.length})
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              {report.media.map((m, index) => {
                const isVideo =
                  m.type?.includes('video') ||
                  m.url?.toLowerCase().endsWith('.mp4') ||
                  m.url?.toLowerCase().endsWith('.mov') ||
                  m.url?.toLowerCase().endsWith('.webm');

                return (
                  <TouchableOpacity
                    key={m.url ?? index}
                    onPress={() => Linking.openURL(m.url)}
                    style={{ position: 'relative' }}
                  >
                    {isVideo ? (
                      <>
                        <Video
                          source={{ uri: m.url }}
                          style={{
                            width: 96,
                            height: 96,
                            borderRadius: 12,
                            marginRight: 8,
                            backgroundColor: '#E6EEF9',
                          }}
                          resizeMode={ResizeMode.COVER}
                          shouldPlay={false}
                          isMuted
                        />
                        {/* ▶️ Ícono sobre el video */}
                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 8,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 28,
                              color: 'rgba(219, 222, 228, 0.7)', // gris translúcido
                            }}
                          >
                            ▶
                          </Text>
                        </View>
                      </>
                    ) : (
                      <Image
                        source={{ uri: m.url }}
                        style={{
                          width: 96,
                          height: 96,
                          borderRadius: 12,
                          marginRight: 8,
                          backgroundColor: '#ffffff',
                        }}
                        resizeMode="cover"
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

      {/* Gestión de estado */}
   <View
  style={{
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  }}
>
  <Text
    style={{
      color: '#1F2937',
      fontWeight: '800',
      fontSize: 16,
      marginBottom: 12,
    }}
  >
    Gestionar Estado del Reporte
  </Text>

  <View
    style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    }}
  >
    <StatusOption
      label="Pendiente"
      color="#F59E0B"
      icon="clock-outline"
      selected={status === 'pending'}
      onPress={() => setStatus('pending')}
    />

    <StatusOption
      label="En Revisión"
      color="#2563EB"
      icon="eye-outline"
      selected={status === 'in_review'}
      onPress={() => setStatus('in_review')}
    />

    <StatusOption
      label="Resuelto"
      color="#10B981"
      icon="check-circle-outline"
      selected={status === 'resolved'}
      onPress={() => setStatus('resolved')}
    />

    <StatusOption
      label="Rechazado"
      color="#EF4444"
      icon="close-circle-outline"
      selected={status === 'rejected'}
      onPress={() => setStatus('rejected')}
    />
  </View>

  <View
    style={{
      backgroundColor: '#F8FAFC',
      borderRadius: 12,
      padding: 14,
      marginTop: 14,
      borderWidth: 1,
      borderColor: '#E2E8F0',
    }}
  >
    <Text
      style={{
        color: '#334155',
        fontWeight: '600',
        textAlign: 'center',
      }}
    >
      Estado actual:{' '}
      <Text style={{ fontWeight: '800' }}>
        {status === 'pending'
          ? 'Pendiente'
          : status === 'in_review'
          ? 'En Revisión'
          : status === 'resolved'
          ? 'Resuelto'
          : 'Rechazado'}
      </Text>
    </Text>
  </View>
</View>


      {/* Botones */}
      <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 32 }}>
        <TouchableOpacity
          onPress={onClose}
          style={{
            flex: 1,
            marginRight: 8,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: '#374151',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#374151', fontWeight: '600' }}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={applyChanges}
          disabled={loading}
          style={{
            flex: 1,
            marginLeft: 8,
            backgroundColor: '#7C5CF6',
            borderRadius: 12,
            padding: 14,
            alignItems: 'center',
          }}
        >
          {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontWeight: '700' }}>Aplicar Cambios</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ReportDetail;
