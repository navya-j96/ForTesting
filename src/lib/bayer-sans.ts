// Font utilities for Bayer Sans font system
// Maps semantic font weights to Bayer Sans specific weights

export const bayerSansFontWeights = {
  thin: 'font-thin', // 100 - Bayer Sans Thin
  extralight: 'font-extralight', // 200 - Bayer Sans ExtraLight  
  light: 'font-light', // 300 - Bayer Sans Light
  normal: 'font-normal', // 400 - Bayer Sans Regular
  medium: 'font-medium', // 500 - Bayer Sans Medium
  semibold: 'font-semibold', // 600 - Falls back to Medium
  bold: 'font-bold', // 700 - Bayer Sans Bold
  extrabold: 'font-extrabold', // 800 - Bayer Sans Heavy
  black: 'font-black', // 900 - Bayer Sans Black
} as const;

export const bayerSansClasses = {
  // Basic font family
  fontFamily: 'font-bayer-sans',
  
  // Font weights with Tailwind classes
  weights: bayerSansFontWeights,
  
  // Combined classes for common use cases
  heading: {
    h1: 'font-bayer-sans font-black text-4xl lg:text-6xl',
    h2: 'font-bayer-sans font-bold text-3xl lg:text-5xl',
    h3: 'font-bayer-sans font-bold text-2xl lg:text-4xl',
    h4: 'font-bayer-sans font-semibold text-xl lg:text-3xl',
    h5: 'font-bayer-sans font-medium text-lg lg:text-2xl',
    h6: 'font-bayer-sans font-medium text-base lg:text-xl',
  },
  
  body: {
    large: 'font-bayer-sans font-normal text-lg',
    base: 'font-bayer-sans font-normal text-base',
    small: 'font-bayer-sans font-normal text-sm',
    xs: 'font-bayer-sans font-normal text-xs',
  },
  
  button: {
    primary: 'font-bayer-sans font-semibold',
    secondary: 'font-bayer-sans font-medium',
    ghost: 'font-bayer-sans font-normal',
  },
  
  caption: 'font-bayer-sans font-light text-sm text-gray-600',
  overline: 'font-bayer-sans font-medium text-xs uppercase tracking-wider',
} as const;

// Utility function to combine Bayer Sans font classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Helper function to get Bayer Sans font class with weight
export function getBayerSansClass(weight: keyof typeof bayerSansFontWeights = 'normal'): string {
  return cn('font-bayer-sans', bayerSansFontWeights[weight]);
}
