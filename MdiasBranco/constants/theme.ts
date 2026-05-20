/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 */

import { Platform } from 'react-native';

// Novas cores da marca
const tintColorLight = '#7B68EE';
const tintColorDark = '#7B68EE';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#FFFAF0', 
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,

    primary: '#7B68EE',            
    secondary: '#9B8AF5',          
    tertiary: '#5B4EC4',           
    surface: '#FFFFFF',            
    surfaceDark: '#F5F0E6',        
    border: '#E5E0D6',            
    borderDark: '#D4CFC5',
    error: '#DC3545',
    success: '#28A745',
    warning: '#FFC107',
    info: '#17A2B8',
    textLight: '#6C757D',
    textLighter: '#ADB5BD',
  },
  dark: {
    text: '#ECEDEE',
    background: '#1a1a2e',         
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,

    primary: '#7B68EE',
    secondary: '#9B8AF5',
    tertiary: '#5B4EC4',
    surface: '#2a2a3e',
    surfaceDark: '#1a1a2e',
    border: '#3a3a4e',
    borderDark: '#4a4a5e',
    error: '#FF453A',
    success: '#32D74B',
    warning: '#FF9F0A',
    info: '#0A84FF',
    textLight: '#8E8E93',
    textLighter: '#636366',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Espaçamentos padronizados (escala de 4px)
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Bordas padronizadas
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
} as const;

// Tipografia padronizada
export const Typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
    giant: 40,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
  },
} as const;

export const getShadows = (isDark: boolean) => ({
  sm: {
    shadowColor: isDark ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: isDark ? 0.3 : 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: isDark ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: isDark ? 0.4 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: isDark ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: isDark ? 0.5 : 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: isDark ? '#000000' : '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: isDark ? 0.6 : 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});

export const theme = {
  Colors,
  Fonts,
  Spacing,
  BorderRadius,
  Typography,
  getShadows,
} as const;

export type Theme = typeof theme;
export type ColorsType = typeof Colors;
export type SpacingType = typeof Spacing;
export type BorderRadiusType = typeof BorderRadius;
export type TypographyType = typeof Typography;