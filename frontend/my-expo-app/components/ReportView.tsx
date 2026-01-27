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
import * as Location from 'expo-location';
import * as DocumentPicker from 'expo-document-picker';
import { API_REPORTS_URL } from '../config/api';

const ReportView = () => {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('reportar');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [locationText, setLocationText] = useState('');
  const [coordinates, setCoordinates] = useState<number[] | null>(null);
  const [media, setMedia] = useState<any[]>([]);
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

  const mapCategory = (cat: string) => {
    const map: any = {
      'Precios abusivos': 'precios_abusivos',
      'Mal servicio al cliente': 'mala_atencion',
      'Mala calidad de productos': 'productos_defectuosos',
      'Publicidad engañosa': 'publicidad_enganosa',
      'Falta de información': 'otros',
      'Incumplimiento de garantías': 'otros',
      'Otras irregularidades': 'otros',
    };
    return map[cat] || 'otros';
  };

 // 📍 UBICACIÓN REAL (sector / barrio)
const handleDetectLocation = async () => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'No se pudo acceder a la ubicación');
      return;
    }

    const loc = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    const geo = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });

    if (!geo || geo.length === 0) {
      Alert.alert('Error', 'No se pudo obtener la dirección');
      return;
    }

    const address = geo[0];

    // 🏘️ Construcción de dirección real
    const sector =
    address.district ||
    address.subregion ||
    address.city ||
    'Sector no identificado';

    const city = address.city || '';
    const province = address.region || '';

    const finalAddress = [
      sector && `Sector: ${sector}`,
      city,
      province,
    ]
      .filter(Boolean)
      .join(', ');

    // 📌 Guardamos coordenadas reales
    setCoordinates([loc.coords.longitude, loc.coords.latitude]);

    // 📍 Se copia automáticamente en el TextInput
    setLocationText(finalAddress);

    Alert.alert('Ubicación detectada', finalAddress);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo obtener la ubicación');
  }
};

// 📁 SUBIR ARCHIVO REAL (SEGÚN CONTRATO BACKEND)
const handleUploadFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['image/*', 'video/*'],
      copyToCacheDirectory: true,
      multiple: false,
    });

    if (result.canceled) return;

    const file = result.assets[0];

    const formData = new FormData();

    formData.append('file', {
      uri: file.uri,
      name: file.name || `media-${Date.now()}`,
      type: file.mimeType || 'application/octet-stream',
    } as any);

    const response = await fetch(`${API_REPORTS_URL}/api/media/upload`, {
      method: 'POST',
      body: formData,
      // ❌ NO AGREGAR HEADERS Content-Type
    });

    if (!response.ok) {
      throw new Error('Error al subir archivo');
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error('El servidor no aceptó el archivo');
    }

    setMedia((prev) => [
      ...prev,
      {
        type: data.type, // image | video
        url: data.url,
      },
    ]);

    Alert.alert('Archivo subido', 'Archivo agregado correctamente');
  } catch (error: any) {
    console.error(error);
    Alert.alert(
      'Error',
      error.message || 'No se pudo subir el archivo'
    );
  }
};

  // 🚀 ENVIAR REPORTE
  const handleSubmit = async () => {
  try {
    console.log('🚀 Enviando denuncia...');

    if (!category || description.length < 10 || !coordinates) {
      Alert.alert('Error', 'Completa todos los campos obligatorios');
      return;
    }

    const payload = {
      anonymousUserId: 'anon_' + Math.random().toString(36).substring(2, 10),
      category: mapCategory(category),
      description,
      location: {
        type: 'Point',
        coordinates,
      },
      addressReference: locationText,
      media,
    };

    const response = await fetch(`${API_REPORTS_URL}/api/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Error al enviar la denuncia');
    }

    Alert.alert('Denuncia enviada', 'Gracias por reportar');

  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'No se pudo enviar la denuncia');
  }
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
                value={locationText}
                onChangeText={setLocationText}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ReportView;
