const { body } = require('express-validator');
const { classes } = require("../models");

exports.createclassValidation = (req, res) => {
  return [
    body('name', 'Name is Required').notEmpty().trim(),
    body('school_id', 'school is Required').notEmpty().trim(),
    body('name').custom(async value => {
      return await classes.findOne({ where: { name: value }, raw: true }).then(name => {
        if (name) {
          return Promise.reject('class Already Exist')
        }
      })
    })
  ]
}
