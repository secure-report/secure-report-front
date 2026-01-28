import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { API_REPORTS_URL } from '../config/api';
import { useAuth } from '../context/AuthContext';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const { signIn } = useAuth();

  const handleLogin = async () => {
    // Validación básica
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }
    if (!email.includes('@')) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }

    try {
      const response = await fetch(`${API_REPORTS_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        // Guardar token y actualizar estado global
        await signIn(data.token);
        // Ahora resetear la navegación al Home
        
      } else {
        Alert.alert('Error', data.error || 'Credenciales inválidas');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar al servidor');
    }
  };

  return (
    <SafeAreaProvider style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.column}>
          <View style={styles.column2}>
            <Image
              source={{
                uri: 'https://drive.google.com/uc?export=view&id=1dIfjR1WmpF-d6Mm66angVz0NCCxVn_7Y',
              }}
              resizeMode={'stretch'}
              style={styles.image}
            />
            <View style={styles.view}>
              <Text style={styles.text}>SecureReport</Text>
            </View>
            <View style={styles.view2}>
              <Text style={styles.text2}>Sistema de Denuncias Anónimas</Text>
            </View>
          </View>
          <View style={styles.column3}>
            <View style={styles.view3}>
              <Text style={styles.text3}>Iniciar Sesión</Text>
            </View>
            <View style={styles.view4}>
              <Text style={styles.text4}>
                Accede de forma segura para adminsitrar las denuncias de tus usuarios según tu rol
              </Text>
            </View>
            <View style={styles.column4}>
              <View style={styles.column5}>
                <View style={styles.view}>
                  <Text style={styles.text5}>Correo Electrónico</Text>
                </View>
                <View style={styles.row}>
                  <Image
                    source={{
                      uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/r7nowmd5_expires_30_days.png',
                    }}
                    resizeMode={'stretch'}
                    style={styles.image2}
                  />
                  <TextInput
                    placeholder={'tu@email.com'}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>
              <View style={styles.column6}>
                <View style={styles.view}>
                  <Text style={styles.text5}>Contraseña</Text>
                </View>
                <View style={styles.row2}>
                  <Image
                    source={{
                      uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/mosq4e9l_expires_30_days.png',
                    }}
                    resizeMode={'stretch'}
                    style={styles.image3}
                  />
                  <TextInput
                    placeholder={'••••••••'}
                    value={password}
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    style={styles.box}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Image
                      source={{
                        uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/qwjzjfcw_expires_30_days.png',
                      }}
                      resizeMode={'stretch'}
                      style={styles.image4}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.view5}>
                <View style={styles.view6}>
                  <Text style={styles.text7}>¿Olvidaste tu contraseña?</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.text8}>Iniciar Sesión</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row3}>
              <View style={styles.box2}></View>
              <View style={styles.view7}>
                <Text style={styles.text9}>o</Text>
              </View>
              <View style={styles.box3}></View>
            </View>
            <View style={styles.column7}>
              <View style={styles.view8}>
                <Text style={styles.text9}>¿No tienes cuenta?</Text>
              </View>
              <TouchableOpacity
                style={styles.button2}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.text10}>Crear Cuenta Nueva</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.row4}>
              <Image
                source={{
                  uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/n3iry0bk_expires_30_days.png',
                }}
                resizeMode={'stretch'}
                style={styles.image3}
              />
              <View style={styles.column8}>
                <View style={styles.view9}>
                  <Text style={styles.text11}>100% Privado y Seguro</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.text12}>
                    Las denuncias son completamente anónimas pero tu pones las manos al fuego.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

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
    paddingTop: 2,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: -120,
  },
  view: {
    marginBottom: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  view2: {
    marginBottom: 22,
  },
  text2: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  column3: {
    marginBottom: 22,
    marginHorizontal: 24,
  },
  view3: {
    marginBottom: 8,
  },
  text3: {
    color: '#0F172A',
    fontSize: 24,
    fontWeight: 'bold',
  },
  view4: {
    marginBottom: 24,
  },
  text4: {
    color: '#64748B',
    fontSize: 16,
  },
  column4: {
    marginBottom: 24,
  },
  column5: {
    marginBottom: 20,
  },
  text5: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image2: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  column6: {
    marginBottom: 23,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image3: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  box: {
    marginLeft: 12,
  },
  image4: {
    width: 20,
    height: 20,
  },
  view5: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  view6: {},
  text7: {
    color: '#1E3A8A',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    paddingVertical: 16,
  },
  text8: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  row3: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 24,
  },
  box2: {
    height: 1,
    flex: 1,
    backgroundColor: '#CBD5E1',
    marginRight: 16,
  },
  view7: {
    marginHorizontal: 16,
  },
  text9: {
    color: '#64748B',
    fontSize: 14,
  },
  box3: {
    height: 1,
    flex: 1,
    backgroundColor: '#CBD5E1',
  },
  column7: {
    marginBottom: 32,
  },
  view8: {
    alignItems: 'center',
    marginBottom: 16,
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#1E3A8A',
    borderRadius: 16,
    borderWidth: 2,
    paddingVertical: 14,
  },
  text10: {
    color: '#1E3A8A',
    fontSize: 16,
    fontWeight: '600',
  },
  row4: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  column8: {
    flex: 1,
    marginLeft: 12,
  },
  view9: {
    marginBottom: 4,
  },
  text11: {
    color: '#0F172A',
    fontSize: 16,
    fontWeight: '600',
  },
  view10: {},
  text12: {
    color: '#64748B',
    fontSize: 14,
  },
});