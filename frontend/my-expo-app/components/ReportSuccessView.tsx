import React from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { Video, ResizeMode } from "expo-av";



type Props = NativeStackScreenProps<
  RootStackParamList,
  "ReportSuccessView"
>;

export default function ReportSuccessView({ route, navigation }: Props) {
  const report = route.params?.report ?? {
  id: "—",
  category: "—",
  description: "—",
  addressReference: "—",
  media: [],
  status: "PENDIENTE",
  createdAt: new Date().toISOString(),
};


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView style={{ flex: 1 }}>

        {/* HEADER */}
        <View style={header}>
          <Image
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/845/845646.png" }}
            style={successIcon}
          />
          <Text style={headerTitle}>¡Denuncia Enviada!</Text>
          <Text style={headerSubtitle}>
            Tu reporte ha sido registrado de forma anónima
          </Text>
        </View>

        <View style={content}>

          {/* ID */}
          <Card>
            <Text style={label}>ID de Seguimiento</Text>
            <Text style={value}>{report.id}</Text>
            <Text style={hint}>
              Guarda este ID para consultar el estado de tu denuncia
            </Text>
          </Card>

          {/* RESUMEN */}
          <Card>
            <Text style={title}>Resumen del Reporte</Text>

            <Item label="Categoría" value={report.category} />
            <Item label="Descripción" value={report.description} />
            <Item label="Ubicación" value={report.addressReference} />
            <Item
              label="Evidencias adjuntas"
              value={`${report.media.length} archivo(s)`}
            />

            <Text style={date}>
              {new Date(report.createdAt).toLocaleString("es-ES")}
            </Text>
          </Card>

          {/* IMÁGENES */}
          {report.media.length > 0 && (
  <Card>
    <Text style={title}>Evidencias</Text>

    <View style={mediaContainer}>
      {report.media.map((m, index) => {
        const isVideo =
          m.type === "video" ||
          m.url.endsWith(".mp4") ||
          m.url.endsWith(".mov") ||
          m.url.endsWith(".webm");

        return (
          <View key={index} style={{ position: "relative" }}>
            {isVideo ? (
              <>
                <Video
                  source={{ uri: m.url }}
                  style={mediaImage}
                  resizeMode={ResizeMode.COVER}
                  shouldPlay={false}
                  isMuted
                />
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 28,
                      color: "rgba(255, 255, 255, 0.8)", // plomo translúcido
                    }}
                  >
                    ▶
                  </Text>

                </View>
              </>
            ) : (
              <Image source={{ uri: m.url }} style={mediaImage} />
            )}
          </View>
        );
      })}
    </View>
  </Card>
)}


          {/* ESTADO */}
          <Card horizontal>
            <Image
              source={{ uri: "https://cdn-icons-png.flaticon.com/512/1828/1828640.png" }}
              style={statusIcon}
            />
            <View>
              <Text style={value}>
                Estado: {mapStatus(report.status)}
              </Text>
              <Text style={hint}>
                Recibirás actualizaciones pronto
              </Text>
            </View>
          </Card>

          {/* BOTONES */}
<TouchableOpacity
  style={primaryBtn}
  onPress={() =>
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          params: {
            screen: 'Reportes',
          },
        },
      ],
    })
  }
>
  <Text style={primaryText}>Ver mis reportes</Text>
</TouchableOpacity>



          <TouchableOpacity
            style={secondaryBtn}
            onPress={() => navigation.navigate({
              name: "Home",
              params: {},
            })}
          >
            <Text style={secondaryText}>Volver al Inicio</Text>
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={secureBox}>
            <Text style={secureText}>
              🔒 Tu identidad permanece completamente anónima y protegida
            </Text>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ----------------- COMPONENTES AUX ----------------- */

const Card = ({
  children,
  horizontal = false,
}: {
  children: React.ReactNode;
  horizontal?: boolean;
}) => (
  <View
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 16,
      padding: 16,
      marginBottom: 20,
      flexDirection: horizontal ? "row" : "column",
      alignItems: horizontal ? "center" : "flex-start",
      elevation: 2,
    }}
  >
    {children}
  </View>
);

const Item = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={labelStyle}>{label}</Text>
    <Text style={valueStyle}>{value}</Text>
  </View>
);

const mapStatus = (s: string) => {
  switch (s) {
    case "PENDING":
      return "Pendiente";
    case "IN_REVIEW":
      return "En Revisión";
    case "RESOLVED":
      return "Resuelto";
    case "REJECTED":
      return "Rechazado";
    default:
      return s;
  }
};

/* ----------------- STYLES ----------------- */

const header = {
  backgroundColor: "#16A34A",
  alignItems: "center" as const,
  paddingVertical: 32,
};

const successIcon = {
  width: 80,
  height: 80,
  marginBottom: 16,
};

const headerTitle = {
  color: "#FFFFFF",
  fontSize: 24,
  fontWeight: "700" as const,
};

const headerSubtitle = {
  color: "#E5E7EB",
  fontSize: 14,
  marginTop: 6,
  textAlign: "center" as const,
};

const content = {
  backgroundColor: "#E8EDFF",
  padding: 24,
};

const title = {
  fontSize: 18,
  fontWeight: "700" as const,
  marginBottom: 12,
};

const labelStyle = {
  color: "#475569",
  fontSize: 14,
};

const valueStyle = {
  color: "#0A1433",
  fontSize: 15,
};

const date = {
  marginTop: 8,
  fontSize: 13,
  color: "#64748B",
};

const label = {
  color: "#475569",
  fontSize: 14,
};

const value = {
  color: "#1E3A8A",
  fontSize: 20,
  fontWeight: "700" as const,
};

const hint = {
  color: "#64748B",
  fontSize: 13,
  marginTop: 4,
};

const mediaContainer = {
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  marginTop: 8,
};

const mediaImage = {
  width: 96,
  height: 96,
  borderRadius: 12,
  marginRight: 8,
  marginBottom: 8,
  backgroundColor: "#E5E7EB",
};

const statusIcon = {
  width: 32,
  height: 32,
  marginRight: 12,
};

const primaryBtn = {
  backgroundColor: "#1E3A8A",
  borderRadius: 16,
  paddingVertical: 16,
  alignItems: "center" as const,
  marginBottom: 12,
};

const primaryText = {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "600" as const,
};

const secondaryBtn = {
  backgroundColor: "#FFFFFF",
  borderRadius: 16,
  paddingVertical: 14,
  alignItems: "center" as const,
};

const secondaryText = {
  color: "#1E3A8A",
  fontSize: 16,
};

const secureBox = {
  backgroundColor: "#C7D2FE",
  borderRadius: 16,
  padding: 16,
  marginTop: 20,
};

const secureText = {
  textAlign: "center" as const,
  fontSize: 14,
};
