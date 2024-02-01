import dotEnv from 'dotenv'
dotEnv.config()

export interface IEnvironment {
    id: number;
    name: string;
    api_key: string;
    project: number;
    minimum_change_request_approvals?: any;
}

export interface IEnvironments {
    count: number;
    next?: any;
    previous?: any;
    results: IEnvironment[];
}

export default function (project:string) {
    const key = process.env.FLAGSMITH_TOKEN
    console.log("DEBUG: key", key, " URL:", process.env.BASE_URL, " Project:", project)
    return fetch(`${process.env.BASE_URL}environments/?project=${project}`,{
        headers: {
            AUTHORIZATION: `Token ${process.env.FLAGSMITH_TOKEN}`
        }
    })
        .then((res)=>res.json())
        .then((res:IEnvironments)=>{
            return res
        })
}
