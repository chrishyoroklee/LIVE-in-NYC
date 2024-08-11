import { ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { Theme, ThemeProvider } from '@emotion/react';

import { DARK_THEME, LIGHT_THEME } from '../constants/theme';

const themes: Record<string, Theme> = {
  light: LIGHT_THEME,
  dark: DARK_THEME,
};

type ThemesProviderProps = {
  children: ReactNode;
};

const ThemesProvider = ({ children }: ThemesProviderProps) => {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? themes.dark : themes.light;
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemesProvider;
