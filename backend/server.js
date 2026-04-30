import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import dns from 'dns';

//change dns
dns.setServers(["1.1.1.1","8.8.8.8"])

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use(cors({
    origin: [
        'https://prescripto-full-stack-frontend-345u.onrender.com', // Live Frontend
        'https://prescripto-full-stack-admin-ltze.onrender.com',    // Live Admin
    ],
    credentials: true
}))
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))
