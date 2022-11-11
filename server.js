
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
import dotenv from 'dotenv'
// app.get('/',(req,res)=>(res.send("hello connected successfuly")))
dotenv.config();
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const url =
  process.env.URL;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

app.listen(process.env.PORT, () => console.log(`listning At ${process.env.PORT}`));
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)

