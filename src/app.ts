import express, {Application, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import helmet from 'helmet'
import cors from 'cors'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'
import loggerMiddleware from "./middlewares/logger.middleware";
import {indexRouter} from "./routes/index.router";


const app: Application = express();

// General middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(cookieParser())
app.use(cors())

// Custom middlewares
app.use(loggerMiddleware)



// Routes
app.use(indexRouter);

// Global error handler
app.use(errorHandlerMiddleware)

// Catch all other routes and return a status of 404
app.use((req: Request, res: Response)=>{
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

export default app;

