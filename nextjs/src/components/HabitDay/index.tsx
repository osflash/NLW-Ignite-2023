import { useState } from 'react'

import * as Popover from '@radix-ui/react-popover'
import classNames from 'classnames'
import dayjs from 'dayjs'

import { HabitsList } from '../HabitsList'
import { ProgressBar } from '../ProgressBar'

interface HabitDayProps {
  date?: Date
  defaultCompleted?: number
  amount?: number
  placeholder?: boolean
}

export const HabitDay: React.FC<HabitDayProps> = ({
  defaultCompleted = 0,
  amount = 0,
  date,
  placeholder
}) => {
  const [completed, setCompleted] = useState(defaultCompleted)

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0

  const parsedDate = dayjs(date)
  const dayOfWeek = parsedDate.format('dddd')
  const dayAndMonth = parsedDate.format('DD/MM')
  const today = dayjs().startOf('day').toDate()
  const isCurrentDay = parsedDate.isSame(today)

  const handleCompletedChanged = (completed: number) => {
    setCompleted(completed)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        className={classNames(
          'w-10 h-10 border-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background',
          {
            'bg-zinc-900 border-zinc-800': completedPercentage === 0,
            'bg-violet-900 border-violet-700':
              completedPercentage > 0 && completedPercentage < 20,
            'bg-violet-800 border-violet-600':
              completedPercentage >= 20 && completedPercentage < 40,
            'bg-violet-700 border-violet-500':
              completedPercentage >= 40 && completedPercentage < 60,
            'bg-violet-600 border-violet-500':
              completedPercentage >= 60 && completedPercentage < 80,
            'bg-violet-500 border-violet-400': completedPercentage >= 80,
            'border-white border-2': isCurrentDay
          },
          { 'opacity-40 cursor-not-allowed': placeholder }
        )}
        disabled={placeholder}
      />

      <Popover.Portal>
        <Popover.Content className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col">
          <span className="font-semibold text-zinc-400">{dayOfWeek}</span>
          <span className="mt-1 font-extrabold leading-tight text-3xl">
            {dayAndMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          {date && (
            <HabitsList
              date={date}
              onCompletedChanged={handleCompletedChanged}
            />
          )}
          <Popover.Arrow className="fill-zinc-900" height={8} width={16} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
