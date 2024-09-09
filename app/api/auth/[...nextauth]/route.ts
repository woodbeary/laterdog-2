import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

const handler = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: "2.0",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // You can add custom logic here
      return token
    },
    async session({ session, token }) {
      // You can add custom logic here
      return session
    },
  },
})

export { handler as GET, handler as POST }