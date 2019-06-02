module.exports = {
  cache: true,
  cacheDirectory: "<rootDir>/node_modules/.cache/jest",
  preset: "ts-jest",
  testMatch: ["<rootDir>/src/**/*.spec.ts{,x}"],
  moduleFileExtensions: ["js", "ts", "tsx"],
  collectCoverageFrom: ["<rootDir>/src/**/*.ts{,x}"],
};
