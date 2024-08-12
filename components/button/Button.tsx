import React from 'react';
import { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';
import { Theme } from '@emotion/react';
import styled from '@emotion/native';

enum VARIANTS {
  'primary',
  'secondary',
  'tertiary',
  'system',
}

enum SIZES {
  'small',
  'medium',
  'large',
}

type ButtonProps = {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  fullWidth?: boolean;
  onPress?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  labelStyle?: StyleProp<TextStyle>;
} & TouchableOpacityProps;

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  onPress,
  startIcon,
  endIcon,
  labelStyle,
  ...rest
}: ButtonProps) => {
  return (
    <Root
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onPress={onPress}
      {...rest}>
      {startIcon}
      <Label variant={variant} size={size} style={labelStyle}>
        {children}
      </Label>
      {endIcon}
    </Root>
  );
};

const getRootStyleBySize = (size: string) => {
  switch (size) {
    case 'small':
      return { height: 40 };
    case 'medium':
      return { height: 50 };
    case 'large':
      return { height: 60 };
    default:
      return { height: 50 };
  }
};

const getRootStyleByVariant = (
  theme?: Theme,
  variant?: keyof typeof VARIANTS,
) => {
  switch (variant) {
    case 'primary':
      return { backgroundColor: theme?.colors.button.primary };
    case 'secondary':
      return { backgroundColor: theme?.colors.button.secondary };
    case 'tertiary':
      return { backgroundColor: theme?.colors.button.tertiary };
    case 'system':
      return { backgroundColor: theme?.colors.button.system };
    default:
      return { backgroundColor: theme?.colors.button.primary };
  }
};

type RootProps = {
  theme?: Theme;
  variant?: keyof typeof VARIANTS;
  size: string;
  fullWidth?: boolean;
  disabled?: boolean;
};
const Root = styled.TouchableOpacity(
  ({ theme, variant, size, fullWidth, disabled }: RootProps) => ({
    width: fullWidth ? '100%' : 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme?.spacing(4),
    paddingHorizontal: theme?.spacing(4),
    opacity: disabled ? 0.5 : 1,
    ...getRootStyleByVariant(theme, variant),
    ...getRootStyleBySize(size),
  }),
);

const getLabelStyleByVariant = (
  theme?: Theme,
  variant?: keyof typeof VARIANTS,
) => {
  switch (variant) {
    case 'primary':
      return { color: theme?.colors.text.white };
    case 'secondary':
      return { color: theme?.colors.text.primary };
    case 'tertiary':
      return { color: theme?.colors.text.primary };
    case 'system':
      return { color: theme?.colors.text.white };
    default:
      return { color: theme?.colors.text.white };
  }
};

const getLabelStyleBySize = (size: string) => {
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
  variant?: keyof typeof VARIANTS;
  size: string;
};
const Label = styled.Text(({ theme, variant, size }: LabelProps) => ({
  fontWeight: 500,
  ...getLabelStyleByVariant(theme, variant),
  ...getLabelStyleBySize(size),
}));

export default Button;
