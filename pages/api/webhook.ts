// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  action: {
    from: string;
  }
  installation: {
    id: number;
    node_id: string;
    changes:  {
      url: string;
      html_url: string;
      issue_url: string;
      id: number;
      node_id: string;
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
      author_association: string;
      body: string;
      performed_via_github_app?: any;
    }
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body:Data = req.body;
  console.log(Object.keys(req.body))
  console.log(req.body.repository, "repository")
  console.log(req.body.organization, "organization")
  res.status(200).json({ name: 'John Doe' })
}
