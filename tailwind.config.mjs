/**
 * PetExpert — "Warm Professionalism" design tokens.
 * @type {import('tailwindcss').Config}
 */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx,vue,svelte}'],
  theme: {
    extend: {
      colors: {
        // Surfaces & ink (warm tonal ramp)
        'warm-sand': '#fff8f5', // page background (base surface)
        'surface-lowest': '#ffffff', // cards / raised surfaces
        'surface-container': '#f7efe9', // subtle filled controls
        'surface-container-high': '#f0e5dd', // hover state for filled controls
        charcoal: '#1e1b18', // primary text
        // Brand
        primary: '#334f2b', // Forest Green — logo & accents
        'primary-soft': '#e9f1e4', // green tint for gradients / chips
        terracotta: '#822a19', // active state / highlight / CTA
        // Lines
        outline: '#d9cabf', // standard hairline
        'outline-variant': '#cabaad', // dashed / decorative borders
      },
      fontFamily: {
        // Logo & editorial accents
        serif: ['"Source Serif 4"', 'ui-serif', 'Georgia', 'serif'],
        // Navigation & UI
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // [size, { letterSpacing, fontWeight, lineHeight }]
        'label-bold': ['14px', { letterSpacing: '0.05em', fontWeight: '700', lineHeight: '1' }],
        'label-sm': ['12px', { letterSpacing: '0.03em', fontWeight: '500', lineHeight: '1.5' }],
        'display-lg': ['3.75rem', { letterSpacing: '-0.02em', fontWeight: '700', lineHeight: '1.05' }], // 60px hero display
      },
    },
  },
  plugins: [],
};
