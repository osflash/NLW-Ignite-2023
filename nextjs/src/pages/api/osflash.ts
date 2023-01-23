import type { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'

const handler = nc<NextApiRequest, NextApiResponse>()

const message = !!process.env.DATABASE_URL_BACKUP

handler.get(async (req, res) => {
  res.status(200).send(message)
})
