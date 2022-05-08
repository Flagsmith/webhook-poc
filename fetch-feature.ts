import dotEnv from 'dotenv'
import fetchEnvironments, {IEnvironments} from "./fetch-environments";
import fetchSegments, {ISegments} from "./fetch-segments";
dotEnv.config()

export interface IFeatures {
    count: number;
    next?: any;
    previous?: any;
    results: {
        id: number;
        feature_state_value: {
            type: string;
            string_value: string;
            integer_value?: any;
            boolean_value?: any;
        };
        multivariate_feature_state_values: any[];
        enabled: boolean;
        created_at: Date;
        updated_at: Date;
        version: number;
        live_from: Date;
        feature: number;
        environment: number;
        identity?: any;
        feature_segment?: number;
        change_request?: any;
    }[];
}

export default async function (project:string, feature:string) {
    const key = process.env.FLAGSMITH_TOKEN
    const [environments,segments]:[IEnvironments,ISegments] = await Promise.all([
        fetchEnvironments(project),
        fetchSegments(project)
    ])
    const featureStates = await Promise.all(environments.results.map((v)=>{
        return fetch(` https://api.flagsmith.com/api/v1/features/featurestates/?environment=${v.id}&feature=${feature}`,{
            headers: {
                AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`
            }
        })
            .then((res)=>res.json())
            .then((res:IFeatures)=>{
                return res
            })
    }))
    return featureStates.map((v,i)=>{
        return {
            environment: environments.results[i],
            feature: v.results.map((v)=>{
                return {
                    ...v,
                    segment: !!v.feature_segment && segments.results.find((s)=>v.feature_segment === s.id)
                }
            })
        }
    })
}
