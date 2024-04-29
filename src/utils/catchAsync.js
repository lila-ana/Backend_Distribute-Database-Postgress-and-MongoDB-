const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res)).catch((err) => next(err));
};

module.exports = catchAsync;
