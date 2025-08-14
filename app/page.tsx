"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  // Handle splash screen loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Show splash for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to Ardi page
    router.push('/Ardi');
  };

  // Splash Screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50 to-gray-50 overflow-hidden relative">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-white to-gray-50/30" 
             style={{ animation: 'gradientShift 4s ease-in-out infinite' }}></div>
        
        {/* Enhanced background animated elements */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-red-100/40 rounded-full animate-pulse" 
               style={{ animation: 'particleFloat 6s ease-in-out infinite' }}></div>
          <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-gray-100/40 rounded-full animate-bounce" 
               style={{ animation: 'particleFloat 8s ease-in-out infinite 1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-red-50/60 rounded-full animate-pulse" 
               style={{ animation: 'particleFloat 7s ease-in-out infinite 2s' }}></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-gray-50/60 rounded-full animate-pulse" 
               style={{ animation: 'particleFloat 9s ease-in-out infinite 0.5s' }}></div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/6 right-1/6 w-8 h-8 bg-red-200/30 rounded-full animate-pulse" 
               style={{ animation: 'rotateIn 4s ease-in-out infinite' }}></div>
          <div className="absolute bottom-1/6 left-1/6 w-12 h-12 bg-gray-200/30 rounded-full animate-pulse" 
               style={{ animation: 'bounceIn 3s ease-in-out infinite 1s' }}></div>
        </div>
        
        <div className="text-center relative z-10">
          {/* Enhanced Logo with animations */}
          <div className="relative mb-8">
            {/* Multiple pulsing rings with different colors */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-2 border-red-200/60" 
                   style={{ animation: 'pulseRing 3s infinite' }}></div>
              <div className="absolute w-40 h-40 rounded-full border-2 border-red-100/40" 
                   style={{ animation: 'pulseRing 3s infinite 0.8s' }}></div>
              <div className="absolute w-40 h-40 rounded-full border-2 border-gray-100/40" 
                   style={{ animation: 'pulseRing 3s infinite 1.6s' }}></div>
              <div className="absolute w-40 h-40 rounded-full border-2 border-red-50/30" 
                   style={{ animation: 'pulseRing 3s infinite 2.4s' }}></div>
            </div>
            
            {/* Enhanced Logo container with shimmer effect */}
            <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 shadow-2xl"
                 style={{
                   background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                   animation: 'shimmer 3s ease-in-out infinite'
                 }}>
              <Image
                src="/img/LogoArdi.svg"
                alt="Ardi Logo"
                width={120}
                height={120}
                className="opacity-90"
                style={{
                  animation: 'logoFloat 4s ease-in-out infinite, logoGlow 3s ease-in-out infinite'
                }}
                priority
              />
            </div>
          </div>
          
          {/* Enhanced Loading text with staggered animations */}
          <div className="space-y-4" style={{ color: '#2D2D2D' }}>
            <h1 className="text-4xl sm:text-5xl font-light tracking-wide"
                style={{ animation: 'slideInDown 1s ease-out' }}>
              Ardi
            </h1>
            <p className="text-gray-600 text-lg font-light"
               style={{ animation: 'slideInUp 1s ease-out 0.3s both' }}>
              AI Assistant
            </p>
            
            {/* Enhanced Loading dots with better spacing */}
            <div className="flex items-center justify-center space-x-3 mt-8">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg" 
                   style={{ animation: 'loadingDots 1.8s infinite' }}></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg" 
                   style={{ animation: 'loadingDots 1.8s infinite 0.3s' }}></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 shadow-lg" 
                   style={{ animation: 'loadingDots 1.8s infinite 0.6s' }}></div>
            </div>
            
            {/* Progress bar */}
            <div className="w-48 h-1 bg-gray-200 rounded-full mx-auto mt-6 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                   style={{ 
                     animation: 'shimmer 2s ease-in-out infinite',
                     width: '60%'
                   }}></div>
            </div>
            
            <p className="text-gray-500 text-sm font-light mt-4"
               style={{ animation: 'slideInUp 1s ease-out 0.6s both' }}>
              Loading your experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden bg-white">

      
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-white relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-1/4 left-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{ backgroundColor: 'rgba(212, 185, 99, 0.8)' }}></div>
          <div className="absolute top-3/4 right-1/4 w-32 sm:w-48 lg:w-64 h-32 sm:h-48 lg:h-64 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" style={{ backgroundColor: 'rgba(193, 28, 33, 0.8)' }}></div>
        </div>
        
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 relative z-10">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl mb-4 sm:mb-6" style={{ backgroundColor: '#C11C21' }}>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full opacity-90"></div>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal mb-2 sm:mb-3" style={{ color: '#2D2D2D' }}>
              Welcome back
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-normal">Sign in to access Ardi</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-4 sm:space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-normal" style={{ color: '#2D2D2D' }}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="email"
                  autoComplete="username"
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border-2 rounded-xl sm:rounded-2xl outline-none transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
                  style={{ 
                    borderColor: focusedField === 'username' ? '#C11C21' : '#E5E7EB',
                    color: '#2D2D2D',
                    ...(focusedField === 'username' && {
                      boxShadow: '0 10px 25px -5px rgba(193, 28, 33, 0.2)',
                      backgroundColor: '#FEF9F9'
                    })
                  }}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-normal" style={{ color: '#2D2D2D' }}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border-2 rounded-xl sm:rounded-2xl outline-none transition-all duration-300 shadow-sm hover:shadow-md text-sm sm:text-base"
                  style={{ 
                    borderColor: focusedField === 'password' ? '#C11C21' : '#E5E7EB',
                    color: '#2D2D2D',
                    ...(focusedField === 'password' && {
                      boxShadow: '0 10px 25px -5px rgba(193, 28, 33, 0.2)',
                      backgroundColor: '#FEF9F9'
                    })
                  }}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div 
                    className={`w-4 h-4 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      rememberMe 
                        ? 'border-red-600 bg-red-600' 
                        : 'border-gray-300 bg-white hover:border-gray-400'
                    }`}
                    style={{ 
                      borderColor: rememberMe ? '#C11C21' : undefined,
                      backgroundColor: rememberMe ? '#C11C21' : undefined
                    }}
                  >
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm font-normal select-none" style={{ color: '#2D2D2D' }}>
                  Remember me
                </span>
              </label>

              {/* Forgot Password */}
              <Link href="/forgot-password" className="text-sm font-normal transition-colors hover:underline" style={{ color: '#C11C21' }}>
                Forgot your password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full text-white py-3 sm:py-4 px-6 rounded-xl sm:rounded-2xl font-normal transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl focus:ring-4 focus:outline-none text-sm sm:text-base"
              style={{ 
                backgroundColor: '#C11C21',
                boxShadow: '0 4px 15px 0 rgba(193, 28, 33, 0.3)'
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#A8171C';
                target.style.boxShadow = '0 8px 25px 0 rgba(193, 28, 33, 0.4)';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = '#C11C21';
                target.style.boxShadow = '0 4px 15px 0 rgba(193, 28, 33, 0.3)';
              }}
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Sign In</span>
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-normal">Need help?</span>
            </div>
          </div>

          {/* Support Links */}
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm">
            <a 
              href="#" 
              className="text-center text-gray-600 font-normal hover:underline transition-colors hover:text-red-600"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#C11C21';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#6B7280';
              }}
            >
              IT Support
            </a>
            <a 
              href="#" 
              className="text-center text-gray-600 font-normal hover:underline transition-colors hover:text-red-600"
              style={{ color: '#6B7280' }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#C11C21';
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLAnchorElement;
                target.style.color = '#6B7280';
              }}
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Right side - AI Branding (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: '#C11C21' }}>
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/3 w-24 h-24 bg-white/5 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-white/10 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-white/8 rounded-full animate-pulse animation-delay-3000"></div>
        </div>
        
        <div className="text-center relative z-10">
          {/* Logo Container */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="animate-pulse">
                <Image
                  src="/img/logoArdiWhite.svg"
                  alt="Ardi Logo"
                  width={180}
                  height={180}
                  className="opacity-90 hover:opacity-100 transition-opacity duration-1000"
                  style={{
                    animation: 'fadeGlow 3s ease-in-out infinite alternate'
                  }}
                  priority
                />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="text-white space-y-4">
            <h2 className="text-3xl font-normal">Ardi AI Assistant</h2>
            <p className="text-white/80 text-lg max-w-md mx-auto leading-relaxed font-normal">
              Meet Ardi - Your intelligent companion for seamless conversations and instant knowledge access
            </p>
            
            {/* Feature highlights */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center justify-center space-x-3 text-white/90">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-normal">Intelligent Responses</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-normal">24/7 Availability</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-normal">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}