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
    const associatedFlag = body.data?.new_state?.feature?.id;
    const associatedProject = body.data?.new_state?.feature?.project?.id;
    const featureStates = await fetchFeature(`${associatedProject}`, `${associatedFlag}`)
    const fex = await fetchExternalResources('1')
    const data = createCommentText(featureStates)
    var pathname = new URL(fex.results[0].external_resource.url).pathname;
    const splitURL = pathname.toString().split("/");
    const resCreateGh = await createComment(splitURL[1], splitURL[2], splitURL[4], data)
    res.status(200).json(resCreateGh)
}
