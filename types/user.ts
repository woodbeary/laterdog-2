export interface CustomUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  username?: string;
  githubToken?: string;
}

export interface GithubData {
  public_repos: number;
  followers: number;
  following: number;
  total_commits: number;
  top_language: string;
  account_age: number;
}