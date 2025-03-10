import express from "express"
import mongoose from "mongoose"
import cors from 'cors'
import env from 'dotenv'
import foodRouter from './routers/foodRoutes.js'
import authRouter from './routers/authRouth.js' ;
import authMiddleware from './middleware/auth.js'
import StripeRouter from "./routers/stripeRoute.js"
import OrderRoute from './routers/orderRoute.js'
import { webhookRouter } from "./webhooks/webhookHandler.js"
const app =express();
app.use(cors('*'))
app.use(express.json())
env.config()

const {DATABASE_URL}=process.env;

mongoose.connect(DATABASE_URL).then(()=>{
       console.log('database connected');

})


app.use('/auth',authRouter)
app.use('/food',foodRouter)
app.use('/stripe' ,StripeRouter )
app.use('/order',OrderRoute)
app.use('/webhooks', webhookRouter);


app.listen(4000)     