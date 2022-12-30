const { Prisma, PrismaClient } = require('@prisma/client');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
    })
    res.status(200).json(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        username: true,
        email: true,
        likes: true
      }
    })
    res.status(200).json(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await prisma.user.create({
      data: {
        ...req.body,
        password: hashedPassword
      },
      select: {
        id: true,
        email: true,
        isAdmin: true,
        username: true
      }
    })
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_KEY)
    res.status(200).json({ accessToken: accessToken, user: user })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: req.body
    });
    if (user) {
      const updatedUser = await prisma.user.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          username: true,
          email: true
        }
      });
      return res.status(200).json(updatedUser)
    } throw new Error('User not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.user.delete({
      where: { id: Number(id) }
    });
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}