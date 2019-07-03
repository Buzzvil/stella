const path = require("path");

module.exports = async ({ config }) => {
    return {
        ...(config || {}),
        resolve: {
            ...(config && config.resolve || {}),
            alias: {
                ...(config && config.resolve && config.resolve.alias || {}),
                "proto": path.resolve(__dirname, "../proto"),
            }
        }
    };
};
