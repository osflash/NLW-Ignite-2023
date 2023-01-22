import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import dayjs from 'dayjs'
import { z } from 'zod'

import { onError } from '~/erros/onError'
import { prisma } from '~/services/prisma'

const handler = nc<NextApiRequest, NextApiResponse>({ onError })

handler.get(async (req, res) => {
  const getDayParams = z.object({
    user: z.string(),
    date: z.coerce.date()
  })

  const { date, user } = getDayParams.parse(req.query)

  const parsedDate = dayjs(date).startOf('day')
  const weekDay = parsedDate.get('day')

  const possibleHabits = await prisma.habit.findMany({
    where: {
      user_id: user,
      created_at: {
        lte: date
      },
      weekDays: {
        some: {
          week_day: weekDay
        }
      }
    }
  })

  const day = await prisma.day.findFirst({
    where: {
      date: parsedDate.toDate(),
      user_id: user
    },
    include: {
      dayHabits: true
    }
  })

  const completedHabits =
    day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    }) ?? []

  res.status(200).json({ possibleHabits, completedHabits })
})

export default handler
