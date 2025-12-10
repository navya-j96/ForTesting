import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  type ThemeName, 
  type ColorRamp, 
  type ColorLevel,
  availableThemes,
  switchTheme,
  initializeThemeSystem,
  getCSSVariable,
  getComputedThemeColor
} from '../lib/cloudfront-themes';

interface CloudFrontThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => Promise<void>;
  isLoading: boolean;
  getColor: (colorRamp: ColorRamp, level: ColorLevel) => string;
  getComputedColor: (colorRamp: ColorRamp, level: ColorLevel) => string | undefined;
  availableThemes: readonly ThemeName[];
}

const CloudFrontThemeContext = createContext<CloudFrontThemeContextType | undefined>(undefined);

interface CloudFrontThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export function CloudFrontThemeProvider({ 
  children, 
  defaultTheme = 'bayer' as ThemeName
}: CloudFrontThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(defaultTheme);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize theme system on mount
  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        await initializeThemeSystem(defaultTheme);
        
        // Get the actual theme that was loaded (might be different from default if stored theme exists)
        const storedTheme = localStorage.getItem('element-theme') as ThemeName;
        if (storedTheme && availableThemes.includes(storedTheme)) {
          setCurrentTheme(storedTheme);
        }
      } catch (error) {
        console.error('Failed to initialize theme system:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, [defaultTheme]);

  // Listen for theme changes from other components
  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setCurrentTheme(event.detail.theme);
    };

    window.addEventListener('elementThemeChanged', handleThemeChange as EventListener);
    return () => {
      window.removeEventListener('elementThemeChanged', handleThemeChange as EventListener);
    };
  }, []);

  const handleSetTheme = useCallback(async (theme: ThemeName) => {
    try {
      setIsLoading(true);
      await switchTheme(theme);
      setCurrentTheme(theme);
    } catch (error) {
      console.error(`Failed to switch to theme ${theme}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getColor = useCallback((colorRamp: ColorRamp, level: ColorLevel) => {
    return getCSSVariable(colorRamp, level);
  }, []);

  const getComputedColor = useCallback((colorRamp: ColorRamp, level: ColorLevel) => {
    return getComputedThemeColor(colorRamp, level);
  }, []);

  const contextValue: CloudFrontThemeContextType = {
    currentTheme,
    setTheme: handleSetTheme,
    isLoading,
    getColor,
    getComputedColor,
    availableThemes,
  };

  return (
    <CloudFrontThemeContext.Provider value={contextValue}>
      {children}
    </CloudFrontThemeContext.Provider>
  );
}

export function useCloudFrontTheme() {
  const context = useContext(CloudFrontThemeContext);
  if (context === undefined) {
    throw new Error('useCloudFrontTheme must be used within a CloudFrontThemeProvider');
  }
  return context;
}

// Convenience hooks for specific use cases
export function useThemeColor(colorRamp: ColorRamp, level: ColorLevel) {
  const { getColor } = useCloudFrontTheme();
  return getColor(colorRamp, level);
}

export function useComputedThemeColor(colorRamp: ColorRamp, level: ColorLevel) {
  const { getComputedColor } = useCloudFrontTheme();
  const [color, setColor] = useState<string | undefined>();

  useEffect(() => {
    const updateColor = () => {
      setColor(getComputedColor(colorRamp, level));
    };

    // Update immediately
    updateColor();

    // Update when theme changes
    window.addEventListener('elementThemeChanged', updateColor);
    return () => {
      window.removeEventListener('elementThemeChanged', updateColor);
    };
  }, [getComputedColor, colorRamp, level]);

  return color;
}

export function useThemeColors() {
  const { getColor } = useCloudFrontTheme();
  
  return {
    primary: (level: ColorLevel) => getColor('primary', level),
    secondary: (level: ColorLevel) => getColor('secondary', level),
    danger: (level: ColorLevel) => getColor('danger', level),
    success: (level: ColorLevel) => getColor('success', level),
  };
}

export function useThemeLoader() {
  const { setTheme, isLoading } = useCloudFrontTheme();
  
  return {
    loadTheme: setTheme,
    isLoading
  };
}
