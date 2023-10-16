const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(req.body.password, salt)

  // Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword
  })

  try {
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (err) {
    res.status(400).send(err)
  }
}

exports.login = async (req, res) => {
  // Check if email exists
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('Email not found')

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) return res.status(400).send('Invalid password')

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
}
