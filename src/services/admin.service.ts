import {AdminDb} from "../db/connection";
import {generateToken} from "../utils/authUtils";

/**
 * This is a singleton service that manages the admins
 * @class
 * @name AdminService
 * @description Service for managing admins
 */
export class AdminService {

    /**
     * @description Singleton instance
     * @private
     */
    private static instance: AdminService;


    /**
     * Constructor
     * @private
     */
    private constructor() {

    }

    /**
     * Get instance
     * @returns {AdminService} - instance
     * @public
     * @static
     * @method
     * @name getInstance
     * @memberof CarService
     * @description Get instance of CarService
     */
    public static getInstance(): AdminService {
        if (!AdminService.instance) {
            AdminService.instance = new AdminService();
        }
        return AdminService.instance;
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
    public login(username: string, password: string): string | undefined {
        const result = AdminDb.findOne({username, password});
        if (!result) return undefined;
        const token = generateToken(result);
        return token;
    }

}
