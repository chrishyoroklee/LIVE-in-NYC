import React from 'react';
import TextButton from '../button/TextButton';
import Icon from '../icon/Icon';

type BackButtonHeaderProps = {
  text: string;
  onPress: () => void;
};

const BackButtonHeader = ({ text, onPress }: BackButtonHeaderProps) => (
  <TextButton
    variant="primary"
    size="small"
    onPress={onPress}
    startIcon={
      <Icon
        name="chevron-left"
        size={32}
        color="#B00041"
        style={{ fontSize: 32, marginRight: -8, marginLeft: -8 }}
      />
    }>
    {text}
  </TextButton>
);

export default BackButtonHeader;
