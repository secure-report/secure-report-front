import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORY_CONFIG, getCategoryValue } from '../components/categoryMaper';


const StatusOption = ({ label, color, icon, selected, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      flex: 1,
      minHeight: 100,
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
    <View
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: selected ? color : '#F1F5F9',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
      }}
    >
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={selected ? 'white' : color}
      />
    </View>

    <Text
      style={{
        color: selected ? color : '#0F172A',
        fontWeight: selected ? '700' : '600',
      }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const QuickButton = ({ label, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#E6E9F2',
      margin: 6,
    }}
  >
    <Text style={{ color: '#0F172A' }}>{label}</Text>
  </TouchableOpacity>
);

const FiltersPanel = ({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (filters: any) => void;
}) => {

  const [statuses, setStatuses] = useState<string[]>(['in_review']);
  const [category, setCategory] = useState<string | null>(null);

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const toggleStatus = (s: string) => {
    setStatuses(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  const applyQuickRange = (days: number) => {
    const now = new Date();
    const past = new Date();
    past.setDate(now.getDate() - days);

    setFromDate(past);
    setToDate(now);
  };

  const applyFilters = () => {
    onApply({
  statuses,
  category,
  fromDate: fromDate?.toISOString() ?? null,
  toDate: toDate?.toISOString() ?? null,
});

    onClose();
  };

  const clearFilters = () => {
    setStatuses([]);
    setCategory(null);
    setFromDate(null);
    setToDate(null);

    onApply(null);
    onClose();
  };

  return (
    <ScrollView style={{ padding: 16, backgroundColor: '#EEF2FF' }}>

      <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 8 }}>
        Estado del Reporte
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <StatusOption
          label="Pendiente"
          color="#F59E0B"
          icon="clock-outline"
          selected={statuses.includes('pending')}
          onPress={() => toggleStatus('pending')}
        />

        <StatusOption
          label="En Revisión"
          color="#2563EB"
          icon="eye-outline"
          selected={statuses.includes('in_review')}
          onPress={() => toggleStatus('in_review')}
        />

        <StatusOption
          label="Resuelto"
          color="#10B981"
          icon="check"
          selected={statuses.includes('resolved')}
          onPress={() => toggleStatus('resolved')}
        />

        <StatusOption
          label="Rechazado"
          color="#EF4444"
          icon="close-circle-outline"
          selected={statuses.includes('rejected')}
          onPress={() => toggleStatus('rejected')}
        />
      </View>

      <Text style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>
        Categoría
      </Text>

      {CATEGORY_CONFIG.map(cat => (
  <TouchableOpacity
    key={cat.value}
    onPress={() => setCategory(cat.value)}
    style={{
      backgroundColor: category === cat.value ? '#FEE2E2' : 'white',
      borderRadius: 12,
      padding: 14,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: category === cat.value ? '#FCA5A5' : '#E6E9F2',
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >

    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: category === cat.label ? '#FCA5A5' : '#F8FAFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
      }}
    >
      <MaterialCommunityIcons name="tag" size={18} color="#6B7280" />
    </View>

    <Text style={{ fontWeight: '600' }}>{cat.label}</Text>
  </TouchableOpacity>
))}
         



      <TouchableOpacity
        onPress={applyFilters}
        style={{
          marginTop: 24,
          backgroundColor: '#7C5CF6',
          padding: 14,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>
          Aplicar filtros
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={clearFilters}
        style={{
          marginTop: 10,
          backgroundColor: '#EF4444',
          padding: 14,
          borderRadius: 12,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>
          Limpiar filtros
        </Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

export default FiltersPanel;
