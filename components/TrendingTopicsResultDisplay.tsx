import React from 'react';
import type { TrendDiscoveryResult } from '../types';
import TrendCard from './TrendCard';
import AnalysisSection from './AnalysisSection';

interface TrendingTopicsResultDisplayProps {
  result: TrendDiscoveryResult;
  onAnalyzeMarket: (topicName: string) => void;
  areaOfInterest: string;
}

const TrendingTopicsResultDisplay: React.FC<TrendingTopicsResultDisplayProps> = ({ result, onAnalyzeMarket, areaOfInterest }) => {
  
  const GradientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="relative group p-[1.5px] rounded-2xl animate-slide-in-up">
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-border opacity-80 group-hover:opacity-100 blur-[2px]"></div>
      <div className="relative bg-white text-black rounded-2xl p-6 shadow-lg">{children}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-content-primary">Trending Opportunities in <span className="text-brand-primary">{areaOfInterest}</span></h2>
        <p className="mt-2 text-lg text-content-tertiary">Select a trend to begin a deep-dive market analysis.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {result.trendingTopics.map((topic, index) => (
          <TrendCard 
            key={index} 
            topic={topic} 
            index={index}
            onAnalyze={() => onAnalyzeMarket(topic.topicName)}
          />
        ))}
      </div>

      {result.groundingMetadata && result.groundingMetadata.filter(chunk => chunk.web?.uri).length > 0 && (
          <GradientWrapper>
              <AnalysisSection title="Sources from Web Research">
                  <ul className="list-disc pl-5 space-y-2 prose prose-p:text-content-secondary prose-ul:text-content-secondary prose-li:text-content-secondary">
                      {result.groundingMetadata.map((chunk, index) => 
                          chunk.web?.uri && (
                              <li key={index} className="break-words">
                                  <a 
                                      href={chunk.web.uri} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-800 hover:underline"
                                  >
                                      {chunk.web.title || chunk.web.uri}
                                  </a>
                              </li>
                          )
                      )}
                  </ul>
              </AnalysisSection>
          </GradientWrapper>
      )}
    </div>
  );
};

export default TrendingTopicsResultDisplay;
