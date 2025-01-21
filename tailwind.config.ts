import type { Config } from "tailwindcss"

const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "md": "768px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary))',
              },
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
              fontSize: '1.5rem',
            },
            // ... 他の要素のスタイルもここで設定
            'code::before': {
              content: 'none', // バッククォートを非表示にする
            },
            'code::after': {
              content: 'none', // バッククォートを非表示にする
            },
            code: {
              color: 'hsl(var(--foreground))', // コードの色を変更
              backgroundColor: 'hsl(var(--secondary))', // コードの背景色を変更
              padding: '0.2em 0.4em', // コードのパディングを調整
              borderRadius: '3px', // コードの角を丸くする
              fontWeight: '400',
            },
            'p code': {
              color: 'hsl(var(--foreground))', // 段落内のコードの色を変更
              fontWeight: '400',
            },
            pre: {
              color: 'hsl(var(--foreground))', // pre内のテキスト色を変更
              backgroundColor: 'hsl(var(--secondary))', // preの背景色を変更
            },
            'pre code': {
              backgroundColor: 'transparent', // pre内のcodeの背景色を透明にする
              color: 'inherit', // pre内のcodeの文字色を継承する
              padding: 0, // pre内のcodeのパディングをなくす
              fontWeight: '400',
              fontSize: '0.875rem',
            },
            hr: {
              margin: '2em 0', // 水平線の余白を増やす
              borderColor: 'hsl(var(--border))', // 水平線の色を変更
            },
          },
        },
        //ダークモード
        invert: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--primary))',
              '&:hover': {
                color: 'hsl(var(--primary))',
              },
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            // ... 他の要素のダークモードスタイル
            code: {
              color: 'hsl(var(--foreground))', // コードの色を変更
              backgroundColor: 'hsl(var(--secondary))', // コードの背景色を変更
            },
            'p code': {
              color: 'hsl(var(--foreground))', // 段落内のコードの色を変更
            },
            pre: {
              color: 'hsl(var(--foreground))', // pre内のテキスト色を変更
              backgroundColor: 'hsl(var(--secondary))', // preの背景色を変更
            },
            hr: {
              borderColor: 'hsl(var(--border))', // 水平線の色を変更
            },
          },
        },
      }),
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
} satisfies Config

export default config