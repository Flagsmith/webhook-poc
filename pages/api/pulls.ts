import type { NextApiRequest, NextApiResponse } from 'next'

import fetchPulls from '../../utils/github/api/fetch-pulls'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body:Data = req.query
    const installationId = body?.installation_id
    const resGetRepos = await fetchPulls(installationId)
    res.status(200).json(resGetRepos)
}