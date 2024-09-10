import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import GitHubProvider from "next-auth/providers/github"

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
    login?: string;
  }
}

const authOptions: NextAuthOptions = {
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
    async jwt({ token, user, account }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.username = account.providerAccountId;
        if (account.provider === 'twitter') {
          // Capture Twitter-specific data
          token.twitterUsername = user.name;
          token.twitterId = user.id;
        }
        if (account.provider === 'github') {
          token.githubUsername = user.login;
          token.githubImage = user.image;
        }
        console.log("JWT callback token:", token);
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.accessToken = token.accessToken as string;
        session.user.refreshToken = token.refreshToken as string;
        session.user.username = token.username as string;
        session.user.twitterUsername = token.twitterUsername as string;
        session.user.twitterId = token.twitterId as string;
        session.user.githubUsername = token.githubUsername as string;
        session.user.githubImage = token.githubImage as string;
        console.log("Session callback session:", session);
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/api/auth/callback")) {
        return '/profile-setup';
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }