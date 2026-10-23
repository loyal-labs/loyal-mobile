module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^expo-constants$": "<rootDir>/test/expo-constants.js",
    "^expo-modules-core$": "<rootDir>/test/expo-modules-core.js",
    "^expo-hardware-key$": "<rootDir>/modules/expo-hardware-key/src/index",
    "^expo-seed-vault$": "<rootDir>/modules/expo-seed-vault/src/index",
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
