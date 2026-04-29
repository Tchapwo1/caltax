import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        text_primary: '#1A1F2C',
        text_secondary: '#64748B',
        background_primary: '#FFFFFF',
        background_surface: '#F8FAFC',
        net_profit: '#10B981',
        deduction: '#F59E0B',
        alert: '#EF4444',
        action: '#3B82F6',
        border_default: '#E2E8F0',
        border_active: '#3B82F6',
      },
      fontFamily: {
        base: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        space_0: '0px',
        space_1: '4px',
        space_2: '8px',
        space_3: '12px',
        space_4: '16px',
        space_5: '20px',
        space_6: '24px',
        space_8: '32px',
        space_10: '40px',
        space_12: '48px',
        space_16: '64px',
        space_20: '80px',
      },
      borderRadius: {
        none: '0px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
      },
      zIndex: {
        base: '0',
        dropdown: '10',
        sticky: '20',
        modal: '30',
        toast: '40',
        overlay: '50',
      },
      transitionDuration: {
        fast: '100ms',
        medium: '200ms',
        slow: '300ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
