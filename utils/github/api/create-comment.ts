import { Console } from "console";
import githubClient from "./github-client";

// Post a comment to a given issue
export default async function (owner:string, repo:string, issue:number, body: string, installationId: string) {
    const token = await githubClient(installationId)
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issue}/comments`
    console.log('DEBUG: url:', url)
    await fetch(url, {
        method: "POST",
        body: JSON.stringify({body}),
        headers: {
            accept: 'application/vnd.github.v3+json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res)=>res.text())
        .then((res)=>console.log(res))
}
