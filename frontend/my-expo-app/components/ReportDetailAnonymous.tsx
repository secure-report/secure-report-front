import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import { API_REPORTS_URL } from '../config/api';

interface Report {
  _id: string;
  anonymousUserId: string;
  category: string;
  description: string;
  location: {
    type: string;
    coordinates: [number, number];
  };
  addressReference: string;
  media: {
    url: string;
  }[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

const categoryMap: { [key: string]: { name: string } } = {
  acoso: { name: 'Acoso' },
  precios_abusivos: { name: 'Precios Abusivos' },
  mala_atencion: { name: 'Mala Atención' },
  productos_defectuosos: { name: 'Productos Defectuosos' },
  publicidad_enganosa: { name: 'Publicidad Engañosa' },
  falta_higiene: { name: 'Falta de Higiene' },
  otros: { name: 'Otros' },
};

const statusMap: { [key: string]: { label: string; color: string; bg: string } } = {
  pending: { label: 'Pendiente', color: 'text-yellow-600', bg: 'bg-yellow-100' },
  in_review: { label: 'En Revisión', color: 'text-blue-600', bg: 'bg-blue-100' },
  approved: { label: 'Aprobado', color: 'text-green-600', bg: 'bg-green-100' },
  rejected: { label: 'Rechazado', color: 'text-red-600', bg: 'bg-red-100' },
  resolved: { label: 'Resuelto', color: 'text-green-600', bg: 'bg-green-100' },
};

export default function ReportDetail({ route }: any) {
  const navigation = useNavigation();
  const { reportId, report: initialReport } = route.params;
  const [report, setReport] = useState<Report | null>(initialReport || null);
  const [loading, setLoading] = useState(!initialReport);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if report data was not passed from ConsultarDenuncia
    if (!initialReport) {
      fetchReport();
    }
  }, [reportId, initialReport]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_REPORTS_URL}/api/reports/${reportId}`);

      if (!response.ok) {
        if (response.status === 404) {
          setError('Reporte no encontrado');
        } else {
          setError('Error al obtener el reporte');
        }
        return;
      }

      const data = await response.json();
      setReport(data);
    } catch (err) {
      setError('Error de conexión. Por favor intenta de nuevo.');
      console.error('Error fetching report:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <View className="flex-1 bg-white">
        <Header
          title="Detalle del Reporte"
          subtitle="Información completa de tu denuncia"
          iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6u90y110_expires_30_days.png"
        />
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#1E3A8A" />
        </View>
      </View>
    );
  }

  if (error || !report) {
    return (
      <View className="flex-1 bg-white">
        <Header
          title="Detalle del Reporte"
          subtitle="Información completa de tu denuncia"
          iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6u90y110_expires_30_days.png"
        />
        <View className="flex-1 items-center justify-center px-6">
          <Text className="mb-4 text-center text-lg font-semibold text-gray-900">
            {error || 'No se pudo cargar el reporte'}
          </Text>
          <TouchableOpacity
            className="rounded-2xl bg-blue-600 px-6 py-3"
            onPress={() => navigation.goBack()}>
            <Text className="font-semibold text-white">Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const categoryInfo = categoryMap[report.category] || { name: 'Desconocido', icon: '📋' };
  const statusInfo = statusMap[report.status] || { label: 'Desconocido', color: 'text-gray-600', bg: 'bg-gray-100' };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Detalle del Reporte"
        subtitle="Información completa de tu denuncia"
        iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6u90y110_expires_30_days.png"
      />
      <ScrollView className="flex-1 bg-[#E8EDFF]">
        <View className="px-6 py-6">
          {/* Report ID Card */}
          <View className="mb-4 flex-row items-center rounded-2xl bg-white px-4 py-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Text className="text-lg">#</Text>
            </View>
            <View>
              <Text className="text-xs font-medium text-gray-500">ID de Reporte</Text>
              <Text className="font-semibold text-gray-900">{report._id}</Text>
            </View>
          </View>

          {/* Report Date Card */}
          <View className="mb-4 flex-row items-center rounded-2xl bg-white px-4 py-4 shadow-sm">
            <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Text className="text-lg">📅</Text>
            </View>
            <View>
              <Text className="text-xs font-medium text-gray-500">Fecha de Reporte</Text>
              <Text className="font-semibold text-gray-900">{formatDate(report.createdAt)}</Text>
            </View>
          </View>

          {/* Status Badge */}
          <View className={`mb-4 rounded-2xl px-4 py-3 ${statusInfo.bg}`}>
            <View className="flex-row items-center">
              <Text className="mr-2">🔵</Text>
              <Text className={`font-semibold ${statusInfo.color}`}>{statusInfo.label}</Text>
            </View>
          </View>

          {/* Category */}
          <View className="mb-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
            <Text className="mb-2 text-xs font-medium text-gray-500">Categoría</Text>
            <View className="flex-row items-center">
              <Text className="font-semibold text-gray-900">{categoryInfo.name}</Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
            <Text className="mb-2 text-xs font-medium text-gray-500">Descripción</Text>
            <Text className="leading-5 text-gray-700">{report.description}</Text>
          </View>

          {/* Location */}
          <View className="mb-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
            <View className="flex-row items-start">
              <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Text className="text-lg">📍</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs font-medium text-gray-500">Ubicación</Text>
                <Text className="mt-1 font-semibold text-gray-900">{report.addressReference}</Text>
                <Text className="mt-1 text-xs text-gray-500">
                  {report.location.coordinates[1].toFixed(4)}, {report.location.coordinates[0].toFixed(4)}
                </Text>
              </View>
            </View>
          </View>

          {/* Media Section */}
          {report.media && report.media.length > 0 && (
            <View className="mb-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
              <Text className="mb-3 text-sm font-medium text-gray-900">
                Evidencia Fotográfica ({report.media.length})
              </Text>
              <View className="flex-row flex-wrap gap-3">
                {report.media.map((mediaUrl, index) => (
                  <View
                    key={index}
                    className="h-24 w-24 rounded-lg border border-gray-200 items-center justify-center bg-gray-100">
                    <Image
                      source={{ uri: mediaUrl.url }}
                      className="h-full w-full rounded-lg"
                      resizeMode="cover"
                    />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* No Media Placeholder */}
          {(!report.media || report.media.length === 0) && (
            <View className="mb-4 rounded-2xl bg-white px-4 py-4 shadow-sm">
              <Text className="mb-3 text-sm font-medium text-gray-900">Evidencia Fotográfica</Text>
              <View className="flex-row gap-3">
                <View className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50">
                  <Text className="text-2xl">📷</Text>
                </View>
                <View className="h-24 w-24 rounded-lg border-2 border-dashed border-gray-300 items-center justify-center bg-gray-50">
                  <Text className="text-2xl">📷</Text>
                </View>
              </View>
            </View>
          )}

          {/* Security Message */}
          <View className="mb-6 rounded-2xl bg-green-100 px-4 py-4">
            <View className="flex-row">
              <Text className="mr-2 text-lg">🔒</Text>
              <Text className="flex-1 text-sm font-medium leading-5 text-green-800">
                Tu identidad está protegida. Este reporte es completamente anónimo.
              </Text>
            </View>
          </View>

          {/* Back Button */}
          <TouchableOpacity
            className="rounded-2xl bg-gray-200 px-4 py-3"
            onPress={() => navigation.goBack()}>
            <Text className="text-center font-semibold text-gray-800">Volver</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
