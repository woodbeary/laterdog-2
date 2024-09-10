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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  twitterUsername: string;
  githubUsername?: string;
  bio?: string;
  location?: string;
  age?: number;
  githubData?: {
    publicRepos: number;
    followers: number;
    following: number;
    totalCommits: number;
    topLanguage: string;
    accountAge: number;
  };
}

export interface User {
  id: string;
  name: string;
  image: string;
  username: string;
  provider: string;
  setupComplete: boolean;
  email?: string;
  githubUsername?: string;
  githubImage?: string;
}