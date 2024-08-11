import '@emotion/react';
import { Theme } from '@emotion/react';

const SPACING_UNIT = 4;

// Extend the Theme interface to include your custom theme properties
declare module '@emotion/react' {
  export interface Theme {
    name: string;
    colors: {
      background: {
        screen: string;
        system: string;
        primary: string;
      };
      button: {
        primary: string;
        secondary: string;
        tertiary: string;
        disabled: string;
        system: string;
      };
      buttonText: {
        primary: string;
        secondary: string;
        link: string;
        system: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        white: string;
      };
      input: {
        primary: string;
        background: string;
        label: string;
        placeholder: string;
        value: string;
      };
      icon: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      list: {
        primary: string;
        secondary: string;
      };
      card: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      border: {
        primary: string;
      };
      navbar: {
        primary: string;
        transparent: string;
        active: string;
        inactive: string;
      };
      contrast: {
        primary: string;
      };
      shadow: {
        primary: string;
      };
    };
    spacing: (x: number) => number;
  }
}

const LIGHT_THEME: Theme = {
  name: 'light',
  colors: {
    background: {
      screen: '#FFFFFF',
      system: '#F2F2F7',
      primary: '#FFFFFF',
    },
    button: {
      primary: '#B00041',
      secondary: '#F0F0F0',
      tertiary: '#7676801F',
      disabled: 'rgba(0, 0, 0, 0.4)',
      system: '#0A84FF',
    },
    buttonText: {
      primary: '#B00041',
      secondary: '#FFFFFF',
      link: '#262626',
      system: '#0A84FF',
    },
    text: {
      primary: '#262626',
      secondary: '#666666',
      disabled: 'rgba(0, 0, 0, 0.40)',
      white: '#FFFFFF',
    },
    input: {
      primary: '#F0F0F0',
      background: '#FFFFFF',
      label: '#666666',
      placeholder: '#9D9D9D',
      value: '#262626',
    },
    icon: {
      primary: '#B00041',
      secondary: '#262626',
      tertiary: '#FFFFFF',
    },
    list: {
      primary: '#FFFFFF',
      secondary: '#F0F0F0',
    },
    card: {
      primary: '#B00041',
      secondary: '#E9E9EB',
      tertiary: '#FFFFFF',
    },
    border: {
      primary: '#C6C6C8',
    },
    navbar: {
      primary: '#FFFFFF',
      transparent: 'rgba(255, 255, 255, 0.88)',
      active: '#B00041',
      inactive: '#A4A4A4',
    },
    contrast: {
      primary: '#FFFFFF',
    },
    shadow: {
      primary: '#050505',
    },
  },
  spacing: (x: number): number => x * SPACING_UNIT,
};

const DARK_THEME: Theme = {
  name: 'dark',
  colors: {
    background: {
      screen: '#000000',
      system: '#000000',
      primary: '#1C1C1E',
    },
    button: {
      primary: '#B00041',
      secondary: '#2C2C2E',
      tertiary: '#7676803D',
      disabled: 'rgba(0, 0, 0, 0.4)',
      system: '#0A84FF',
    },
    buttonText: {
      primary: '#B00041',
      secondary: '#FFFFFF',
      link: '#FFFFFF',
      system: '#0A84FF',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#C0C0C0',
      disabled: 'rgba(0, 0, 0, 0.40)',
      white: '#FFFFFF',
    },
    input: {
      primary: '#2C2C2E',
      background: '#7676801F',
      label: '#AEAEAE',
      placeholder: '#878787',
      value: '#FFFFFF',
    },
    icon: {
      primary: '#B00041',
      secondary: '#FFFFFF',
      tertiary: '#FFFFFF',
    },
    list: {
      primary: '#1C1C1E',
      secondary: '#2C2C2E',
    },
    card: {
      primary: '#B00041',
      secondary: '#4A4A4A',
      tertiary: '#1C1C1E',
    },
    border: {
      primary: '#3D3C41',
    },
    navbar: {
      primary: '#000000',
      transparent: 'rgba(0,0,0,0.85)',
      active: '#B00041',
      inactive: '#A4A4A4',
    },
    contrast: {
      primary: '#FFFFFF',
    },
    shadow: {
      primary: '#050505',
    },
  },
  spacing: (x: number): number => x * SPACING_UNIT,
};

export { LIGHT_THEME, DARK_THEME };