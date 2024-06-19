import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    console.log(`req.headers.authorization: ${req.headers.authorization}`);
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'SECRET_KEY', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        console.log(`decoded: ${JSON.stringify(decoded)}`);

        if (decoded && typeof decoded !== 'string' && decoded.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Not authorized as admin' });
        }
    });
};

