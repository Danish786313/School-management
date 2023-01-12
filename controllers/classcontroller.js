const { classes, student, teacher, subject, school } = require('../models')

exports.getclass = async (req, res, next, id) => {
    await classes.findByPk(id, {
        include : [
            { model : student },
            { model : teacher },
            { model : school },
            { model: subject }
        ]
    }).then(result => {
        if(result){
            req.classes = result;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "Class does not exists."
        })
    })
}

exports.create = async (req, res) => {
    await classes.create(req.body).then(clas => {
        return res.render('dashboard.ejs')
        res.status(200).json({
            success: true,
            message: 'Class added successfully',
            result: clas
        })
    }).catch(error => {
        return res.render('404page.ejs', {  
            message : "Something went wrong while adding the Class"
        })
        res.status(400).json({
            success: false,
            message: 'Something went wrong while adding the Class',
            Error: error 
        })
    })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Class fetched successfully.",
            result: req.classes
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching Class.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    await classes.findAll({
        include : [
            { model : student },
            { model : teacher },
            { model : school },
            { model: subject }
        ]
    })
    .then(clas => {
        if(clas.length){
            res.status(200).json({
                success: true,
                message: 'All Class fetched successfully',
                result: clas
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No class found',
                result: clas
            })
        }
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: 'Something went wrong while fetching Class',
            Error: error
        })
    })
}


exports.update = async (req, res) => {
    await classes.update(req.body, {where: {id: req.params.classId}})
    .then(clas => {
        res.status(200).json({
            success: true,
            message: "Class updated successfully",
            result: clas
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing Class",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await classes.destroy({where: {id: req.params.classId}})
    .then(clas => {
        res.status(200).json({
            success: true,
            message: "Class deleted successfully",
            result: clas
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting Class",
            Error: error
        })
    })
}