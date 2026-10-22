module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^expo-seed-vault$": "<rootDir>/modules/expo-seed-vault/src/index",
    "^expo-synced-keychain$": "<rootDir>/modules/expo-synced-keychain/src/index",
    "^react-native-mmkv$": "<rootDir>/test/react-native-mmkv.js",
    "^react-native$": "<rootDir>/test/react-native.js",
    "\\.(png|jpg|jpeg|gif|webp|svg)$": "<rootDir>/test/fileMock.js",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "node_modules/@noble/.+\\.js$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(@noble/ciphers|@noble/hashes)/)",
  ],
};
