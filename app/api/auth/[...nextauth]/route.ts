import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"

console.log('TWITTER_CLIENT_ID:', process.env.TWITTER_CLIENT_ID)
console.log('TWITTER_CLIENT_SECRET exists:', !!process.env.TWITTER_CLIENT_SECRET)
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL)

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
      return token
    },
    async session({ session, token }) {
      return session
    },
  },
})

export { handler as GET, handler as POST }