/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.65rem", // for example, choose the size that fits your design
      },
      backdropFilter: {
        // Ensure backdrop-filter utilities are enabled
        none: "none",
        blur: "blur(20px)", // Adjust the pixel value based on the desired blur amount
      },
      rotate: {
        8: "8deg",
        9: "-8deg",
      },
      colors: {
        "bono-10": "#E3DAC9", // Assuming Bone color as an example hex code
        "bono-50": "rgba(227, 218, 201, 0.5)", // Bone with 50% opacity
        hovercolor: "#ff0000",
        "taupe-10": "#483c32", // Red color for hover state
      },

      fontFamily: {
        bebas: ['"Bebas Neue"'], // Ensure the font is properly included in your project
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
