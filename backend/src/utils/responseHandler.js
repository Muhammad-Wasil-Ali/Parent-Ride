export const sendResponse = (res, options) => {
  const {
    statusCode = 200,
    success = true,
    message = "",
    error = null,
    data = null,
  } = options;
  return res.status(statusCode).json({
    success,
    message,
    data,
    error: error ? error.message : null,
  });
};
