// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchFeature from "../../utils/flagsmith/fetch-feature";
import mockedConstants from "../../utils/mockedConstants";
import createCommentText from "../../utils/github/create-comment-text";
import editComment from "../../utils/github/edit-comment";

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
    const associatedFlag = body.data?.new_state?.feature?.id|| mockedConstants.flag;
    const associatedProject = body.data?.new_state?.feature?.project?.id|| mockedConstants.project;
    const featureStates = await fetchFeature(`${associatedProject}`, `${associatedFlag}`)
    const data = createCommentText(featureStates)
    console.log("Sending", data)
    const resGh = await editComment(mockedConstants.githubOwner, mockedConstants.githubRepo, mockedConstants.githubComment, data)
    // Step 2: If flag has a github issue comment, edit it with the new feature state
    res.status(200).json(resGh)
}
