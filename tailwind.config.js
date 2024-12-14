/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Add background colors for buttons
    'bg-blue-500',
    'bg-blue-600',
    'hover:bg-blue-600',
    'bg-green-500',
    'bg-green-600',
    'hover:bg-green-600',
    'bg-purple-500',
    'bg-purple-600',
    'hover:bg-purple-600',
    // Add background colors for containers
    'bg-blue-50',
    'bg-green-50',
    'bg-purple-50',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 