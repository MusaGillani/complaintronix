const winston = require("winston");

const { format } = winston;

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "combined.log",
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.printf(
          ({ level, message, timestamp }) =>
            `${timestamp} ${level}   \t${message}`
        )
      ),
    }),
    new winston.transports.File({
      filename: "combined.log",
      level: "debug",
      format: format.combine(
        format.timestamp(),
        format.printf(
          ({ level, message, timestamp }) =>
            `${timestamp} ${level}   \t${message}`
        )
      ),
    }),
  ],
});
module.exports = logger;
