import type { NextApiRequest, NextApiResponse } from 'next'

import fetchRepositories from '../../utils/github/api/fetch-repositories';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const body:Data = req.query
    const installationId = body?.installation_id
    const resGetRepos = await fetchRepositories(installationId)
    res.status(200).json(resGetRepos)
}
