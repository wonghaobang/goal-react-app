const express = require("express")
const colors = require("colors")
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
const port = process.env.PORT || 5000
const goalRoutes = require("./routes/goalRoutes")
const userRoutes = require("./routes/userRoutes")
const { errorHandler } = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")
const path = require("path")

const app = express()
app.use(cors())
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/goals", goalRoutes)
app.use("/api/users", userRoutes)

// Serve frontend

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
  })
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production")
  })
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
