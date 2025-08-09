const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

let config = getDefaultConfig(path.resolve(__dirname));

config = withNativeWind(config, { input: './global.css' });

module.exports = { ...config };
