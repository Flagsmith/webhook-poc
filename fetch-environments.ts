import dotEnv from 'dotenv'
dotEnv.config()
type IEnvironments = {
    results: {
        name: string
        api_key: string
    }[]
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
            console.log(res)
            let environments: Record<string, string> = {}
            res.results.map((v)=>{
                environments[v.name] = v.api_key
            })
            return environments
        })
}
