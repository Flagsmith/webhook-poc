// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchFeature from "../../utils/flagsmith/api/fetch-feature";
import mockedConstants from "../../utils/mockedConstants";
import createCommentText from "../../utils/github/create-comment-text";
import editComment from "../../utils/github/api/edit-comment";
import createComment from "../../utils/github/api/create-comment";
import fetchExternalResources from '../../utils/flagsmith/api/fetch-external-resources';

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
    const body:Data = req.body;
    const associatedFlag = body.data?.new_state?.feature?.id || 1;
    const associatedProject = body.data?.new_state?.feature?.project?.id || 1;
    const featureStates = await fetchFeature(`${associatedProject}`, `${associatedFlag}`)
    const fex = await fetchExternalResources(associatedFlag)
    const data = createCommentText(featureStates)
    // console.log('DEBUG: fex.results[0].url:', fex.results[0])
    var pathname = new URL(fex.results[0].url).pathname;
    const splitURL = pathname.toString().split("/");
    const resCreateGh = await createComment(splitURL[1], splitURL[2], splitURL[4], data, fex.results[0].resources_id)
    res.status(200).json(resCreateGh)
}
