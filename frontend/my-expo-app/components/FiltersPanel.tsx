import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

/* ---------- StatusOption (DISEÑO ORIGINAL) ---------- */
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

/* ---------- QuickButton ---------- */
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

/* ---------- FiltersPanel ---------- */
const FiltersPanel = ({
  onClose,
  onApply,
}: {
  onClose: () => void;
  onApply: (filters: any) => void;
}) => {

  // ESTADOS alineados con el modelo
  const [statuses, setStatuses] = useState<string[]>(['in_review']);


  // CATEGORÍAS alineadas con el modelo
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
      fromDate: fromDate ? fromDate.toISOString() : null,
      toDate: toDate ? toDate.toISOString() : null,
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

      {/* ---------- ESTADOS ---------- */}
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

      {/* ---------- CATEGORÍA ---------- */}
      <Text style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>
        Categoría
      </Text>

      {[
        'Precios Abusivos',
        'Mala calidad de productos',
        'Mal servicio al cliente',
        'Publicidad engañosa',
        'Incumplimiento de garantías',
        'Falta de información',
        'Otras irregularidades',
      ].map(c => (
        <TouchableOpacity
          key={c}
          onPress={() => setCategory(c)}
          style={{
            backgroundColor: category === c ? '#FEE2E2' : 'white',
            borderRadius: 12,
            padding: 14,
            marginBottom: 10,
            borderWidth: 1,
            borderColor: category === c ? '#FCA5A5' : '#E6E9F2',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: category === c ? '#FCA5A5' : '#F8FAFF',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
            }}
          >
            <MaterialCommunityIcons
              name="tag"
              size={18}
              color={category === c ? 'white' : '#6B7280'}
            />
          </View>

          <Text style={{ fontWeight: '600' }}>
            {c}
          </Text>
        </TouchableOpacity>
      ))}

      {/* ---------- FECHAS ---------- */}
      <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 8 }}>
        Rango de Fechas
      </Text>

      <Text style={{ marginBottom: 6 }}>Desde</Text>
      <TouchableOpacity
        onPress={() => setShowFromPicker(true)}
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 12,
          borderWidth: 1,
          borderColor: '#CBD5E1',
          marginBottom: 12,
        }}
      >
        <Text>{fromDate ? formatDate(fromDate) : 'YYYY-MM-DD'}</Text>
      </TouchableOpacity>

      {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date);
          }}
        />
      )}

      <Text style={{ marginBottom: 6 }}>Hasta</Text>
      <TouchableOpacity
        onPress={() => setShowToPicker(true)}
        style={{
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 12,
          borderWidth: 1,
          borderColor: '#CBD5E1',
        }}
      >
        <Text>{toDate ? formatDate(toDate) : 'YYYY-MM-DD'}</Text>
      </TouchableOpacity>

      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, date) => {
            setShowToPicker(false);
            if (date) setToDate(date);
          }}
        />
      )}

      {/* ---------- ACCESOS RÁPIDOS ---------- */}
      <Text style={{ fontWeight: '700', fontSize: 16, marginVertical: 8 }}>
        Accesos Rápidos
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <QuickButton label="Hoy" onPress={() => applyQuickRange(0)} />
        <QuickButton label="Últimos 7 días" onPress={() => applyQuickRange(7)} />
        <QuickButton label="Últimos 30 días" onPress={() => applyQuickRange(30)} />
        <QuickButton label="Últimos 90 días" onPress={() => applyQuickRange(90)} />
      </View>

      {/* ---------- BOTONES ---------- */}
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
