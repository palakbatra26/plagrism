'use client';

import Link from 'next/link';
import { SignUpButton, SignedOut } from '@clerk/nextjs';

export function Hero() {
  return (
    <section className="pt-12 pb-12 sm:pt-16 md:pt-20 md:pb-16 lg:pt-32 lg:pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-violet-50 opacity-50"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-blue-200 to-transparent opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center md:max-w-3xl lg:max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className="block text-gray-900">Detect Plagiarism and</span>
            <span className="block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              AI-Generated Content
            </span>
          </h1>
          
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
            TextInspect uses advanced algorithms to help you identify plagiarized content and 
            detect AI-generated text with unparalleled accuracy. Perfect for educators, publishers, and content creators.
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-x-6">
            <SignedOut>
              <SignUpButton mode="modal">
                <button className="w-full sm:w-auto rounded-md bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:opacity-90 transition cursor-pointer">
                  Start for Free
                </button>
              </SignUpButton>
            </SignedOut>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 sm:gap-6">
              <Link
                href="/ai-detection"
                className="w-full sm:w-auto rounded-md bg-white px-6 py-3 text-base sm:text-lg font-semibold text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition"
              >
                Try AI Detection
              </Link>
              <Link
                href="/plagiarism-detection"
                className="w-full sm:w-auto rounded-md bg-white px-6 py-3 text-base sm:text-lg font-semibold text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 transition"
              >
                Try Plagiarism Check
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-12 sm:mt-16 relative mx-auto px-2 sm:px-0">
          <div className="max-w-4xl mx-auto rounded-xl shadow-2xl overflow-hidden bg-white">
            <div className="bg-gray-800 h-8 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <div className="p-4 sm:p-6 flex flex-col space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="text-lg font-semibold">Text Analysis Results</div>
                <div className="text-sm text-gray-500">Processed in 2.3 seconds</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Plagiarism Score</div>
                  <div className="text-3xl font-bold text-red-500">27%</div>
                  <div className="text-xs text-gray-500 mt-1">3 sources detected</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">AI Detection</div>
                  <div className="text-3xl font-bold text-blue-500">92%</div>
                  <div className="text-xs text-gray-500 mt-1">Likely AI-generated</div>
                </div>
              </div>
              <div className="text-sm text-gray-500">Text highlights are shown in the document below...</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 