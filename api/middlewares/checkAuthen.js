module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(400).json({
    status: "error",
    data: [],
    messages: [
      {
        error: "Your request is not authenticated , please log in first !",
      },
    ],
  });
};
