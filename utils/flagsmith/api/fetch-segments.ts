import dotEnv from 'dotenv'
dotEnv.config()
export interface ISegment {
    id: number;
    rules: {
        type: string;
        rules: {
            type: string;
            rules: any[];
            conditions: {
                operator: string;
                property: string;
                value: string;
            }[];
        }[];
        conditions: {
            operator: string;
            property: string;
            value: string;
        }[];
    }[];
    name: string;
    description: string;
    project: number;
}
export interface ISegments {
    count: number;
    next?: any;
    previous?: any;
    results: ISegment[];
}

export default function (projectId:string) {
    const key = process.env.FLAGSMITH_TOKEN
    return fetch(`https://api.flagsmith.com/api/v1/projects/${projectId}/segments/`,{
        headers: {
            AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`
        }
    })
        .then((res)=>res.json())
        .then((res:ISegments)=>{
           return res
        })
}
