import React from 'react';
import { View, Image, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
  subtitle?: string;
  iconUri?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, iconUri }) => {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View
        style={{
          height: insets.top,
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          backgroundColor: '#1E3A8A',
        }}
      />
      <View className="flex-row items-center bg-blue-900 px-6 py-4 shadow-sm">
        {iconUri ? (
          <Image
            source={{ uri: iconUri }}
            className="mr-3 h-12 w-12 rounded-full"
            resizeMode="contain"
          />
        ) : null}
        <View className="flex-1">
          <Text className="text-xl font-semibold text-white">{title}</Text>
          {subtitle ? <Text className="text-xs text-white/90">{subtitle}</Text> : null}
        </View>
      </View>
    </View>
  );
};

export default Header;
