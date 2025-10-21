import path from "path";
import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag: string) => tag === "center",
				},
			},
		}),
	],
	server: {
		fs: {
			allow: ["..", "node_modules"], // allow fonts from node_modules
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@interfaces": path.resolve(__dirname, "src/interfaces"),
			"@assets": path.resolve(__dirname, "src/assets"),
			"@components": path.resolve(__dirname, "src/components"),
			"@utils": path.resolve(__dirname, "src/components/utils"),
		},
	},
});
