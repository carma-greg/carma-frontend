import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const request = new Request("http://localhost:3001/api/user-signin")
export const authConfig: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: 'Carma Account',
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          email: { label: "Email", type: "text", placeholder: "Email" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          // You need to provide your own logic here that takes the credentials
          // submitted and returns either a object representing a user or value
          // that is false/null if the credentials are invalid.
          // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
          // You can also use the `req` object to obtain additional parameters
          // (i.e., the request IP address)
          const res = await fetch(request, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          })
          console.log(res.body);
          const user = await res.json();
    
          // If no error and we have user data, return it
          if (res.ok) {
            console.log("success", res)
            return user
          }
          // // Return null if user data could not be retrieved
          // return null
          // return (
          //   user
          // )
        },
      })
    ],
  };