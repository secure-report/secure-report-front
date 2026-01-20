import { StatusBar } from 'expo-status-bar';
import ReportView from 'components/ReportView';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './global.css';

export default function App() {
  return (
      <SafeAreaProvider>
      <ReportView/>
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}








