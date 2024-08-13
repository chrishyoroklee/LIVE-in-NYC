import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@emotion/react';

function HeartCheckIcon() {
  const theme = useTheme();

  return (
    <View style={{ position: 'relative', width: 24, height: 24 }}>
      <Ionicons name="heart-outline" size={24} color={theme.colors.text.primary} />
      <Ionicons
        name="checkmark"
        size={12}
        color={theme.colors.text.primary}
        style={{ position: 'absolute', right: -6, bottom: 0 }}
      />
    </View>
  );
}

export default HeartCheckIcon;