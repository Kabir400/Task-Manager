//this is custom trycatch function so that i don't have to write same try catch over and over in ever single controller

const TryCatch = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
module.exports = TryCatch;
