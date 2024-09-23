import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended"), {
    languageOptions: {
        globals: {
            ...globals.node,
        },
    },

    rules: {
        indent: [2, 2],
        quotes: [2, "single", "avoid-escape"],
        "linebreak-style": [2, "unix"],
        semi: [2, "always"],
        curly: 2,
        eqeqeq: 2,
        "no-extend-native": 2,
        "max-depth": [2, 4],
        "no-new": 2,
        strict: [2, "global"],
        "no-trailing-spaces": 2,
        "space-in-parens": 2,
        "space-infix-ops": 2,
        "keyword-spacing": 2,
        "spaced-comment": 2,
        camelcase: 2,
    },
}];