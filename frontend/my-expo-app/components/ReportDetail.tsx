import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Report } from './reportModel';

const StatusOption = ({ label, color, icon, selected, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      minHeight: 88,
      margin: 6,
      borderRadius: 12,
      borderWidth: selected ? 2 : 1,
      borderColor: selected ? color : '#CBD5E1',
      backgroundColor: selected ? `${color}20` : '#F8FAFF',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
    }}
  >
    <View style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: selected ? color : '#F1F5F9',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8,
    }}>
      <MaterialCommunityIcons name={icon} size={22} color={selected ? 'white' : color} />
    </View>
    <Text style={{ color: selected ? color : '#0F172A', fontWeight: selected ? '700' : '600' }}>{label}</Text>
  </TouchableOpacity>
);

const ReportDetail = ({ report, onClose, onApply }: { report: Report; onClose: () => void; onApply: (r: Report) => void }) => {
  const [status, setStatus] = useState(report.status);

  const applyChanges = () => {
    const updated = { ...report, status } as Report;
    onApply(updated);
    onClose();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#E8EDFF' }} contentContainerStyle={{ padding: 16 }}>
      <View style={{ backgroundColor: '#1e40af', padding: 16, borderRadius: 8, marginBottom: 12 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>Panel de Administración</Text>
        <Text style={{ color: '#D1D5DB', marginTop: 4 }}>Gestionar estado del reporte</Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>ID de Reporte</Text>
        <Text style={{ fontWeight: '700', marginTop: 6 }}>{report.id}</Text>

        <View style={{ height: 12 }} />
        <Text style={{ color: '#6B7280' }}>Fecha de Reporte</Text>
        <Text style={{ marginTop: 6 }}>{new Date(report.createdAt).toLocaleString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Categoría</Text>
        <Text style={{ fontWeight: '700', marginTop: 6 }}>{report.category}</Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Título</Text>
        <Text style={{ fontWeight: '700', marginTop: 6 }}>{report.description.split('\n')[0] ?? report.description}</Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Descripción</Text>
        <Text style={{ marginTop: 6 }}>{report.description}</Text>
      </View>

      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Ubicación</Text>
        <Text style={{ marginTop: 6 }}>{report.addressReference}</Text>
      </View>

      {/* Evidence placeholder */}
      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280' }}>Evidencia Fotográfica ({report.media.length})</Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          {report.media.map((m) => (
            <View key={m.id} style={{ width: 96, height: 96, backgroundColor: '#E6EEF9', borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
              <MaterialCommunityIcons name="camera" size={28} color="#6B7280" />
            </View>
          ))}
        </View>
      </View>

      {/* Status manager */}
      <View style={{ backgroundColor: 'white', borderRadius: 12, padding: 12, marginBottom: 12 }}>
        <Text style={{ color: '#6B7280', fontWeight: '700', marginBottom: 8 }}>Gestionar Estado del Reporte</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <StatusOption label="Pendiente" color="#F59E0B" icon="clock-outline" selected={status === 'PENDING'} onPress={() => setStatus('PENDING')} />
          <StatusOption label="En Revisión" color="#2563EB" icon="eye-outline" selected={status === 'IN_REVIEW'} onPress={() => setStatus('IN_REVIEW')} />
          <StatusOption label="Resuelto" color="#10B981" icon="check" selected={status === 'RESOLVED'} onPress={() => setStatus('RESOLVED')} />
          <StatusOption label="Rechazado" color="#EF4444" icon="close-circle-outline" selected={status === 'REJECTED'} onPress={() => setStatus('REJECTED')} />
        </View>

        <View style={{ backgroundColor: '#FFFBEB', borderRadius: 8, padding: 12, marginTop: 12 }}>
          <Text style={{ color: '#92400E' }}>Estado actual: {status === 'PENDING' ? 'Pendiente' : status === 'IN_REVIEW' ? 'En Revisión' : status === 'RESOLVED' ? 'Resuelto' : 'Rechazado'}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginTop: 8, marginBottom: 32 }}>
        <TouchableOpacity onPress={onClose} style={{ flex: 1, marginRight: 8, backgroundColor: 'white', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#374151', alignItems: 'center' }}>
          <Text style={{ color: '#374151', fontWeight: '600' }}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={applyChanges} style={{ flex: 1, marginLeft: 8, backgroundColor: '#7C5CF6', borderRadius: 12, padding: 14, alignItems: 'center' }}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Aplicar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ReportDetail;