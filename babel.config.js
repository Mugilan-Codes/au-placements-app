module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel', 'transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./App'],
        extensions: ['.ios.js', '.android.js', '.js', '.json'],
      },
    ],
  ],
};
