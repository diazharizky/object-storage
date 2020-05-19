exports = module.exports = require("pino")({
  name: "object-storage",
  level: process.env.NODE_ENV === "test" ? "warn" : "info",
  timestamp: () => {
    return `,"time":"${new Date().toISOString()}"`;
  },
});
