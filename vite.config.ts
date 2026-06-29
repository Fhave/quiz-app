import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      workbox: {
        globPatterns: ["**/*"],
        cleanupOutdatedCaches: true
      },
      includeAssets: [
        "**/*",
      ],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Quiz Tracker',
        short_name: 'QuizTracker',
        description: 'Track your quiz answers.',
        scope: '/',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons.svg',
            sizes: '192x192',
            type: 'image/svg'
          }
        ]
      }
    }),
    visualizer({ open: true })
  ]
})