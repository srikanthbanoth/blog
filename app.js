const express=require("express");
const mongoose=require("mongoose");
const indexRoute=require('./routes/index');
// const upload = require("express-fileupload");
const multer=require("multer");
const app=express();

const PORT=process.env.PORT || 3000;

const dbURI='mongodb+srv://srikanth:srikanth1234@cluster0.4zac3.mongodb.net/inventory_application?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to Database ")
    app.listen(PORT, () => {
      console.log(": server started")
    })
  })
  .catch((err) => {
    console.log(err);
  })
app.use(express.static('../uploads'))
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public/stylesheets'))
app.use(express.static('public/images'))
app.use(indexRoute);
