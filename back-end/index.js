import express from 'express';
import cors from 'cors'
import { adminRoute } from './route/adminRoute.js';

const app = express()
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT',"DELETE"],
    credentials: true
}))
app.use(express.json())
app.use('/auth', adminRoute)
app.listen(8090, ()=> {
    console.log("le seveur est acceder ")
})