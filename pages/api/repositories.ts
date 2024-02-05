import type { NextApiRequest, NextApiResponse } from 'next'
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

import fetchRepositories from '../../utils/github/api/fetch-repositories';
import Cors from 'cors';

// const cors = Cors({
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   });
  

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // await cors(req, res);
    // req.headers['ngrok-skip-browser-warning'] = true;
    const body:Data = req.query
    const installationId = body?.installation_id
    const resGetRepos = await fetchRepositories(installationId)
    console.log('DEBUG: resGetRepos:', resGetRepos)
    res.status(200).json(resGetRepos)
}
