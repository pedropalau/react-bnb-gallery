module.exports = {
  verbose: true,
  collectCoverage: true,
  moduleDirectories: ["node_modules", "src"],
  collectCoverageFrom : ["src/**/*.{js,jsx,mjs}"],
  moduleFileExtensions: ["js", "json", "jsx"],
  coverageDirectory: "coverage",
  transform: {"^.+\\.js?$": "babel-jest"},
  testMatch: ["**/tests/**/*.test.js?(x)"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  modulePaths: ["<rootDir>/src","<rootDir>/node_modules"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(css|less|scss)$": "identity-obj-proxy"
  }
};
