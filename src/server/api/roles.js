const isLoggedIn = (...expectedRole) => {
  return (req, res, next) => {
    if (expectedRole?.includes(req?.user?.role)) {
      next();
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  };
};

module.exports = { isLoggedIn };
