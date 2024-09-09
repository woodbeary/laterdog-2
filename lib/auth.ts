import { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github"
import { FirestoreAdapter } from "@next-auth/firebase-adapter"
import { firestore } from "@/lib/firebaseAdmin"

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      githubId?: string;
      twitterId?: string;
    } & DefaultSession["user"]
  }

  interface User {
    githubId?: string;
    twitterId?: string;
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
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: FirestoreAdapter(firestore),
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.githubId = (user as any).githubId;
        session.user.twitterId = (user as any).twitterId;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'github') {
        (user as any).githubId = (profile as any)?.id;
      } else if (account?.provider === 'twitter') {
        (user as any).twitterId = (profile as any)?.id;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString()
      return baseUrl
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/profile-setup',
  },
  debug: process.env.NODE_ENV === 'development',
}