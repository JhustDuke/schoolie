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
});
