import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const preset = {
  darkMode: "class" as const,
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      spacing: {
        "xs": "var(--spacing-xs)",
        "sm": "var(--spacing-sm)",
        "md": "var(--spacing-md)",
        "lg": "var(--spacing-lg)",
        "xl": "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
      },
      boxShadow: {
        "sm": "var(--shadow-sm)",
        "DEFAULT": "var(--shadow-md)",
        "md": "var(--shadow-md)",
        "lg": "var(--shadow-lg)",
        "xl": "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        "inner": "var(--shadow-inner)",
      },
      blur: {
        "sm": "var(--blur-sm)",
        "md": "var(--blur-md)",
        "lg": "var(--blur-lg)",
        "xl": "var(--blur-xl)",
        "2xl": "var(--blur-2xl)",
        "3xl": "var(--blur-3xl)",
      },
      opacity: {
        "0": "var(--opacity-0)",
        "5": "var(--opacity-5)",
        "10": "var(--opacity-10)",
        "20": "var(--opacity-20)",
        "30": "var(--opacity-30)",
        "40": "var(--opacity-40)",
        "50": "var(--opacity-50)",
        "60": "var(--opacity-60)",
        "70": "var(--opacity-70)",
        "80": "var(--opacity-80)",
        "90": "var(--opacity-90)",
        "95": "var(--opacity-95)",
        "100": "var(--opacity-100)",
      },
      zIndex: {
        "hide": "var(--z-hide)",
        "base": "var(--z-base)",
        "docked": "var(--z-docked)",
        "dropdown": "var(--z-dropdown)",
        "sticky": "var(--z-sticky)",
        "banner": "var(--z-banner)",
        "overlay": "var(--z-overlay)",
        "modal": "var(--z-modal)",
        "popover": "var(--z-popover)",
        "toast": "var(--z-toast)",
        "tooltip": "var(--z-tooltip)",
      },
      transitionDuration: {
        "fast": "var(--duration-fast)",
        "normal": "var(--duration-normal)",
        "slow": "var(--duration-slow)",
      },
      transitionTimingFunction: {
        "ease-out": "var(--easing-ease-out)",
        "ease-in": "var(--easing-ease-in)",
        "ease-in-out": "var(--easing-ease-in-out)",
        "sharp": "var(--easing-sharp)",
        "bounce": "var(--easing-bounce)",
      },
    },
  },
  plugins: [],
} satisfies Omit<Config, "content">;

export default preset;
