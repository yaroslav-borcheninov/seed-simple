module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFilesAfterEnv: ["react-testing-library/cleanup-after-each"],
}
