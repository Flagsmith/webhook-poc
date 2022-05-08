const { createAppAuth } = require('@octokit/auth-app');

let _token:string;
export default async function (installationId:string) {
    if(_token) return _token
    const auth = createAppAuth({
        appId: process.env.GITHUB_APP_ID,
        privateKey: process.env.GITHUB_PEM,
        installationId,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    });
    const { token } = await auth({ type: 'installation' });
    _token = token
    return token;
}
