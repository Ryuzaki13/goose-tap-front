import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["dist"] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ["**/*.{ts,tsx}"],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			"react-hooks": reactHooks,
			"react-refresh": reactRefresh,
			import: importPlugin
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"import/no-unresolved": "error",
			"import/no-named-as-default-member": "error",
			"import/no-cycle": "error",
			"import/no-self-import": "error",
			"import/order": [
				"warn",
				{
					groups: ["external", "internal", "parent", "sibling", "object", "type", "index"],
					pathGroups: [
						{ pattern: "react", group: "external", position: "before" },
						{ pattern: "@/**", group: "internal", position: "before" },
						{ pattern: "**/*.{css,scss,sass,less}", group: "index", position: "before" } // стили
					],
					pathGroupsExcludedImportTypes: ["react"],
					"newlines-between": "always", // пустая строка между группами
					alphabetize: { order: "asc", caseInsensitive: true }
				}
			]
		},
		settings: {
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json"
				}
			}
		}
	}
);
