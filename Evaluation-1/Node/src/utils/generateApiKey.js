const { randomUUID } = require("crypto");

module.exports = () => `ak_${randomUUID().replace(/-/g, "")}`;
