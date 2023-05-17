const asyncwrapper = (callback) => {
  return async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
module.exports = asyncwrapper;
// function that i path another function to it as a call back function
// it returns a function too
// the returned function has 3 parameters (req,res,next)
// the function that i return is may be createTask(), getAllTaks() ...etc
// if not it gonna give us a error in the catch block
