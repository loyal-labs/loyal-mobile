// mobile/metro.config.js
const fs = require("fs");
const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

const privateTransactionsEntryCandidates = [
  path.resolve(
    __dirname,
    "node_modules/@loyal-labs/private-transactions/dist/index.js",
  ),
  path.resolve(
    __dirname,
    "node_modules/@loyal-labs/private-transactions/index.ts",
  ),
];
const privateTransactionsEntry = privateTransactionsEntryCandidates.find((candidate) =>
  fs.existsSync(candidate),
);

if (!privateTransactionsEntry) {
  throw new Error(
    "Unable to resolve @loyal-labs/private-transactions entry file from Metro config.",
  );
}

// SVG transformer
config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer",
);
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg",
);
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];

const nativewindConfig = withNativewind(config, {
  inlineVariables: false,
  globalClassNamePolyfill: false,
  inlineRem: 16,
});

const nativewindResolveRequest = nativewindConfig.resolver.resolveRequest;
nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "@loyal-labs/private-transactions") {
    return {
      type: "sourceFile",
      filePath: privateTransactionsEntry,
    };
  }

  if (moduleName === "node:crypto") {
    return { type: "empty" };
  }

  if (typeof nativewindResolveRequest === "function") {
    return nativewindResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = nativewindConfig;
