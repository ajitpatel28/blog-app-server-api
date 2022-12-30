const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const userData = [
  {
    id: -1,
    email: 'kyle@email.com',
    username: 'kyletest',
    password: '123456'
  },
  {
    id: -2,
    email: 'test@email.com',
    username: 'guesttest',
    password: '654321'
  }
]

const postData = [
  {
    id: -1,
    title: 'Test Post 1',
    content: 'I am testing out this post data',
    published: true,
    userId: -1,
  },
  {
    id: -2,
    title: 'Test Post 2',
    content: 'I am testing out this post data.',
    published: true,
    userId: -2,
  }
]

const commentData = [
  {
    id: -1,
    content: 'I am a test comment',
    postId: -1,
    userId: -1,
  },
  {
    id: -2,
    content: 'I am a another test comment',
    postId: -1,
    userId: -1,
  },
  {
    id: -3,
    content: 'I am, again, another test comment',
    postId: -2,
    userId: -2,
  }
]

const likeData = [
  {
    id: -1,
    postId: -1,
    userId: -1
  },
  {
    id: -2,
    commentId: -1,
    userId: -2
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const u of postData) {
    const post = await prisma.post.create({
      data: u
    })
    console.log(`Created post with id: ${post.id}`)
  }
  for (const u of commentData) {
    const comment = await prisma.comment.create({
      data: u
    })
    console.log(`Created comment with id: ${comment.id}`)
  }
  for (const u of likeData) {
    const like = await prisma.like.create({
      data: u
    })
    console.log(`Created like with id: ${like.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
