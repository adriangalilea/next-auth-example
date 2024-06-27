import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [GitHub],
};

export default authConfig;
