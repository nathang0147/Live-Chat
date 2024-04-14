import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://live-chat-gray.vercel.app',
  server: {
    host: "localhost",
    port: 4000,
  }
})
