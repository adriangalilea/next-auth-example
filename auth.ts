import NextAuth from "next-auth";
import authConfig from "./auth.config";

import { DgraphAdapter } from "@auth/dgraph-adapter";

const dgraphAdapter = DgraphAdapter({
  endpoint: process.env.AUTH_DGRAPH_GRAPHQL_ENDPOINT as string,
  authToken: process.env.AUTH_DGRAPH_GRAPHQL_KEY as string,
  authHeader: process.env.AUTH_HEADER,
  jwtSecret: process.env.AUTH_SECRET,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: dgraphAdapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
