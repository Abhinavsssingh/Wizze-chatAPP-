const { webpack } = require('webpack');

module.exports = function override(config, env) {
    // Add the provided webpack configuration code here
    config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
    });

    return config;
}
