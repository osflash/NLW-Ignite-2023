export const HabitEmpty: React.FC = () => {
  const handleClick = () => {
    //
  }
  return <div />

  return (
    <p className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum hábito{' '}
      <p
        className="text-violet-400 text-base underline active:text-violet-500"
        onClick={handleClick}
      >
        comece cadastrando um.
      </p>
    </p>
  )
}
