const { teacher, classes, school, subject } = require('../models');

exports.getteacher = async (req, res, next, id) => {
    await teacher.findByPk(id,
        {
            include : [ 
                { model : school, include : [{ model : classes, include: [{model: subject}]}] },
                // { model : classes },
                // { model : subject }
            ]
        }).then(teacher => {
        if(teacher){
            req.teacher = teacher;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "teacher does not exists."
        })
    })
}

exports.create = async (req, res) => {
    await teacher.create(req.body).then(teacher => {
        return res.render('dashboard.ejs')
        res.status(200).json({
            success: true,
            message: 'teacher added successfully',
            result: teacher
        })
    }).catch(error => {
        return res.render('404page.ejs', {  
            message : "Something went wrong while adding the school"
        })
        res.status(400).json({
            success: false,
            message: 'Something went wrong while adding the teacher',
            Error: error 
        })
    })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "teacher fetched successfully.",
            result: req.teacher
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching teacher.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    await teacher.findAll({
        include : [ 
            { model : school },
            { model : classes },
            { model : subject }
        ]
    })
    .then(teacher => {
        if(teacher.length){
            res.status(200).json({
                success: true,
                message: 'All teacher fetched successfully',
                result: teacher
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No teacher found',
                result: teacher
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching teacher',
                Error: error
            })
        })
}


exports.update = async (req, res) => {
    await teacher.update(req.body, {where: {id: req.params.teacherId}})
    .then(teacher => {
        res.status(200).json({
            success: true,
            message: "teacher updated successfully",
            result: teacher
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing teacher",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await teacher.destroy({where: {id: req.params.teacherId}})
    .then(teacher => {
        res.status(200).json({
            success: true,
            message: "teacher deleted successfully",
            result: teacher
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting teacher",
            Error: error
        })
    })
}