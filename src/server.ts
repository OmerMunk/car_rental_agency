import app from './app'
import {createServer} from 'http';
import { Server as HttpServer } from 'http';
import {CarsDb, connectToDb, ReservationsDb} from "./db/connection";
import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from "path";

const PORT: number = parseInt(process.env.PORT as string, 10) || 8000;
let server: HttpServer;


const startServer = () => {
    server = createServer(app);

    server.listen(PORT, ()=>{
        console.log(`server is listening on port ${PORT}`);
    })


    server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
}

//TODO: later implement disconnect from db and services
const gracefullShutdown = async() => {
    console.log('server is shutting down gracefully');
    console.log('saving data to db');
    await CarsDb.saveData();
    ReservationsDb.saveData();
    console.log(`data saved to db`)
    server.close(()=>{
        console.log('server is closed');
        process.exit(0);
    });

    // auto shutdown after 30 seconds if graceful shutdown not completed
    setTimeout(()=>{
        console.error(`could not close server in 30 seconds, forcefully shutting down`);
        process.exit(1);
    } , 30000)
}

process.on('SIGTERM', gracefullShutdown);

process.on('SIGINT', gracefullShutdown);

startServer();
const token = jwt.sign({
    data: 'omer'
},
    fs.readFileSync(path.join(__dirname, '../__mock_keys__/dbPrivateKey.pem'), 'utf8'),
    {algorithm: 'RS256'}
    )
connectToDb(token)
