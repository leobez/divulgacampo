import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/"
  //base: "/projeto-lab-eng-soft" -> USE WHEN DEPLOY FOR gh-pages teste
})
