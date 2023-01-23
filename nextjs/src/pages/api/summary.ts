import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import { z } from 'zod'

import { onError } from '~/erros/onError'
import { userAuth } from '~/middlewares/userAuth'
import { prisma } from '~/services/prisma'

const getSummary = z
  .object({
    id: z.string(),
    date: z.date(),
    completed: z.bigint().transform(value => Number(value)),
    amount: z.any().transform(value => Number(value))
  })
  .array()

const handler = nc<NextApiRequest, NextApiResponse>({ onError })

handler.use(userAuth)

handler.get(async (req, res) => {
  const getDayParams = z.object({
    user: z.string()
  })

  const { user } = getDayParams.parse(req.query)
  /*
  const summary = await prisma.$queryRaw`
      SELECT
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
            -- cast(count(*))
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
            -- cast(count(*))
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
 */

  const summary = await prisma.$queryRaw`
    SELECT
      D.id,
      D.date,
      (
        SELECT
          COUNT(*)
        FROM day_habits DH
        WHERE DH.day_id = D.id
      ) as completed,
      (
        SELECT
          COUNT(*)
        FROM habit_week_days HWD
        JOIN habits H
          ON H.id = HWD.habit_id
        WHERE
          HWD.week_day = DAYNAME(D.date)
          AND H.created_at <= D.date
          AND H.user_id = ${user}
      ) as amount
    FROM days D
    WHERE D.user_id = ${user}
  `

  res.status(200).json(getSummary.parse(summary))
})

export default handler
