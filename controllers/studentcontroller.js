const { student , school, classes, subject, teacher } = require('../models');

exports.studentId = async (req, res, next, id) => {
    await student.findByPk(id,
        {
            include : [
                {model : school},
                {model : classes},
                {model : subject,
                 include : [ { model: teacher } ] }
            ]
        }).then(student => {
        if(student){
            req.student = student;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "student does not exists."
        })
    })
}

exports.create = async (req, res) => {
    await student.create(req.body).then(student => {
        return res.render('dashboard.ejs')
        res.status(200).json({
            success: true,
            message: 'student added successfully',
            result: student
        })
    }).catch(error => {
        return res.render('404page.ejs', {  
            message : "Something went wrong while adding the school"
        })
        res.status(400).json({
            success: false,
            message: 'Something went wrong while adding the student',
            Error: error 
        })
    })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "student fetched successfully.",
            result: req.student
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching student.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    await student.findAll({
        include : [
            {model : school},
            {model : classes, include : [{ model: subject, include : [{model : teacher}]}]},
            // {model : subject},
            //  include : [ { model: teacher } ] }
        ]
    })
    .then(student => {
        if(student.length){
            res.status(200).json({
                success: true,
                message: 'All student fetched successfully',
                result: student
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No student found',
                result: student
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching student',
                Error: error
            })
        })
}


exports.update = async (req, res) => {
    await student.update(req.body, {where: {id: req.params.studentId}})
    .then(student => {
        res.status(200).json({
            success: true,
            message: "student updated successfully",
            result: student
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing student",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await student.destroy({where: {id: req.params.studentId}})
    .then(student => {
        res.status(200).json({
            success: true,
            message: "student deleted successfully",
            result: student
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting student",
            Error: error
        })
    })
}