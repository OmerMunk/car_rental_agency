import express, {Application, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser";
import helmet from 'helmet'
import cors from 'cors'
import { carRouter } from './routes/carRouter'
import { errorHandler } from './middlewares/errorHandler'


const app: Application = express();

// General middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet())
app.use(cookieParser())
app.use(cors())



// Routes
app.use('/api/v1/cars', carRouter)

// Global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    errorHandler(err, res)
});


// Catch all other routes and return a status of 404
app.use((req: Request, res: Response)=>{
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

export default app;

