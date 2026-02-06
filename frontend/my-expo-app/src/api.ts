import { Platform } from 'react-native';
import Constants from 'expo-constants';

const FALLBACK = 'http://54.166.185.215:5000'; // ✅ Corregido: era 8000, ahora 5000
const REPORTS_BASE_URL = 'http://54.166.185.215:5000'; // ✅ Correcto

const getBaseUrl = () => {
  try {
    const extra = (Constants as any)?.manifest?.extra;
    if (extra && extra.API_BASE_URL) return extra.API_BASE_URL;
  } catch (e) {
    // ignore
  }
  if (process.env && process.env.EXPO_PUBLIC_API_BASE_URL) return process.env.EXPO_PUBLIC_API_BASE_URL;
  if (Platform.OS === 'android') return FALLBACK;
  return FALLBACK;
};

// ✅ EXPORTACIÓN que faltaba
export const API_REPORTS_URL = REPORTS_BASE_URL;

export async function chatQuery(message: string) {
  const url = `${REPORTS_BASE_URL}/api/chat/chat`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const json = await res.json();
    return json; // expected { respuesta: "..." }
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function uploadPDF(file: any, adminKey: string) {
  const url = `${REPORTS_BASE_URL}/api/chat/upload`;
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      type: 'application/pdf',
      name: file.name,
    } as any);
    console.log('FormData preparado, enviando a:', url);
    console.log('Con header x-admin-key:', adminKey);

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'x-admin-key': adminKey,
      },
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const json = await res.json();
    return json; // expected { document_id: "...", file_name: "...", mensaje: "..." }
  } catch (err) {
    console.log('Error en uploadPDF:', err);
    return { error: err instanceof Error ? err.message : String(err) };
  }
}