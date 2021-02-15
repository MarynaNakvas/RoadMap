module.exports = {
  extends: [
    'stylelint-config-htmlacademy',
    'stylelint-config-rational-order',
  ],
  rules: {
    'font-family-no-missing-generic-family-keyword': true,
    'string-quotes': 'single',
    'number-leading-zero': null,
    'property-case': null,
    'no-empty-source': null,
    'property-no-vendor-prefix': true,
    indentation: 'tab',
    indentation: 2,
    'plugin/rational-order': [
      true,
      {
        'border-in-box-model': false,
        'empty-line-between-groups': false,
      },
    ],
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'for',
          'mixin',
          'define-mixin',
          'include',
          'content',
          'rules',
          'each',
          'extend',
          'function',
          'return',
        ],
      },
    ],
    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'composes',
          'compose-with',
          'font-smoothing',
        ],
        ignoreSelectors: [':export', /^:import/],
      },
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: [
          'export',
          'import',
          'global',
          'local',
          'external',
          'horizontal',
        ],
      },
    ],
    'unit-whitelist': [
      'em',
      'rem',
      's',
      'px',
      '%',
      'deg',
      'fr',
      'vw',
      'vh',
      'ms',
    ],
  },
};
