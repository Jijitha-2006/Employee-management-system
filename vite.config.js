
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  publicDir: '../public',
  plugins: [react()],
  base: '/Employee-management-system/',
  build: {
    outDir: '..',
    emptyOutDir: false,
  },
})
