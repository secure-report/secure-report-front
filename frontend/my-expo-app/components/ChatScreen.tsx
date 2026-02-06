import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar,
  Keyboard,
  KeyboardEvent,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Header from './Header';
import Markdown from 'react-native-markdown-display';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { chatQuery, uploadPDF } from '../src/api';
import { useAuth } from '../context/AuthContext';
import * as DocumentPicker from 'expo-document-picker';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const ChatScreen = () => {
  const insets = useSafeAreaInsets();
  const { isLoggedIn } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);

  const ADMIN_API_KEY = '550e8400-e29b-41d4-a716-446655440000';

  // Cargar saludo inicial cuando se monta el componente
  useEffect(() => {
    const loadInitialGreeting = async () => {
      if (!hasLoadedInitial) {
        // Envía un mensaje vacío para obtener el saludo del backend
        const res = await chatQuery('Hola');
        
        let greeting = 'Hola, soy ChatSeguro. ¿En qué puedo ayudarte?';
        if (res && !res.error && res.respuesta) {
          greeting = res.respuesta;
        }
        
        const greetingMessage: Message = {
          id: '0',
          text: greeting,
          isBot: true,
          timestamp: new Date().toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        
        setMessages([greetingMessage]);
        setHasLoadedInitial(true);
      }
    };
    
    loadInitialGreeting();
  }, []);

  const sendMessageWithText = async (messageText: string) => {
    if (messageText.trim() === '') return;

    const timestamp = new Date().toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Consumir API del backend
    const res = await chatQuery(messageText);

    let botText = '';
    
    if (res && !res.error) {
      botText = res.respuesta || 'No hay respuesta disponible.';
    } else {
      botText = `Error: ${res?.error || 'Error desconocido'}`;
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botText,
      isBot: true,
      timestamp: new Date().toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, botMessage]);
    setIsLoading(false);
  };

  const sendMessage = () => sendMessageWithText(inputText);

  const handleUploadPDF = async () => {
    try {
      setIsUploading(true);
      
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });

      if (result.type === 'success') {
        console.log('PDF seleccionado:', result.name);
        const res = await uploadPDF(result, ADMIN_API_KEY);

        if (res.error) {
          Alert.alert('Error', res.error);
        } else {
          Alert.alert('Éxito', `PDF cargado: ${res.file_name}`);
          // Agregar mensaje del bot confirmando
          const confirmMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: `Se cargó exitosamente el documento "${res.file_name}". Ahora puedo ayudarte con preguntas sobre su contenido.`,
            isBot: true,
            timestamp: new Date().toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          };
          setMessages((prev) => [...prev, confirmMessage]);
        }
      }
    } catch (error) {
      console.log('Error al seleccionar PDF:', error);
      Alert.alert('Error', 'Error al seleccionar PDF');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  useEffect(() => {
    const onShow = (e: KeyboardEvent) => {
      const h = e.endCoordinates ? e.endCoordinates.height : 250;
      setKeyboardHeight(h);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);
    };
    const onHide = () => {
      setKeyboardHeight(0);
      setIsInputFocused(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);
    };

    const subs: { remove: () => void }[] = [];
    subs.push(Keyboard.addListener('keyboardDidShow', onShow));
    subs.push(Keyboard.addListener('keyboardWillShow', onShow));
    subs.push(Keyboard.addListener('keyboardDidHide', onHide));
    subs.push(Keyboard.addListener('keyboardWillHide', onHide));

    return () => subs.forEach((s) => s.remove());
  }, []);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#1e3a8a" />
      <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white" keyboardVerticalOffset={0}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <Header
            title="Asistente Virtual"
            subtitle="Siempre disponible para ayudarte"
            iconUri="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/xOFdAXP108/6u90y110_expires_30_days.png"
          />

          {/* Upload Button - Solo para Protector */}
          {isLoggedIn && (
            <View className="border-b border-slate-200 bg-blue-50 px-4 py-3">
              <TouchableOpacity
                onPress={handleUploadPDF}
                disabled={isUploading}
                className="flex-row items-center justify-center rounded-lg bg-blue-900 py-2">
                {isUploading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <Text className="mr-2 text-lg">📄</Text>
                    <Text className="text-center font-semibold text-white">Cargar PDF</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            className="flex-1 px-4"
            style={{ backgroundColor: '#E8EDFF' }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            contentContainerStyle={{
              paddingVertical: 8,
              paddingBottom: isInputFocused
                ? Math.max(insets.bottom + keyboardHeight + 0, 0)
                : Math.max(insets.bottom + 0, 0),
            }}>
            {messages.map((message) => (
              <View key={message.id} className={`mb-4 ${message.isBot ? 'items-start' : 'items-end'}`}>
                <View
                  className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.isBot ? 'rounded-tl-sm bg-white' : 'rounded-tr-sm bg-blue-900'
                  }`}>
                  <Markdown
                    style={{
                      body: {
                        fontSize: 14,
                        lineHeight: 20,
                        color: message.isBot ? '#0f172a' : '#ffffff',
                      },
                      code_inline: {
                        backgroundColor: message.isBot ? '#f1f5f9' : '#0f172a',
                        padding: 4,
                        borderRadius: 4,
                      },
                      fence: {
                        backgroundColor: message.isBot ? '#f8fafc' : '#0f172a',
                        padding: 8,
                        borderRadius: 6,
                      },
                      link: {
                        color: '#1e40af',
                      },
                    }}>
                    {message.text}
                  </Markdown>
                </View>
                <Text className="mt-1 px-1 text-xs text-slate-400">{message.timestamp}</Text>
              </View>
            ))}
            {isLoading && (
              <View className="mb-4 items-start">
                <View className="rounded-2xl rounded-tl-sm bg-white px-4 py-3">
                  <Text className="text-slate-600">Escribiendo...</Text>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View className="flex-row items-center border-t border-slate-200 bg-white px-4 py-3">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escribe tu pregunta..."
              placeholderTextColor="#94a3b8"
              className="flex-1 rounded-full bg-slate-100 px-4 py-3 text-slate-800"
              onSubmitEditing={sendMessage}
              multiline
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={inputText.trim() === '' || isLoading}
              className={`ml-2 h-12 w-12 items-center justify-center rounded-full ${
                inputText.trim() === '' || isLoading ? 'bg-slate-300' : 'bg-blue-900'
              }`}>
              <Text className="text-xl text-white">⬆</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatScreen;