import React from 'react';
import type { AgentSolutionResult } from '../types';
import AnalysisSection from './AnalysisSection';

interface AgentSolutionResultDisplayProps {
  result: AgentSolutionResult;
  gradientIndex: number;
}

const AgentSolutionResultDisplay: React.FC<AgentSolutionResultDisplayProps> = ({ result, gradientIndex }) => {
  const getGradientClass = (offset: number) => `gradient-bg-${((gradientIndex + offset -1) % 6) + 1}`;

  const GradientWrapper: React.FC<{ children: React.ReactNode; offset?: number }> = ({ children, offset = 0 }) => (
    <div className="relative group p-[1.5px] rounded-2xl animate-slide-in-up">
      <div className={`absolute -inset-[1px] rounded-2xl ${getGradientClass(offset)} animate-gradient-border opacity-80 group-hover:opacity-100 blur-[2px]`}></div>
      <div className="relative bg-white text-black rounded-2xl p-6 shadow-lg">{children}</div>
    </div>
  );

  const getCategoryColor = (category: string) => {
    switch(category) {
        case 'Frontend': return 'bg-sky-100 text-sky-800';
        case 'Backend': return 'bg-emerald-100 text-emerald-800';
        case 'Database': return 'bg-amber-100 text-amber-800';
        case 'AI / ML Model': return 'bg-indigo-100 text-indigo-800';
        case 'Deployment': return 'bg-slate-100 text-slate-800';
        default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center animate-fade-in">
        <h2 className="text-3xl font-bold text-content-primary">Implementation Blueprint</h2>
      </header>

      <GradientWrapper offset={0}>
        <AnalysisSection title="Solution Overview">
            <p>{result.solutionOverview}</p>
        </AnalysisSection>
      </GradientWrapper>
      
      <GradientWrapper offset={1}>
        <AnalysisSection title="Core Features">
            <div className="space-y-6">
                {result.coreFeatures.map((item, index) => (
                    <div key={index} className="border-t border-slate-200 pt-4 first:pt-0 first:border-t-0">
                        <h4 className="text-xl font-bold text-black">{item.feature}</h4>
                        <p className="mt-1 text-content-secondary">{item.description}</p>
                        <p className="mt-2 text-sm text-emerald-700 bg-emerald-50 p-2 rounded-md">
                            <span className="font-semibold">Solves Problem:</span> {item.userProblemSolved}
                        </p>
                    </div>
                ))}
            </div>
        </AnalysisSection>
      </GradientWrapper>

      <GradientWrapper offset={2}>
        <AnalysisSection title="Recommended Tech Stack">
            <div className="space-y-4">
                {result.techStack.map((item, index) => (
                    <div key={index} className="border-t border-slate-200 pt-4 first:pt-0 first:border-t-0">
                        <div className="flex items-baseline gap-3">
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${getCategoryColor(item.category)}`}>{item.category}</span>
                            <h4 className="text-lg font-bold text-black">{item.tool}</h4>
                        </div>
                        <p className="mt-1 pl-4 border-l-2 border-slate-200 ml-3 text-content-secondary">{item.justification}</p>
                    </div>
                ))}
            </div>
        </AnalysisSection>
      </GradientWrapper>
      
      <GradientWrapper offset={3}>
        <AnalysisSection title="Implementation Roadmap">
            <div className="relative pl-4">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" aria-hidden="true"></div>
                {result.implementationRoadmap.map((item, index) => (
                    <div key={index} className="relative pb-8 last:pb-0">
                        <div className="absolute left-[20px] top-1.5 h-3 w-3 rounded-full bg-brand-primary ring-4 ring-white"></div>
                        <div className="pl-8">
                            <p className="text-sm font-semibold text-brand-primary">{item.duration}</p>
                            <h4 className="text-lg font-bold text-black">{item.phase}</h4>
                            <ul className="mt-2 list-disc pl-5 space-y-1 text-content-secondary">
                                {item.milestones.map((milestone, mIndex) => <li key={mIndex}>{milestone}</li>)}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </AnalysisSection>
      </GradientWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GradientWrapper offset={4}>
          <AnalysisSection title="Risks & Mitigations">
            <div className="space-y-4">
                {result.risksAndMitigations.map((item, index) => (
                    <div key={index}>
                        <h4 className="font-bold text-black">{item.risk}</h4>
                        <p className="text-sm text-content-secondary">{item.mitigation}</p>
                    </div>
                ))}
            </div>
          </AnalysisSection>
        </GradientWrapper>
        <GradientWrapper offset={5}>
          <AnalysisSection title="Ethical Considerations">
            <p>{result.ethicalConsiderations}</p>
          </AnalysisSection>
        </GradientWrapper>
      </div>

      {result.groundingMetadata && result.groundingMetadata.filter(chunk => chunk.web?.uri).length > 0 && (
          <GradientWrapper offset={6}>
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

export default AgentSolutionResultDisplay;