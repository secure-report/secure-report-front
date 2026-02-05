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
import { getCategoryLabel, CATEGORY_CONFIG } from '../components/categoryMaper';



import { API_REPORTS_URL } from '../config/api';
import Header from './Header';

const ReportsPanel = () => {
  const [query, setQuery] = useState('');
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const [filters, setFilters] = useState<any>(null);

  const loadReports = async () => {
    try {
      const res = await fetch(`${API_REPORTS_URL}/api/reports`);
      const data = await res.json();

          setReports(
          data.map((r: any) => ({
            ...r,
            id: r._id ?? r.id,
            status: r.status,
            media: r.media ?? [],
            category: getCategoryLabel(r.category),   // 👈 AQUÍ convertimos a bonito
          }))
        );
    } catch (e) {
      console.error('Error loading reports', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
    const interval = setInterval(loadReports, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    let result = [...reports];

    if (query) {
      result = result.filter(
        r =>
          r.id.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (!filters) return result;

    if (filters.statuses?.length) {
  result = result.filter(r =>
    filters.statuses.includes(r.status.toLowerCase())
  );
}

if (filters.category) {
  result = result.filter(r => {
    if (!r.category) return false;

    const realValue = CATEGORY_CONFIG.find(
      c => c.label.toLowerCase() === r.category.toLowerCase()
    )?.value;

    return realValue === filters.category;
  });
}


    if (filters.fromDate) {
      const from = new Date(filters.fromDate);

      result = result.filter(r =>
        new Date(r.createdAt) >= from
      );
    }

    if (filters.toDate) {
      const to = new Date(filters.toDate);

      result = result.filter(r =>
        new Date(r.createdAt) <= to
      );
    }

    return result;
  }, [reports, query, filters]);

 const counts = useMemo(() => {
  const out: Record<string, number> = {
    pending: 0,
    in_review: 0,
    resolved: 0,
    rejected: 0,
  };

  reports.forEach((r) => {
    if (out[r.status] !== undefined) {
      out[r.status] += 1;
    }
  });

  return out;
}, [reports]);


  if (loading) {
    return <ActivityIndicator style={{ marginTop: 60 }} size="large" />;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#E8EDFF' }}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Modal visible={showFilters} animationType="slide">
        <FiltersPanel
          onClose={() => setShowFilters(false)}
          onApply={(f) => {
            setFilters(f);
            setShowFilters(false);
          }}
        />
      </Modal>

      <Modal visible={!!selectedReport} animationType="slide">
        {selectedReport && (
          <ReportDetail
            report={selectedReport}
            onClose={() => setSelectedReport(null)}
            onUpdated={loadReports}
          />
        )}
      </Modal>

      <Header
        title="Panel de Reportes"
        subtitle="Gestión y supervisión de denuncias"
      />

      <View className="px-4 py-4">
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

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 16,
            justifyContent: 'space-between',
          }}
        >
          {[
            { label: 'Pendiente', value: counts.pending, color: 'text-yellow-600' },
            { label: 'En Revisión', value: counts.in_review, color: 'text-blue-600' },
            { label: 'Resuelto', value: counts.resolved, color: 'text-green-600' },
            { label: 'Rechazado', value: counts.rejected, color: 'text-red-600' },
          ].map((c) => (
            <View key={c.label} style={{ width: '48%', marginBottom: 12 }}>
              <View className="bg-white rounded-xl p-4">
                <Text className={`${c.color} font-bold text-xl`}>{c.value}</Text>
                <Text className="text-gray-500">{c.label}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="mt-6">
          {filtered.map((r) => (
            <ReportItem
              key={r.id}
              report={r}
              onPress={() => setSelectedReport(r)}
            />
          ))}

          {filtered.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>
              No se encontraron reportes con esos filtros
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ReportsPanel;
