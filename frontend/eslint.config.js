import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    settings: {
      react: { version: "detect" }, // Automatically detect React version
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // Base JavaScript Rules
      ...js.configs.recommended.rules,

      // React Rules
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      "react/jsx-no-target-blank": [
        "warn",
        { allowReferrer: true, enforceDynamicLinks: "always" },
      ],

      // React Hooks Rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh Rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Custom Rules
      "no-throw-literal": "error", // Prevent throwing raw error objects
      "react/jsx-uses-react": "off", // For React 17+ (using JSX runtime)
      "react/react-in-jsx-scope": "off", // For React 17+ (using JSX runtime)
      "react-hooks/exhaustive-deps": "warn", // Warn for missing dependencies in useEffect
    },
  },
];
