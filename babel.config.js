module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '~app': ['./src/app'],
          '~assets': ['./src/assets/'],
          '~components': './src/components',
          '~common': './src/components/common',
          '~config': './src/config/config',
          '~constants': './src/constants',
          '~navigations': './src/navigations',
          '~screens': './src/screens',
          '~services': './src/services',
          '~styles': './src/styles',
          '~translation': './src/translation',
          '~utils': './src/utils',
          '~src': './src/',
        },
      },
    ],
  ],
};
