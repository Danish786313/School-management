const express = require("express")
const app = express()
app.set('view engin', 'ejs')
const { sequelize } = require("./models")
const bodyparser = require("body-parser")
const classroute = require("./routes/classroute")
const schoolroute = require("./routes/schoolroute")
const studentroute = require("./routes/studentroute")
const subjectroute = require("./routes/subjectroute")
const teacherroute = require("./routes/teacherroute")
const userroute = require("./routes/userroute")
const views = require("./routes/views")
const port = process.env.port || 3000


app.use(bodyparser.urlencoded({ extended : true}))
app.use(bodyparser.json())
app.use("/api", classroute)
app.use("/api", schoolroute)
app.use("/api", studentroute)
app.use("/api", subjectroute)
app.use("/api", teacherroute)
// app.use("/api", userroute)
app.use("/view", views)

app.use("/test", (req, res) => {
    console.log(req.body)
})


app.listen(port, async () =>{
    console.log(`server is running on http://localhost:${port}/view/dashboard`)
    await sequelize.sync(/* { force : true } */).then(() => {
        console.log("Database connected")
    }).catch(() => {
        console.log("Database not connected")
    })
}) 