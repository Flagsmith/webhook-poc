import dotEnv from 'dotenv'
dotEnv.config()

export interface IEnvironments {
    count: number;
    next?: any;
    previous?: any;
    results: {
        id: number;
        name: string;
        api_key: string;
        project: number;
        minimum_change_request_approvals?: any;
    }[];
}

export default function (project:string) {
    const key = process.env.FLAGSMITH_TOKEN
    return fetch(`https://api.flagsmith.com/api/v1/environments/?project=${project}`,{
        headers: {
            AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`
        }
    })
        .then((res)=>res.json())
        .then((res:IEnvironments)=>{
            return res
        })
}
