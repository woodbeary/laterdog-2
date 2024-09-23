import { NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github"
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { getServerSession } from "next-auth/next"  // Add this import

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
      githubAccessToken?: string;
      githubId?: string;
    }
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
      authorization: {
        params: {
          scope: 'read:user user:email repo'
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      if (account?.provider === "twitter") {
        const userRef = doc(db, "users", user.id);
        const twitterProfile = profile as any;
        await setDoc(userRef, {
          name: user.name,
          image: user.image,
          twitterUsername: twitterProfile?.data?.username || twitterProfile?.screen_name,
          twitterId: user.id,
          provider: account.provider,
          setupComplete: false,
          githubLinked: false,
        }, { merge: true });
        return true;
      } else if (account?.provider === "github") {
        // Check if there's an existing session (Twitter user)
        const session = await getServerSession(authOptions);
        if (session?.user?.id) {
          const userRef = doc(db, "users", session.user.id);
          await updateDoc(userRef, {
            githubUsername: user.name,
            githubId: user.id,
            githubImage: user.image,
            githubLinked: true,
            githubAccessToken: account.access_token,
          });
          return true;
        } else {
          console.error("No active Twitter session found for GitHub link");
          return false;
        }
      }
      return false;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
      }
      if (account?.provider === 'github') {
        token.githubUsername = user.name;
        token.githubAccessToken = account.access_token;
        token.githubId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.githubUsername = token.githubUsername as string;
        session.user.githubAccessToken = token.githubAccessToken as string;
        session.user.githubId = token.githubId as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
}