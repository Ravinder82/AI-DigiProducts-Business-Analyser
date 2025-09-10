import React from 'react';
import type { GoToMarketStrategyResult } from '../types';
import { IndicatorIcon, RedFlagIcon } from './Icons';
import AnalysisSection from './AnalysisSection';

interface GoToMarketStrategyResultDisplayProps {
  result: GoToMarketStrategyResult;
  gradientIndex: number;
}

const GoToMarketStrategyResultDisplay: React.FC<GoToMarketStrategyResultDisplayProps> = ({ result, gradientIndex }) => {
  const getGradientClass = (offset: number) => `gradient-bg-${((gradientIndex + offset -1) % 6) + 1}`;

  const GradientWrapper: React.FC<{ children: React.ReactNode; offset?: number }> = ({ children, offset = 0 }) => (
    <div className="relative group p-[1.5px] rounded-2xl animate-slide-in-up">
      <div className={`absolute -inset-[1px] rounded-2xl ${getGradientClass(offset)} animate-gradient-border opacity-80 group-hover:opacity-100 blur-[2px]`}></div>
      <div className="relative bg-white text-black rounded-2xl p-6 shadow-lg">{children}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-content-primary">Go-to-Market Strategic Outline</h2>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GradientWrapper offset={0}>
          <AnalysisSection title="AI-Identified Target Audience">
              <p>{result.targetAudience}</p>
          </AnalysisSection>
        </GradientWrapper>
        <GradientWrapper offset={1}>
          <AnalysisSection title="AI-Identified Core Problems">
              <p>{result.identifiedProblems}</p>
          </AnalysisSection>
        </GradientWrapper>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GradientWrapper offset={2}>
            <AnalysisSection title="Key Market Interest Indicators">
                <div className="space-y-4">
                    {result.marketInterestIndicators.map((item, index) => (
                        <div key={index} className="border-t border-slate-200 pt-4 first:pt-0 first:border-t-0 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <h4 className="flex items-center text-xl font-bold text-black mb-2">
                                <IndicatorIcon className="h-5 w-5 mr-3 text-emerald-500" />
                                {item.indicator}
                            </h4>
                            <p className="text-content-secondary pl-8">{item.description}</p>
                        </div>
                    ))}
                </div>
            </AnalysisSection>
        </GradientWrapper>

        <GradientWrapper offset={3}>
            <AnalysisSection title="Strategic Red Flags">
                 <div className="space-y-4">
                    {result.redFlags.map((item, index) => (
                        <div key={index} className="border-t border-slate-200 pt-4 first:pt-0 first:border-t-0 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <h4 className="flex items-center text-xl font-bold text-black mb-2">
                                <RedFlagIcon className="h-5 w-5 mr-3 text-red-500" />
                                {item.flag}
                            </h4>
                            <p className="text-content-secondary pl-8">{item.description}</p>
                        </div>
                    ))}
                </div>
            </AnalysisSection>
        </GradientWrapper>
      </div>
      
      {result.groundingMetadata && result.groundingMetadata.filter(chunk => chunk.web?.uri).length > 0 && (
          <GradientWrapper offset={4}>
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

export default GoToMarketStrategyResultDisplay;
