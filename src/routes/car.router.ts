import express, {Request, Response, NextFunction} from 'express';
import {validateAddCar} from "../middlewares/validations/addCar.middleware";
import {CarController} from "../controllers/car.controller";
import {authorizeAdmin} from "../middlewares/authorizeAdmin.middleware";


export const carRouter = express.Router();

const carController: CarController = new CarController();


carRouter.get('/', carController.getCars);

carRouter.post('/',
    authorizeAdmin ,
    validateAddCar ,
    carController.addCar.bind(carController)
)
