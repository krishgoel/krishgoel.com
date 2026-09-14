/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{md,svelte}'],
	theme: {
		extend: {
			fontSize: {
				'3xl': ['2rem', { lineHeight: '1.15' }],
				'2xl': ['1.5rem', { lineHeight: '1.3' }],
				'xl': ['1.4rem', { lineHeight: '1.3' }],
				'base': '0.95rem',
			},
		},
	},
	plugins: [],
}
