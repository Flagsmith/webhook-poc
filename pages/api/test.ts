// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchEnvironments from "../../utils/flagsmith/fetch-environments";
import fetchFeature from "../../utils/flagsmith/fetch-feature";
import githubClient from "../../utils/github/github-client";
import createComment from "../../utils/github/create-comment";
type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await githubClient(process.env.GITHUB_INSTALLATION_ID)
  await createComment('Flagsmith', 'flagsmith', 1228627553, `Checklist
- [ ] Development 
- [ ] Production
  `)
  res.json({ok:1})
}
