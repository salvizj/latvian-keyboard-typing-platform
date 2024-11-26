import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

export default defineConfig({
    plugins: [react()],
    css: {
        postcss: {
            plugins: [tailwindcss()],
        },
    },
    server: {
        port: parseInt(process.env.VITE_PORT || '8080', 10),
        open: true,
    },
    build: {
        outDir: './dist',
        emptyOutDir: true,
    },
});
