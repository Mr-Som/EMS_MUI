//utils/logger.js

const winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;

// Custom format for console output
const consoleFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `${timestamp} [${level.toUpperCase()}] ${message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` | ${JSON.stringify(metadata)}`;
  }
  return msg;
});

// Custom format for file output (more detailed)
const fileFormat = printf(
  ({ level, message, timestamp, stack, ...metadata }) => {
    let msg = `${timestamp} [${level.toUpperCase()}] ${message}`;
    if (stack) {
      msg += `\n${stack}`;
    }
    if (Object.keys(metadata).length > 0) {
      msg += `\nMetadata: ${JSON.stringify(metadata, null, 2)}`;
    }
    return msg;
  }
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  defaultMeta: { service: "mqtt-subscription-service" },
  transports: [
    // Console transport (colored output)
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        consoleFormat
      ),
      handleExceptions: true,
    }),
    // File transport (only in production)
    ...(process.env.NODE_ENV === "production"
      ? [
          new winston.transports.File({
            filename: "logs/error.log",
            level: "error",
            format: combine(timestamp(), fileFormat),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
          }),
          new winston.transports.File({
            filename: "logs/combined.log",
            format: combine(timestamp(), fileFormat),
            maxsize: 5242880,
            maxFiles: 5,
          }),
        ]
      : []),
  ],
  exitOnError: false,
});

// Add stream for Express/Morgan compatibility
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
