const { body, validationResult } = require('express-validator');

const userValidationRules = [
  body('email')
    .isLength({ min: 1 })
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('username')
    .isLength({ min: 1 })
    .withMessage('Username cannot be blank'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.')
]

const loginValidationRules = [
  body('email')
    .isLength({ min: 1 })
    .withMessage('Email cannot be blank'),
  body('email')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password')
    .isLength({ min: 1 })
    .withMessage('Password cannot be blank')
]

const postValidationRules = [
  body('title')
    .isLength({ min: 1 })
    .withMessage('Title cannot be blank'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content cannot be blank'),
]

const commentValidationRules = [
  body('content')
    .isLength({ min: 1 })
    .withMessage('Comment cannot be blank'),
]

const simpleValidation = validationResult.withDefaults({
  formatter: err => err.msg
})

const checkErrors = (req, res, next) => {
  const errors = simpleValidation(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped())
  }
  next()
}

module.exports = {
  userValidationRules,
  postValidationRules,
  commentValidationRules,
  loginValidationRules,
  checkErrors
}