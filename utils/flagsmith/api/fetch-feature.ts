import dotEnv from 'dotenv'
import fetchEnvironments, {IEnvironment, IEnvironments} from "./fetch-environments";
import fetchSegments, {ISegment, ISegments} from "./fetch-segments";
dotEnv.config()

export interface IFeature {
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
}
export interface IFeatures {
    count: number;
    next?: any;
    previous?: any;
    results: IFeature[];
}
export interface IFeatureSegments {
    count: number;
    next?: any;
    previous?: any;
    results: {
        id: number;
        segment: number;
        priority: number;
        environment: number;
    }[];
}
export interface IFeatureSegmentsEnvironment {
    environment: number
    featureSegments: IFeatureSegments
}[]
export type IFeatureWithSegment = IFeature & {segment?:ISegment|null}
export type IFeaturesResults = {
    environment: IEnvironment
    features: IFeatureWithSegment[]
}
export default async function (project:string, feature:string) {
    const key = process.env.FLAGSMITH_TOKEN
    const [environments,segments]:[IEnvironments,ISegments] = await Promise.all([
        fetchEnvironments(project),
        fetchSegments(project)
    ])
    const featureSegments: IFeatureSegmentsEnvironment[] = await Promise.all(environments.results.map(async (v)=>{
        const res = await fetch(` https://api.flagsmith.com/api/v1/features/feature-segments/?environment=${v.id}&feature=${feature}`,{
            headers: {
                AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`
            }
        })
            .then((res)=>res.json())

        const res2:IFeatureSegmentsEnvironment = {
            environment: v.id,
            featureSegments: res
        }
        return res2
    }))
    const featureStates: IFeatures[] = await Promise.all(environments.results.map((v)=>{
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

    const res:IFeaturesResults[] =  featureStates.map((v,i)=>{
        return {
            environment: environments.results[i],
            features: v.results.map((v:IFeature)=>{
                const environmentFeatureSegments = featureSegments.find((f)=>f.environment === v.environment )?.featureSegments
                const segment = !!v.feature_segment && environmentFeatureSegments?.results.find((fs)=>fs.id === v.feature_segment)

                return {
                    ...v,
                    segment: segment ? segments.results.find((v)=>v.id === segment.segment) : null
                }
            })
        }
    })
    return res
}
