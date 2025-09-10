import React from 'react';
import type { CompetitorAnalysisResult } from '../types';
import CompetitorCard from './CompetitorCard';
import CompetitorFeatureChart from './CompetitorFeatureChart';
import { GapIcon } from './Icons';
import AnalysisSection from './AnalysisSection';

interface CompetitorAnalysisResultDisplayProps {
  result: CompetitorAnalysisResult;
  industry: string;
  problem: string;
  gradientIndex: number;
}

const CompetitorAnalysisResultDisplay: React.FC<CompetitorAnalysisResultDisplayProps> = ({ result, industry, problem, gradientIndex }) => {
  const getGradientClass = (offset: number) => `gradient-bg-${((gradientIndex + offset -1) % 6) + 1}`;

  return (
    <div className="space-y-8">
      <header className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-content-primary">Competitor Analysis for <span className="text-brand-primary">{industry}</span></h2>
        <p className="mt-2 text-lg text-content-tertiary">Solving the problem of: "{problem}"</p>
      </header>

      <AnalysisSection title="Competitor Feature Completeness" prose={false} className={getGradientClass(1)}>
        <div className="h-96 p-4">
          <CompetitorFeatureChart data={result.competitors} />
        </div>
      </AnalysisSection>
      
      <AnalysisSection title="Top 5 Competitors" prose={false} className="bg-transparent shadow-none p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {result.competitors.map((competitor, index) => (
            <CompetitorCard key={index} competitor={competitor} index={index} />
          ))}
        </div>
      </AnalysisSection>

      <AnalysisSection title="Strategic Market Gaps" className={getGradientClass(2)}>
        <div className="space-y-4">
            {result.marketGaps.map((gap, index) => (
                <div key={index} className="bg-white/30 rounded-lg p-4 animate-slide-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <h4 className="flex items-center text-xl font-bold text-content-primary mb-2">
                        <GapIcon className="h-5 w-5 mr-3 text-brand-primary" />
                        {index + 1}. {gap.gap}
                    </h4>
                    <p className="text-content-secondary pl-8">{gap.description}</p>
                </div>
            ))}
        </div>
      </AnalysisSection>
    </div>
  );
};

export default CompetitorAnalysisResultDisplay;