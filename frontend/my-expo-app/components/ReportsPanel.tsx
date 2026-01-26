import React, { useMemo, useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ReportItem from './ReportItem';
import ReportDetail from './ReportDetail';
import { Report } from './reportModel';

// Mock data
const MOCK_REPORTS: Report[] = [
  {
    id: 'SR-2024-001234',
    anonymousUserId: 'anon-1',
    category: 'Precios Abusivos',
    description:
      'Precio excesivo en productos básicos. Supermercado cobrando precios muy por encima del promedio en productos de la canasta básica.',
    location: { lat: -0.180653, lng: -78.467838 },
    addressReference: 'Zona céntrica, aproximadamente a 500m de tu ubicación',
    media: [
      { id: 'm1', type: 'image', uri: 'https://placekitten.com/200/200' },
      { id: 'm2', type: 'image', uri: 'https://placekitten.com/201/200' },
    ],
    status: 'IN_REVIEW',
    createdAt: '2026-01-22T20:00:00.000Z',
    updatedAt: '2026-01-22T20:05:00.000Z',
  },
  {
    id: 'SR-2025-009999',
    anonymousUserId: 'anon-2',
    category: 'Mala calidad de productos',
    description: 'Producto caducado en exhibición. El envase estaba roto y el personal no retiró el producto.',
    location: { lat: -0.190, lng: -78.480 },
    addressReference: 'Tiendas comerciales, sector norte',
    media: [{ id: 'm3', type: 'image', uri: 'https://placekitten.com/202/200' }],
    status: 'PENDING',
    createdAt: '2026-01-20T18:30:00.000Z',
    updatedAt: '2026-01-20T18:30:00.000Z',
  },
];

const ReportsPanel = () => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [showDetail, setShowDetail] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return reports;
    return reports.filter(
      (r) => r.id.toLowerCase().includes(query.toLowerCase()) || r.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, reports]);

  const counts = useMemo(() => {
    const out = { PENDING: 0, IN_REVIEW: 0, RESOLVED: 0, REJECTED: 0 } as Record<string, number>;
    reports.forEach((r) => (out[r.status] = (out[r.status] || 0) + 1));
    return out;
  }, [reports]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#E8EDFF' }} contentContainerStyle={{ paddingBottom: 32 }}>
      <Modal visible={showFilters} animationType="slide">
        <View style={{ flex: 1 }}>
          {/* Lazy load FiltersPanel to avoid circular issues */}
          {require('./FiltersPanel').default({
            onClose: () => setShowFilters(false),
            onApply: (filters: any) => {
              // Currently just closes; later can apply filters to list
              setShowFilters(false);
              console.log('Applied filters', filters);
            },
          })}
        </View>
      </Modal>
      <Modal visible={showDetail} animationType="slide">
        <View style={{ flex: 1 }}>
          {selectedReport && (
            <ReportDetail
              report={selectedReport}
              onClose={() => setShowDetail(false)}
              onApply={(updated: Report) => {
                setReports((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
              }}
            />
          )}
        </View>
      </Modal>
      {/* Header */}
      <View style={{ backgroundColor: '#1e40af', padding: 20 }}>
        <Text className="text-2xl text-white font-bold">Panel de Reportes</Text>
        <Text className="text-white">Gestión y supervisión de denuncias</Text>
      </View>

      <View className="px-4 py-4">
        <View className="flex-row items-center gap-3">
          <View className="flex-row items-center bg-white rounded-full px-4 py-3 flex-1">
            <MaterialCommunityIcons name="magnify" size={20} color="#6b7280" />
            <TextInput
              placeholder="Buscar por ID o título"
              value={query}
              onChangeText={setQuery}
              className="ml-2 flex-1"
            />
          </View>

          <TouchableOpacity className="bg-blue-900 px-4 py-3 rounded-full" onPress={() => setShowFilters(true)}>
            <View className="flex-row items-center">
              <MaterialCommunityIcons name="filter-variant" size={18} color="white" />
              <Text className="text-white ml-2">Filtros</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Chips */}
        <View className="flex-row items-center gap-2 mt-4">
          <View className="px-3 py-1 rounded-full" style={{ backgroundColor: '#eef2ff' }}>
            <Text className="text-blue-800">En Revisión</Text>
          </View>
          <View className="px-3 py-1 rounded-full" style={{ backgroundColor: '#fff7ed' }}>
            <Text className="text-yellow-700">Pendiente</Text>
          </View>
          <View className="px-3 py-1 rounded-full" style={{ backgroundColor: '#fee2e2' }}>
            <Text className="text-red-600">Precios Abusivos</Text>
          </View>
        </View>

        {/* Stats cards (2x2 grid) */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 16, justifyContent: 'space-between' }}>
          <View style={{ width: '48%', marginBottom: 12 }}>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-yellow-600 font-bold text-xl">{counts.PENDING}</Text>
              <Text className="text-gray-500">Pendiente</Text>
            </View>
          </View>

          <View style={{ width: '48%', marginBottom: 12 }}>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-blue-600 font-bold text-xl">{counts.IN_REVIEW}</Text>
              <Text className="text-gray-500">En Revisión</Text>
            </View>
          </View>

          <View style={{ width: '48%', marginBottom: 12 }}>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-green-600 font-bold text-xl">{counts.RESOLVED}</Text>
              <Text className="text-gray-500">Resuelto</Text>
            </View>
          </View>

          <View style={{ width: '48%', marginBottom: 12 }}>
            <View className="bg-white rounded-xl p-4">
              <Text className="text-red-600 font-bold text-xl">{counts.REJECTED}</Text>
              <Text className="text-gray-500">Rechazado</Text>
            </View>
          </View>
        </View>

        {/* Reports list */}
        <View className="mt-6">
          {filtered.map((r) => (
            <ReportItem key={r.id} report={r} onPress={(rep) => { setSelectedReport(rep); setShowDetail(true); }} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportsPanel;