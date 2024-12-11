const express=require("express")

const jwt=require("jsonwebtoken")
const userRouter = require("./routes/user.routes")

const cookieParser = require('cookie-parser')
const isauth = require("./middleware/auth")
const connection = require("./db")


const app=express()
app.use(cookieParser())
app.use(express.json())

app.use("/user",userRouter)

//movies data
const movies = [
  {id:1,name:"spiderman",year:2020},
  {id:2,name:"ironman",year:2010},
  {id:3,name:"Thor",year:2015},
]

app.get("/movies",isauth,(req,res)=>{
 res.json(movies)
})

//web sereices
const webServices = [
  {id:1,name:"Netflix",year:2020},
  {id:2,name:"Amazon Prime",year:2010},
  {id:3,name:"Disney+",year:2015},
]

app.get("/series",isauth,(req,res)=>{
   res.json(webServices)
})

app.get("/logout",(req,res)=>{
  res.clearCookie("AccessToken").json({massage:"logout successfully"})
})

app.get("/",(req,res)=>{
    res.json({massage:"welcome to my app"})
})

// app.listen(8080,async()=>{
//     try {
//         await connection;
//         console.log("connect to database")
//         console.log("server is running on port 8080")
//     } catch (error) {
//       console.log(error)
//     }
// })

app.listen(8080,async()=>{
    try {
        await connection
        console.log("connect to database")
        console.log("server is running on port 8080")
    } catch (error) {
        console.log(error)
    }
})