import express from 'express';
import  colors from'colors';
import dotenv from 'dotenv';
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'
import path from 'path'
dotenv.config();
const app=express()

connectDB();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
app.get('/',(req,res) => {
    res.send({
        message:'welcome to ecommerce app'
    })
})

const PORT=process.env.PORT || 8000;

app.listen(PORT, () =>{
    console.log(`server is running at ${PORT}`.bgCyan.white)
})