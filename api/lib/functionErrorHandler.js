/**
 * Handle errors from async functions in routes
 * @param fn
 */
module.exports.catchAsyncError = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
