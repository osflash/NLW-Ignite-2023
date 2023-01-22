import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

import dayjs from 'dayjs'
import { z } from 'zod'

import { onError } from '~/erros/onError'
import { prisma } from '~/services/prisma'
import { getServerSession } from '~/utils/next-auth'

const handler = nc<NextApiRequest, NextApiResponse>({ onError })

handler.patch(async (req, res) => {
  const toggleHabitParams = z.object({
    id: z.string().uuid()
  })

  const { id } = toggleHabitParams.parse(req.query)

  const today = dayjs().startOf('day').toDate()

  const session = await getServerSession(req, res)

  if (!session) {
    throw new Error('habit')
  }

  const habit = await prisma.habit.findFirst({
    where: { id, user_id: session.user.id! }
  })

  if (!habit) {
    throw new Error('habit')
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

  const dayHabit = await prisma.dayHabit.findUnique({
    where: {
      day_id_habit_id: {
        day_id: day.id,
        habit_id: id
      }
    }
  })

  if (dayHabit) {
    res.status(200).json(
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    )
  } else {
    res.status(200).json(
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    )
  }
})

export default handler
