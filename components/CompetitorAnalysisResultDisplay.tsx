import React from 'react';
import type { CompetitorAnalysisResult } from '../types';
import CompetitorCard from './CompetitorCard';
import CompetitorFeatureChart from './CompetitorFeatureChart';
import { GapIcon, GoToMarketIcon } from './Icons';
import AnalysisSection from './AnalysisSection';

interface CompetitorAnalysisResultDisplayProps {
  result: CompetitorAnalysisResult;
  industry: string;
  problem: string;
  onGoToMarketStrategy: () => void;
  gradientIndex: number;
}

const CompetitorAnalysisResultDisplay: React.FC<CompetitorAnalysisResultDisplayProps> = ({ result, industry, problem, onGoToMarketStrategy, gradientIndex }) => {
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
        <h2 className="text-3xl font-bold text-content-primary">Competitor Analysis for <span className="text-brand-primary">{industry}</span></h2>
        <p className="mt-2 text-lg text-content-tertiary">Solving the problem of: "{problem}"</p>
      </header>

      <GradientWrapper offset={0}>
        <AnalysisSection title="Competitor Feature Completeness" prose={false} className="bg-transparent shadow-none p-0">
          <div className="h-96 -mx-4 sm:-mx-6">
            <CompetitorFeatureChart data={result.competitors} />
          </div>
        </AnalysisSection>
      </GradientWrapper>
      
      <GradientWrapper offset={1}>
        <AnalysisSection title="Top 5 Competitors" prose={false} className="bg-transparent shadow-none p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {result.competitors.map((competitor, index) => (
              <CompetitorCard key={index} competitor={competitor} index={index} />
            ))}
          </div>
        </AnalysisSection>
      </GradientWrapper>

      <GradientWrapper offset={2}>
        <AnalysisSection title="Strategic Market Gaps">
          <div className="space-y-4">
              {result.marketGaps.map((gap, index) => (
                  <div key={index} className="border-t border-slate-200 pt-4 first:pt-0 first:border-t-0 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                      <h4 className="flex items-center text-xl font-bold text-black mb-2">
                          <GapIcon className="h-5 w-5 mr-3 text-brand-primary" />
                          {index + 1}. {gap.gap}
                      </h4>
                      <p className="text-content-secondary pl-8">{gap.description}</p>
                  </div>
              ))}
          </div>
        </AnalysisSection>
      </GradientWrapper>

      <div className="mt-12 text-center animate-fade-in">
          <button
            onClick={onGoToMarketStrategy}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-brand-primary rounded-lg shadow-lg hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-all transform hover:scale-105"
          >
            <GoToMarketIcon className="w-6 h-6" />
            Next Step: Develop Go-to-Market Strategy
          </button>
      </div>

    </div>
  );
};

export default CompetitorAnalysisResultDisplay;