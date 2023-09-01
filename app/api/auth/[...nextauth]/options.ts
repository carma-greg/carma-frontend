import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const request = new Request("http://localhost:3001/api/user-signin")
export const authConfig: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Carma Account',
        credentials: {
          email: { label: "Email", type: "text", placeholder: "Email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          const res = await fetch(request, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          console.log(res.body);
          const user = await res.json();
          if (res.ok) {
            console.log("success", res)
            return user
          }
        },
      })
    ],
    session: {
        strategy: "jwt"
      }
  };