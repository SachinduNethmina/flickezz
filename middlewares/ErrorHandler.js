import { ValidationError } from "sequelize";
import { AppError, NotFoundError } from "../utils/AppError.js";
import logger from "../utils/Logger.js";

const ErrorHandler = async (err, req, res, next) => {
  if (err instanceof AppError) {
    logger.error(`ValidationError: ${err.message}`, {
      statusCode: err.statusCode,
      stack: err.stack,
    });
    return res.status(err.statusCode).json({
      status: err.status,
      errors: [err.message],
    });
  }

  if (err instanceof NotFoundError) {
    logger.error(`NotFoundError: ${err.message}`, {
      statusCode: err.statusCode,
      stack: err.stack,
    });
    return res.status(err.statusCode).json({
      status: err.status,
      errors: [err.message],
    });
  }

  if (err instanceof ValidationError) {
    const errors = err.errors.map((e) => e.message);
    logger.error(`ValidationError: ${errors.join(", ")}`, { stack: err.stack });
    return res.status(400).json({
      status: false,
      errors,
    });
  }

  logger.error(`UpexpectedError: ${err.message}`, { stack: err.stack });
  return res.status(500).json({
    status: false,
    error: [err.message],
  });
};

export default ErrorHandler;
