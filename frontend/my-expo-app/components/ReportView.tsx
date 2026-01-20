import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const ReportFormScreen = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('reportar');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const categories = [
    'Precios abusivos',
    'Mala calidad de productos',
    'Mal servicio al cliente',
    'Publicidad engañosa',
    'Incumplimiento de garantías',
    'Falta de información',
    'Otras irregularidades',
  ];

  const handleDetectLocation = () => {
    // Simulación de detección de ubicación
    Alert.alert(
      'Ubicación Detectada',
      'Se ha detectado tu zona aproximada: Centro, Quito',
      [{ text: 'OK' }]
    );
    setLocation('Centro, Quito (zona aproximada)');
  };

  const handleUploadFile = () => {
    Alert.alert(
      'Subir Archivo',
      'Selecciona fotos o videos de evidencia',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galería' },
        { text: 'Cámara' },
      ]
    );
  };

  const handleSubmit = () => {
    if (!category) {
      Alert.alert('Error', 'Debes seleccionar una categoría');
      return;
    }
    if (description.length < 10) {
      Alert.alert('Error', 'La descripción debe tener al menos 10 caracteres');
      return;
    }
    if (!location) {
      Alert.alert('Error', 'Debes proporcionar una ubicación');
      return;
    }

    Alert.alert(
      'Denuncia Enviada',
      'Tu denuncia ha sido enviada de forma anónima. Gracias por contribuir a mejorar los servicios.',
      [{ text: 'OK' }]
    );

    // Limpiar formulario
    setCategory('');
    setDescription('');
    setLocation('');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top notch area with blue background */}
      <View
        className="bg-blue-900"
        style={{
          height: insets.top,
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}
      />
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 bg-white"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        {/* Header */}
        <View className="bg-blue-900 px-6 py-4">
          <Text className="text-2xl font-bold text-white">Nueva Denuncia</Text>
          <Text className="text-sm text-white/90 mt-1">
            Completa el formulario de manera anónima
          </Text>
        </View>

        {/* Form */}
        <ScrollView className="flex-1 bg-slate-50 px-4 py-6">
          {/* Categoría */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-700 mb-2">
              Categoría <Text className="text-red-500">*</Text>
            </Text>
            <TouchableOpacity
              onPress={() => setShowCategoryPicker(!showCategoryPicker)}
              className="bg-white rounded-lg px-4 py-3 border border-slate-300 flex-row items-center justify-between"
            >
              <Text
                className={`text-sm ${category ? 'text-slate-800' : 'text-slate-400'}`}
              >
                {category || 'Selecciona una categoría'}
              </Text>
              <Text className="text-slate-400">▼</Text>
            </TouchableOpacity>

            {showCategoryPicker && (
              <View className="mt-2 bg-white rounded-lg border border-slate-300 overflow-hidden">
                {categories.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setCategory(cat);
                      setShowCategoryPicker(false);
                    }}
                    className={`px-4 py-3 ${index !== categories.length - 1 ? 'border-b border-slate-200' : ''}`}
                  >
                    <Text className="text-sm text-slate-800">{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Descripción */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-700 mb-2">
              Descripción <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Describe detalladamente la situación..."
              placeholderTextColor="#94a3b8"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              className="bg-white rounded-lg px-4 py-3 border border-slate-300 text-sm text-slate-800 min-h-[120px]"
            />
            <Text
              className={`text-xs mt-1 ${description.length >= 10 ? 'text-green-600' : 'text-slate-500'}`}
            >
              Mínimo 10 caracteres ({description.length}/10)
            </Text>
          </View>

          {/* Ubicación */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-700 mb-2">
              Ubicación <Text className="text-red-500">*</Text>
            </Text>
            <View className="flex-row items-center bg-white rounded-lg px-4 py-3 border border-slate-300 mb-3">
              <Text className="text-slate-400 mr-2">📍</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Ubicación aproximada (requerida)"
                placeholderTextColor="#94a3b8"
                className="flex-1 text-sm text-slate-800"
              />
            </View>

            <TouchableOpacity
              onPress={handleDetectLocation}
              className="bg-white rounded-lg px-4 py-3 border-2 border-blue-900 flex-row items-center justify-center"
            >
              <Text className="text-blue-900 mr-2">📍</Text>
              <Text className="text-sm font-medium text-blue-900">
                Detectar Ubicación Automáticamente
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-start mt-2 px-2">
              <Text className="text-amber-600 text-xs mr-1">⚠️</Text>
              <Text className="text-xs text-slate-600 flex-1">
                Se usa solo zona aproximada, sin coordenadas exactas
              </Text>
            </View>
          </View>

          {/* Fotos/Videos */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-slate-700 mb-2">
              Fotos/Videos (Opcional)
            </Text>
            <TouchableOpacity
              onPress={handleUploadFile}
              className="bg-indigo-50 rounded-lg px-4 py-4 border border-indigo-200 flex-row items-center justify-center"
            >
              <Text className="text-indigo-900 mr-2">⬆️</Text>
              <Text className="text-sm font-medium text-indigo-900">
                Subir Archivo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Privacy Notice */}
          <View className="bg-indigo-50 rounded-lg px-4 py-4 mb-6 flex-row items-start">
            <Text className="text-indigo-900 mr-2">🔒</Text>
            <View className="flex-1">
              <Text className="text-sm font-bold text-indigo-900 mb-1">
                Privacidad garantizada:
              </Text>
              <Text className="text-xs text-indigo-800">
                Toda la información se cifra y anonimiza antes de enviarse.
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-900 rounded-lg px-6 py-4 items-center mb-8"
          >
            <Text className="text-white text-base font-semibold">
              Enviar Denuncia Anónima
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Bottom Navigation Bar */}
        <View className="bg-white border-t border-slate-200 py-3">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={() => setActiveTab('inicio')}
              className="flex-1 items-center ml-2"
            >
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/twxd10f7_expires_30_days.png',
                }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text
                className={`text-xs ${
                  activeTab === 'inicio'
                    ? 'text-indigo-900 font-bold'
                    : 'text-slate-500'
                }`}
              >
                Inicio
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('reportar')}
              className={`flex-1 items-center rounded-2xl py-2 ${
                activeTab === 'reportar' ? 'bg-indigo-200' : ''
              }`}
            >
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/211j0lmf_expires_30_days.png',
                }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text className="text-indigo-900 text-xs font-bold">
                Reportar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('reportes')}
              className="flex-1 items-center"
            >
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/jvjhvsz2_expires_30_days.png',
                }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text
                className={`text-xs ${
                  activeTab === 'reportes'
                    ? 'text-indigo-900 font-bold'
                    : 'text-slate-500'
                }`}
              >
                Reportes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('chat')}
              className="flex-1 items-center mr-4"
            >
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6vl3tqoi_expires_30_days.png',
                }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text
                className={`text-xs ${
                  activeTab === 'chat'
                    ? 'text-indigo-900 font-bold'
                    : 'text-slate-500'
                }`}
              >
                Asistente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab('perfil')}
              className="mr-5 items-center"
            >
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/7992ct08_expires_30_days.png',
                }}
                resizeMode="stretch"
                className="w-6 h-6 mb-1"
              />
              <Text
                className={`text-xs ${
                  activeTab === 'perfil'
                    ? 'text-indigo-900 font-bold'
                    : 'text-slate-500'
                }`}
              >
                Perfil
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportFormScreen;
