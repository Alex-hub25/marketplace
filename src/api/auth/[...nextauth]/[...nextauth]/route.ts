import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

let client: MongoClient | null = null;
async function connectDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB);
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) throw new Error("Missing fields");

        const db = await connectDB();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) throw new Error("No user found");
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) throw new Error("Invalid password");
        if (user.role !== "vendor") throw new Error("Not a vendor account");

        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role };
      },
    }),
  ],

  pages: {
    signIn: "/auth/signin",
  },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id, token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string, session.user.role = token.role as string;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
