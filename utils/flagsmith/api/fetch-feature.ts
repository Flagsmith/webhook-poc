import dotEnv from 'dotenv'
import fetchEnvironments, {IEnvironment, IEnvironments} from "./fetch-environments";
import fetchSegments, {ISegment, ISegments} from "./fetch-segments";
import fetchFeatureProject, {IProjectFeature, IProjectFeatures} from "./fetch-feature-project";
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

export interface IFeatureData {
    id: number;
    name: string;
    type: string;
    default_enabled: boolean;
    initial_value: string;
    created_date: string;
    description: string;
    tags: Any[],
    multivariate_options: Any[],
    is_archived: boolean,
    owners: Any[],
    uuid: string;
    project: number;
    num_segment_overrides: number;
    num_identity_overrides: number;
    is_server_key_only: boolean
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
    const [environments,segments,featureProject]:[IEnvironments,ISegments, IFeatureData] = await Promise.all([
        fetchEnvironments(project),
        fetchSegments(project),
        fetchFeatureProject(project),
    ])
    const featureSegments: IFeatureSegmentsEnvironment[] = await Promise.all(environments.results.map(async (v)=>{
        const res = await fetch(` ${process.env.BASE_URL}features/feature-segments/?environment=${v.id}&feature=${feature}`,{
            headers: {
                AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`
            }
        })
            .then((res)=> {
                return res
            })

        const res2:IFeatureSegmentsEnvironment = {
            environment: v.id,
            featureSegments: res
        }
        return res2
    }))
    const featureStates: IFeatures[] = await Promise.all(environments.results.map((v)=>{
        return fetch(` ${process.env.BASE_URL}features/featurestates/?environment=${v.id}&feature=${feature}`,{
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
            features: v.results?.map((v:IFeature)=>{
                const featureName = featureProject.results.find(item => item.id === v.feature)?.name;
                // const environmentFeatureSegments = featureSegments.find((f)=>f.environment === v.environment)?.featureSegments
                // console.log('DEBUG: environmentFeatureSegments:', environmentFeatureSegments)
                // const segment = !!v.feature_segment && environmentFeatureSegments?.results.find((fs)=>fs.id === v.feature_segment)
                return {
                    ...v,
                    feature_name: featureName,
                    // segment: segment ? segments.results.find((v)=>v.id === segment.segment) : null
                }
            })
        }
    })
    return res
}
