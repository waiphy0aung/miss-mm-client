/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#c10077',
        'primary-content': '#ffdddd',
        secondary: '#f4f5f9',
        'secondary-content': '#d8eeff',
        accent: '#b23017',
        'accent-content': '#ffd2c9',
        neutral: '#2B3440',
        'neutral-content': '#D7DDE4',
        'base-100': '#ffffff',
        'base-200': '#F2F2F2',
        'base-300': '#E5E6E6',
        'base-content': '#1f2937',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    logs: false,
    themes: [
      {
        light: {
          'color-scheme': 'light',
          primary: '#c10077',
          'primary-content': '#ffdddd',
          secondary: '#f4f5f9',
          'secondary-content': '#d8eeff',
          accent: '#b23017',
          'accent-content': '#ffd2c9',
          neutral: '#2B3440',
          'neutral-content': '#D7DDE4',
          'base-100': '#ffffff',
          'base-200': '#F2F2F2',
          'base-300': '#E5E6E6',
          'base-content': '#1f2937',
        },
      },
    ],
  },
};
