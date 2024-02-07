// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mockedConstants from "../../utils/mockedConstants";
import editComment from "../../utils/github/api/edit-comment";
import createComment from "../../utils/github/api/create-comment";
import fetchRepositories from '../../utils/github/api/fetch-repositories';

type Data =  {
    data: {
        changed_by: string;
        new_state: {
            enabled: boolean;
            environment: {
                id: number;
                name: string;
            };
            feature: {
                created_date: Date;
                default_enabled: boolean;
                description: string;
                id: number;
                initial_value?: any;
                name: string;
                project: {
                    id: number;
                    name: string;
                };
                type: string;
            };
            feature_segment?: any;
            feature_state_value: string;
            identity?: any;
            identity_identifier?: any;
        };
        previous_state: {
            enabled: boolean;
            environment: {
                id: number;
                name: string;
            }
            feature: {
                created_date: Date;
                default_enabled: boolean;
                description: string;
                id: number;
                initial_value?: any;
                name: string;
                project: {
                    id: number;
                    name: string;
                };
                type: string;
            };
            feature_segment?: any;
            feature_state_value: string;
            identity?: any;
            identity_identifier?: any;
        };
        timestamp: Date;
    };
    event_type: string;
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body:Data = req.body
    const featureId = body?.data?.id
    const featureName = body?.data?.name
    const featureStates = body?.data?.feature_states
    const data = createCommentText(featureName, featureStates)
    const installationId = body.data?.installation_id
    const url = body?.external_resources[0].url
    var pathname = new URL(url).pathname
    const splitURL = pathname.toString().split("/")
    const resCreateGh = await createComment(splitURL[1], splitURL[2], splitURL[4], data, installationId)
    return res.status(200).json({ text: 'Hello' })
}
