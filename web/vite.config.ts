import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: path.resolve(__dirname, "/src/main.tsx"),
			output: {
				entryFileNames: "app.js",
			},
		},
	},
})
