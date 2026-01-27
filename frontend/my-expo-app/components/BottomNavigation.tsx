import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import ReportView from '../components/ReportView';
import Inicio from '../components/Inicio';
import ReportsPanel from '../components/ReportsPanel';
import ChatScreen from '../components/ChatScreen';
import ProfileScreen from '../components/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={Inicio}
        options={{
          tabBarIcon: () => (
            <Image
              source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/twxd10f7_expires_30_days.png' }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="NuevaDenuncia"
        component={ReportView}
        options={{
          title: 'Reportar',
          tabBarIcon: () => (
            <Image
              source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/211j0lmf_expires_30_days.png' }}
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
              source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/jvjhvsz2_expires_30_days.png' }}
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
              source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6vl3tqoi_expires_30_days.png' }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <Image
              source={{ uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/7992ct08_expires_30_days.png' }}
              style={{ width: 22, height: 22 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
