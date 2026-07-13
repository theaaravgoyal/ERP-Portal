const authorize = (permissionCode) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized, login required.' });
    }

    // Check if user contains the requested permission code claim
    const hasPermission = req.user.permissions.some(
      p => p.code === permissionCode
    );

    if (!hasPermission) {
      return res.status(403).json({ 
        success: false, 
        message: `Access denied. Missing permission claim: ${permissionCode}` 
      });
    }

    next();
  };
};

module.exports = { authorize };
