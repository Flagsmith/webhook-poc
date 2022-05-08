// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchEnvironments from "../../utils/flagsmith/fetch-environments";
import fetchFeature from "../../utils/flagsmith/fetch-feature";
type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  fetchFeature("7087", "22182" )
      .then((json)=>{
        res.status(200).json(json)
      })
}
