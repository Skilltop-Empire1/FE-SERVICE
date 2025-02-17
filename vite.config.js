import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  resolve: {
    alias: {
      '@src': '/src', // alias for the src folder
      '@components': '/src/components', // alias for the components folder
    },
  },
  server: {
    port: 5173, // port for the development server
    open: true, // open the browser on start
  },
})
