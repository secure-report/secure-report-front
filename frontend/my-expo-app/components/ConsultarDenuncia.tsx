import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import Header from './Header';

export default function ConsultarDenuncia() {
  const [reportId, setReportId] = useState('');

  const handleConsultar = () => {
    if (reportId.trim()) { 
      // TODO: Implement report status check logic
      alert(`Consultando reporte: ${reportId}`);
    } else {
      alert('Por favor ingresa un ID de reporte');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header
        title="Consultar Denuncia"
        subtitle="Verifica el estado de forma anónima"
        iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6u90y110_expires_30_days.png"
      />
      <ScrollView className="flex-1 bg-[#E8EDFF] pb-2">
        {/* Content Section */}
        <View className="pb-13 px-6 pt-8">
          {/* Info Card */}
          <View className="mb-6 flex-row rounded-2xl bg-white px-6 pb-10 pt-6 shadow-md">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-[#DBEAFE]">
              <Text className="text-2xl text-[#1E3A8A]">🛡️</Text>
            </View>
            <View className="flex-1">
              <View className="mb-2">
                <Text className="text-xl font-semibold text-[#0A1433]">Consulta Anónima</Text>
              </View>
              <View>
                <Text className="text-sm leading-5 text-slate-600">
                  Ingresa el ID de tu denuncia para verificar su estado actual. No se solicitará
                  ninguna información personal.
                </Text>
              </View>
            </View>
          </View>

          {/* Input Section */}
          <View className="mb-6">
            <View className="mb-2 flex-row items-center">
              <Text className="mr-1 text-base font-medium text-[#0A1433]">ID de Reporte</Text>
              <Text className="text-base text-red-600">*</Text>
            </View>
            <View className="flex-row items-center rounded-2xl border-2 border-slate-300 bg-white">
              <Text className="ml-4 mr-3 text-xl text-slate-400">#</Text>
              <TextInput
                placeholder="SR-2024-001234"
                placeholderTextColor="#94A3B8"
                value={reportId}
                onChangeText={setReportId}
                className="flex-1 py-5 pr-4 text-lg text-[#0A1332]"
              />
            </View>
          </View>

          {/* Button */}
          <TouchableOpacity
            className="mb-6 flex-row items-center justify-center rounded-2xl bg-slate-300 py-4"
            onPress={handleConsultar}>
            <Text className="mr-2 text-lg">🔍</Text>
            <Text className="text-base font-medium text-slate-700">Consultar Estado</Text>
          </TouchableOpacity>

          {/* Security Message */}
          <View className="rounded-2xl bg-[#FEF3C7] px-4 py-4">
            <Text className="text-center text-sm leading-5 text-[#78350F]">
              🔒 Consulta 100% anónima y segura. No se registra ningún dato personal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
