import { authConfig } from './auth.config';
import bcrypt from 'bcrypt';

import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { LoginSchema } from './Schemas';
import { getUserByEmail } from './data/user';
import clientPromise from './lib/mongoDB';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  secret: process.env.SECRET,
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } = await LoginSchema.parseAsync(credentials);

          user = await getUserByEmail(email);

          if (!user) {
            throw new Error('Invalid credentials.');
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            console.log('Invalid credentials');
            throw new Error('Invalid credentials.');
          }

          return {
            _id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) { 
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
});
