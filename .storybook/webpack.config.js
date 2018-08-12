const path = require("path");

module.exports = (baseConfig, env, defaultConfig) => {

  defaultConfig.module.rules = defaultConfig.module.rules.filter(it => String(it.test).indexOf("svg") == -1);

  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: path.resolve(__dirname, "../src"),
    loader: require.resolve("ts-loader")
  });

  defaultConfig.module.rules.push({
    test: /\.svg$/,
    loader: "file-loader"
  });

  defaultConfig.resolve.extensions.push(".ts", ".tsx");

  return defaultConfig;
};