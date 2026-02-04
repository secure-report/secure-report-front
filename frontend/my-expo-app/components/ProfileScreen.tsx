import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'navigation/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ProfileScreen({ role }: { role?: string }) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error('Logout error', e);
    }
  };

  // Visual-only states for switches
  const notifOn = true;
  const darkModeOn = false;

  return (
    <View className="flex-1" style={{ backgroundColor: '#E8EDFF' }}>
      <Header
        title={role === 'Protector' ? 'Usuario Protector' : 'Usuario Anónimo'}
        subtitle={role === 'Protector' ? 'Cuenta Protector' : 'Siempre anónimo y protegido'}
        iconUri={
          role === 'Protector'
            ? undefined
            : 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/jkmzwgbz_expires_30_days.png'
        }
      />

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 48 }}>
        {role !== 'Protector' && (
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={['#1E3A8A', '#3B5CCC']}
            className="mb-4 flex-row rounded-lg p-4">
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/kakjrfbe_expires_30_days.png',
              }}
              className="mr-3 h-11 w-11"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-base font-semibold text-white">Identidad Protegida</Text>
              <Text className="mt-1 text-sm text-sky-100">
                Tu información está completamente cifrada y anónima
              </Text>
            </View>
          </LinearGradient>
        )}

        <View className="mb-3 rounded-lg bg-white p-3">
          <Text className="mb-2 font-semibold text-slate-600">Cuenta</Text>

          <View className="flex-row items-center border-b border-slate-100 py-3">
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/k18d8ymi_expires_30_days.png',
              }}
              className="mr-3 h-9 w-9"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-base text-slate-900">Modo Anónimo</Text>
              <Text className="mt-1 text-sm text-green-400">Siempre Activo</Text>
            </View>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/ag6aknbp_expires_30_days.png',
              }}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </View>

          <View className="flex-row items-center border-b border-slate-100 py-3">
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/tamntxm6_expires_30_days.png',
              }}
              className="mr-3 h-9 w-9"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-base text-slate-900">Idioma</Text>
              <Text className="mt-1 text-sm text-green-400">Español</Text>
            </View>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/b39d1ap1_expires_30_days.png',
              }}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="mb-3 rounded-lg bg-white p-3">
          <Text className="mb-2 font-semibold text-slate-600">Privacidad y Seguridad</Text>

          <View className="flex-row items-center border-b border-slate-100 py-3">
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/ftfsti89_expires_30_days.png',
              }}
              className="mr-3 h-9 w-9"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-base text-slate-900">Nivel de Cifrado</Text>
              <Text className="mt-1 text-sm text-green-400">Máximo</Text>
            </View>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/r43rcx06_expires_30_days.png',
              }}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </View>

          <View className="flex-row items-center border-b border-slate-100 py-3">
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/lsk17web_expires_30_days.png',
              }}
              className="mr-3 h-9 w-9"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-base text-slate-900">Datos Anónimos</Text>
              <Text className="mt-1 text-sm text-green-400">Protegidos</Text>
            </View>
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/gj0rkha5_expires_30_days.png',
              }}
              className="h-5 w-5"
              resizeMode="contain"
            />
          </View>

          <View className="flex-row items-center py-3">
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/xciyadfh_expires_30_days.png',
              }}
              className="mr-3 h-9 w-9"
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-base text-slate-900">Tema Oscuro</Text>
            </View>
            <View className="w-14 items-end">
              <View
                className={`h-7 w-12 justify-center rounded-full p-1 ${darkModeOn ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                <View
                  className={`h-4 w-4 rounded-full bg-white ${darkModeOn ? 'self-end' : 'self-start'}`}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="mb-3 rounded-lg bg-white p-3">
          <Text className="mb-2 font-semibold text-slate-600">Ayuda</Text>
          <TouchableOpacity className="border-b border-slate-100 py-3">
            <Text className="text-slate-900">Centro de Ayuda</Text>
          </TouchableOpacity>
          <TouchableOpacity className="border-b border-slate-100 py-3">
            <Text className="text-slate-900">Términos y Condiciones</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3">
            <Text className="text-slate-900">Política de Privacidad</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-2 items-center">
          {role === 'Protector' ? (
            <TouchableOpacity onPress={handleLogout} className="rounded-lg bg-red-500 px-6 py-3">
              <Text className="font-bold text-white">Cerrar Sesión</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className="rounded-lg bg-green-500 px-6 py-3">
              <Text className="font-bold text-white">Iniciar como Protector</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
