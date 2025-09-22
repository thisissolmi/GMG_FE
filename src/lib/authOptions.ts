// // lib/authOptions.ts
// import { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import KakaoProvider from 'next-auth/providers/kakao';
// import axios from 'axios';

// const getGoogleCredentials = () => {
//   const clientId = process.env.GOOGLE_CLIENT_ID;
//   const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

//   if (!clientId || !clientSecret) {
//     throw new Error('Missing Google credentials');
//   }

//   return { clientId, clientSecret };
// };

// const getKakaoCredentials = () => {
//   const clientId = process.env.KAKAO_CLIENT_ID;
//   const clientSecret = process.env.KAKAO_CLIENT_SECRET;

//   if (!clientId || !clientSecret) {
//     throw new Error('Missing Kakao credentials');
//   }

//   return { clientId, clientSecret };
// };

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: getGoogleCredentials().clientId,
//       clientSecret: getGoogleCredentials().clientSecret,
//     }),
//     KakaoProvider({
//       clientId: getKakaoCredentials().clientId,
//       clientSecret: getKakaoCredentials().clientSecret,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account?.id_token || account?.access_token) {
//         try {
//           // 구글과 카카오 모두 처리
//           const tokenToSend = account.id_token || account.access_token;
          
//           const res = await axios.post(
//             `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
//             { 
//               idToken: tokenToSend,
//               provider: account.provider // 'google' 또는 'kakao'
//             },
//             { headers: { 'Content-Type': 'application/json' } }
//           );

//           const userId = res.data.userId;
//           console.log(`✅ ${account.provider} 로그인 성공, userId:`, userId);
          
//           token.userId = userId;
//           token.provider = account.provider;
//         } catch (error) {
//           console.error(`❌ ${account?.provider} 로그인 서버 오류:`, error);
//         }
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user && token.userId) {
//         session.user.id = Number(token.userId);
//         session.provider = token.provider as string;
//       }
//       return session;
//     },

//     async signIn({ account, profile }) {
//       // 구글은 id_token, 카카오는 access_token 확인
//       if (account?.provider === 'google') {
//         return !!account?.id_token;
//       }
      
//       if (account?.provider === 'kakao') {
//         return !!account?.access_token;
//       }
      
//       return false;
//     },

//     async redirect({ url, baseUrl }) {
//       // 로그인 성공 후 리다이렉트할 페이지
//       return baseUrl + '/dashboard';
//     }
//   },
//   pages: {
//     signIn: '/login',
//     error: '/auth/error',
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };


// lib/authOptions.ts (백엔드 호출 제거 버전)
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Google credentials');
  }

  return { clientId, clientSecret };
};

const getKakaoCredentials = () => {
  const clientId = process.env.KAKAO_CLIENT_ID;
  const clientSecret = process.env.KAKAO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Missing Kakao credentials');
  }

  return { clientId, clientSecret };
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
    KakaoProvider({
      clientId: getKakaoCredentials().clientId,
      clientSecret: getKakaoCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      console.log('JWT Callback:', { token, account, profile });
      
      if (account) {
        token.provider = account.provider;
        // 백엔드 호출 주석 처리
        /*
        try {
          const tokenToSend = account.id_token || account.access_token;
          const res = await axios.post(...);
          token.userId = res.data.userId;
        } catch (error) {
          console.error('Backend error:', error);
        }
        */
      }

      return token;
    },

    async session({ session, token }) {
      console.log('Session Callback:', { session, token });
      
      if (session.user) {
        session.provider = token.provider as string;
        // session.user.id = Number(token.userId);
      }
      return session;
    },

    async signIn({ account, profile, user }) {
      console.log('SignIn Callback:', { account, profile, user });
      
      if (account?.provider === 'google') {
        return !!account?.id_token;
      }
      
      if (account?.provider === 'kakao') {
        return !!account?.access_token;
      }
      
      return false;
    },

    async redirect({ url, baseUrl }) {
      console.log('Redirect Callback:', { url, baseUrl });
      return baseUrl + '/dashboard';
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};