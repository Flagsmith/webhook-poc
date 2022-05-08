// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log(req.body)
    // Step 1: Create issue comment from flagsmith bot with feature state
    res.status(200).json({ name: 'John Doe' })
}
