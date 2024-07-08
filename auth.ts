import NextAuth, { type DefaultSession } from "next-auth";
import authConfig from "./auth.config";
import { DgraphAdapter } from "./dgraph-adapter";

declare module "next-auth" {
  interface User {
    id?: string;
    username?: string;
  }

  interface Session {
    user: {
      id: string;
      username?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    id?: string;
    username?: string;
  }
}

const dgraphAdapter = DgraphAdapter({
  endpoint: process.env.AUTH_DGRAPH_GRAPHQL_ENDPOINT as string,
  authToken: process.env.AUTH_DGRAPH_GRAPHQL_KEY as string,
  authHeader: process.env.AUTH_HEADER,
  jwtSecret: process.env.AUTH_SECRET,
}, {
  fragments: {
    User: `
      fragment UserFragment on User {
        id
        name
        email
        emailVerified
        image
        gh_username
        creation_date
        username
        full_name
        bio
      }
    `
  }
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: dgraphAdapter,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.username = token.username as string;
      return session;
    },
  },
  ...authConfig,
});

