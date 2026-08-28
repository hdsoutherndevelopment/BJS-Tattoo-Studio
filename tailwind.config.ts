import type { Config } from 'tailwindcss';

/**
 * BJ's Tattoo Studio brand tokens.
 * Near-black grounds, off-white type, deep red used sparingly for action.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',
        char: '#181818',
        grey: '#252525',
        off: '#F2F0EA',
        red: { DEFAULT: '#8F1D1D', hot: '#B32626' },
        gold: '#B89B5E',
        line: 'rgba(242,240,234,0.13)'
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Arial Narrow', 'Impact', 'sans-serif'],
        cond: ['var(--font-cond)', 'Arial Narrow', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif']
      },
      maxWidth: { shell: '1680px' },
      transitionTimingFunction: {
        brand: 'cubic-bezier(.2,.7,.2,1)',
        out: 'cubic-bezier(.16,1,.3,1)'
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        pulse2: {
          '0%': { transform: 'translate(-50%,-50%) scale(.6)', opacity: '.9' },
          '100%': { transform: 'translate(-50%,-50%) scale(6)', opacity: '0' }
        }
      },
      animation: {
        marquee: 'marquee 34s linear infinite',
        pulse2: 'pulse2 2.6s cubic-bezier(.2,.7,.2,1) infinite'
      }
    }
  },
  plugins: []
};
export default config;
