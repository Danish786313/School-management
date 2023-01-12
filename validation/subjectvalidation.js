const { body } = require('express-validator');
const { subject } = require("../models");

exports.createsubjectValidation = (req, res) => {
  return [
    body('name', 'Name is Required').notEmpty().trim(),
    body('classes_id', 'class is Required').notEmpty().trim(),
    body('name').custom(async value => {
      return await subject.findOne({ where: { name: value }, raw: true }).then(name => {
        if (name) {
          return Promise.reject('Subject Already Exist')
        }
      })
    })
  ]
}
