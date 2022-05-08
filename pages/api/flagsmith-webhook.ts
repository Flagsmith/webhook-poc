// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log(Object.keys(req.body))
    console.log(req.body.action, "ACTION")
    console.log(req.body.changes, "CHANGES")
    console.log(req.body.comment, "COMMENT")
    res.status(200).json({ name: 'John Doe' })
}
