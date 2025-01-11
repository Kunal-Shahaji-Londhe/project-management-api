import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    try {
        // Check if Authorization header exists
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ 
                success: false, 
                message: 'Authorization header is missing' 
            });
        }

        // Check if it follows Bearer token format
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token format. Use Bearer scheme' 
            });
        }

        // Extract and verify token
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'No token provided' 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user data to request
        req.user = decoded;
        next();

    } catch (error) {
        // Handle specific JWT errors
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Token has expired' 
            });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid token' 
            });
        }
        
        // Handle any other errors
        return res.status(500).json({ 
            success: false, 
            message: 'Server error during authentication' 
        });
    }
};