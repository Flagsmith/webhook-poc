import githubClient from "./github-client";

export default async function (owner:string, repo:string, comment:number, body: string) {
    const token = await githubClient(`${process.env.GITHUB_INSTALLATION_ID}`)
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/comments/${comment}`
    return await fetch(url, {
        method: "PATCH",
        body: JSON.stringify({body}),
        headers: {
            accept: 'application/vnd.github.v3+json',
            "Authorization": `Bearer ${token}`
        }
    })
        .then((res)=>res.text())
        .then((res)=> ({body: res, url}))
}
