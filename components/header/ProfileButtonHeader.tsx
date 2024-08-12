import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '../icon/Icon';

type ProfileButtonHeaderProps = {
  onPress: () => void;
};

const ProfileButtonHeader = ({ onPress }: ProfileButtonHeaderProps) => (
  <TouchableOpacity onPress={onPress}>
    <Icon name="account-circle" size={32} color="#B00041" />
  </TouchableOpacity>
);

export default ProfileButtonHeader;
