import githubClient from "./github-client";

// Get all repositoires associated with the installation id
export default async function (installationId: string, owner: string, name: string) {
    const authType = 'user'
    const token = await githubClient(installationId)
    const url = `https://api.github.com/repos/novakzaballa/novak-flagsmith-example/pulls`
    return await fetch(url, {
        method: "GET",
        headers: {
            "X-GitHub-Api-Version": '2022-11-28',
            accept: 'application/vnd.github.v3+json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res)=>res.text())
        .then((res)=>{
            console.log(res)
            return JSON.parse(res)
        })
}

