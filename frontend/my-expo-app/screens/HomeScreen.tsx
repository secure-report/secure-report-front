import React from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  useWindowDimensions,
  StatusBar,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'navigation/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default () => {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const scale = width / 375;

  const STATUS_BG = "#C7D2FE";

  return (
    <View style={{ flex: 1, backgroundColor: "#E8EDFF" }}>
      {/* StatusBar color */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor={STATUS_BG} // Android
        translucent={false}
      />

      {/* Franja superior detrás de la status bar (asegura el color arriba) */}
      <View style={{ height: insets.top, backgroundColor: STATUS_BG }} />

      <SafeAreaView style={{ flex: 1, backgroundColor: "#E8EDFF" }}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: Math.max(insets.bottom, 16),
            backgroundColor: "#E8EDFF",
          }}
        >
          {/* HEADER azul a ancho completo + más espacio arriba */}
          <View
            style={{
              width: "100%",
              backgroundColor: "#1E3A8A",
              paddingHorizontal: 24,
              paddingTop: 16 + 10, // 👈 extra para separarlo de la barra de estado
              paddingBottom: 16,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/wm5ty47z_expires_30_days.png",
              }}
              resizeMode="contain"
              style={{ width: 48, height: 48, marginRight: 12 }}
            />
            <View>
              <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold" }}>
                SecureReport
              </Text>
              <Text style={{ color: "#FFFEFE", fontSize: 14 }}>Sistema Anónimo</Text>
            </View>
          </View>

          {/* CUERPO */}
          <View style={{ flex: 1, alignItems: "center", paddingTop: 28 * scale }}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/ydwjp9w6_expires_30_days.png",
              }}
              resizeMode="contain"
              style={{
                width: 133 * scale,
                height: 102 * scale,
                marginBottom: 22 * scale,
              }}
            />

            <View style={{ width: "100%", alignItems: "center", paddingHorizontal: 24 }}>
              <View style={{ width: "100%", maxWidth: 360 }}>
                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#25439B",
                    borderRadius: 999,
                    paddingVertical: 18 * scale,
                    marginBottom: 12,
                  }}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                    Ingresa como protector
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    alignItems: "center",
                    backgroundColor: "#25439B",
                    borderRadius: 999,
                    paddingVertical: 18 * scale,
                    marginBottom: 16,
                  }}
                  onPress={() => navigation.navigate('Report')}
                >
                  <Text style={{ color: "#FFFFFF", fontSize: 15 }}>
                    Denuncia Anónima
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Tarjeta */}
            <View style={{ width: "100%", paddingHorizontal: 24, marginTop: "auto" }}>
              <View
                style={{
                  flexDirection: "row",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#C7D2FE",
                  borderRadius: 16,
                  borderWidth: 2,
                  padding: 18,
                  marginBottom: 12,
                }}
              >
                <Image
                  source={{
                    uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/juvjigpx_expires_30_days.png",
                  }}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, marginRight: 12 }}
                />
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#0A1433",
                      fontSize: 16,
                      fontWeight: "600",
                      marginBottom: 4,
                    }}
                  >
                    Tu anonimato está protegido
                  </Text>
                  <Text style={{ color: "#475569", fontSize: 14 }}>
                    Todos los reportes están cifrados y no rastreamos datos personales
                  </Text>
                </View>
              </View>
            </View>

            {/* Decoración inferior: FULL WIDTH (ya no es “cuadro”) */}
            <ImageBackground
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/gs8FHbyPsH/0t7q61k6_expires_30_days.png",
              }}
              resizeMode="stretch"
              style={{
                width: "100%", // 👈 a ambos lados
                height: 80 * scale,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
