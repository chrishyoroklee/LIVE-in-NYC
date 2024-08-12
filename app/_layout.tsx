import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import ThemesProvider from '@/contexts/ThemesProvider';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SCREENS } from '@/constants/routes';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const colorScheme = useColorScheme();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    return (
        <ThemesProvider>
            <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen 
                      name="index" 
                      options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                      name={SCREENS.HOME.name} 
                      options={{ headerShown: false }} 

                    />
                    <Stack.Screen 
                      name={SCREENS.SETTINGS.name}
                      options={{ headerShown: true }} 
                    />
                    <Stack.Screen 
                      name={SCREENS.FAVORITES.name}
                      options={{ headerShown: true }} 
                    />
                    <Stack.Screen 
                      name={SCREENS.SMALLS.name}
                      options={{ headerShown: true }} 
                    />
                </Stack>
            </NavigationThemeProvider>
        </ThemesProvider>
    );
}