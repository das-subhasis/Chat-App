import express from "express"
import asyncHandler from "express-async-handler"
import CORS from "cors"
import { config } from "dotenv";
import userRoutes from "./routes/userRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/errorMiddleware";
config()

const app = express();

// middleware for handling CORS 
app.use(CORS());

// middleware to parse JSON responses
app.use(express.json());

// User Route
app.use('/user', userRoutes);

// app.get('/', (req, res, next) => {
//     console.log('inside get method');
//     throw new Error("Something went wrong in the logic");
//     // res.send("hello")
// })

// middleware to handle routes that does not exist
app.use(notFoundHandler);

// middleware to handle errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000; // default port 

app.listen(PORT, () => {
    console.log(`server is listening at port : ${PORT}`)
});