import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
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
			fontFamily: {
				display: ["Cinzel", "serif"],
				body: ["Cormorant Garamond", "serif"],
			},
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
				mystic: {
					teal: "hsl(var(--mystic-teal))",
					gold: "hsl(var(--mystic-gold))",
					rose: "hsl(var(--mystic-rose))",
					deep: "hsl(var(--mystic-deep))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
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
				"card-flip": {
					"0%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(180deg)" },
				},
				"card-unflip": {
					"0%": { transform: "rotateY(180deg)" },
					"100%": { transform: "rotateY(0deg)" },
				},
				"glow-pulse": {
					"0%, 50%": { opacity: "0.5", transform: "scale(1)" },
					"100%": { opacity: "0.8", transform: "scale(1)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-10px)" },
				},
				shimmer: {
					"0%": { backgroundPosition: "-200% 0" },
					"100%": { backgroundPosition: "200% 0" },
				},
				"coin-spin": {
					"0%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(360deg)" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				"multi-rotate-speedup": {
					"0%": { transform: "rotateY(0deg)" },
					"100%": { transform: "rotateY(4320deg)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"card-flip": "card-flip 0.6s ease-in-out forwards",
				"card-unflip": "card-unflip 0.6s ease-in-out forwards",
				"glow-pulse": "glow-pulse 3s ease-in-out infinite",
				float: "float 4s ease-in-out infinite",
				shimmer: "shimmer 2s linear infinite",
				"coin-spin": "coin-spin 0.5s ease-out",
				"fade-in-up": "fade-in-up 0.5s ease-out",
				"scale-in": "scale-in 0.3s ease-out",
				"multi-rotate-speedup": "multi-rotate-speedup 3s ease-in forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
