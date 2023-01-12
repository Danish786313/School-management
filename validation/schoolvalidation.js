const { body } = require('express-validator');
const { school } = require("../models");

exports.createschoolValidation = (req, res) => {
  return [
    body('name', 'Name is Required').notEmpty().trim(),
    body('address', 'address is Required').notEmpty().trim(),
    body('email', 'email is Required').notEmpty().trim(),
    body('number', 'number is Required').notEmpty().trim(),
    body('number').custom(async value => {
      return await school.findOne({ where: { name: value }, raw: true }).then(name => {
        if (name) {
          return Promise.reject('School Already Exist')
        }
      })
    })
  ]
}
