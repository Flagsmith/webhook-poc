// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import githubClient from "../../utils/github/github-client";
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await githubClient(`${process.env.GITHUB_INSTALLATION_ID}`)
  res.json({token:"ok"})
}
