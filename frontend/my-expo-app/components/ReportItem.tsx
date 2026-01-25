import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Report } from './reportModel';

const statusLabel = (s: string) => {
  switch (s) {
    case 'PENDING':
      return { text: 'Pendiente', color: '#f59e0b' };
    case 'IN_REVIEW':
      return { text: 'En Revisión', color: '#3b82f6' };
    case 'RESOLVED':
      return { text: 'Resuelto', color: '#10b981' };
    case 'REJECTED':
      return { text: 'Rechazado', color: '#ef4444' };
    default:
      return { text: s, color: '#6b7280' };
  }
};

const ReportItem = ({ report, onPress }: { report: Report; onPress?: (r: Report) => void }) => {
  const status = statusLabel(report.status);
  const created = new Date(report.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <TouchableOpacity onPress={() => onPress && onPress(report)} activeOpacity={0.9}>
      <View className="bg-white rounded-lg p-4 shadow-sm mb-4">
      <View className="flex-row justify-between items-start">
        <View>
          <Text className="text-sm text-gray-500">{report.id}</Text>
          <Text className="text-gray-700 font-semibold mt-2">{report.category}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View className="px-2 py-1 rounded-full" style={{ backgroundColor: '#eef2ff' }}>
            <Text className="text-xs text-blue-800">{status.text}</Text>
          </View>
          <Text className="text-xs text-gray-500 mt-2">{created}</Text>
        </View>
      </View>

      <Text className="mt-3 text-gray-800">{report.description}</Text>

      <View className="flex-row items-center mt-3">
        <MaterialCommunityIcons name="map-marker" size={16} color="#ef4444" />
        <Text className="text-sm text-gray-600 ml-2">{report.addressReference}</Text>
        <View style={{ flex: 1 }} />
        <MaterialCommunityIcons name="camera" size={16} color="#6b7280" />
        <Text className="text-sm text-gray-600 ml-2">{report.media.length}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReportItem;