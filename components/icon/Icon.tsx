import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type IconProps = {
  name: string;
  size: number;
  color: string;
  style?: any;
  type: 'MaterialIcons' | 'MaterialCommunityIcons';
};

const Icon = ({ name, size, color, style, type }: IconProps) => {
  const IconComponent = type === 'MaterialIcons' ? MaterialIcon : MaterialCommunityIcon;

  return <IconComponent name={name} size={size} color={color} style={style} />;
};

export default Icon;