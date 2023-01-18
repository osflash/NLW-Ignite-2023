import classNames from 'classnames'

interface HabitDayProps {
  completed?: number
  placehold?: boolean
}

export const HabitDay: React.FC<HabitDayProps> = ({ placehold }) => {
  const cx = classNames(
    'w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg',
    { 'opacity-40 cursor-not-allowed': placehold }
  )

  return <div className={cx}></div>
}
