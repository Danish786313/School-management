const { body } = require('express-validator');
const { teacher } = require("../models");

exports.createteacherValidation = (req, res) => {
  return [
    body('name', 'Name is Required').notEmpty().trim(),
    body('email', 'email is Required').notEmpty().trim(),
    body('address', 'address is Required').notEmpty().trim(),
    body('phone', 'number is Required').notEmpty().trim(),
    body('classes_id', 'class is Required').notEmpty().trim(),
    body('school_id', 'school is Required').notEmpty().trim(),
    body('subject_id', 'subject is Required').notEmpty().trim(),
    body('phone').custom(async value => {
      return await teacher.findOne({ where: { name: value }, raw: true }).then(name => {
        if (name) {
          return Promise.reject('Teacher Already Exist')
        }
      })
    })
  ]
}
