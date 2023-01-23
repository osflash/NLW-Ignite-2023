import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  const message = !!process.env.DATABASE_URL_BACKUP

  res.status(200).send(message)
})
