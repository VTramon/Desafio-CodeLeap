import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { username } = request.body

  try {
    const validating = await prisma.user.findFirst({
      where: {
        username: username,
      },
    })

    if (!!validating) {
      const result = await prisma.user.create({
        data: {
          username: username,
        },
      })
      return response.json('Success')
    }
  } catch (error: any) {
    response.json(error.message)
  }
}
