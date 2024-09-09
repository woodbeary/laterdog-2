import { User } from 'next-auth'

interface ExtendedUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  githubData?: {
    public_repos: number;
    total_commits: number;
    account_age: number;
  };
  twitterData?: {
    tweet_count: number;
    account_age: number;
  };
}

export function isAccountEligible(user: ExtendedUser): boolean {
  // For development, always return true
  return true;

  // Original logic (commented out for now)
  // if (!user.githubData || !user.twitterData) {
  //   return false;
  // }
  // const githubEligible = 
  //   user.githubData.total_commits >= 1 && 
  //   user.githubData.account_age >= 30;
  // const twitterEligible = 
  //   user.twitterData.tweet_count >= 30 && 
  //   user.twitterData.account_age >= 30;
  // return githubEligible && twitterEligible;
}