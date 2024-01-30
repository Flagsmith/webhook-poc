import dotEnv from 'dotenv'
dotEnv.config()
export interface IProjectFeature {
    id: number;
    name: string;
    type: string;
    default_enabled: boolean;
    initial_value: boolean;
    created_date: string;
    description: string;
    tags: Any[];
    multivariate_options: Any[];
    is_archived: boolean;
    owners: Any[];
    uuid: string;
    project: number;
    num_segment_overrides: number;
    num_identity_overrides: number;
    is_server_key_only: boolean
}

export interface IProjectFeatures {
    count: number;
    next?: any;
    previous?: any;
    results: IProjectFeature[];
}

export default function () {
    const key = process.env.FLAGSMITH_TOKEN
    return fetch(`${process.env.BASE_URL}external-resource/8/features/`,{
        headers: {
            AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`
        }
    })
        .then((res)=>res.json())
        .then((res:IProjectFeatures)=>{
           return res
        })
}
