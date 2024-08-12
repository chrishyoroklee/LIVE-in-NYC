import '@emotion/react';

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
