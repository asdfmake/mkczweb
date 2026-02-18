import { NewsDetail } from "@/app/[locale]/vesti/[id]/page";
import React from "react";
interface NewsProps {
  news: NewsDetail;
}
const News = ({ news }: NewsProps) => {
  return (
    <div>
      <div className="w-full h-[300px]"></div>
      <div className="w-full bg-white rounded-lg shadow-lg p-8 mx-auto max-w-[1400px]">
        {/* Back Navigation */}
        <div className="mb-6">
          <a
            href="../vesti"
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Погледај све вести
          </a>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          {news.newsHeader}
        </h1>

        {/* Date */}
        <div className="text-gray-600 mb-4">{news.date}</div>

        {/* Social Share Buttons */}
        <div className="flex gap-2 mb-8">
          <button className="bg-orange-400 text-white p-2 rounded">
            <span className="sr-only">Copy link</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
            </svg>
          </button>
          <button className="bg-blue-600 text-white p-2 rounded">
            <span className="sr-only">Share on Facebook</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </button>
          <button className="bg-blue-400 text-white p-2 rounded">
            <span className="sr-only">Share on Twitter</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </button>
          <button className="bg-blue-800 text-white p-2 rounded">
            <span className="sr-only">Share on LinkedIn</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-gray-700">
          <p>{news.newsText}</p>
        </div>
      </div>
    </div>
  );
};

export default News;
