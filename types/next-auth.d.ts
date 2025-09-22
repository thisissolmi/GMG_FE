// types/next-auth.d.ts
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    provider?: string
    user?: {
      id?: number
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    id?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    provider?: string
    userId?: number
  }
}