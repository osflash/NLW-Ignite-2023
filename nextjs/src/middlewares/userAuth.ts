import type { NextApiRequest, NextApiResponse } from 'next'
import { Middleware } from 'next-connect'

import { prisma } from '~/services/prisma'
import { getServerSession } from '~/utils/next-auth'

export const userAuth: Middleware<NextApiRequest, NextApiResponse> = async (
  req,
  res,
  next
) => {
  try {
    const session = await getServerSession(req, res)

    if (!session?.user?.id) {
      return res.status(401).end({ message: 'Não autorizado!' })
    }

    next()
  } catch (err) {
    return res.status(401).end({ message: 'Não autorizado!' })
  }
}
