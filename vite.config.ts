// vite.config.ts
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, "index.html"),
				form: resolve(__dirname, "form.html"),
			},
		},
	},
});
