const { subject, classes, school } = require('../models')

exports.getsubject = async (req, res, next, id) => {
    await subject.findByPk(id, {
        include : [
            { model : classes, 
             include : [{ model : school }]}
        ]
    }).then(subject => {
        if(subject){
            req.subject = subject;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "subject does not exists."
        })
    })
}

exports.create = async (req, res) => {
    await subject.create(req.body).then(subject => {
        return res.render('dashboard.ejs')
        res.status(200).json({
            success: true,
            message: 'subject added successfully',
            result: subject
        })
    }).catch(error => {
        return res.render('404page.ejs', {  
            message : "Something went wrong while adding the school"
        })
        res.status(400).json({
            success: false,
            message: 'Something went wrong while adding the subject',
            Error: error 
        })
    })
}

exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully.",
            result: req.subject
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching subject.",
            Error: error
        })
    }
}

exports.findAll = async (req, res) => {
    await subject.findAll({
        include : [
            { model : classes}
        ]
    })
    .then(subject => {
        if(subject.length){
            res.status(200).json({
                success: true,
                message: 'All subject fetched successfully',
                result: subject
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No subject found',
                result: subject
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching subject',
                Error: error
            })
        })
}


exports.update = async (req, res) => {
    await subject.update(req.body, {where: {id: req.params.subjectId}})
    .then(subject => {
        res.status(200).json({
            success: true,
            message: "subject updated successfully",
            result: subject
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing subject",
            Error: error
        })
    })
}

exports.delete = async (req, res) => {
    await subject.destroy({where: {id: req.params.subjectId}})
    .then(subject => {
        res.status(200).json({
            success: true,
            message: "subject deleted successfully",
            result: subject
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting subject",
            Error: error
        })
    })
}