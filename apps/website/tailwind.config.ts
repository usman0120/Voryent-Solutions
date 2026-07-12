import type { Config } from "tailwindcss";
import { tailwindPreset } from "@voryent/config";

const config = {
    darkMode: ["class"],
    presets: [tailwindPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
    theme: {
    	extend: {
    		keyframes: {
    			'accordion-down': {
    				from: { height: '0' },
    				to: { height: 'var(--radix-accordion-content-height)' }
    			},
    			'accordion-up': {
    				from: { height: 'var(--radix-accordion-content-height)' },
    				to: { height: '0' }
    			},
          'fade-in': {
            from: { opacity: '0', transform: 'translateY(10px)' },
            to: { opacity: '1', transform: 'translateY(0)' },
          },
          'fade-in-up': {
            from: { opacity: '0', transform: 'translateY(20px)' },
            to: { opacity: '1', transform: 'translateY(0)' },
          }
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out',
          'fade-in': 'fade-in 0.5s ease-out',
          'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
    		}
    	}
    }
} satisfies Config;

export default config;