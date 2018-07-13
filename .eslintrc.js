module.exports = {
  'extends': 'airbnb',
  'rules': {
    'react/forbid-prop-types': 0,
    'comma-dangle': ['error', 'never'],
    "max-len": 0
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.common.js'
      }
    }
  }
};