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
    const { postId } = req.body;
    const Post = await prisma.post.findUnique({ where: { id:postId } });
    const comment = await prisma.comment.create({
      data: {
        content: req.body.content,
        user: { connect: { id: req.user.id } },
        post: { connect: { id: Post.id } }

      },
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
      data: {
        content: req.body.content

      }
    });
    if (comment) {
      const updatedComment = await prisma.comment.findUnique({
        where: {
          id: Number(id)
        },
        select: {
          content:true
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
