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
        blur: "blur(30px)", // Adjust the pixel value based on the desired blur amount
      },
      rotate: {
        8: "8deg",
        9: "-8deg",
      },
         
      colors: {
        "knap-10": "rgba(54, 69, 77, 0.1)",
        "bono-10": "#36454D", // Assuming Bono color as an example hex code
        "bono-50": "#384455", // Bono with 50% opacity
        hovercolor: "#ff0000",
        "taupe-10": "#BBD4E0", // Taupe color for other uses
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', "sans-serif"], // Added sans-serif as a fallback
        montserrat: ['"Montserrat"', "sans-serif"]
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],


module.exports = 
{
  variants: {
    extend: {
      inset: ['group-hover'],
    },
  },
}
};
