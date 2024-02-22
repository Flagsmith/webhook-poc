import type { NextApiRequest, NextApiResponse } from 'next'
import fetchIssues from '../../utils/github/api/fetch-issues'
  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {    
    const body:Data = req.query
    const installationId = body?.installation_id
    const resGetRepos = await fetchIssues(installationId,'','')
    res.status(200).json(resGetRepos)
}
