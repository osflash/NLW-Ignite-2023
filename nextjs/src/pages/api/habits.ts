import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import dayjs from 'dayjs'
import { z } from 'zod'

import { onError } from '~/erros/onError'
import { userAuth } from '~/middlewares/userAuth'
import { prisma } from '~/services/prisma'
import { getServerSession } from '~/utils/next-auth'

const handler = nc<NextApiRequest, NextApiResponse>({ onError })

handler.use(userAuth)

handler.post(async (req, res) => {
  const createHabitBody = z.object({
    title: z.string(),
    weekDays: z.array(z.number().min(0).max(6))
  })

  const { title, weekDays } = createHabitBody.parse(req.body)

  const today = dayjs().startOf('day').toDate()

  const session = await getServerSession(req, res)

  if (!session) {
    throw new Error('session')
  }

  let day = await prisma.day.findFirst({
    where: {
      date: today,
      user_id: session.user.id!
    }
  })

  if (!day) {
    day = await prisma.day.create({
      data: {
        date: today,
        user_id: session.user.id!
      }
    })
  }

  const response = await prisma.habit.create({
    data: {
      title,
      created_at: today,
      user_id: session.user.id!,
      weekDays: {
        create: weekDays.map(weekDay => {
          return {
            week_day: weekDay
          }
        })
      }
    }
  })

  res.status(200).json(response)
})

export default handler
