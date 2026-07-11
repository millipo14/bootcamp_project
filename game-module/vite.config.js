import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        lib: {
            entry: './src/GameModule.js',
            name: 'GameModule',
            fileName: 'game-module'
        }
    }
})