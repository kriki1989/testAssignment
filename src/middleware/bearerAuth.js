const HARDCODED_TOKEN = process.env.TOKEN;

const bearerAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token || token !== HARDCODED_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }

  next();
};

module.exports = bearerAuthMiddleware;
