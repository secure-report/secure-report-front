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

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "SignUp">;

const BASE_URL = "http://192.168.100.6:5000";

export default () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const scale = width / 375;

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "Por favor ingresa tu nombre");
      return;
    }
    if (!apellido.trim()) {
      Alert.alert("Error", "Por favor ingresa tu apellido");
      return;
    }
    if (!fechaNacimiento.trim()) {
      Alert.alert("Error", "Por favor ingresa tu fecha de nacimiento (YYYY-MM-DD)");
      return;
    }
    if (!direccion.trim()) {
      Alert.alert("Error", "Por favor ingresa tu dirección");
      return;
    }
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }
    if (!password.trim() || password.length < 6) {
      Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          fecha_nacimiento: fechaNacimiento.trim(),
          direccion: direccion.trim(),
          email: email.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          "Éxito",
          "Cuenta creada correctamente. Por favor inicia sesión.",
          [
            {
              text: "OK",
              onPress: () => {
                navigation.goBack();
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", data.error || "No se pudo crear la cuenta");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudo conectar con el servidor");
      console.error(error);
    } finally {
      setLoading(false);
    }
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
                {"Crear Cuenta"}
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
                {"Completa el formulario para registrarte"}
              </Text>
            </View>

            <View style={{ marginBottom: 24 }}>
              {/* Nombre */}
              <InputField
                label="Nombre"
                placeholder="Tu nombre"
                value={nombre}
                onChangeText={setNombre}
                editable={!loading}
              />

              {/* Apellido */}
              <InputField
                label="Apellido"
                placeholder="Tu apellido"
                value={apellido}
                onChangeText={setApellido}
                editable={!loading}
              />

              {/* Fecha de Nacimiento */}
              <InputField
                label="Fecha de Nacimiento"
                placeholder="YYYY-MM-DD"
                value={fechaNacimiento}
                onChangeText={setFechaNacimiento}
                editable={!loading}
              />

              {/* Dirección */}
              <InputField
                label="Dirección"
                placeholder="Tu dirección"
                value={direccion}
                onChangeText={setDireccion}
                editable={!loading}
              />

              {/* Email */}
              <InputField
                label="Correo Electrónico"
                placeholder="tu@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                editable={!loading}
              />

              {/* Password */}
              <View style={{ marginBottom: 20 }}>
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
                    placeholder="Mínimo 6 caracteres"
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

              {/* Sign Up Button */}
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#1E3A8A",
                  borderRadius: 16,
                  paddingVertical: 16,
                  marginBottom: 16,
                  opacity: loading ? 0.6 : 1,
                }}
                onPress={handleSignUp}
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
                    {"Crear Cuenta"}
                  </Text>
                )}
              </TouchableOpacity>

              {/* Back to Login */}
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#1E3A8A",
                  borderRadius: 16,
                  borderWidth: 2,
                  paddingVertical: 14,
                }}
                onPress={() => navigation.goBack()}
                disabled={loading}
              >
                <Text
                  style={{
                    color: "#1E3A8A",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  {"Volver a Iniciar Sesión"}
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
                marginTop: 24,
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

const InputField = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  editable = true,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: string;
  editable?: boolean;
}) => (
  <View style={{ marginBottom: 20 }}>
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
        {label}
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
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#CBD5E1"
        keyboardType={keyboardType as any}
        autoCapitalize="none"
        editable={editable}
        style={{
          color: "#0A1332",
          fontSize: 16,
          flex: 1,
          paddingVertical: 17,
        }}
      />
    </View>
  </View>
);
