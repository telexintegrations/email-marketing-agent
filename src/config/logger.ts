import winston from 'winston';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
  winston.format.prettyPrint(),
);

const logger = winston.createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
