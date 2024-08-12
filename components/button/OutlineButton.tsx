import { StyleProp, TextStyle, TouchableOpacityProps } from 'react-native';
import styled from '@emotion/native';

type ButtonProps = {
  onPress?: () => void;
  labelProps?: StyleProp<TextStyle>;
} & TouchableOpacityProps;

const Button = ({ children, onPress, ...rest }: ButtonProps) => {
  return (
    <Root onPress={onPress} {...rest}>
      <Label>{children}</Label>
    </Root>
  );
};

const Root = styled.TouchableOpacity(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: 50,
  backgroundColor: theme?.colors.button.secondary,
  borderRadius: theme?.spacing(4),
  paddingHorizontal: theme?.spacing(4),
}));

const Label = styled.Text(({ theme }) => ({
  color: theme?.colors.buttonText.system,
  fontSize: 16,
  fontWeight: 400,
}));

export default Button;
