 const dotenv=require("dotenv")
 dotenv.config()

const express=require("express")
const app=express()
const ejsMate=require("ejs-mate")
const path=require("path")
const port=8000;
const connectDB=require("./server/init/db")
const mongoose=require("mongoose")
const session=require("express-session")
const flash=require("connect-flash")
const methodOverride = require('method-override')


//connect to DB
connectDB()

const customerrouter=require("./server/routes/customer")

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join (__dirname,"public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate)


const sessionoption={
    secret:"hello",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        HttpOnly:true,
    }
}



app.use(session(sessionoption))

app.use(flash())

app.use((req,res,next)=>{
    res.locals.success=req.flash("success")
    res.locals.error=req.flash("error")
    next()
})

app.use("/",customerrouter)







app.get("*",(req,res)=>{
    res.status(404).render("error")
})

app.listen(port,()=>{
    console.log("listening at port 8000");
})