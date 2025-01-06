import path from "path"
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production';

    return {
        plugins: [
            laravel({
                input: [
                    'resources/css/app.css',
                    'resources/js/app.jsx',
                ],
                refresh: true,
            }),
            react(),
        ],
        css: {
            postcss: {
                plugins: [
                    tailwindcss(),
                    autoprefixer(),
                ],
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, './resources/js'),
            },
        },
        server: {
            https: isProduction,
        },
        define: {
            'process.env.VITE_ASSET_URL': JSON.stringify(
                isProduction
                    ? 'https://inventory-pos.vercel.app'
                    : 'http://localhost:8000'
            ),
        },
    }
});
