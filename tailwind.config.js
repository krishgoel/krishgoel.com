/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{md,svelte}'],
	theme: {
		extend: {
			fontSize: {
				'3xl': '2rem',
				'2xl': '1.5rem',
				'xl': '1.4rem',
				'base': '0.95rem',
			},
		},
	},
	plugins: [],
}