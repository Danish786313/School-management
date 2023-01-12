const express = require("express")
const router = express.Router()
const { student, subject, classes, school, teacher } = require("../models")

router.get("/dashboard", async (req, res) => {
    res.render("dashboard.ejs")
})

router.get("/subject/:page", async (req, res) => {
    const page = parseInt(req.params.page) || 0
    const size = 9

    await subject.findAndCountAll({
        limit : size,
        offset : page * size,
        include : [
            { model : classes,
            include: [
                { model : school }
            ]}
        ]
    }).then(result => {
        // console.log(result.count)
        // return res.json(result)
        res.render('subject.ejs', { 
            subjects : result.rows,
            current : page,
            pages : Math.ceil(result.count / size) 
        })
    })
})

router.get("/school/:page", async (req, res) => {
    const page = parseInt(req.params.page) || 0
    const size = 9

    await school.findAndCountAll({
        limit : size,
        offset : page * size,
            include : [
                { model : teacher},
                { model : student },
                { model : classes },
            ]
        }).then(result => {
        res.render('school.ejs', { 
            schools : result.rows,
            current : page,
            pages : Math.ceil(result.count / size) 
        })
    })
})

router.get("/class/:page", async (req, res) => {
    const page = parseInt(req.params.page) || 0
    const size = 9

    await classes.findAndCountAll({
        limit : size,
        offset : page * size,
            include : [
                { model : student },
                { model : teacher },
                { model : school },
                { model: subject }
            ]
        }).then(result => {
        res.render('class.ejs', { 
            classes : result.rows,
            current : page,
            pages : Math.ceil(result.count / size) 
        })
    })
})

router.get("/student/:page", async (req, res) => {
    const page = parseInt(req.params.page) || 0
    const size = 9

    await student.findAndCountAll({
        limit : size,
        offset : page * size,
            include : [
                {model : school},
                {model : classes, include : [{ model: subject, include : [{model : teacher}]}]},
                // {model : subject},
                //  include : [ { model: teacher } ] }
            ]
        }).then(result => {
        res.render('student.ejs', { 
            students : result.rows,
            current : page,
            pages : Math.ceil(result.count / size) 
        })
    })
})

router.get("/teacher/:page", async (req, res) => {
    const page = parseInt(req.params.page) || 0
    const size = 9

    await teacher.findAndCountAll({
        limit : size,
        offset : page * size,
            include : [ 
                { model : school, include : [{ model : classes, include: [{model: subject}]}] },
                // { model : classes },
                // { model : subject }
            ]
        }).then(result => {
        res.render('teacher.ejs', { 
            teachers : result.rows,
            current : page,
            pages : Math.ceil(result.count / size) 
        })
    })
})

router.get("/schoolform", (req, res) => {
    res.render('schoolform.ejs')
})

router.get("/classlform", async (req, res) => {
    await school.findAll().then(result => {
        res.render('classform.ejs', {schools : result})
    })
})

router.get("/subjectform", async (req, res) => {
    await classes.findAll().then(result => {
        res.render('subjectform.ejs', {classes : result})
    })
})

router.get("/teacherform", async (req, res) => {
    const cls = await classes.findAll()
    const sch = await school.findAll()
    const sub = await subject.findAll()

    res.render('teacherform.ejs', {
        classes : cls,
        schools : sch,
        subjects : sub
    })
})
router.get("/studentform", async (req, res) => {
    const cls = await classes.findAll()
    const sch = await school.findAll()
    const sub = await subject.findAll()

    res.render('studentform.ejs', {
        classes : cls,
        schools : sch,
        subjects : sub
    })
})



router.get("/rough", async (req, res) => {
    await school.findAll().then(result => {
        console.log(result[0].name)
        res.render('rough.ejs', {schools : result})
    })
//     <form action="/test" method="post">
//     <h1>Dropaown</h1>
//     <select id="volume" name="school">
//       <% for(let i=0; i<schools.length; i++){ %>
//         <option value="<%= schools[i].id %>"> <%= schools[i].name %></option>
//       <% } %>
//     </select>
//     <button type="submit">Submit</button>
//   </form>
})

module.exports = router