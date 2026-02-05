import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'navigation/RootNavigator';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function InicioAnonimo() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const stats = [
    {
      icon: '📋',
      number: '15,234',
      label: 'Denuncias Recibidas',
    },
    {
      icon: '✅',
      number: '12,847',
      label: 'Casos Resueltos',
    },
    {
      icon: '👥',
      number: '8,921',
      label: 'Ciudadanos Activos',
    },
  ];

  const features = [
    {
      icon: '🛡️',
      title: 'Totalmente Anónimo',
      description:
        'Tu identidad está protegida con cifrado de extremo a extremo. No rastreamos datos personales.',
    },
    {
      icon: '🔒',
      title: 'Seguridad Garantizada',
      description: 'Sistema de encriptación de última generación para proteger tus denuncias.',
    },
    {
      icon: '🔔',
      title: 'Seguimiento en Tiempo Real',
      description: 'Consulta el estado de tu denuncia en cualquier momento con tu ID único.',
    },
    {
      icon: '📈',
      title: 'Impacto Real',
      description: 'Tus reportes ayudan a mejorar la calidad de productos y servicios para todos.',
    },
  ];

  const categories = [
    { name: 'Precios Abusivos', count: '1,234' },
    { name: 'Mala Calidad', count: '892' },
    { name: 'Mal Servicio', count: '645' },
    { name: 'Otras Irregularidades', count: '423' },
  ];

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-[#E8EDFF]">
        {/* Header Section with Gradient */}
        <View
          style={{
            height: insets.top,
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            backgroundColor: '#1E3A8A',
          }}
        />
        <LinearGradient
          colors={['#1E3A8A', '#3B5CCC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="rounded-b-3xl px-6 pb-12 pt-8">
          {/* Logo and Title */}
          <View className="mb-4 items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-3xl bg-white">
              <Text className="text-3xl">🛡️</Text>
            </View>
            <Text className="text-3xl font-bold text-white">SecureReport</Text>
          </View>

          {/* Subtitle */}
          <View >
            <Text className="mb-2 text-center text-base font-semibold text-white">
              Sistema de Denuncias Anónimas
            </Text>
            <Text className="text-center text-sm text-white opacity-90">
              Reporta irregularidades en productos y servicios de forma segura y completamente
              anónima
            </Text>
          </View>

        </LinearGradient>

        {/* Main Content */}
        <View className="px-6 pb-8 pt-12">
          {/* Impact Section */}
          <View className="mb-8">
            <Text className="mb-6 text-xl font-bold text-gray-900">Nuestro Impacto</Text>
            <View className="flex-row justify-between gap-4">
              {stats.map((stat, index) => (
                <View
                  key={index}
                  className="flex-1 items-center rounded-2xl bg-white px-3 py-5 shadow-sm">
                  <Text className="mb-2 text-3xl">{stat.icon}</Text>
                  <Text className="text-center text-lg font-bold text-gray-900">{stat.number}</Text>
                  <Text className="mt-1 text-center text-xs text-gray-600">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Features Section */}
          <View className="mb-8">
            <Text className="mb-4 text-xl font-bold text-gray-900">
              ¿Por qué usar SecureReport?
            </Text>
            <View className="gap-3">
              {features.map((feature, index) => (
                <View key={index} className="flex-row items-start rounded-2xl bg-white px-4 py-4">
                  <Text className="mr-3 mt-1 text-2xl">{feature.icon}</Text>
                  <View className="flex-1">
                    <Text className="mb-1 text-base font-semibold text-gray-900">
                      {feature.title}
                    </Text>
                    <Text className="text-sm leading-5 text-gray-600">{feature.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Categories Section */}
          <View className="mb-8">
            <Text className="mb-4 text-xl font-bold text-gray-900">Categorías de Denuncias</Text>
            <View className="overflow-hidden rounded-2xl bg-white shadow-sm">
              {categories.map((category, index) => (
                <View
                  key={index}
                  className={`flex-row items-center justify-between px-5 py-4 ${
                    index !== categories.length - 1 ? 'border-b border-gray-100' : ''
                  }`}>
                  <Text className="font-medium text-gray-700">{category.name}</Text>
                  <View className="rounded-full bg-blue-200 px-3 py-1">
                    <Text className="text-sm font-semibold text-blue-700">{category.count}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Footer */}
          <View className="mt-4 text-center">
            <Text className="text-xs text-gray-600">Protegiendo a los ciudadanos desde 2026</Text>
            <Text className="mt-1 text-xs text-gray-500">
              © SecureReport - Todos los derechos reservados
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
