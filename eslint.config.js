import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import { defineConfig, globalIgnores } from "eslint/config";
import _import from "eslint-plugin-import";
import react from "eslint-plugin-react";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: tsParser,
		},
		extends: fixupConfigRules(
			compat.extends(
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended",
				"plugin:react-hooks/recommended",
				"prettier",
			),
		),
		plugins: {
			"react-refresh": reactRefresh,
			"@typescript-eslint": fixupPluginRules(typescriptEslint),
			react,
			import: fixupPluginRules(_import),
		},
		rules: {
			"import/order": [
				"error",
				{
					"newlines-between": "always",
					groups: ["builtin", "external", "internal", "unknown", ["sibling", "parent"]],
					pathGroups: [
						{ pattern: "react*", group: "external", position: "before" },
						{ pattern: "@pages/*", group: "internal", position: "before" },
						{ pattern: "@components/*", group: "internal", position: "before" },
						{ pattern: "@api/*", group: "internal", position: "before" },
						{ pattern: "@config/*", group: "internal", position: "before" },
						{ pattern: "@schemas/*", group: "internal", position: "before" },
						{ pattern: "@utils/*", group: "internal", position: "before" },
						{ pattern: "@hooks/*", group: "internal", position: "before" },
						{ pattern: "@routers/*", group: "internal", position: "before" },
						{ pattern: "@stores/*", group: "internal", position: "before" },
						{ pattern: "@assets/*", group: "internal", position: "before" },
						{ pattern: "@/*", group: "internal", position: "after" },
						{ pattern: "**/*.scss", group: "index", position: "after" },
					],
					pathGroupsExcludedImportTypes: ["react", "@tanstack*"],
					alphabetize: { order: "asc" },
				},
			],
			"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/consistent-type-imports": "error",
			"react/react-in-jsx-scope": ["off"],
			"@typescript-eslint/no-explicit-any": ["off"],
			"@typescript-eslint/ban-types": ["off"],
			"@typescript-eslint/no-unused-vars": ["warn"],
			"react-hooks/exhaustive-deps": ["off"],
			"react-hooks/rules-of-hooks": ["off"],
		},
	},
	globalIgnores(["**/dist", "**/.eslintrc.config.cjs", "**/scripts/image-opt.cjs"]),
]);
