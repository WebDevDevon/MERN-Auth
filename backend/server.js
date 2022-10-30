require('dotenv').config()

const express = require('express')

const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const cors = require('cors')

// express app

// middleware
app.use(express.json())

app.use(cors({
  origin: "https://jazzy-biscuit-597390.netlify.app/",
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true,
}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://jazzy-biscuit-597390.netlify.app/");
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Access-Control-Allow-Methods", "GET", "DELETE", "HEAD", "OPTIONS")
  // res.header("Access-Control-Allow-Methods", "*");
  // res.header("Access-Control-Allow-Headers", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  next();
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })