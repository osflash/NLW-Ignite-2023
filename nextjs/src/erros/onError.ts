import type { NextApiRequest, NextApiResponse } from 'next'
import type { ErrorHandler } from 'next-connect'

import { z } from 'zod'

type OnErrorProps = ErrorHandler<NextApiRequest, NextApiResponse>

export const onError: OnErrorProps = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    return res.status(401).json({ errors: err.errors })
  }

  if (err instanceof Error) {
    return res.status(401).json({ error: err.message })
  }

  res.status(401).json(err)
}
