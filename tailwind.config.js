/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'unifae-green-1': '#38A69B',
                'unifae-green-2': '#32736C',
                'unifae-green-3': '#25403D',
                'unifae-green-4': '#3BBFA7',
                'unifae-green-5': '#E5F4F3',
                'unifae-white-1': '#FEFEFE',
                'unifae-black-1': '#0D0D0D',
                'unifae-gray-1': '#585859',
                'unifae-gray-2': '#737373',
                'unifae-gray-3': '#404040',
                'unifae-black50-1': '#0D0D0D80',
                'unifae-gray50-1': '#58585980',
                'unifae-gray50-2': '#73737380',
                'unifae-gray50-3': '#40404080',
                'card-white-1': "#EAEAEA"
            }
        },
    },
    plugins: [],
}