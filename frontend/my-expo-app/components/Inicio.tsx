import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function Inicio() {
  const stats = [
    {
      icon: '📋',
      number: '3,194',
      label: 'Total Reportes',
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      icon: '⏰',
      number: '234',
      label: 'Pendientes',
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      icon: '👁️',
      number: '156',
      label: 'En Revisión',
      change: '-3.1%',
      changeType: 'negative',
    },
    {
      icon: '✅',
      number: '47',
      label: 'Resueltos Hoy',
      change: '+15.3%',
      changeType: 'positive',
    },
  ];

  const weeklyData = [
    { day: 'Lun', value: 35, height: 'h-16' },
    { day: 'Mar', value: 28, height: 'h-12' },
    { day: 'Mié', value: 32, height: 'h-14' },
    { day: 'Jue', value: 52, height: 'h-24' },
    { day: 'Vie', value: 30, height: 'h-12' },
    { day: 'Sáb', value: 25, height: 'h-10' },
    { day: 'Dom', value: 21, height: 'h-8' },
  ];

  const categories = [
    {
      icon: '🏷️',
      name: 'Precios Abusivos',
      count: '892',
      change: '+5.2%',
      percentage: '35%',
      color: 'bg-red-500',
    },
    {
      icon: '⚠️',
      name: 'Mala Calidad',
      count: '654',
      change: '+2.8%',
      percentage: '26%',
      color: 'bg-orange-500',
    },
    {
      icon: '🚫',
      name: 'Mal Servicio',
      count: '487',
      change: '-1.2%',
      percentage: '19%',
      color: 'bg-purple-500',
    },
    {
      icon: '📋',
      name: 'Otras',
      count: '361',
      change: '+3.5%',
      percentage: '20%',
      color: 'bg-blue-500',
    },
  ];

  return (
    <SafeAreaProvider className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-[#E8EDFF]">
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={['#1E3A8A', '#3B5CCC']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="px-6 pb-8 pt-8">
          {/* Logo and Title */}
          <View className="mb-4 items-center">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-3xl bg-white">
              <Text className="text-3xl">🛡️</Text>
            </View>
            <Text className="text-3xl font-bold text-white">SecureReport</Text>
          </View>

          {/* Subtitle */}
          <View>
            <Text className="mb-1 text-center text-base font-semibold text-white">
              Sistema de Denuncias Anónimas
            </Text>
            <Text className="text-center text-sm text-white opacity-90">
              Dashboard de Administrador
            </Text>
          </View>
        </LinearGradient>

        {/* Dashboard Content */}
        <View className="px-6 py-8">
          {/* Stats Grid */}
          <View className="mb-8 gap-4">
            {/* Top Row */}
            <View className="flex-row gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <View key={index} className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-2xl">{stat.icon}</Text>
                    <View
                      className={`rounded-full px-2 py-1 ${
                        stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                      <Text
                        className={`text-xs font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {stat.change}
                      </Text>
                    </View>
                  </View>
                  <Text className="mb-1 text-2xl font-bold text-gray-900">{stat.number}</Text>
                  <Text className="text-sm text-gray-500">{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Bottom Row */}
            <View className="flex-row gap-4">
              {stats.slice(2, 4).map((stat, index) => (
                <View key={index} className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                  <View className="mb-2 flex-row items-center justify-between">
                    <Text className="text-2xl">{stat.icon}</Text>
                    <View
                      className={`rounded-full px-2 py-1 ${
                        stat.changeType === 'positive' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                      <Text
                        className={`text-xs font-semibold ${
                          stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {stat.change}
                      </Text>
                    </View>
                  </View>
                  <Text className="mb-1 text-2xl font-bold text-gray-900">{stat.number}</Text>
                  <Text className="text-sm text-gray-500">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Weekly Reports Chart */}
          <View className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-lg font-bold text-gray-900">Reportes esta Semana</Text>
              <Text className="text-sm text-gray-500">303 total</Text>
            </View>

            {/* Chart */}
            <View className="h-32 flex-row items-end justify-between gap-2">
              {weeklyData.map((item, index) => (
                <View key={index} className="flex-1 items-center gap-2">
                  <View className={`w-full ${item.height} rounded-lg bg-blue-200`} />
                  <Text className="text-xs font-medium text-gray-600">{item.day}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Categories Section */}
          <View className="rounded-2xl bg-white p-6 shadow-sm">
            <Text className="mb-4 text-lg font-bold text-gray-900">Reportes por Categoría</Text>

            <View className="gap-4">
              {categories.map((category, index) => (
                <View key={index}>
                  {/* Category Header */}
                  <View className="mb-2 flex-row items-center justify-between">
                    <View className="flex-1 flex-row items-center">
                      <Text className="mr-2 text-2xl">{category.icon}</Text>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-gray-900">
                          {category.name}
                        </Text>
                        <Text className="text-xs text-gray-500">{category.count} reportes</Text>
                      </View>
                    </View>
                    <View className="items-end">
                      <Text
                        className={`text-xs font-semibold ${
                          category.change.includes('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                        {category.change}
                      </Text>
                      <View className="mt-1 rounded-full bg-blue-200 px-2 py-0.5">
                        <Text className="text-xs font-semibold text-blue-700">
                          {category.percentage}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Progress Bar */}
                  <View className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <View
                      className={`h-full ${category.color} rounded-full`}
                      style={{
                        width: category.percentage,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
