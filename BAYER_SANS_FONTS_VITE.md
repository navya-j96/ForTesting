# Bayer Sans Font System Integration - Vite + React + TypeScript

This Vite + React + TypeScript project has been updated to use the complete Bayer Sans font family from Bayer's CloudFront CDN instead of the default system fonts.

## Font Files Loaded

The following Bayer Sans font files are loaded from `https://cloudfront.885812045782.cloud.bayer.com/BayerSans/`:

| Font File | Weight | Style | Tailwind Class |
|-----------|---------|-------|----------------|
| BayerSansWeb-Thin.woff2 | 100 | normal | `font-thin` |
| BayerSansWeb-ThinItalic.woff2 | 100 | italic | `font-thin italic` |
| BayerSansWeb-ExtraLight.woff2 | 200 | normal | `font-extralight` |
| BayerSansWeb-ExtraLightItalic.woff2 | 200 | italic | `font-extralight italic` |
| BayerSansWeb-Light.woff2 | 300 | normal | `font-light` |
| BayerSansWeb-LightItalic.woff2 | 300 | italic | `font-light italic` |
| BayerSansWeb-Regular.woff2 | 400 | normal | `font-normal` |
| BayerSansWeb-Italic.woff2 | 400 | italic | `font-normal italic` |
| BayerSansWeb-Medium.woff2 | 500 | normal | `font-medium` |
| BayerSansWeb-MediumItalic.woff2 | 500 | italic | `font-medium italic` |
| BayerSansWeb-Bold.woff2 | 700 | normal | `font-bold` |
| BayerSansWeb-BoldItalic.woff2 | 700 | italic | `font-bold italic` |
| BayerSansWeb-Heavy.woff2 | 800 | normal | `font-extrabold` |
| BayerSansWeb-HeavyItalic.woff2 | 800 | italic | `font-extrabold italic` |
| BayerSansWeb-Black.woff2 | 900 | normal | `font-black` |
| BayerSansWeb-BlackItalic.woff2 | 900 | italic | `font-black italic` |

## Implementation Details

### 1. Font Definitions (src/index.css)
All font faces are defined using `@font-face` declarations with:
- `font-display: swap` for better loading performance
- Proper font-weight mapping to CSS values
- WOFF2 format for optimal file size and browser support
- Global body font-family set to Bayer Sans with fallbacks

### 2. Tailwind Configuration (tailwind.config.js)
- Default `sans` font family updated to use Bayer Sans first
- Additional `bayer-sans` font family alias available
- Fallback fonts: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif

### 3. Utility Library (src/lib/bayer-sans.ts)
Created a comprehensive utility library with:
- Semantic font weight mappings
- Pre-defined classes for common use cases (headings, body text, buttons)
- Helper functions for easy font class generation

### 4. Main Application (src/App.tsx)
- Updated to showcase all Bayer Sans font variants
- Demonstrates proper usage patterns
- Interactive examples with different weights and styles

## Usage Examples

### Basic Font Classes
```jsx
<h1 className="font-black">Heading with Bayer Sans Black</h1>
<p className="font-normal">Body text with Bayer Sans Regular</p>
<span className="font-light italic">Light italic text</span>
```

### Using the Utility Library
```tsx
import { bayerSansClasses, getBayerSansClass } from './lib/bayer-sans';

// Pre-defined heading classes
<h1 className={bayerSansClasses.heading.h1}>Main Heading</h1>
<h2 className={bayerSansClasses.heading.h2}>Section Heading</h2>

// Pre-defined body classes
<p className={bayerSansClasses.body.base}>Regular paragraph</p>
<small className={bayerSansClasses.body.small}>Small text</small>

// Button classes
<button className={bayerSansClasses.button.primary}>Primary Button</button>

// Using helper function
<div className={getBayerSansClass('bold')}>Bold text</div>
```

### Available Tailwind Classes
Since Bayer Sans is set as the default sans-serif font, you can use standard Tailwind font classes:

- `font-thin` (100) - Bayer Sans Thin
- `font-extralight` (200) - Bayer Sans ExtraLight
- `font-light` (300) - Bayer Sans Light
- `font-normal` (400) - Bayer Sans Regular
- `font-medium` (500) - Bayer Sans Medium  
- `font-semibold` (600) - Falls back to Medium (500)
- `font-bold` (700) - Bayer Sans Bold
- `font-extrabold` (800) - Bayer Sans Heavy
- `font-black` (900) - Bayer Sans Black

## Technology Stack

- â¡ **Vite** - Fast build tool and development server
- âï¸ **React 18** - Modern React with hooks
- ð· **TypeScript** - Type-safe JavaScript
- ð¨ **Tailwind CSS** - Utility-first CSS framework
- ð¤ **Bayer Sans** - Complete font system from Bayer CDN

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Performance Considerations

1. **Font Loading**: Uses `font-display: swap` for better perceived performance
2. **WOFF2 Format**: Optimal compression and broad browser support
3. **CDN Delivery**: Fonts served from Bayer's CloudFront CDN for fast global delivery
4. **Fallback Fonts**: Comprehensive fallback stack ensures text remains readable during font loading
5. **Vite Optimization**: Fast HMR and optimized builds

## Browser Support

Bayer Sans fonts will work in all modern browsers that support WOFF2:
- Chrome 36+
- Firefox 39+
- Safari 12+
- Edge 14+

Older browsers will fall back to the system font stack defined in the configuration.

## File Structure

```
src/
âââ lib/
â   âââ bayer-sans.ts      # Font utility library
âââ App.tsx                # Main application component
âââ index.css              # Global styles with font definitions
âââ main.tsx               # React entry point
âââ vite-env.d.ts         # Vite type definitions

tailwind.config.js         # Tailwind configuration with Bayer Sans
vite.config.ts             # Vite configuration
```

## Customization

To modify font behavior, update the relevant files:
- **Font definitions**: `src/index.css`
- **Tailwind config**: `tailwind.config.js` 
- **Utility classes**: `src/lib/bayer-sans.ts`
- **Component usage**: `src/App.tsx`
