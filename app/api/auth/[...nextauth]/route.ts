import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import { NextApiRequest, NextApiResponse } from 'next'

console.log('Environment variables in [...nextauth]/route.ts:');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL);
console.log('TWITTER_CLIENT_ID exists:', !!process.env.TWITTER_CLIENT_ID);
console.log('TWITTER_CLIENT_SECRET exists:', !!process.env.TWITTER_CLIENT_SECRET);
console.log('NEXTAUTH_SECRET exists:', !!process.env.NEXTAUTH_SECRET);

let handler: any;

try {
  handler = NextAuth({
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_CLIENT_ID as string,
        clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
        version: "2.0",
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        return token
      },
      async session({ session, token }) {
        return session
      },
    },
  })
} catch (error) {
  console.error('Error initializing NextAuth:', error);
  handler = (req: NextApiRequest, res: NextApiResponse) => 
    res.status(500).json({ error: 'Failed to initialize NextAuth' });
}

export { handler as GET, handler as POST }