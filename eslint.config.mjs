import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Disable React in JSX scope rule
      "no-unused-vars": "warn",          // Warn for unused variables
      "react/prop-types": "warn",        // Enable prop-types checking as a warning
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
