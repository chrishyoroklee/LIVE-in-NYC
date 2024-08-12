import React from 'react';
import IconButton from '../button/IconButton';

type CloseButtonHeaderProps = {
  onPress: () => void;
};

const CloseButtonHeader = ({ onPress }: CloseButtonHeaderProps) => (
  <IconButton name="close" size={24} onPress={onPress} />
);

export default CloseButtonHeader;
