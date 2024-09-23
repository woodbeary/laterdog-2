import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { Octokit } from '@octokit/rest'
import { Session } from 'next-auth'

export async function GET() {
  const session = await getServerSession(authOptions) as Session | null

  if (!session || !session.user?.githubAccessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const octokit = new Octokit({ auth: session.user.githubAccessToken })

  try {
    const [userResponse, reposResponse] = await Promise.all([
      octokit.rest.users.getAuthenticated(),
      octokit.rest.repos.listForAuthenticatedUser({ per_page: 100, type: 'all' })
    ])

    const user = userResponse.data
    const repos = reposResponse.data

    // Fetch commit data for each repo
    const commitPromises = repos.map((repo: { name: string }) =>
      octokit.rest.repos.getCommitActivityStats({
        owner: user.login,
        repo: repo.name
      })
    )

    const commitResponses = await Promise.all(commitPromises)
    const commitData = commitResponses.map((response: { data: any }) => response.data)

    return NextResponse.json({ user, repos, commitData })
  } catch (error) {
    console.error('Error fetching GitHub data:', error)
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 })
  }
}
