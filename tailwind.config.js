/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{md,svelte}'],
	theme: {
		extend: {
			fontSize: {
				'3xl': '2rem',
				'2xl': '1.6rem',
				'xl': '1.5rem',
			},
		},
	},
	plugins: [],
}