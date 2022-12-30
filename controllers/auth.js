const { Prisma, PrismaClient } = require('@prisma/client')
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

const loginUser = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.body.email },
  })
  if (user == null) {
    return res.status(400).json({ error: "Cannot find user" })
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY)
      res.status(200)
      res.json({ accessToken: accessToken })
    } else {
      res.status(401).send("Incorrect Email or Password")
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send("Invalid Token")

  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, { expiresIn: '24h' }, (err, user) => {
    if (err) return res.status(403).send(err.message)
    req.user = user
    next()
  })
}

const verifyTokenUser = async (req, res) => {
  if (req.headers) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.send(401).send("Invalid Token")
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
      const userId = decoded.id;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId)
        },
        select: {
          id: true,
          email: true,
          isAdmin: true,
          username: true,
          likes: true
        }
      });
      if (user) {
        return res.status(200).json({ user });
      }
    } catch (e) {
      return res.status(401).send('Unauthorized');
    }
    return res.status(404).send('User with the specified ID does not exist');
  }
  return res.send(500);
}




module.exports = {
  loginUser,
  authenticateToken,
  verifyTokenUser
}