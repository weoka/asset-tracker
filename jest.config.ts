export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
    },
    moduleNameMapper: {
      // 🔹 Mockear archivos CSS para que Jest los ignore
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__mocks__/fileMock.js",
    },
    transformIgnorePatterns: ["node_modules/(?!primereact)"], // Evitar ignorar Primereact
    extensionsToTreatAsEsm: [".ts", ".tsx"],
    globals: {
      "ts-jest": {
        useESM: true
      }
    }
  };
  