import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const navigation = useNavigation();
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
      <Text className="text-xl font-bold mb-6">Perfil</Text>

      <TouchableOpacity
        onPress={handleLogout}
        className="px-6 py-3 bg-red-600 rounded-md"
      >
        <Text className="text-white font-semibold">Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
