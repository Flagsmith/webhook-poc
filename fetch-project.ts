import dotEnv from 'dotenv'
import fetchEnvironments from "./fetch-environments";
import fetchFeature from "./fetch-feature";
dotEnv.config()
type IEnvironments = {
    results: {
        name: string
        api_key: string
    }[]
}
export default async function (project:string) {

}
