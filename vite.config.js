import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()  ],
  // server: {
  //   https: {
  //     key: fs.readFileSync('./localhost-key.pem'),
  //     cert: fs.readFileSync('./localhost-cert.pem'),
  //   },
  //   port: 5173,
  // },
})
