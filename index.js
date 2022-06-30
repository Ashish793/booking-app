import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();
    
mongoose.connect(process.env.MONGO)
    .then(() => console.log('Database connected with Booikig'))
    .catch((err) => console.log(err));
;

mongoose.connection.on('disconnected', () => {
    console.log('disconnected success');
});
mongoose.connection.on('connected', () => {
    console.log('success connection'); 
});


// middleware
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something weng wrong";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.statck,
    })
})

app.listen(3000, () => {
  console.log("server start");
});
