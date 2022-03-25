import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { text, title, userId } = request.body

  try {
    const createPost = await prisma.post.create({
      data: {
        text: text,
        title: title,
        userId: userId,
      },
      include: {
        User: true,
      },
    })
    return response.json('Success')
  } catch (error: any) {
    return response.json(error.message)
  }
}
