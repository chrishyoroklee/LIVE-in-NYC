import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function HeartCheckIcon() {
  return (
    <View style={{ position: 'relative', width: 24, height: 24 }}>
      <Ionicons name="heart-outline" size={24} color="black" />
      <Ionicons
        name="checkmark"
        size={12}
        color="black"
        style={{ position: 'absolute', right: -6, bottom: 0 }}
      />
    </View>
  );
}

export default HeartCheckIcon;