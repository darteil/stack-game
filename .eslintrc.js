module.exports = {
  'extends': 'airbnb',
  'rules': {
    'react/forbid-prop-types': 0,
    'comma-dangle': ['error', 'never'],
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.common.js'
      }
    }
  }
};