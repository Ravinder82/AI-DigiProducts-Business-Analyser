import React from 'react';
import type { MarketAnalysisResult } from '../types';
import PainPointCard from './PainPointCard';
import WordCloudDisplay from './WordCloudDisplay';
import AnalysisSection from './AnalysisSection';
import { RefreshIcon } from './Icons';

interface MarketVerificationResultDisplayProps {
  result: MarketAnalysisResult;
  industry: string;
  onDeeperResearch: () => void;
  isLoading: boolean;
  gradientIndex: number;
}

const MarketVerificationResultDisplay: React.FC<MarketVerificationResultDisplayProps> = ({ result, industry, onDeeperResearch, isLoading, gradientIndex }) => {
  const allPainPointText = result.painPoints
    .map(p => `${p.point} ${p.exampleQuote} ${p.emotionalImpact} ${p.workaround}`)
    .join(' ');

  const getGradientClass = (offset: number) => `gradient-bg-${((gradientIndex + offset - 1) % 6) + 1}`;

  const GradientWrapper: React.FC<{ children: React.ReactNode; offset?: number }> = ({ children, offset = 0 }) => (
    <div className="relative group p-[1.5px] rounded-2xl animate-slide-in-up">
      <div className={`absolute -inset-[1px] rounded-2xl ${getGradientClass(offset)} animate-gradient-border opacity-80 group-hover:opacity-100 blur-[2px]`}></div>
      <div className="relative bg-white text-black rounded-2xl p-6 shadow-lg">{children}</div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="text-center animate-fade-in relative">
        <h2 className="text-3xl font-bold text-content-primary">Market Analysis for <span className="text-brand-primary">{industry}</span></h2>
        <div className="absolute top-0 right-0 -mt-2">
          <button 
            onClick={onDeeperResearch}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-primary bg-white/60 border border-slate-300 rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Run a deeper research analysis"
          >
            <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            Deeper Research
          </button>
        </div>
      </header>
      
      <GradientWrapper offset={0}>
        <AnalysisSection title="Top 5 Pain Points" prose={false} className="bg-transparent shadow-none p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {result.painPoints.map((pp, index) => (
              <PainPointCard key={index} painPoint={pp} index={index} />
            ))}
          </div>
        </AnalysisSection>
      </GradientWrapper>
      
      <GradientWrapper offset={1}>
        <AnalysisSection title="Pain Point Keyword Cloud">
          <WordCloudDisplay text={allPainPointText} />
        </AnalysisSection>
      </GradientWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GradientWrapper offset={2}>
          <AnalysisSection title="Insufficient Existing Solutions">
            <p>{result.insufficientSolutions}</p>
          </AnalysisSection>
        </GradientWrapper>
        <GradientWrapper offset={3}>
          <AnalysisSection title="Most Undervalued Audience">
            <p>{result.undervaluedSegment}</p>
          </AnalysisSection>
        </GradientWrapper>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GradientWrapper offset={4}>
          <AnalysisSection title="The Ideal Solution">
            <p>{result.idealSolution}</p>
          </AnalysisSection>
        </GradientWrapper>
        <GradientWrapper offset={5}>
          <AnalysisSection title="How to Confirm This Gap">
            <p>{result.confirmationMethods}</p>
          </AnalysisSection>
        </GradientWrapper>
      </div>
    </div>
  );
};

export default MarketVerificationResultDisplay;