import React from 'react';
import type { TrendingTopic } from '../types';
import { MarketVerificationIcon } from './Icons';

interface TrendCardProps {
  topic: TrendingTopic;
  index: number;
  onAnalyze: () => void;
}

const TrendCard: React.FC<TrendCardProps> = ({ topic, index, onAnalyze }) => {
  const animationDelay = { animationDelay: `${index * 100}ms` } as React.CSSProperties;
  const gradientClass = `from-indigo-500 via-purple-500 to-pink-500`;

  return (
    <div
      className="relative group p-[2px] rounded-2xl animate-slide-in-up h-full flex flex-col"
      style={animationDelay}
    >
      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${gradientClass} animate-gradient-border opacity-80 group-hover:opacity-100 blur-sm transition-opacity duration-300`}></div>
      
      <div className="relative bg-white text-black rounded-2xl p-6 flex flex-col space-y-4 transition-all duration-300 shadow-lg h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-content-primary">{topic.topicName}</h3>
          
          <div className="mt-4 pt-4 border-t border-slate-200">
            <h4 className="font-semibold text-content-secondary">Why it's Trending</h4>
            <p className="text-content-tertiary text-sm mt-1">{topic.reasonForTrend}</p>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold text-content-secondary">User Voice</h4>
            <blockquote className="mt-1 text-sm text-content-tertiary border-l-4 border-slate-300 pl-3 italic">
              "{topic.exampleDiscussion}"
            </blockquote>
          </div>
        </div>

        <div className="pt-4 mt-auto">
          <button
            onClick={onAnalyze}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all transform hover:scale-105"
          >
            <MarketVerificationIcon className="w-5 h-5" />
            Analyze this Market
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrendCard;
