// import winston from 'winston';
// import { ConfigService } from '@nestjs/config';

// const logFormat = winston.format.combine(
//   winston.format.timestamp(),
//   winston.format.json(),
//   winston.format.prettyPrint(),
// );

// const logger = winston.createLogger({
//   level: 'info',
//   format: logFormat,
//   transports: [
//     new winston.transports.Console(),
//     // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
//     // new winston.transports.File({ filename: 'logs/combined.log' }),
//   ],
// });


// // const logger: Logger = winston.createLogger({
// //   level: "info",
// //   format: winston.format.combine(
// //     winston.format.colorize(),
// //     winston.format.timestamp(),
// //     winston.format.printf(
// //       ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
// //     )
// //   ),
// //   transports: [
// //     new winston.transports.Console({ level: configService.LOG_LEVEL }),
// //     new winston.transports.File({
// //       filename: configService.LOG_FILE_PATH,
// //       level: configService.LOG_LEVEL,
// //     }),
// //   ],
// // });

// export default logger;
