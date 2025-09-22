import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-400 to-orange-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white rounded-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      
      {/* Login Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 relative z-10">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-yellow-500 mb-2">
              즉행
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            로그인
          </h2>
          
          {/* Subtitle */}
          <p className="text-gray-600 mb-8">
            간편하게 로그인하고 여행을 시작해 보세요.
          </p>
        </div>
        
        {/* Login Buttons */}
        <div className="space-y-3">
          {/* Google Login Button */}
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google로 시작하기
          </button>
          
          {/* Kakao Login Button */}
          <button
            onClick={() => signIn('kakao')}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
            </svg>
            카카오로 시작하기
          </button>
        </div>
      </div>
      
      {/* Copyright */}
      <p className="absolute bottom-4 right-4 text-sm text-yellow-100">
        Copyright ©GMG All rights reserved.
      </p>
    </div>
  );
}