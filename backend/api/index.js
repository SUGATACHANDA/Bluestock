require('dotenv').config();
const express = require('express');
const cors = require('cors');

const userRoutes = require("../routes/userRoutes")
const companyRoutes = require("../routes/companyRoutes")
const ipoRoutes = require("../routes/ipoRoutes")
const documentRoutes = require("../routes/documentRoutes")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World")
})
app.use('/api/users', userRoutes)
app.use("/api/companies", companyRoutes)
app.use("/api/ipos", ipoRoutes)
app.use("/api/documents", documentRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})