module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  setupFiles: ["./enzyme.config.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
}
