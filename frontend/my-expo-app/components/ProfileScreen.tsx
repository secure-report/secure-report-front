import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'navigation/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function ProfileScreen({ role }: { role?: string }){
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error('Logout error', e);
      Alert.alert('Error', 'No se pudo cerrar sesión');
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="mb-6 text-xl font-bold">Perfil</Text>
      {role === 'Protector' && (
        <TouchableOpacity onPress={handleLogout} className="rounded-md bg-red-600 px-6 py-3">
          <Text className="font-semibold text-white">Cerrar sesión</Text>
        </TouchableOpacity>
      )}
      {role === 'Anonimo' && (
        <TouchableOpacity
          onPress={() => navigation.navigate('ReportsMap')}
          className="rounded-md bg-red-600 px-6 py-3">
          <Text className="font-semibold text-white">Iniciar como Protector</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
