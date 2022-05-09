// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fetchFeature from "../../utils/flagsmith/fetch-feature";
import mockedConstants from "../../utils/mockedConstants";

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
    const associatedFlag = body.data.new_state.feature.id;
    console.log('Fetching Feature', `${body.data.new_state.feature.project.id}`, `${body.data.new_state.feature.id}`)
    const featureStates = await fetchFeature(`${body.data.new_state.feature.project.id}`, `${body.data.new_state.feature.id}`)
    // Step 2: If flag has a github issue comment, edit it with the new feature state
    res.status(200).json({ name: 'John Doe' })
}
