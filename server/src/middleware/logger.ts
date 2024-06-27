import { Request, Response, NextFunction } from 'express';
import winston from 'winston';

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),
    new winston.transports.File({
      filename: "logs/all.log",
    })
  ]
});

class Logger {

  public static logRequest(req: Request, res: Response, next: NextFunction): void {
    logger.info({
      method: req.method,
      url: req.originalUrl,
    });
    next();
  }

  public static logError(err: Error, req: Request, res: Response, next: NextFunction): void {
    logger.error({
      method: req.method,
      url: req.originalUrl,
      stack: err.stack
    });
    next(err);
  }
  
  public static logInfo(msg: string): void {
    logger.info(
      msg,
    );
  }
  
  public static logWarning(msg: string): void {
    logger.warn(
      msg,
    )
  }
}

export default Logger;