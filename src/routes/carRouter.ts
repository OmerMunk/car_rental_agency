import express, {Request, Response, NextFunction} from 'express';



export const carRouter = express.Router();


carRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        data: ['car1', 'car2', 'car3']
    })
});
