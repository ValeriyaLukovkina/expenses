import { authConfig } from './auth.config';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import NextAuth from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import { LoginSchema } from './Schemas';
import { getUserByEmail } from './data/user';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(mongoose.connection.getClient()),
  session: { strategy: 'jwt' },
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

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
