import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import sassDts from "vite-plugin-sass-dts";
import viteTsConfigPaths from "vite-tsconfig-paths";

import path from "path";

const config = defineConfig({
	plugins: [
		viteTsConfigPaths({
			projects: ["./tsconfig.json"]
		}),
		tanstackStart(),
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		viteReact(),
		sassDts({
			enabledMode: ["development"],
			esmExport: true,
			exportName: { replacement: "styles" }
		})
	],
	resolve: {
		alias: {
			"@/*": path.resolve(__dirname, "./src/*")
		}
	}
});

export default config;
