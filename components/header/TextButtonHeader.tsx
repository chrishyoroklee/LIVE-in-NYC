import React from 'react';
import TextButton from '../button/TextButton';

type TextButtonHeaderProps = {
  text: string;
  onPress: () => void;
};

const TextButtonHeader = ({ text, onPress }: TextButtonHeaderProps) => (
  <TextButton variant="primary" size="small" onPress={onPress}>
    {text}
  </TextButton>
);

export default TextButtonHeader;
