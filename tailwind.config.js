module.exports = {
	purge: [],
	theme: {
		extend: {
			fontFamily: {
				"source-sans-pro": ["Source Sans Pro"],
				mitr: ["Mitr"],
				"roboto-slab": ["Roboto Slab"],
			},
			width: {
				"33px": "33px",
				"150": "150px",
				"280": "280px",
			},
			height: {
				"18px": "18px",
			},
		},
	},
	screens: {
		sm: "640px",
		// => @media (min-width: 640px) { ... }

		md: "768px",
		// => @media (min-width: 768px) { ... }

		lg: "1024px",
		// => @media (min-width: 1024px) { ... }

		xl: "1280px",
		// => @media (min-width: 1280px) { ... }
	},
	variants: {},
	plugins: [require("@tailwindcss/custom-forms")],
};
