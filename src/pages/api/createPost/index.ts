import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { content, title, username } = request.body

  try {
    const createPost = await prisma.post.create({
      data: {
        content: content,
        title: title,
        username: username,
      },
      include: {
        User: true,
      },
    })
    return response.json(createPost)
  } catch (error: any) {
    return response.json(error.message)
  }
}
