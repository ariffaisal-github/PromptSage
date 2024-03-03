/**
 * A higher-order function to catch asynchronous errors in route handlers
 * @param {function} fn - The route handler function
 * @returns {function} - A function that catches asynchronous errors and passes them to the error handling middleware
 */
export const catchAsyncError = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
