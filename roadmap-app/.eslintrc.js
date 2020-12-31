module.exports = {
  extends: [
    'react-app',
    'plugin:react/recommended',
    'plugin:redux-saga/recommended',
    'prettier',
  ],
  plugins: ['redux-saga', 'prettier'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': [2, 'always-multiline'],
    'jsx-quotes': [
      1,
      'prefer-double',
    ],
    'no-mixed-operators': 'error',
    'no-labels': 0,
    'no-continue': 2,
    'no-restricted-imports': [
      'error',
      {
        paths: ['@material-ui/icons'],
        patterns: [
          '@material-ui/core/*',
          '@material-ui/lab/*',
          '!@material-ui/core/styles',
        ],
      },
    ],
    'no-confusing-arrow': 0,
    'no-use-before-define': 0,
    'object-curly-newline': ['error', { consistent: true }],
    'prefer-template': 2,
    'quotes': ['error', 'single'],
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-anonymous-default-export': [2, {allowObject: true, allowArray: true, allowArrowFunction: true}],
    // 'import/no-unresolved': 2,
    'import/extensions': 0,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    'import/no-duplicates': 2,
    'import/no-relative-parent-imports': 0,
    'newline-per-chained-call': 0,
    'react/jsx-curly-spacing': [
      'error',
      { when: 'never', children: true },
    ],
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/static-property-placement': 2,
    'react/state-in-constructor': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-filename-extension': 0,
    'react/display-name': [
      0,
      {
        'ignoreTranspilerName': true,
      },
    ],
    'react/jsx-curly-newline': 0,
    'react/jsx-no-target-blank': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 1,
    'react/sort-comp': 1,
    'react/jsx-fragments': 0,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'redux-saga/no-unhandled-errors': 0,
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 0,
    'require-yield': 0,
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
};
