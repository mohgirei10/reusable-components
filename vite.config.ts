import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This helps Vite ignore the broken Babel cache
  optimizeDeps: {
    force: true
  }
})
