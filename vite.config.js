import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // or '0.0.0.0' to listen on all interfaces
    // host: '192.168.1.100', // To specify a specific IP
  },
})
