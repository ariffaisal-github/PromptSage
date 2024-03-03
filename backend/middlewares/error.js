class ErrorHandler extends Error {
  constructor(message, statusCode) {
    /**
     * Constructor for ErrorHandler class
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code
     */
    super(message);
    this.statusCode = statusCode;
  }
}

/**
 * Middleware to handle errors in the application
 * @param {Error} err - The error object
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {function} next - The next middleware function
 * @returns {Response} - Error response
 */
export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    const message = `. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "11000") {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is Invalid. Try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired. Try again`;
    err = new ErrorHandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;
