import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import SVGIcon from '../icon/SVGIcon';

type SVGIconButtonProps = {
  name: string;
  onPress?: (event: GestureResponderEvent) => void;
  touchableProps?: React.ComponentProps<typeof TouchableOpacity>;
} & React.SVGProps<SVGSVGElement>;

const SVGIconButton = ({
  name,
  onPress,
  touchableProps,
  ...rest
}: SVGIconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} {...touchableProps}>
      <SVGIcon name={name} {...rest} />
    </TouchableOpacity>
  );
};

export default SVGIconButton;
