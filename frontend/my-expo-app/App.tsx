import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './context/AuthContext';
import { RootNavigator } from './navigation/RootNavigator';

import './global.css';

function AppContent() {
  const insets = useSafeAreaInsets();
  return (
    <NavigationContainer>
      <RootNavigator bottomInset={insets.bottom} />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </AuthProvider>
  );
}















