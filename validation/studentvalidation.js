const { body } = require('express-validator');
const { student, subject, teacher } = require("../models");

exports.createstudentValidation = (req, res) => {
  return [
    body('firstname', 'Name is Required').notEmpty().trim(),
    body('lastname', 'address is Required').notEmpty().trim(),
    body('email', 'email is Required').notEmpty().trim(),
    body('address', 'address is Required').notEmpty().trim(),
    body('number', 'number is Required').notEmpty().trim(),
    body('classes_id', 'class is Required').notEmpty().trim(),
    body('school_id', 'school is Required').notEmpty().trim(),
    body('subject_id', 'subject is Required').notEmpty().trim(),

    // body().custom(async (value,{req}) => { 
    //   if (req.body.subject_id) {
    //     await subject.findByPk(req.body.subject_id, {include : [{ model : teacher}]}).then(() => {
    //       return Promise.reject('Subject is not associate with teacher')
    //     })
    //   }
    // }),

    body('number').custom(async value => {
      return await student.findOne({ where: { number: value }, raw: true }).then(name => {
        if (name) {
          return Promise.reject('Student Already Exist')
        }
      })
    })
  ]
}
