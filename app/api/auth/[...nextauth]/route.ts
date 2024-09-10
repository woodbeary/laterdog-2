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
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("JWT Callback", { token, user, account });
      return token;
    },
    async session({ session, token, user }) {
      console.log("Session Callback", { session, token, user });
      return session;
    },
  },
  debug: true, // Enable debug messages
})

export { handler as GET, handler as POST }