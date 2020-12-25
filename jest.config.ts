module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts"],
  setupFiles: ["dotenv/config"],
  modulePathIgnorePatterns: ["<rootDir>/.*/__mocks__"],
  globals: {
    "ts-jest": {
      tsConfig: "./tsconfig.jest.json",
    },
  },
  testPathIgnorePatterns: ["/node_modules/", ".next"],
};
