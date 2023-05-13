const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const userRoute = require("./routes/user").router
const reportRoute = require("./routes/report").router


const cors = require("cors")
const app = express()
app.use(cors());
require('dotenv').config()


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true}))
app.use(bodyParser.json());






app.use("/user", userRoute)
app.use("/report", reportRoute)






const PORT =  process.env.PORT  || 5000
const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
  }).then(() => {
  app.listen(PORT , ()=>{
    console.log(`listening on port ${PORT}`)

  })
}).catch((err) => {
    console.log(err.message + "Errorrrrrrr")
})


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

