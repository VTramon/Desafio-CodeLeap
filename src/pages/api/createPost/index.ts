import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { text, title, owner } = request.body

  console.log(request.body)
  try {
    const createPost = await prisma.post.create({
      data: {
        text: text,
        title: title,
        owner: owner,
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
