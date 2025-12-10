// Element Themes Utility - CloudFront Integration
// This file provides utilities for using Element themes from CloudFront CDN
// Similar to how Bayer Sans fonts are loaded from CloudFront

// CloudFront base URL for Element themes
const ELEMENT_THEMES_CDN = 'https://cloudfront.885812045782.cloud.bayer.com/element-themes';

// Available theme names based on the CloudFront repository
// Complete list of all Element Design System themes
export const availableThemes = [
  // Core Bayer Themes
  'bayer',
  'bayer2_5',
  
  // Agricultural Brands - Seeds & Traits
  'asgrow',
  'dekalb', 
  'deltapine',
  'fontanelle',
  'goldcountry',
  'hubnerseed',
  'intacta',
  'jungseedgenetics',
  'kruger',
  'latijereta',
  'lewishybrids',
  'monsoy',
  'rea',
  'specialtyhybrids',
  'stewart',
  'stoneseed',
  'westbred',
  
  // Digital Platforms
  'velocity',
  'climatefieldview',
  'climatefieldviewcrate',
  'climateportal',
  'channel',
  'bayerplusrewards',
  'hortiview',
  'vegstate',
  'forground',
  
  // Healthcare & Pharmaceuticals
  'aspirincardio',
  'diane35',
  'eylea',
  'jivi',
  'kerendia',
  'kovaltry',
  'kyleena',
  'mirena',
  'nexavar',
  'nuqeba',
  'qlaira',
  'stivarga',
  'verquvo',
  'visanne',
  'vitrakvi',
  'xarelto',
  'xofigo',
  'yasmin',
  'yaz',
  
  // Data & Technology
  'dataenablement',
  'devtools',
  'dad',
  
  // Healthcare Professional (HCP)
  'hcp'
] as const;

export type ThemeName = typeof availableThemes[number];

// Color ramps available in Element themes
export const colorRamps = [
  'primary',
  'secondary', 
  'danger',
  'success'
] as const;

export type ColorRamp = typeof colorRamps[number];

// Color intensity levels (50-900)
export const colorLevels = [
  '50', '100', '200', '300', '400', '500', 
  '600', '700', '800', '900'
] as const;

export type ColorLevel = typeof colorLevels[number];

/**
 * Load a theme CSS file from CloudFront
 * @param theme - The theme name to load
 * @returns Promise that resolves when theme is loaded
 */
export async function loadThemeCSS(theme: ThemeName): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if theme is already loaded
    const existingLink = document.getElementById(`theme-${theme}`);
    if (existingLink) {
      resolve();
      return;
    }

    // Create link element for theme CSS
    const link = document.createElement('link');
    link.id = `theme-${theme}`;
    link.rel = 'stylesheet';
    link.href = `${ELEMENT_THEMES_CDN}/${theme}.theme.css`;
    
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load theme: ${theme}`));
    
    document.head.appendChild(link);
  });
}

/**
 * Switch to a specific theme by loading its CSS and updating CSS classes
 * @param theme - The theme name to switch to
 */
export async function switchTheme(theme: ThemeName): Promise<void> {
  try {
    // Load the theme CSS
    await loadThemeCSS(theme);
    
    // Remove existing theme classes
    availableThemes.forEach(t => {
      document.body.classList.remove(`theme-${t}`);
    });
    
    // Add new theme class
    document.body.classList.add(`theme-${theme}`);
    
    // Store theme preference
    localStorage.setItem('element-theme', theme);
    
    // Dispatch custom event for theme change
    window.dispatchEvent(new CustomEvent('elementThemeChanged', { 
      detail: { theme } 
    }));
  } catch (error) {
    console.error(`Error switching to theme ${theme}:`, error);
    throw error;
  }
}

/**
 * Get CSS variable value for a specific color
 * @param colorRamp - The color ramp (primary, secondary, etc.)
 * @param level - The color intensity level
 * @returns The CSS variable name
 */
export function getCSSVariable(colorRamp: ColorRamp, level: ColorLevel): string {
  return `var(--${colorRamp}-${level})`;
}

/**
 * Get computed color value from CSS variables
 * @param colorRamp - The color ramp
 * @param level - The color level
 * @returns The computed color value or undefined if not available
 */
export function getComputedThemeColor(colorRamp: ColorRamp, level: ColorLevel): string | undefined {
  if (typeof window === 'undefined') return undefined;
  
  const computed = getComputedStyle(document.documentElement).getPropertyValue(`--${colorRamp}-${level}`);
  return computed.trim() || undefined;
}

/**
 * Preload multiple themes for better performance
 * @param themes - Array of theme names to preload
 */
export async function preloadThemes(themes: ThemeName[]): Promise<void> {
  const loadPromises = themes.map(theme => loadThemeCSS(theme));
  await Promise.all(loadPromises);
}

/**
 * Initialize theme system with a default theme
 * @param defaultTheme - The default theme to load
 */
export async function initializeThemeSystem(defaultTheme: ThemeName = 'bayer'): Promise<void> {
  // Load stored theme preference or use default
  const storedTheme = (localStorage.getItem('element-theme') as ThemeName) || defaultTheme;
  
  // Validate stored theme
  const themeToUse = availableThemes.includes(storedTheme) ? storedTheme : defaultTheme;
  
  // Switch to the theme
  await switchTheme(themeToUse);
}

/**
 * Generate CSS import statements for all available themes
 * @returns CSS import statements string
 */
export function generateThemeImports(): string {
  return availableThemes
    .map(theme => `@import url('${ELEMENT_THEMES_CDN}/${theme}.theme.css');`)
    .join('\n');
}

/**
 * Theme utility factory for specific theme
 * @param theme - The theme name
 */
export function createThemeUtility(theme: ThemeName) {
  return {
    load: () => loadThemeCSS(theme),
    switch: () => switchTheme(theme),
    getColor: (colorRamp: ColorRamp, level: ColorLevel) => 
      getCSSVariable(colorRamp, level),
    getComputedColor: (colorRamp: ColorRamp, level: ColorLevel) => 
      getComputedThemeColor(colorRamp, level),
  };
}

// Pre-defined theme utilities for common themes
export const bayerTheme = createThemeUtility('bayer');
export const velocityTheme = createThemeUtility('velocity');
export const dekalBTheme = createThemeUtility('dekalb');
export const asgrowTheme = createThemeUtility('asgrow');

// Example usage patterns
export const examples = {
  // CSS variable usage (recommended)
  primaryButton: 'var(--primary-400)',
  secondaryText: 'var(--secondary-700)',
  
  // Tailwind classes with CSS variables
  tailwindPrimary: 'bg-[var(--primary-400)] text-white',
  tailwindSecondary: 'bg-[var(--secondary-100)] text-[var(--secondary-900)]',
  
  // Direct style usage
  inlineStyle: {
    backgroundColor: 'var(--primary-400)',
    color: 'var(--primary-50)',
    borderColor: 'var(--primary-600)'
  }
};

// Helper function to generate Tailwind-compatible color object
export function generateTailwindColors(): Record<string, Record<string, string>> {
  const colors: Record<string, Record<string, string>> = {};
  
  colorRamps.forEach(ramp => {
    colors[ramp] = {};
    colorLevels.forEach(level => {
      colors[ramp][level] = `var(--${ramp}-${level})`;
    });
  });
  
  return colors;
}
