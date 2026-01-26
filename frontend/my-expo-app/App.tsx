import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import BottomTabs from './components/BottomNavigation';

import './global.css';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <BottomTabs />
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}















