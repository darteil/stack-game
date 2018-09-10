module.exports = {
  'extends': 'airbnb',
  "parser": "babel-eslint",
  'rules': {
    'react/forbid-prop-types': 0,
    'comma-dangle': ['error', 'never'],
    "max-len": 0,
    "jsx-a11y/aria-role": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/label-has-for": 0
  },
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.common.js'
      }
    }
  }
};
