// Changin requires to imports and getting __dirname from path module breaks the app
// I couldn't find a solution for this. Leaving this file as it is for now.

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './tailwind.css' });
