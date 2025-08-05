import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ai_quiz_app/', // 👈 Superviktigt för GitHub Pages
  plugins: [react()]
})