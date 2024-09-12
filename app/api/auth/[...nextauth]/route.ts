import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github"
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email?: string;
      image: string;
      accessToken?: string;
      refreshToken?: string;
      username?: string;
      twitterUsername?: string;
      twitterId?: string;
      githubUsername?: string;
      githubImage?: string;
    }
  }

  interface User extends DefaultUser {
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
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.twitterUsername = token.twitterUsername as string;
        session.user.twitterId = token.twitterId as string;
        session.user.githubUsername = token.githubUsername as string;
        session.user.githubImage = token.githubImage as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === 'twitter' && profile) {
        await setDoc(doc(db, 'users', user.id), {
          name: user.name,
          image: user.image,
          username: profile.screen_name || '',
          twitterUsername: profile.screen_name || '',
          twitterId: user.id,
          provider: 'twitter',
          setupComplete: false,
        }, { merge: true });
      } else if (account?.provider === 'github' && profile) {
        const userDoc = await getDoc(doc(db, 'users', user.id));
        if (userDoc.exists()) {
          await updateDoc(doc(db, 'users', user.id), {
            githubUsername: profile.login,
            githubImage: profile.avatar_url,
            setupComplete: true,
          });
        }
      }
      return true;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }