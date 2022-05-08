const { createAppAuth } = require('@octokit/auth-app');

export default async function (installationId:string) {
    const auth = createAppAuth({
        id: process.env.GITHUB_APP_ID,
        privateKey: process.env.GITHUB_PEM,
        installationId,
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    });
    const { token } = await auth({ type: 'installation' });
    return token;

}
