// RFWvEMjvCKEcVqA2
// mongodb+srv://instagram_clone:RFWvEMjvCKEcVqA2@cluster0.xkrmnfz.mongodb.net/instagram-clone?retryWrites=true&w=majority
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'
// app.get('/',(req,res)=>(res.send("hello connected successfuly")))
const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const url =
  "mongodb+srv://instagram_clone:RFWvEMjvCKEcVqA2@cluster0.xkrmnfz.mongodb.net/instagram-clone?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to db"))
  .catch((e) => console.log(e));

app.listen(8800, () => console.log(`listning At 8800`));
app.use('/auth',AuthRoute)
app.use('/user',UserRoute)

