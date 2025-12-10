import { useState } from 'react';
import { useCloudFrontTheme, useThemeColors, useComputedThemeColor } from '../hooks/use-cloudfront-theme';
import type { ThemeName, ColorLevel } from '../lib/cloudfront-themes';

export function CloudFrontThemeDemo() {
  const { currentTheme, setTheme, availableThemes, isLoading } = useCloudFrontTheme();
  const colors = useThemeColors();
  const [selectedLevel, setSelectedLevel] = useState<ColorLevel>('400');
  const [themeLoading, setThemeLoading] = useState<string | null>(null);

  // Get computed colors for demonstration
  const primaryColor = useComputedThemeColor('primary', selectedLevel);
  const secondaryColor = useComputedThemeColor('secondary', selectedLevel);
  const dangerColor = useComputedThemeColor('danger', selectedLevel);
  const successColor = useComputedThemeColor('success', selectedLevel);

  const colorLevels: ColorLevel[] = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

  const handleThemeChange = async (theme: ThemeName) => {
    try {
      setThemeLoading(theme);
      await setTheme(theme);
    } catch (error) {
      console.error('Failed to load theme:', error);
    } finally {
      setThemeLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-lg border p-6">
        <h1 className="text-2xl font-bold mb-2">Element Themes - CloudFront Integration</h1>
        <p className="text-gray-600 mb-4">
          Themes loaded dynamically from CloudFront CDN, similar to Bayer Sans fonts
        </p>
        
        {/* Theme Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Theme:</label>
            <select 
              value={currentTheme}
              onChange={(e) => handleThemeChange(e.target.value as ThemeName)}
              disabled={!!themeLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {availableThemes.map((theme) => (
                <option key={theme} value={theme}>
                  {themeLoading === theme 
                    ? `${theme.charAt(0).toUpperCase() + theme.slice(1)} (Loading...)`
                    : theme.charAt(0).toUpperCase() + theme.slice(1)
                  }
                </option>
              ))}
            </select>
          </div>

          {/* Color Level Selector */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Color Level:</label>
            <select 
              value={selectedLevel} 
              onChange={(e) => setSelectedLevel(e.target.value as ColorLevel)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {colorLevels.map((level) => (
                <option key={level} value={level}>
                  {level} - {level === '400' ? 'Default' : level < '400' ? 'Lighter' : 'Darker'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* CDN Information */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">ð CloudFront Integration</h4>
          <p className="text-sm text-blue-700">
            Themes are loaded from: <code className="bg-blue-100 px-1 rounded">
              https://cloudfront.885812045782.cloud.bayer.com/element-themes/
            </code>
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Current CSS: <code className="bg-blue-100 px-1 rounded">
              {currentTheme}.theme.css
            </code>
          </p>
        </div>
      </div>

      {/* Color Palette Display */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-4">Color Palette - {currentTheme} Theme (Level {selectedLevel})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Primary Color */}
          <div className="space-y-2">
            <div 
              className="h-20 rounded border border-gray-300 flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: primaryColor || colors.primary(selectedLevel) }}
            >
              Primary
            </div>
            <div className="text-sm">
              <div className="font-medium">Primary {selectedLevel}</div>
              <div className="text-gray-600 font-mono text-xs">{primaryColor || 'Loading...'}</div>
              <div className="text-gray-500 font-mono text-xs">{colors.primary(selectedLevel)}</div>
            </div>
          </div>

          {/* Secondary Color */}
          <div className="space-y-2">
            <div 
              className="h-20 rounded border border-gray-300 flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: secondaryColor || colors.secondary(selectedLevel) }}
            >
              Secondary
            </div>
            <div className="text-sm">
              <div className="font-medium">Secondary {selectedLevel}</div>
              <div className="text-gray-600 font-mono text-xs">{secondaryColor || 'Loading...'}</div>
              <div className="text-gray-500 font-mono text-xs">{colors.secondary(selectedLevel)}</div>
            </div>
          </div>

          {/* Danger Color */}
          <div className="space-y-2">
            <div 
              className="h-20 rounded border border-gray-300 flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: dangerColor || colors.danger(selectedLevel) }}
            >
              Danger
            </div>
            <div className="text-sm">
              <div className="font-medium">Danger {selectedLevel}</div>
              <div className="text-gray-600 font-mono text-xs">{dangerColor || 'Loading...'}</div>
              <div className="text-gray-500 font-mono text-xs">{colors.danger(selectedLevel)}</div>
            </div>
          </div>

          {/* Success Color */}
          <div className="space-y-2">
            <div 
              className="h-20 rounded border border-gray-300 flex items-center justify-center text-white font-medium"
              style={{ backgroundColor: successColor || colors.success(selectedLevel) }}
            >
              Success
            </div>
            <div className="text-sm">
              <div className="font-medium">Success {selectedLevel}</div>
              <div className="text-gray-600 font-mono text-xs">{successColor || 'Loading...'}</div>
              <div className="text-gray-500 font-mono text-xs">{colors.success(selectedLevel)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Component Examples */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-4">Component Examples with CloudFront Themes</h2>
        
        {/* Buttons */}
        <div className="space-y-3">
          <h4 className="font-medium">Buttons using CSS Variables</h4>
          <div className="flex gap-3 flex-wrap">
            <button 
              className="px-4 py-2 rounded font-medium text-white border-0"
              style={{ 
                backgroundColor: colors.primary('400'),
                color: colors.primary('50')
              }}
            >
              Primary Button
            </button>
            <button 
              className="px-4 py-2 rounded font-medium border"
              style={{ 
                borderColor: colors.secondary('400'),
                color: colors.secondary('700'),
                backgroundColor: colors.secondary('50')
              }}
            >
              Secondary Button
            </button>
            <button 
              className="px-4 py-2 rounded font-medium text-white"
              style={{ 
                backgroundColor: colors.danger('400'),
                color: colors.danger('50')
              }}
            >
              Danger Button
            </button>
            <button 
              className="px-4 py-2 rounded font-medium text-white"
              style={{ 
                backgroundColor: colors.success('400'),
                color: colors.success('50')
              }}
            >
              Success Button
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="space-y-3 mt-6">
          <h4 className="font-medium">Badges with Theme Colors</h4>
          <div className="flex gap-3 flex-wrap">
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{ 
                backgroundColor: colors.primary('100'), 
                color: colors.primary('800'),
                border: `1px solid ${colors.primary('300')}`
              }}
            >
              Primary Badge
            </span>
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{ 
                backgroundColor: colors.secondary('100'), 
                color: colors.secondary('800'),
                border: `1px solid ${colors.secondary('300')}`
              }}
            >
              Secondary Badge  
            </span>
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{ 
                backgroundColor: colors.danger('100'), 
                color: colors.danger('800'),
                border: `1px solid ${colors.danger('300')}`
              }}
            >
              Danger Badge
            </span>
            <span 
              className="px-2 py-1 rounded text-xs font-medium"
              style={{ 
                backgroundColor: colors.success('100'), 
                color: colors.success('800'),
                border: `1px solid ${colors.success('300')}`
              }}
            >
              Success Badge
            </span>
          </div>
        </div>

        {/* CSS Variables Demo */}
        <div className="space-y-3 mt-6">
          <h4 className="font-medium">CSS Variables (Auto-updating)</h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-mono bg-gray-100 p-3 rounded">
                <div>background: var(--primary-400)</div>
                <div>color: var(--primary-50)</div>
                <div>border: 2px solid var(--primary-600)</div>
              </div>
            </div>
            <div 
              className="p-4 rounded border-2"
              style={{
                backgroundColor: colors.primary('50'),
                border: `2px solid ${colors.primary('400')}`,
                color: colors.primary('800')
              }}
            >
              This box updates automatically with theme changes! Switch themes to see the magic happen.
            </div>
          </div>
        </div>
      </div>

      {/* Complete Color Ramps */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-bold mb-2">Complete Color Ramps - {currentTheme}</h2>
        <p className="text-sm text-gray-600 mb-6">All color levels from CloudFront theme CSS</p>
        
        {(['primary', 'secondary', 'danger', 'success'] as const).map((ramp) => (
          <div key={ramp} className="mb-8">
            <h4 className="font-medium mb-3 capitalize text-lg">{ramp} Colors</h4>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {colorLevels.map((level) => {
                const color = colors[ramp](level);
                return (
                  <div key={level} className="text-center">
                    <div 
                      className="h-16 w-full rounded border border-gray-200 mb-2 flex items-center justify-center text-xs font-medium text-white"
                      style={{ backgroundColor: color }}
                    >
                      {level}
                    </div>
                    <div className="text-xs font-mono text-gray-600 break-all">
                      {color}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
