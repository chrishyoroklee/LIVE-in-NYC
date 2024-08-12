import { TouchableOpacity } from 'react-native';
import { useTheme } from '@emotion/react';
import Icon from '../icon/Icon';

type IconButtonProps = {
  name: string;
  size: number;
  color?: string;
  onPress?: () => void;
};

const IconButton = ({ name, size, color, onPress }: IconButtonProps) => {
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon
        name={name}
        size={size}
        color={color ?? theme.colors.button.primary}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
