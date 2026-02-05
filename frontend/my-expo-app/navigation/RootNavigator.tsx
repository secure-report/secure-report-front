import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import HomeScreen from 'screens/HomeScreen';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen';
import WelcomeScreen from 'screens/WelcomeScreen';
import ReportView from 'components/ReportView';
import Inicio from 'components/Inicio';
import InicioAnonimo from 'components/InicioAnonimo';
import ReportsPanel from 'components/ReportsPanel';
import ChatScreen from 'components/ChatScreen';
import ProfileScreen from 'components/ProfileScreen';
import ConsultarDenuncia from 'components/ConsultarDenuncia';
import ReportDetailAnonymous from 'components/ReportDetailAnonymous';

/* ✅ AUMENTADO */
import ReportSuccessView from 'components/ReportSuccessView';
import { Report } from 'components/reportModel'; // ✅ AUMENTADO
import ReportsMap from 'components/ReportsMap';

/* =======================
   STACK PARAMS
   ======================= */
export type RootStackParamList = {
  Home: {
    screen?: keyof AppTabParamList;
  };
  Login: undefined;
  Register: undefined;
  Welcome: undefined;
  NuevaDenuncia: undefined;
  Report: undefined;
  ReportsMap: undefined;
  ReportSuccessView: {
    report: Report;
  };
  ReportDetailAnonymous: {
    reportId: string;
  };
};

export type AppTabParamList = {
  Inicio: undefined;
  Reportes: undefined;
  Mapa: undefined;
  Asistente: undefined;
  Perfil: undefined;
};

export type AnonimousTabParamList = {
  Inicio: undefined;
  NuevaDenuncia: undefined;
  Consultar: undefined
  Asistente: undefined;
  Perfil: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<AppTabParamList>();
const AnonimousTab = createBottomTabNavigator<AnonimousTabParamList>();

function AppTabs({ bottomInset = 0 }: { bottomInset?: number }) {
  const tabBarHeight = 65 + Math.max(bottomInset, 0);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: 8 + Math.max(bottomInset, 0),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/twxd10f7_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Reportes"
        component={ReportsPanel}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/jvjhvsz2_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Mapa"
        component={ReportsMap}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/jvjhvsz2_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Asistente"
        component={ChatScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6vl3tqoi_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={() => <ProfileScreen role={'Protector'} />}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/7992ct08_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function AnonimousTabs({ bottomInset = 0 }: { bottomInset?: number }) {
  const tabBarHeight = 65 + Math.max(bottomInset, 0);
  return (
    <AnonimousTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: tabBarHeight,
          paddingBottom: 8 + Math.max(bottomInset, 0),
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}>
      <AnonimousTab.Screen
        name="Inicio"
        component={InicioAnonimo}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/twxd10f7_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <AnonimousTab.Screen
        name="NuevaDenuncia"
        component={ReportView}
        options={{
          title: 'Reportar',
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/211j0lmf_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <AnonimousTab.Screen
        name="Consultar"
        component={ConsultarDenuncia}
        options={{
          title: 'Consultar',
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/211j0lmf_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <AnonimousTab.Screen
        name="Asistente"
        component={ChatScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6vl3tqoi_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <AnonimousTab.Screen
        name="Perfil"
        component={() => <ProfileScreen role={'Anonimo'} />}
        options={{
          tabBarIcon: () => (
            <Image
              source={{
                uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/7992ct08_expires_30_days.png',
              }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />
    </AnonimousTab.Navigator>
  );
}

export function RootNavigator({ bottomInset = 0 }: { bottomInset?: number }) {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'white' },
      }}>
      {!isLoggedIn ? (
        <>
          {/* ✅ CAMBIO: ahora WelcomeScreen es realmente la pantalla de bienvenida */}
          <Stack.Screen name="Welcome" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Report">{() => <AnonimousTabs bottomInset={bottomInset} />}</Stack.Screen>
          <Stack.Screen name="NuevaDenuncia" component={ReportView} />
          <Stack.Screen name="ReportDetailAnonymous" component={ReportDetailAnonymous} />
          <Stack.Screen name="ReportSuccessView"component={ReportSuccessView}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Home">{() => <AppTabs bottomInset={bottomInset} />}</Stack.Screen>

        </>
      )}
    </Stack.Navigator>
  );
}
