import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { content, title, id } = request.body

  try {
    const result = await prisma.post.update({
      data: {
        content: content,
        title: title,
      },
      where: {
        id: id,
      },
    })
    return response.json(result.id)
  } catch (error: any) {
    response.json(error.message)
  }
}
