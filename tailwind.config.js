import nativewindPresets from 'nativewind/preset';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [nativewindPresets],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig;
