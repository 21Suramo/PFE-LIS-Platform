/** tailwind.config.cjs */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F9FA",
        "lis-blue": "#1A237E",
        "primary-dark": "#003366",
        "accent-light": "#D6EAF8",
      },
      keyframes: {
        zoomInOut: {
          "0%,100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "zoom-in-out": "zoomInOut 3s ease-in-out infinite",
        "fade-in-up": "fadeInUp 0.8s ease-out",
      },
      fontSize: {
        hero: ["48px", "1.2"],
        subtitle: ["20px", "1.3"],
        base: ["16px", "1.5"],
      },
    },
  },
  plugins: [],
};
