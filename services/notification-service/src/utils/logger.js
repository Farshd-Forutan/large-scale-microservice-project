
const logger = {
  info: (message, data = "") => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] INFO: ${message}`, data ? JSON.stringify(data) : "");
  },
  error: (message, error = "") => {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] ❌ ERROR: ${message}`, error.stack || error);
  },
  warn: (message, data = "") => {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] ⚠️ WARN: ${message}`, data);
  },
};

module.exports = logger;
