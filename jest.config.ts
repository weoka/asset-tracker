// jest.config.ts

import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  // Path to the setup file
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // Module name mapping for styles and assets
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  // Transform settings for different file types
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest", // If using Babel
  },

  // File extensions Jest should handle
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],

  // Coverage collection settings
  collectCoverageFrom: ["src/**/*.{ts,tsx,js,jsx}", "!src/**/*.d.ts"],
};

export default config;
