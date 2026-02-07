import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight-blue': '#0F172A',
        'electric-blue': '#2563EB',
        'emerald': '#10B981',
        'amber': '#F59E0B',
        'crimson': '#EF4444',
        'off-white': '#F8FAFC',
        'slate': '#CBD5E1',
      },
      borderRadius: {
        'custom': '14px',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
