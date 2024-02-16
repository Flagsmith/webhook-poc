const { createAppAuth } = require('@octokit/auth-app');

let _token:string;

//authorises with GitHub
export default async function (installationId:string) {
    console.log("DEBUG: process.env.GITHUB_PEM:", process.env.GITHUB_PEM)
    console.log("DEBUG: installationId:", installationId)
    const auth = createAppAuth({
        appId: process.env.GITHUB_APP_ID,
        installationId,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        privateKey: process.env.GITHUB_PEM,
    });
    const { token } = await auth({ type: 'installation' });
    _token = token
    return token;
}
