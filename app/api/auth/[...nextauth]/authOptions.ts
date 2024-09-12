import { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

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
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('SignIn callback', { user, account, profile });
      if (account?.provider === "twitter" && profile) {
        const userRef = doc(db, "users", user.id);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          interface UserData {
            name: string | null | undefined;
            image: string | null | undefined;
            twitterUsername: string;
            twitterId: string;
            provider: string;
            setupComplete: boolean;
            email?: string;
          }

          const userData: UserData = {
            name: user.name,
            image: user.image,
            twitterUsername: profile.data?.username ?? '',
            twitterId: profile.data?.id ?? '',
            provider: account.provider,
            setupComplete: false,
          };
          
          // Only add email if it's defined
          if (user.email) {
            userData.email = user.email;
          }

          await setDoc(userRef, userData);
        }
      }
      return true;
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      if (account && profile) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        if (account.provider === 'twitter') {
          token.twitterUsername = profile.data?.username;
          token.twitterId = profile.data?.id;
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
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
}