//Modules
import express from 'express';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import connectToDB from './database/mongoConnection.js';
import cors from 'cors';
// Import Routes
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// 1) MIDDLEWARES (Function that can modify incoming request data)
//Implement CORS
// app.use(
//   cors({
//     origin: 'http://localhost:5173/',
//   }),
// );
app.use(cors());
//Set Environment condition, we can use here de process.env because it is just one process for the whole app. We can call it in other file
if (process.env.NODE_ENV === 'development') {
    //Visualize LOGS in the console
    app.use(morgan('dev'));
}
app.use(express.json());
//Serve Static Files
app.use(express.static(`${__dirname}/../public`));
// Middlewares can access to a third argument, usually called next function
app.use((req, res, next) => {
    console.log('Hello from the middleware!');
    next();
});
//Middlware to know when was the request done!
app.use((req, res, next) => {
    res.requestTime = new Date().toISOString();
    next();
});
//  2) ROUTE HANDLERS = CONTROLLERS
//Route = http://localhost:5000/api/v1, Endpoint = /tours, Resource = tours
// 3) ROUTES
app.get('/', (req, res) => {
    //   res.status(200).send('Hello from the server side"!');
    res
        .status(200)
        .json({ message: 'Hello from the server side"!', app: 'Natours' });
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
// 4) SERVER
await connectToDB();
export default app;
