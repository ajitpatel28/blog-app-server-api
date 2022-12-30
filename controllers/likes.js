const { Prisma, PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const getAllLikes = async (req, res) => {
  try {
    const likes = await prisma.like.findMany({
      
    })
    res.json(likes)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


const createLike = async (req, res) => { 
  try {
    const like = await prisma.like.create({
      data: {
        ...req.body,
      }
    })
    res.json(like)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const updateLike = async (req, res) => {
  try {
    const { id } = req.params;
    const like = await prisma.like.update({
      where: { id: Number(id) },
      data: req.body
    });
    if (like) {
      const updatedLike = await prisma.like.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          likename: true,
          email: true
        }
      });
      return res.status(200).json(updatedLike)
    } throw new Error('Like not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

const deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.like.delete({
      where: { id: Number(id) }
    });
    if (deleted) {
      return res.status(204).send('Like deleted');
    }
    throw new Error('Like not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllLikes,
  createLike,
  updateLike,
  deleteLike
}
