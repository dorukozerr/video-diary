import nativewindPresets from 'nativewind/preset';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [nativewindPresets],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        }
      }
    }
  },
  plugins: []
};

export default tailwindConfig;
