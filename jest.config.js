module.exports = {
  setupFiles: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: [
    "<rootDir>/client/.next/",
    "<rootDir>/node_modules/"
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "<rootDir>/client/__mocks__/styleMock.js"
  }
};
