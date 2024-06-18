import {Request, Response} from "express";
import {AdminService} from "../services/admin.service";

/**
 * AdminController
 * @class
 * @description Controller for handling admin requests
 */
export class AdminController {
    /**
     * AdminService
     * @type {AdminService}
     * @private
     */
    private adminService: AdminService;

    /**
     * Constructor
     */
    constructor() {
        this.adminService = AdminService.getInstance();
        this.login = this.login.bind(this);
    }

    /**
     * Login
     * @public
     * @description admin login
     * @param req {Request} - request object
     * @param res {Response} - response object
     */
    public async login(req: Request, res: Response) {
        try{
            const {username, password} = req.body;
            const token = this.adminService.login(username, password);
            if(!token) {
                return res.status(401).json({
                    success: false,
                    message: "Authentication failed! Please check the request"
                });
            }
            res.status(200).json({
                success: true,
                data: {token}
            })
        } catch (error: any) {
            console.error(`Error in AdminController: ${error.message}`);
            //todo: use error middleware
            res.status(500).json({
                success: false,
                message: error.message
            })
        }

    }

}
