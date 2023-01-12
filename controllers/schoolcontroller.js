const { school, teacher, student, classes, subject } = require('../models')

exports.getschool = async (req, res, next, id) => {
    await school.findByPk(id, {
        include : [
            {model : school},
            {model : classes, include : [{ model: subject, include : [{model : teacher}]}]},
            // {model : subject},
            //  include : [ { model: teacher } ] }
        ]
    }).then(school => {
        if(school){
            req.school = school;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "School does not exists."
        })
    })
}

exports.create = async (req, res) => {
    await school.create(req.body).then(school => {
        return res.render("dashboard.ejs")
        res.status(200).json({
            success: true,
            message: 'School added successfully',
            result: school
        })
    }).catch(error => {
        return res.render('404page.ejs', {  
            message : "Something went wrong while adding the school"
        })
        res.status(400).json({
            success: false,
            message: 'Something went wrong while adding the school',
            Error: error 
        })
    })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "school fetched successfully.",
            result: req.school
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching school.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    await school.findAll(
        {
        include : [
            { model : teacher},
            { model : student },
            { model : classes },
        ]
    })
    .then(school => {
        if(school.length){
            res.status(200).json({
                success: true,
                message: 'All school fetched successfully',
                result: school
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No school found',
                result: school
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching school',
                Error: error
            })
        })
}


exports.update = async (req, res) => {
    await school.update(req.body, {where: {id: req.params.schoolId}})
    .then(school => {
        res.status(200).json({
            success: true,
            message: "school updated successfully",
            result: school
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing school",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await school.destroy({where: {id: req.params.schoolId}})
    .then(school => {
        res.status(200).json({
            success: true,
            message: "school deleted successfully",
            result: school
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting school",
            Error: error
        })
    })
}