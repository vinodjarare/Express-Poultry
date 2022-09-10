const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./config/db.js");
const hbs = require("hbs")
const Contact = require("./models/contactModel.js")

const app = express();
dotenv.config({ path: "./config/config.env" });
//connect db
db();
//static path
const staticPath = path.join(__dirname, "./public");
const partials = path.join(__dirname, "./views/partials");
const views = path.join(__dirname, "./views");

//middlewares
app.use('/css',express.static(path.join(__dirname,'./node_modules/bootstrap/dist/css')))
app.use('/js',express.static(path.join(__dirname,'./node_modules/bootstrap/dist/js')))
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//view engine
app.set("view engine", "hbs");
app.set("views",views)
hbs.registerPartials(partials)
//Routes

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/education", (req, res) => {
  res.render("education");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post('/contact',async(req,res)=>{
  try {
   const contact = await Contact.create(req.body)
   res.status(201).render("modal")
  } catch (error) {
    console.log(error)
  }
})
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
