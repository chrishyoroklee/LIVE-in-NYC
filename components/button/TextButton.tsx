import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { Theme } from '@emotion/react';
import styled from '@emotion/native';

enum VARIANTS {
  'primary',
  'secondary',
  'link',
}

enum SIZES {
  'small',
  'medium',
  'large',
}

type TextButtonProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  onPress?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
} & TouchableOpacityProps;

const TextButton = ({
  variant = 'primary',
  size = 'medium',
  children,
  onPress,
  startIcon,
  endIcon,
  ...rest
}: TextButtonProps) => {
  return (
    <Root onPress={onPress} {...rest}>
      {startIcon}
      <Label variant={variant} size={size}>
        {children}
      </Label>
      {endIcon}
    </Root>
  );
};

const Root = styled.TouchableOpacity(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));

const getLabelStylesByVariant = (
  theme?: Theme,
  variant?: keyof typeof VARIANTS,
) => {
  switch (variant) {
    case 'primary':
      return {
        color: theme?.colors.buttonText.primary,
      };
    case 'secondary':
      return {
        color: theme?.colors.buttonText.secondary,
      };
    case 'link':
      return {
        color: theme?.colors.buttonText.link,
      };
    default:
      return {
        color: theme?.colors.buttonText.primary,
      };
  }
};

const getLabelStylesBySize = (size: string) => {
  switch (size) {
    case 'small':
      return { fontSize: 16, lineHeight: 22 };
    case 'medium':
      return { fontSize: 18, lineHeight: 24 };
    case 'large':
      return { fontSize: 20, lineHeight: 26 };
    default:
      return { fontSize: 18, lineHeight: 24 };
  }
};

type LabelProps = {
  theme?: Theme;
  variant: keyof typeof VARIANTS;
  size: string;
};
const Label = styled.Text(({ theme, variant, size }: LabelProps) => ({
  fontWeight: '400',
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  textDecorationLine: variant === 'link' ? 'underline' : 'none',
  ...getLabelStylesByVariant(theme, variant),
  ...getLabelStylesBySize(size),
}));

export default TextButton;
