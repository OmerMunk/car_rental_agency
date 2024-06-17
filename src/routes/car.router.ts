import express, {Request, Response, NextFunction} from 'express';
import {validateAddCar} from "../middlewares/validations/addCar.middleware";
import {CarController} from "../controllers/car.controller";


export const carRouter = express.Router();

const carController = new CarController();


carRouter.get('/', carController.getCars);

carRouter.post('/', validateAddCar , carController.addCar)
