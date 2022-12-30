const { Prisma, PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const getAllComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      select: {
        id : true,
        content: true,
        user: {
          select: {
            username: true,
          }
        },
        post: true
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await prisma.comment.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        content: true,
      }
    })
    res.status(200).json(comments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const createComment = async (req, res) => { 
  try {
    const comment = await prisma.comment.create({
      data: {
        ...req.body,
      }
    })
    res.status(200).json(comment)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await prisma.comment.update({
      where: { id: Number(id) },
      data: req.body
    });
    if (comment) {
      const updatedComment = await prisma.comment.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          commentname: true,
          email: true
        }
      });
      return res.status(200).json(updatedComment)
    } throw new Error('Comment not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.comment.delete({
      where: { id: Number(id) }
    });
    if (deleted) {
      return res.status(204).send('Comment deleted');
    }
    throw new Error('Comment not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
}