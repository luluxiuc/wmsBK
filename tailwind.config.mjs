/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 宇宙蓝主色调
        cosmos: {
          900: '#0B0F19', // 深空黑
          800: '#0F172A', // 午夜蓝
          700: '#1E293B', // 深宇宙蓝
          600: '#334155', // 星云蓝
          500: '#475569', // 灰蓝
        },
        // 天空蓝强调色
        sky: {
          500: '#3B82F6',
          400: '#60A5FA', // 天空蓝
          300: '#93C5FD', // 浅天蓝
          200: '#BFDBFE',
        },
        // 星光文字色
        star: {
          100: '#F8FAFC', // 星光白
          200: '#CBD5E1', // 月光灰
          300: '#94A3B8', // 淡灰蓝
          400: '#64748B', // 暗灰蓝
        },
        // 宇宙紫辅助色
        nebula: {
          600: '#4C1D95', // 深紫
          500: '#5B21B6',
          400: '#7C3AED', // 紫罗兰
          300: '#8B5CF6',
        },
        // 靛蓝色
        indigo: {
          800: '#3730A3',
          700: '#4338CA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'nav': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.2)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(96, 165, 250, 0.3)',
      },
      backgroundImage: {
        'cosmos-gradient': 'linear-gradient(180deg, #0F172A 0%, #0B0F19 100%)',
        'sky-gradient': 'linear-gradient(180deg, #1E3A8A 0%, #0F172A 50%, #0B0F19 100%)',
        'card-gradient': 'linear-gradient(145deg, #1E293B 0%, #0F172A 100%)',
        'accent-gradient': 'linear-gradient(135deg, #60A5FA 0%, #3730A3 100%)',
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
