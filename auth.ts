import NextAuth from "next-auth"
import { DgraphAdapter } from "@auth/dgraph-adapter"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  adapter: DgraphAdapter({
    endpoint: process.env.AUTH_DGRAPH_GRAPHQL_ENDPOINT as string,
    authToken: process.env.AUTH_DGRAPH_GRAPHQL_KEY as string,
    // you can omit the following properties if you are running an unsecure schema
    authHeader: process.env.AUTH_HEADER, // default: "Authorization",
    jwtSecret: process.env.AUTH_SECRET,
  }),
})