import {Request, Response} from "express";
import {CarService} from "../services/carService";

/**
 * CarController
 * @class
 * @description Controller for handling car requests
 */
export class CarController {
    /**
     * CarService
     * @type {CarService}
     * @private
     */
    private carService: CarService;

    /**
     * Constructor
     */
    constructor() {
        this.carService = CarService.getInstance();
    }

    /**
     * Add car
     * @public
     * @description Add a car
     * @param req {Request} - request object
     * @param res {Response} - response object
     */
    public addCar(req: Request, res: Response) {
        this.carService.addCar(req.body);
        res.status(201).json({
            success: true,
            message: 'Car added successfully'
        })
    }


    /**
     * Get cars
     * @public
     * @description Get all cars
     * @param req {Request} - request object
     * @param res {Response} - response object
     */
    public getCars(req: Request, res: Response) {
        const cars = this.carService.getCars();
        res.status(200).json({
            success: true,
            data: cars
        })
    }
}
