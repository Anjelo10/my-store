import { loginWithGoogle, signIn } from "@/services/auth/authService";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

interface UserDocument {
  id: string;
  email: string;
  fullname: string;
  password: string;
  phone: string;
  role: string;
  [key: string]: unknown;
}

interface ExtendedSession extends Session {
  user: {
    email: string;
    fullname: string;
    phone: string;
    role: string;
    [key: string]: any;
  };
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = (await signIn(email)) as UserDocument | null;

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            return user;
          }
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === "credentials" && user) {
        const typedUser = user as UserDocument;
        token.email = typedUser.email;
        token.fullname = typedUser.fullname;
        token.phone = typedUser.phone;
        token.role = typedUser.role;
        token.id = typedUser.id;
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name!,
          email: user.email!,
          role: "member",
          image: user.image!,
          type: "google",
        };
        await loginWithGoogle(data, (data: any) => {
          token.email = data.email;
          token.fullname = data.fullname;
          token.role = data.role;
          token.image = data.image;
          token.id = data.id;
        });
      }
      return token;
    },
    async session({ session, token }) {
      const extendedSession = session as ExtendedSession;

      if ("email" in token) {
        extendedSession.user.email = token.email as string;
      }
      if ("fullname" in token) {
        extendedSession.user.fullname = token.fullname as string;
      }
      if ("phone" in token) {
        extendedSession.user.phone = token.phone as string;
      }
      if ("role" in token) {
        extendedSession.user.role = token.role as string;
      }
      if ("image" in token) {
        extendedSession.user.image = token.image as string;
      }
      if ("id" in token) {
        extendedSession.user.id = token.id as string;
      }

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      extendedSession.user.accessToken = accessToken;

      return extendedSession;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
