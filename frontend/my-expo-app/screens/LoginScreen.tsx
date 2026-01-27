import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "navigation/RootNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const BASE_URL = "http://192.168.100.6:5000";

export default () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const scale = width / 375;

  const [email, setEmail] = useState("carlos@email.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Error", "Por favor ingresa tu contraseña");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token
        await AsyncStorage.setItem("adminToken", data.token);
        // Guardar datos del usuario
        await AsyncStorage.setItem("adminUser", JSON.stringify(data.user));
        // Navegar a Home
        navigation.navigate("Home");
      } else {
        Alert.alert("Error", data.error || "Credenciales inválidas");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#1E3A8A" />
      <ScrollView
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            backgroundColor: "#E8EDFF",
            paddingBottom: 32,
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#1E3A8A",
              paddingTop: 64,
              paddingBottom: 32,
            }}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/mrcwonl9_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={{
                width: 96,
                height: 96,
                marginBottom: 24,
              }}
            />
            <View
              style={{
                paddingBottom: 1,
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 30,
                  fontWeight: "bold",
                }}
              >
                {"SecureReport"}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "stretch",
                paddingBottom: 1,
                marginBottom: 0,
                marginHorizontal: 48,
              }}
            >
              <Text
                style={{
                  color: "#FFFEFE",
                  fontSize: 14,
                  textAlign: "center",
                }}
              >
                {"Sistema de Denuncias Anónimas"}
              </Text>
            </View>
          </View>

          <View
            style={{
              marginBottom: 32,
              marginHorizontal: 24,
              marginTop: 32,
            }}
          >
            <View
              style={{
                alignSelf: "flex-start",
                paddingBottom: 1,
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  color: "#0A1433",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {"Iniciar Sesión"}
              </Text>
            </View>
            <View
              style={{
                alignSelf: "flex-start",
                paddingBottom: 1,
                marginBottom: 24,
              }}
            >
              <Text
                style={{
                  color: "#475569",
                  fontSize: 16,
                  lineHeight: 24,
                }}
              >
                {"Accede de forma segura para realizar tus denuncias"}
              </Text>
            </View>

            <View
              style={{
                marginBottom: 24,
              }}
            >
              {/* Email Input */}
              <View
                style={{
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    paddingBottom: 1,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#0A1433",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {"Correo Electrónico"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderColor: "#CBD5E1",
                    borderRadius: 16,
                    borderWidth: 2,
                    paddingHorizontal: 16,
                  }}
                >
                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/r7nowmd5_expires_30_days.png",
                    }}
                    resizeMode="stretch"
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 12,
                    }}
                  />
                  <TextInput
                    placeholder={"tu@email.com"}
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#CBD5E1"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    editable={!loading}
                    style={{
                      color: "#0A1332",
                      fontSize: 16,
                      flex: 1,
                      paddingVertical: 17,
                    }}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View
                style={{
                  marginBottom: 23,
                }}
              >
                <View
                  style={{
                    paddingBottom: 1,
                    marginBottom: 8,
                  }}
                >
                  <Text
                    style={{
                      color: "#0A1433",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    {"Contraseña"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#FFFFFF",
                    borderColor: "#CBD5E1",
                    borderRadius: 16,
                    borderWidth: 2,
                    paddingHorizontal: 16,
                  }}
                >
                  <Image
                    source={{
                      uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/mosq4e9l_expires_30_days.png",
                    }}
                    resizeMode="stretch"
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 12,
                    }}
                  />
                  <TextInput
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#CBD5E1"
                    secureTextEntry={!showPassword}
                    editable={!loading}
                    style={{
                      color: "#0A1332",
                      fontSize: 16,
                      flex: 1,
                      paddingVertical: 17,
                    }}
                  />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/qwjzjfcw_expires_30_days.png",
                      }}
                      resizeMode="stretch"
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot Password */}
              <View
                style={{
                  alignItems: "flex-end",
                  marginBottom: 21,
                }}
              >
                <TouchableOpacity>
                  <Text
                    style={{
                      color: "#2F4FD8",
                      fontSize: 14,
                    }}
                  >
                    {"¿Olvidaste tu contraseña?"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#1E3A8A",
                  borderRadius: 16,
                  paddingVertical: 16,
                  opacity: loading ? 0.6 : 1,
                }}
                onPress={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: "600",
                    }}
                  >
                    {"Iniciar Sesión"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Divider */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: "#CBD5E1",
                  marginRight: 16,
                }}
              />
              <Text
                style={{
                  color: "#475569",
                  fontSize: 14,
                }}
              >
                {"o"}
              </Text>
              <View
                style={{
                  height: 1,
                  flex: 1,
                  backgroundColor: "#CBD5E1",
                  marginLeft: 16,
                }}
              />
            </View>

            {/* Sign Up Section */}
            <View
              style={{
                marginBottom: 32,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    color: "#475569",
                    fontSize: 14,
                  }}
                >
                  {"¿No tienes cuenta?"}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#1E3A8A",
                  borderRadius: 16,
                  borderWidth: 2,
                  paddingVertical: 14,
                  marginBottom: 12,
                }}
                onPress={handleSignUp}
                disabled={loading}
              >
                <Text
                  style={{
                    color: "#1E3A8A",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {"Crear Cuenta Nueva"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#475569",
                  borderRadius: 16,
                  borderWidth: 2,
                  paddingVertical: 14,
                }}
                onPress={() => navigation.navigate('Home')}
                disabled={loading}
              >
                <Text
                  style={{
                    color: "#475569",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {"Volver a Atrás"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Security Info */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#C7D2FE",
                borderRadius: 16,
                padding: 16,
              }}
            >
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/n3iry0bk_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 12,
                  marginTop: 2,
                }}
              />
              <View
                style={{
                  flex: 1,
                }}
              >
                <View
                  style={{
                    paddingBottom: 1,
                    marginBottom: 4,
                  }}
                >
                  <Text
                    style={{
                      color: "#0A1433",
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {"100% Privado y Seguro"}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#475569",
                    fontSize: 12,
                    lineHeight: 18,
                  }}
                >
                  {
                    "Tus credenciales están cifradas. Tus denuncias son completamente anónimas."
                  }
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
