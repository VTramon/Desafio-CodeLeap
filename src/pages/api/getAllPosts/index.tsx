import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const result = await prisma.post.findMany()
    return response.json(result)
  } catch (error: any) {
    response.json(error.message)
  }
}
