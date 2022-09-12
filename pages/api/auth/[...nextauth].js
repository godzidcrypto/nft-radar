import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      // token: "https://discord.com/api/oauth2/token",
      // userinfo: "https://discord.com/api/users/@me",
      // scope: "guilds",
    }),
    // ...add more providers here
  ],
  // callbacks: {
  //   session: async ({ session, token }) => {
  //     if (session?.user) {
  //       session.user.id = token.uid;
  //       session.accessToken = token.accessToken;
  //     }
  //     return session;
  //   },
  //   jwt: async ({ user, token }) => {
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     if (account) {
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  // },
  callbacks: {
    async session({ session, token, user }) {
      console.log("SESSION", session, token);
      session.accessToken = token.accessToken;
      return session;
    },

    async jwt({ token, account }) {
      console.log("HERE", token, account);
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
});
