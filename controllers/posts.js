const { Prisma, PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        },
      ],
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        user: {
          select: {
            username: true,
            id: true
          }
        },
        likes: {
          select: {
            id: true,
            userId: true,
            postId: true,
            commentId: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          },
        }
      },

    })
    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        comments: {
          orderBy: [
            {
              createdAt: 'desc'
            },
          ],
          select: {
            id: true,
            content: true,
            createdAt: true,
            user: true,
            _count: true
          }
        },
        user: {
          select: {
            username: true,
            id: true
          }
        },
        likes: true,
        _count: {
          select: {
            likes: true,
            comments: true
          },
        }
      }
    })
    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const createPost = async (req, res) => {
  try {
    const post = await prisma.post.create({
      data: {
        ...req.body,
        
      }
    })
    res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.update({

      where: { id: Number(id) },
      data: {
        title: req.body.title,
        content: req.body.content

      }
    });
    if (post) {
      const updatedPost = await prisma.post.findUnique({
        where: {
          id: Number(id)
        }
      });
      return res.status(200).json(updatedPost)
    } throw new Error('Post not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await prisma.post.delete({
      where: { id: Number(id) }
    });
    if (deleted) {
      return res.status(204).send('Post deleted');
    }
    throw new Error('Post not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
}