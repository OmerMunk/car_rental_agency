import app from './app'
import {createServer} from 'http';
import { Server as HttpServer } from 'http';

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
const gracefullShutdown = () => {
    console.log('server is shutting down gracefully');
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
