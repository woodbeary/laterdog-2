import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)
console.log('TWITTER_CLIENT_ID exists:', !!process.env.TWITTER_CLIENT_ID)
console.log('TWITTER_CLIENT_SECRET exists:', !!process.env.TWITTER_CLIENT_SECRET)

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
      console.log('JWT callback - token:', token)
      console.log('JWT callback - user:', user)
      return token
    },
    async session({ session, token }) {
      console.log('Session callback - session:', session)
      console.log('Session callback - token:', token)
      return session
    },
  },
})

export { handler as GET, handler as POST }