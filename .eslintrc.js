module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react-hooks'], // https://reactjs.org/docs/hooks-rules.html
  rules: {
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
  },
};
