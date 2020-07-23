const path = require("path");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias["public"] = path.resolve(__dirname, "public/");
    config.resolve.alias["element"] = path.resolve(__dirname, "elements/");
    config.resolve.alias["hooks"] = path.resolve(__dirname, "hooks/");
    return config;
  },
};
