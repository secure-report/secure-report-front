import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Resolve API base URL in this order:
// 1. Expo Constants manifest extra (`app.json` extra) -> Constants.manifest.extra.API_BASE_URL
// 2. process.env.API_BASE_URL (if you use a babel env plugin)
// 3. Hardcoded fallback (local IP you provided)
const FALLBACK = 'http://192.168.18.18:8000';
const getBaseUrl = () => {
  try {
    // Expo managed: use Constants.manifest.extra if available
    const extra = (Constants as any)?.manifest?.extra;
    if (extra && extra.API_BASE_URL) return extra.API_BASE_URL;
  } catch (e) {
    // ignore
  }
  if (process.env && process.env.EXPO_PUBLIC_API_BASE_URL) return process.env.EXPO_PUBLIC_API_BASE_URL;
  // Android emulator special mapping handled previously if needed
  if (Platform.OS === 'android') return FALLBACK;
  return FALLBACK;
};

export async function chatQuery(user_id: string, document_id: string, message: string) {
  const url = `${getBaseUrl()}/chat`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, document_id, message }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    const json = await res.json();
    return json; // expected { answer: "..." }
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}
