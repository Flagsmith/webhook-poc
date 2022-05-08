// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchEnvironments from "../../fetch-environments";
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetchEnvironments("7087")
      .then((json)=>{
        res.status(200).json(json)
      })
}
