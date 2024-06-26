
import { Request, Response, NextFunction } from 'express';

const loggerMiddleware = (req: Request, _: Response, next: NextFunction) => {
    console.log(`${req.method} ${req.path}`);
    next();
};

export default loggerMiddleware;
