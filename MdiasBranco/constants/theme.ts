/**
 * Theme colors for M. Dias Branco App
 * Minimalist color system
 */

import { Platform } from 'react-native';

// ============================================
// CORES PRINCIPAIS DA EMPRESA
// ============================================
const brandColors = {
  // Fundo principal
  background: '#03246b',      // Azul corporativo
  
  // Textos
  text: '#dce5e7',            // Branco para textos
  
  // Variações para hierarquia (baseadas nas cores principais)
  textLight: '#a8b9c4',       // Branco com opacidade para textos secundários
  textLighter: '#7a919f',     // Branco mais opaco para textos terciários
  
  // Superfícies (variações do azul para cards, inputs, etc)
  surface: '#0a2d7a',         // Azul um pouco mais claro para superfícies
  surfaceDark: '#011a4a',     // Azul mais escuro para contraste
  
  // Bordas (variações para manter harmonia)
  border: '#124192',          // Azul médio para bordas
  borderDark: '#0a2d7a',      // Azul mais escuro para bordas
  
  // Cores de status (mantendo a paleta minimalista)
  success: '#4ade80',         // Verde suave
  error: '#f87171',           // Vermelho suave
  warning: '#fbbf24',         // Amarelo suave
  info: '#60a5fa',            // Azul claro
};

// ============================================
// LIGHT MODE (único tema, sem variação)
// ============================================
export const Colors = {
  light: {
    // Brand
    background: brandColors.background,
    surface: brandColors.surface,
    surfaceDark: brandColors.surfaceDark,
    
    // Texts
    text: brandColors.text,
    textLight: brandColors.textLight,
    textLighter: brandColors.textLighter,
    textInverse: brandColors.background,
    
    // Borders
    border: brandColors.border,
    borderDark: brandColors.borderDark,
    
    // Status
    success: brandColors.success,
    error: brandColors.error,
    warning: brandColors.warning,
    info: brandColors.info,
    
    // Icons & Tab
    icon: brandColors.textLight,
    iconSelected: brandColors.text,
    tabIconDefault: brandColors.textLight,
    tabIconSelected: brandColors.text,
    tint: brandColors.text,
    
    // Primary (usando o azul como cor principal)
    primary: brandColors.text,
    secondary: brandColors.textLight,
  },
  // Dark mode igual ao light (pelo menos por enquanto)
  dark: {
    // Brand
    background: brandColors.background,
    surface: brandColors.surface,
    surfaceDark: brandColors.surfaceDark,
    
    // Texts
    text: brandColors.text,
    textLight: brandColors.textLight,
    textLighter: brandColors.textLighter,
    textInverse: brandColors.background,
    
    // Borders
    border: brandColors.border,
    borderDark: brandColors.borderDark,
    
    // Status
    success: brandColors.success,
    error: brandColors.error,
    warning: brandColors.warning,
    info: brandColors.info,
    
    // Icons & Tab
    icon: brandColors.textLight,
    iconSelected: brandColors.text,
    tabIconDefault: brandColors.textLight,
    tabIconSelected: brandColors.text,
    tint: brandColors.text,
    
    // Primary
    primary: brandColors.text,
    secondary: brandColors.textLight,
  },
};

// ============================================
// FONTES
// ============================================
export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
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
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
});

// ============================================
// ESPAÇAMENTOS
// ============================================
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// ============================================
// BORDAS
// ============================================
export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  round: 9999,
} as const;

// ============================================
// TIPOGRAFIA
// ============================================
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

// ============================================
// SOMBRAS
// ============================================
export const getShadows = (isDark: boolean) => ({
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
});

// ============================================
// EXPORT
// ============================================
export const theme = {
  Colors,
  Fonts,
  Spacing,
  BorderRadius,
  Typography,
  getShadows,
} as const;

// ============================================
// TYPES
// ============================================
export type Theme = typeof theme;
export type ColorsType = typeof Colors;
export type SpacingType = typeof Spacing;
export type BorderRadiusType = typeof BorderRadius;
export type TypographyType = typeof Typography;