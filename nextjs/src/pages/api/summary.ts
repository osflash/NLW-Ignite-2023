import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { z } from 'zod'

import { onError } from '~/erros/onError'
import { userAuth } from '~/middlewares/userAuth'
import { prisma } from '~/services/prisma'
import { getServerSession } from '~/utils/next-auth'

const handler = nc<NextApiRequest, NextApiResponse>({ onError })

handler.use(userAuth)

handler.get(async (req, res) => {
  // const session = await getServerSession(req, res)
  const getDayParams = z.object({
    user: z.string()
  })

  const { user } = getDayParams.parse(req.query)

  // if (!session) {
  //   throw new Error('session')
  // }

  const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            ON H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
            AND H.user_id = ${user}
        ) as amount
      FROM days D
      WHERE D.user_id = ${user}
    `

  res.status(200).json(summary)
})

export default handler
