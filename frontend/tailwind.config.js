/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: '#FF5200', // BiteSpeed Orange
                secondary: '#1f2937', // Dark Gray
                neutral: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    900: '#111827',
                }
            },
            boxShadow: {
                'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                'hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 44px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            keyframes: {
                'fade-in-down': {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'bounce-short': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-25%)' },
                }
            },
            animation: {
                'fade-in-down': 'fade-in-down 0.8s ease-out',
                'bounce-short': 'bounce-short 1s ease-in-out infinite',
            }
        },
    },
    plugins: [],
}
