import githubClient from "./github-client";

const { createAppAuth } = require('@octokit/auth-app');
interface IComments {
    id: number;
    node_id: string;
    url: string;
    html_url: string;
    body: string;
    user: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    created_at: Date;
    updated_at: Date;
    issue_url: string;
    author_association: string;
}

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
