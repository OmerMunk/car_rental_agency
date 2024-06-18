import express from "express";

import {AdminController} from "../controllers/admin.controller";

const adminController: AdminController = new AdminController();

export const adminRouter = express.Router();

adminRouter.post('/login', adminController.login.bind(adminController));
