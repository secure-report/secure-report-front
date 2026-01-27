import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { API_REPORTS_URL } from '../config/api';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function RegisterScreen() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleRegister = async () => {
    // Validaciones
    if (!nombre || !apellido || !fechaNacimiento || !direccion || !email || !password) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await fetch(`${API_REPORTS_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido,
          fecha_nacimiento: fechaNacimiento,
          direccion,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', 'Usuario registrado correctamente');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.error || 'Error al registrar usuario');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.column2}>
            <Text style={styles.title}>Crear Cuenta Nueva</Text>
          </View>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={apellido}
              onChangeText={setApellido}
            />
            <TextInput
              style={styles.input}
              placeholder="Fecha de Nacimiento (YYYY-MM-DD)"
              value={fechaNacimiento}
              onChangeText={setFechaNacimiento}
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={direccion}
              onChangeText={setDireccion}
            />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.backText}>¿Ya tienes cuenta? Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  column: {
    backgroundColor: '#E8EDFF',
    paddingBottom: 32,
  },
  column2: {
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    paddingTop: 64,
    paddingBottom: 32,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginHorizontal: 24,
    marginTop: 32,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backText: {
    textAlign: 'center',
    color: '#1E3A8A',
    fontSize: 16,
  },
});