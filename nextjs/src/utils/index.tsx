import { createClient } from '@vercel/edge-config'
import dayjs from 'dayjs'

export const edgeConfig = createClient(
  `https://edge-config.vercel.com/ecfg_eh6zdvznm70adch6q0mqxshrt4ny?token=64aef40c-ea06-4aeb-b528-b94d924ec05a`
)

export const getBlackListedEmails = async () => {
  try {
    const emails = await edgeConfig.get('emails')

    if (emails) {
      return new Set(emails)
    } else {
      return new Set()
    }
  } catch (e) {
    return new Set()
  }
}

export const generateDatesFromYearBeginning = () => {
  const firstDayOfTheYear = dayjs().startOf('year')
  const today = new Date()

  const dates = []
  let compareDate = firstDayOfTheYear

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  return dates
}

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
  return `http://localhost:${process.env.PORT ?? 3000}`
}
