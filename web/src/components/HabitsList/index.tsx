import * as Checkbox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs'
import { Check } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { api } from '../../services/axios'
import { HabitEmpty } from '../HabitEmpty'

interface HabitsListProps {
  date: Date
  onCompletedChanged: (completed: number) => void
}

const habitsInfoSchema = z.object({
  possibleHabits: z
    .object({
      id: z.string(),
      title: z.string(),
      created_at: z.string()
    })
    .array(),
  completedHabits: z.array(z.string())
})

type habitsInfoInput = z.input<typeof habitsInfoSchema>

export const HabitsList: React.FC<HabitsListProps> = ({
  date,
  onCompletedChanged
}) => {
  const [habitsInfo, setHabitsInfo] = useState<habitsInfoInput>()

  useEffect(() => {
    api
      .get('day', {
        params: {
          date: date.toISOString()
        }
      })
      .then(response => setHabitsInfo(response.data))
  }, [])

  const handleToggleHabit = async (habitId: string) => {
    await api.patch(`habits/${habitId}/toggle`)

    const isHabitAlreadyCompleted =
      habitsInfo?.completedHabits.includes(habitId)

    let completedHabits: string[] = []

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId]
    }

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits
    })

    onCompletedChanged(completedHabits.length)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date())

  return (
    <div className="mt-6 flex flex-col gap-3">
      {habitsInfo?.possibleHabits.length ? (
        habitsInfo?.possibleHabits.map(habit => (
          <Checkbox.Root
            key={habit.id}
            onCheckedChange={() => handleToggleHabit(habit.id)}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInPast}
            className="flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed"
          >
            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-background">
              <Checkbox.Indicator>
                <Check size={20} className="text-white" />
              </Checkbox.Indicator>
            </div>

            <span className="font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400">
              {habit.title}
            </span>
          </Checkbox.Root>
        ))
      ) : (
        <HabitEmpty />
      )}

      {isDateInPast && (
        <p className="text-white mt-5 text-center flex-wrap">
          Você não pode editar hábitos de uma data passada.
        </p>
      )}
    </div>
  )
}
