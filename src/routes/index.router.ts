import express from "express";
import {carRouter} from "./car.router";

export const indexRouter = express.Router();

indexRouter.use('/api/v1/cars', carRouter);
