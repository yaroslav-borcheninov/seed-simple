module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFiles: ["./enzyme.config.js"],
  setupFilesAfterEnv: ["react-testing-library/cleanup-after-each"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
}
