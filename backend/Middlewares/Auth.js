const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
    }
    const token = authHeader.split(' ')[1]; // This removes "Bearer"
    if (!token) {
        return res.status(403).json({ message: 'Invalid token format' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
};

const ensureCustomer = (req, res, next) => {
    if (req.user.userType !== 'customer') {
        return res.status(403).json({ message: 'Access denied, only customers allowed' });
    }
    next();
};

const ensureDealer = (req, res, next) => {
    if (req.user.userType !== 'dealer') {
        return res.status(403).json({ message: 'Access denied, only dealers allowed' });
    }
    next();
};

module.exports = { ensureAuthenticated, ensureCustomer, ensureDealer };
