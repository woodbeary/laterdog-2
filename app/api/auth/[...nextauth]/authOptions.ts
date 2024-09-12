import { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github"
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string | null;
      image?: string | null;
      username?: string;
      twitterUsername?: string;
      twitterId?: string;
      githubUsername?: string;
      githubImage?: string;
    }
  }

  interface User {
    username?: string;
  }

  interface Profile extends Record<string, any> {
    screen_name?: string;
    id_str?: string;
    login?: string;
    avatar_url?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        if (account.provider === 'twitter') {
          token.twitterUsername = profile.screen_name;
          token.twitterId = profile.id_str;
        }
        if (account.provider === 'github') {
          token.githubUsername = profile.login;
          token.githubImage = profile.avatar_url;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.twitterUsername = token.twitterUsername as string;
        session.user.twitterId = token.twitterId as string;
        session.user.githubUsername = token.githubUsername as string;
        session.user.githubImage = token.githubImage as string;
      }
      return session;
    },
    // ... rest of the callbacks
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
}