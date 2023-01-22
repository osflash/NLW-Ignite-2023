import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import dayjs from 'dayjs'
import { z } from 'zod'

import { generateDatesFromYearBeginning } from '~/utils'

import { HabitDay } from '../HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7 // 18 weeks
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

const summarySchema = z
  .object({
    id: z.string(),
    date: z.date(),
    amount: z.number(),
    completed: z.number()
  })
  .array()

type SummaryInput = z.input<typeof summarySchema>

export const SummaryTable: React.FC = () => {
  const [summary, setSummary] = useState<SummaryInput>([])
  const { status } = useSession()

  const router = useRouter()
  const userId = router.query['user']

  useEffect(() => {
    if (status !== 'authenticated') return

    fetch(`api/summary?user=${userId}`)
      .then(res => res.json())
      .then(data => setSummary(data))
  }, [status, userId])

  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 gap-3">
        {weekDays.map((weekDay, i) => (
          <div
            key={`${weekDay}-${i}`}
            className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center"
          >
            {weekDay}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summary.length > 0 &&
          summaryDates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date) // fix
            })

            return (
              <HabitDay
                key={date.toISOString()}
                date={date}
                amount={dayInSummary?.amount}
                defaultCompleted={dayInSummary?.completed}
              />
            )
          })}

        {amountOfDaysToFill > 0 &&
          Array.from({ length: amountOfDaysToFill }).map((_, i) => {
            return <HabitDay key={i} placeholder />
          })}
      </div>
    </div>
  )
}
