const roleMiddleware = (roles) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user || !user.role || !roles.includes(user.role)) {
      console.log('Access denied for user:', user); // Debug log
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};

module.exports = roleMiddleware;
