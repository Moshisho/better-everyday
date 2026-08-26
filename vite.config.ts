import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.BASE_PATH || (process.env.NODE_ENV === 'production' ? '/better-everyday/' : '/'),
  server: {
    port: 3000,
  },
})