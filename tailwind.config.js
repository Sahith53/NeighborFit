/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Primary Colors
        'primary': '#4A5D6B', // trustworthy-blue-gray
        'primary-foreground': '#FFFFFF', // white
        
        // Secondary Colors
        'secondary': '#7B8A8B', // complementary-mid-tone
        'secondary-foreground': '#FFFFFF', // white
        
        // Accent Colors
        'accent': '#E67E22', // warm-orange
        'accent-foreground': '#FFFFFF', // white
        
        // Background Colors
        'background': '#FAFBFC', // soft-off-white
        'surface': '#FFFFFF', // pure-white
        
        // Text Colors
        'text-primary': '#2C3E50', // deep-charcoal
        'text-secondary': '#7F8C8D', // muted-gray
        
        // Status Colors
        'success': '#27AE60', // natural-green
        'success-foreground': '#FFFFFF', // white
        
        'warning': '#F39C12', // balanced-amber
        'warning-foreground': '#FFFFFF', // white
        
        'error': '#E74C3C', // clear-red
        'error-foreground': '#FFFFFF', // white
        
        // Border Colors
        'border': '#E5E7EB', // light-gray
        'border-muted': '#F3F4F6', // very-light-gray
        
        // Muted Colors
        'muted': '#F8F9FA', // very-light-background
        'muted-foreground': '#6B7280', // medium-gray
        
        // Card Colors
        'card': '#FFFFFF', // white
        'card-foreground': '#2C3E50', // deep-charcoal
        
        // Popover Colors
        'popover': '#FFFFFF', // white
        'popover-foreground': '#2C3E50', // deep-charcoal
        
        // Input Colors
        'input': '#E5E7EB', // light-gray
        'ring': '#4A5D6B', // trustworthy-blue-gray
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'elevation-1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevation-2': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'elevation-3': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elevation-4': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'elevation-5': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in": "slide-in 0.3s ease-in-out",
        "slide-out": "slide-out 0.3s ease-in-out",
        "spring": "spring 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in": {
          from: { transform: "translateY(-10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        "slide-out": {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(-10px)", opacity: "0" },
        },
        "spring": {
          "0%": { transform: "scale(0.9)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      gap: {
        '0.5': '0.125rem',
        '1.5': '0.375rem',
        '2.5': '0.625rem',
        '3.5': '0.875rem',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}