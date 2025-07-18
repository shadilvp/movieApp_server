
export const isAdmin = (req, res, next) => {
  console.log("User Info:", req.user);
  if (req.user && req.user.roll === 'admin') {
    return next();
  }

  return res.status(403).json({ message: 'Access denied. Admins only.' });
};