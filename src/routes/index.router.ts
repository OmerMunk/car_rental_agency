import express from "express";
import {carRouter} from "./car.router";
import {adminRouter} from "./admin.router";

export const indexRouter = express.Router();

indexRouter.use('/api/v1/cars', carRouter);
indexRouter.use('/api/v1/admin', adminRouter)
