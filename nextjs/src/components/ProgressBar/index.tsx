import * as Progress from '@radix-ui/react-progress'

interface ProgressBarProps {
  progress?: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress = 0 }) => {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 w-full mt-4">
      <Progress.Root value={progress} className="relative overflow-hidden">
        <Progress.Indicator
          role="progressbar"
          aria-label="Progresso de hábitos completados nesse dia"
          aria-valuenow={progress}
          className="h-3 rounded-xl bg-violet-600 transition-all"
          style={{ width: `${progress}%` }}
        />
      </Progress.Root>
    </div>
  )
}
