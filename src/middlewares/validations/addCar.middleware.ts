import { z } from 'zod';
import { Request, Response, NextFunction } from "express";

/**
 * @name carSchema
 */
const carSchema = z.object({
    make: z.string(),
    model: z.string(),
    year: z.number().min(1900).max(new Date().getFullYear()),
    color: z.string().optional(),
    pricePerDay: z.number().positive(),
    size: z.enum(["min", "mid", "large"]),
});


/**
 * @name validateAddCar
 * @description Middleware to validate the request body for adding a car
 * @param req {Request} - request object
 * @param res {Response} - response object
 * @param next {NextFunction} - next function
 */
export const validateAddCar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        carSchema.parse(req.body);
        next();
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.errors
        });
    }
}


