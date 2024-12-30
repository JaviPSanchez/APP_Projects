import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				urba: ['Urbanist Variable', ...defaultTheme.fontFamily.sans]
			},
			colors: {
				purple100: '#131126',
				light100: '#CCDBE0',
				light400: '#FAFAFA',
				yellow50: '#EAB308',
				yellow40: '#FACC15',
				yellow30: '#FDE047'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
			},
			dropShadow: {
				glow: ['0 0px 20px rgba(255,255, 255, 0.35)', '0 0px 65px rgba(255, 255,255, 0.2)']
			}
		},
		animation: {
			marquee: 'marquee 50s linear infinite'
		},
		keyframes: {
			marquee: {
				from: {
					transform: 'translateX(0)'
				},
				to: {
					transform: 'translateX(calc(-100% - 2.5rem))'
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		function ({ addVariant }) {
			addVariant('child', '& > *')
			addVariant('child-hover', '& > *:hover')
		}
	]
}
