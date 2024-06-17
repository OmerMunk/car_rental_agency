import {CarsDb} from "../db/connection";

/**
 * This is a singleton service that manages the cars
 * @class
 * @name CarService
 * @description Service for managing cars
 */
export class CarService {

    /**
     * @description Singleton instance
     * @private
     */
    private static instance: CarService;


    /**
     * Constructor
     * @private
     */
    private constructor() {

    }

    /**
     * Get instance
     * @returns {CarService} - instance
     * @public
     * @static
     * @method
     * @name getInstance
     * @memberof CarService
     * @description Get instance of CarService
     */
    public static getInstance(): CarService {
        if (!CarService.instance) {
            CarService.instance = new CarService();
        }
        return CarService.instance;
    }

    //todo: fix car type
    /**
     * Add car
     * @param car - car object
     * @public
     * @method
     * @name addCar
     * @memberof CarService
     * @description Add a car
     * @returns {void}
     */
    public addCar(car: any): void {
        CarsDb.insertOne(car);
    }

    /**
     * Get cars
     * @public
     * @method
     * @name getCars
     * @memberof CarService
     * @description Get all cars
     * @returns {any[]} - array of cars
     */
    public getCars(): any[] {
        return CarsDb.findMany();
    }

    /**
     * Update car
     * @param id - car id
     * @param car - car object
     * @public
     * @method
     * @name updateCar
     * @memberof CarService
     * @description Updates a car
     * @returns {any} - updated car
     */
    public updateCar(id: string, car: any) {
        const updatedCar = CarsDb.update(id, car);
        return updatedCar;
    }
}
