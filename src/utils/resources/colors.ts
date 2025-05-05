export const COLORS = {
  primary: {
    ['100']: '#9a9bdc',
    ['200']: '#6769ca',
    ['300']: '#3d3fb0',
    ['400']: '#2c2d7e',
    ['500']: '#1a1b4b',
    ['600']: '#10112f',
    ['10']: '#1A1B4B19',
    ['50']: '#1A1B4B7F',
  },
  secondary: {
    ['100']: '#bfaae1',
    ['200']: '#a080d2',
    ['300']: '#8055c4',
    ['400']: '#643aa5',
    ['500']: '#4a2b7b',
    ['600']: '#2b1947',
    ['10']: '#4A2B7B19',
    ['50']: '#4A2B7B7F',
  },
  accent: {
    ['100']: '#bffff3',
    ['200']: '#80ffe8',
    ['300']: '#40ffdc',
    ['400']: '#00ffd1',
    ['500']: '#00c6a2',
    ['600']: '#008c73',
    ['10']: '#00FFD119',
    ['50']: '#00FFD17F',
  },
  error: {
    ['100']: '#ffbec8',
    ['200']: '#ff7e91',
    ['300']: '#ff3d5a',
    ['400']: '#ff0329',
    ['500']: '#c8001e',
    ['600']: '#8e0015',
    ['10']: '#FF3D5A19',
    ['50']: '#FF3D5A7F',
  },
  warning: {
    ['100']: '#ffedbf',
    ['200']: '#ffdc80',
    ['300']: '#ffca40',
    ['400']: '#ffb800',
    ['500']: '#c68f00',
    ['600']: '#8c6500',
    ['10']: '#FFB80019',
    ['50']: '#FFB8007F',
  },
  success: {
    ['100']: '#b3ffec',
    ['200']: '#66ffd9',
    ['300']: '#1affc7',
    ['400']: '#00cc9a',
    ['500']: '#009f78',
    ['600']: '#007357',
    ['10']: '#00CC9A19',
    ['50']: '#00CC9A7F',
  },
  neutral: {
    ['100']: '#ffffff',
    ['200']: '#e8e8e8',
    ['300']: '#d2d2d2',
    ['400']: '#bbbbbb',
    ['500']: '#a4a4a4',
    ['600']: '#8e8e8e',
    ['700']: '#777777',
    ['800']: '#606060',
    ['900']: '#4a4a4a',
    ['1000']: '#333333',
    ['0']: '#000000',
    ['10']: '#33333319',
    ['50']: '#3333337F',
  },
};

export const THEME_COLORS = {
  background: '#0f0f1e', // Dark space-themed background
  card: '#1a1a2e', // Card backgrounds
  text: COLORS.neutral['100'], // Primary text color
  textSecondary: COLORS.neutral['500'], // Secondary text color
  textTertiary: COLORS.neutral['700'], // Tertiary text color
  border: 'transparent',
  black: COLORS.neutral['0'],

  // Brand colors
  primary: COLORS.primary['400'], // Primary brand color
  primaryLight: COLORS.primary['200'],
  primaryDark: COLORS.primary['500'],
  secondary: COLORS.secondary['300'], // Secondary brand color
  secondaryLight: COLORS.secondary['100'],
  secondaryDark: COLORS.secondary['500'],
  accent: COLORS.accent['400'], // Accent color for highlights
  accentLight: COLORS.accent['200'],
  accentDark: COLORS.accent['600'],

  // Status colors
  error: COLORS.error['400'],
  warning: COLORS.warning['400'],
  success: COLORS.success['400'],
  info: COLORS.primary['300'],

  // Component-specific colors
  button: {
    primary: {
      background: COLORS.primary['500'],
      text: COLORS.neutral['100'],
      border: 'transparent',
      shadow: COLORS.neutral['0'],
    },
    secondary: {
      background: COLORS.secondary['10'],
      text: COLORS.secondary['400'],
      border: COLORS.secondary['400'],
      shadow: COLORS.neutral['300'],
    },
    accent: {
      background: COLORS.accent['400'],
      text: COLORS.neutral['0'],
      border: 'transparent',
      shadow: COLORS.neutral['100'],
    },
    disabled: {
      background: COLORS.neutral['300'],
      text: COLORS.neutral['600'],
      border: 'transparent',
      shadow: COLORS.neutral['500'],
    },
  },

  // Status colors for launches
  launchStatus: {
    success: COLORS.success['400'],
    upcoming: COLORS.accent['400'],
    delayed: COLORS.warning['400'],
    failed: COLORS.error['400'],
    scrubbed: COLORS.error['400'],
  },

  // Card colors
  cardBackground: COLORS.primary['10'],
  cardBorder: COLORS.primary['50'],

  // Input colors
  input: {
    background: COLORS.neutral['10'],
    text: COLORS.neutral['100'],
    placeholder: COLORS.neutral['600'],
    border: COLORS.neutral['800'],
  },
};
