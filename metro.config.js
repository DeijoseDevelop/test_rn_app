const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

const defaultConfig = mergeConfig(getDefaultConfig(__dirname), config);

// Solo exportamos una vez, envolviendo la configuración merged con Reanimated
module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
