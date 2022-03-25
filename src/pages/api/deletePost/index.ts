import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.body

  try {
    const result = await prisma.post.delete({
      where: {
        id: id,
      },
    })
    return response.json('Success')
  } catch (error: any) {
    response.json(error.message)
  }
}
