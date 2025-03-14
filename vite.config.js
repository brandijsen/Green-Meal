import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: '/', // Sostituisci con il nome del tuo repository

  plugins: [react(),     
    tailwindcss(),
  ],
})