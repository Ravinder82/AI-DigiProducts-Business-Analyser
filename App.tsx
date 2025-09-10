import React, { useState, useCallback } from 'react';
import type { MarketAnalysisResult, CompetitorAnalysisResult, GoToMarketStrategyResult, TrendDiscoveryResult, AgentSolutionResult } from './types';
import { getTrendingTopics, getMarketAnalysis, getCompetitorAnalysis, getGoToMarketStrategy, getAgentSolution } from './services/geminiService';
import TrendDiscoveryForm from './components/TrendDiscoveryForm';
import TrendingTopicsResultDisplay from './components/TrendingTopicsResultDisplay';
import MarketVerificationResultDisplay from './components/AnalysisResultDisplay';
import CompetitorAnalysisResultDisplay from './components/CompetitorAnalysisResultDisplay';
import GoToMarketStrategyResultDisplay from './components/GoToMarketStrategyResultDisplay';
import AgentSolutionResultDisplay from './components/AgentSolutionResultDisplay';
import { LogoIcon, HeroBackgroundImage, MarketVerificationIcon, CompetitorAnalysisIcon, GoToMarketIcon, TrendDiscoveryIcon, AgentSolutionIcon } from './components/Icons';
import AgentLoadingIndicator from './components/AgentLoadingIndicator';

type Agent = 'trendDiscovery' | 'marketVerification' | 'competitorAnalysis' | 'goToMarketStrategy' | 'agentSolution';

const goToMarketStrategySteps = [
    "Synthesizing market & competitor data...",
    "Conducting deep web research with Google...",
    "Defining the ideal target audience & problems...",
    "Formulating key indicators and red flags...",
    "Compiling the final strategic report...",
];

const agentSolutionSteps = [
    "Synthesizing all intelligence reports...",
    "Performing deep web research for tech stacks...",
    "Architecting the core solution & features...",
    "Developing a phased implementation roadmap...",
    "Analyzing risks and ethical considerations...",
    "Generating the final implementation blueprint...",
];


const App: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<Agent>('trendDiscovery');
  
  // State for Trend Discovery Agent (Agent 0)
  const [areaOfInterest, setAreaOfInterest] = useState<string>('');
  const [trendingTopicsResult, setTrendingTopicsResult] = useState<TrendDiscoveryResult | null>(null);

  // State for Market Verification Agent (Agent 1)
  const [industry, setIndustry] = useState<string>('');
  const [marketAnalysisResult, setMarketAnalysisResult] = useState<MarketAnalysisResult | null>(null);
  
  // State for Competitor Analysis Agent (Agent 2)
  const [competitorIndustry, setCompetitorIndustry] = useState<string>('');
  const [specificProblem, setSpecificProblem] = useState<string>('');
  const [competitorAnalysisResult, setCompetitorAnalysisResult] = useState<CompetitorAnalysisResult | null>(null);

  // State for Go-to-Market Strategy Agent (Agent 3)
  const [goToMarketStrategyResult, setGoToMarketStrategyResult] = useState<GoToMarketStrategyResult | null>(null);
  
  // State for Agent Solution (Agent 4)
  const [agentSolutionResult, setAgentSolutionResult] = useState<AgentSolutionResult | null>(null);

  // General state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const resetAll = () => {
    setActiveAgent('trendDiscovery');
    setAreaOfInterest('');
    setTrendingTopicsResult(null);
    setIndustry('');
    setMarketAnalysisResult(null);
    setCompetitorIndustry('');
    setSpecificProblem('');
    setCompetitorAnalysisResult(null);
    setGoToMarketStrategyResult(null);
    setAgentSolutionResult(null);
    setIsLoading(false);
    setError(null);
    setLoadingMessage('');
  };

  const handleTrendDiscoveryRequest = useCallback(async (area: string) => {
    if (!area) {
      setError('Please enter an area of interest to discover trends.');
      return;
    }
    resetAll();
    setIsLoading(true);
    setAreaOfInterest(area);
    setLoadingMessage(`Discovering trends for ${area}...`);
    try {
      const result = await getTrendingTopics(area);
      setTrendingTopicsResult(result);
    } catch(e) {
      console.error(e);
      setError('An error occurred while discovering trends. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleMarketAnalysisRequest = useCallback(async (requestedIndustry: string, isDeeper = false) => {
    if (!requestedIndustry) {
      setError('Please select a trend or enter an industry to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setMarketAnalysisResult(null);
    setCompetitorAnalysisResult(null);
    setGoToMarketStrategyResult(null);
    setAgentSolutionResult(null);
    setIndustry(requestedIndustry);
    setLoadingMessage(isDeeper ? `Conducting deeper analysis for ${requestedIndustry}...` : `Analyzing market for ${requestedIndustry}...`);

    try {
      const result = await getMarketAnalysis(requestedIndustry, isDeeper);
      setMarketAnalysisResult(result);
      setActiveAgent('marketVerification');
    } catch (e) {
      console.error(e);
      setError('An error occurred while analyzing the market. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCompetitorAnalysisRequest = useCallback(async (industry: string, problem: string) => {
    if (!industry || !problem) {
      setError('Please enter both an industry and a specific problem.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setCompetitorAnalysisResult(null);
    setGoToMarketStrategyResult(null); // Reset subsequent steps
    setAgentSolutionResult(null);
    setCompetitorIndustry(industry);
    setSpecificProblem(problem);
    setLoadingMessage(`Analyzing competitors for ${industry}...`);

    try {
      const result = await getCompetitorAnalysis(industry, problem);
      setCompetitorAnalysisResult(result);
      setActiveAgent('competitorAnalysis');
    } catch (e) {
      console.error(e);
      setError('An error occurred during competitor analysis. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGoToMarketStrategyRequest = useCallback(async () => {
    if (!marketAnalysisResult || !competitorAnalysisResult) {
      setError('Market and Competitor analysis data is required. Please complete the previous steps.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGoToMarketStrategyResult(null);
    setAgentSolutionResult(null);
    setLoadingMessage(`Developing Go-to-Market strategy...`);
    setActiveAgent('goToMarketStrategy');

    try {
      const result = await getGoToMarketStrategy(marketAnalysisResult, competitorAnalysisResult);
      setGoToMarketStrategyResult(result);
    } catch(e) {
      console.error(e);
      setError('An error occurred while generating the strategy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [marketAnalysisResult, competitorAnalysisResult]);
  
  const handleAgentSolutionRequest = useCallback(async () => {
      if (!trendingTopicsResult || !marketAnalysisResult || !competitorAnalysisResult || !goToMarketStrategyResult) {
          setError('All previous agent analysis data is required to generate the final solution.');
          return;
      }
      setIsLoading(true);
      setError(null);
      setAgentSolutionResult(null);
      setLoadingMessage('Generating implementation blueprint...');
      setActiveAgent('agentSolution');

      try {
          const result = await getAgentSolution(
              trendingTopicsResult,
              marketAnalysisResult,
              competitorAnalysisResult,
              goToMarketStrategyResult
          );
          setAgentSolutionResult(result);
      } catch (e) {
          console.error(e);
          setError('An error occurred while generating the final solution blueprint. Please try again.');
      } finally {
          setIsLoading(false);
      }
  }, [trendingTopicsResult, marketAnalysisResult, competitorAnalysisResult, goToMarketStrategyResult]);

  const handleSelectTrendAndAnalyzeMarket = useCallback((topicName: string) => {
    handleMarketAnalysisRequest(topicName);
  }, [handleMarketAnalysisRequest]);
  
  const handleAnalyzeCompetitorsFromIdealSolution = useCallback((idealSolution: string) => {
    if (!industry) {
      setError("Industry context is missing for competitor analysis.");
      return;
    }
    handleCompetitorAnalysisRequest(industry, idealSolution);
  }, [industry, handleCompetitorAnalysisRequest]);

  const handleGoToMarket = useCallback(() => {
    handleGoToMarketStrategyRequest();
  }, [handleGoToMarketStrategyRequest]);

  const handleGenerateBlueprint = useCallback(() => {
      handleAgentSolutionRequest();
  }, [handleAgentSolutionRequest]);
  
  const AgentButton: React.FC<{agent: Agent, label: string, icon: React.ReactNode, enabled: boolean}> = ({ agent, label, icon, enabled }) => (
    <button 
        onClick={() => enabled && setActiveAgent(agent)}
        disabled={!enabled}
        className={`flex items-center justify-center gap-3 px-4 py-2 text-sm sm:text-base sm:px-6 sm:py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-primary ${activeAgent === agent ? 'bg-white text-content-primary shadow-lg scale-105' : 'bg-white/60 text-content-secondary hover:bg-white hover:scale-100'} ${!enabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
        {icon}
        {label}
    </button>
  );

  return (
    <div className="min-h-screen font-sans">
      <header className="relative flex flex-col items-center justify-center text-center py-20 px-4 h-[400px] overflow-hidden">
          <HeroBackgroundImage className="absolute top-0 left-0 w-full h-full object-cover" />
          <div className="relative z-10">
            <LogoIcon className="h-20 w-20 mb-4 mx-auto" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-content-primary">
              AI Business Agent Suite
            </h1>
            <p className="mt-4 text-lg max-w-2xl text-content-secondary">
              From trend discovery to implementation, a guided 5-step workflow.
            </p>
          </div>
      </header>
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <nav className="flex justify-center flex-wrap gap-2 sm:gap-4 -mt-16 sm:-mt-18 z-20 relative">
            <AgentButton agent="trendDiscovery" label="1. Trend Discovery" icon={<TrendDiscoveryIcon className="w-6 h-6"/>} enabled={true} />
            <AgentButton agent="marketVerification" label="2. Market Verification" icon={<MarketVerificationIcon className="w-6 h-6"/>} enabled={!!marketAnalysisResult} />
            <AgentButton agent="competitorAnalysis" label="3. Competitor Analysis" icon={<CompetitorAnalysisIcon className="w-6 h-6"/>} enabled={!!competitorAnalysisResult} />
            <AgentButton agent="goToMarketStrategy" label="4. Go-to-Market" icon={<GoToMarketIcon className="w-6 h-6"/>} enabled={!!goToMarketStrategyResult} />
            <AgentButton agent="agentSolution" label="5. Agent Solution" icon={<AgentSolutionIcon className="w-6 h-6"/>} enabled={!!agentSolutionResult} />
        </nav>

        <main className="mt-12">
          {activeAgent === 'trendDiscovery' && (
            <div className="animate-fade-in">
              <TrendDiscoveryForm onSubmit={handleTrendDiscoveryRequest} isLoading={isLoading} />
              {trendingTopicsResult && !isLoading && !error && (
                <div className="mt-12 animate-fade-in">
                  <TrendingTopicsResultDisplay 
                    result={trendingTopicsResult}
                    onAnalyzeMarket={handleSelectTrendAndAnalyzeMarket}
                    areaOfInterest={areaOfInterest}
                  />
                </div>
              )}
            </div>
          )}

          {activeAgent === 'marketVerification' && (
            <div className="animate-fade-in">
              {marketAnalysisResult && !isLoading && !error && (
                <div className="animate-fade-in">
                  <MarketVerificationResultDisplay 
                    result={marketAnalysisResult} 
                    industry={industry} 
                    onDeeperResearch={() => handleMarketAnalysisRequest(industry, true)}
                    onAnalyzeCompetitors={handleAnalyzeCompetitorsFromIdealSolution}
                    isLoading={isLoading}
                    gradientIndex={2}
                  />
                </div>
              )}
            </div>
          )}

          {activeAgent === 'competitorAnalysis' && (
             <div className="animate-fade-in">
               {competitorAnalysisResult && !isLoading && !error && (
                <div className="animate-fade-in">
                  <CompetitorAnalysisResultDisplay result={competitorAnalysisResult} industry={competitorIndustry} problem={specificProblem} onGoToMarketStrategy={handleGoToMarket} gradientIndex={3}/>
                </div>
              )}
            </div>
          )}

          {activeAgent === 'goToMarketStrategy' && (
            <div className="animate-fade-in">
              {isLoading && activeAgent === 'goToMarketStrategy' && (
                <AgentLoadingIndicator 
                    title="Developing Go-to-Market Strategy"
                    steps={goToMarketStrategySteps}
                />
              )}
              {goToMarketStrategyResult && !isLoading && !error && (
                <div className="animate-fade-in">
                  <GoToMarketStrategyResultDisplay result={goToMarketStrategyResult} onGenerateBlueprint={handleGenerateBlueprint} gradientIndex={4}/>
                </div>
              )}
            </div>
          )}

          {activeAgent === 'agentSolution' && (
            <div className="animate-fade-in">
              {isLoading && activeAgent === 'agentSolution' && (
                 <AgentLoadingIndicator 
                    title="Generating Implementation Blueprint"
                    steps={agentSolutionSteps}
                    gradientClass="from-rose-500 via-fuchsia-500 to-indigo-500"
                />
              )}
              {agentSolutionResult && !isLoading && !error && (
                <div className="animate-fade-in">
                    <AgentSolutionResultDisplay result={agentSolutionResult} gradientIndex={5} />
                </div>
              )}
            </div>
          )}
          
          {error && (
            <div className="mt-8 text-center bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg animate-fade-in">
              <p>{error}</p>
              <button onClick={resetAll} className="mt-2 text-sm font-semibold underline">Start Over</button>
            </div>
          )}

          {isLoading && (
            <div className="mt-12 text-center flex flex-col items-center justify-center animate-fade-in">
              {activeAgent !== 'goToMarketStrategy' && activeAgent !== 'agentSolution' ? (
                <>
                  <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
                  <h2 className="text-2xl font-semibold mt-6 text-content-primary">{loadingMessage}</h2>
                  <p className="text-content-tertiary mt-2">Our AI agent is conducting deep analysis. This may take a moment.</p>
                </>
              ) : null}
            </div>
          )}
        </main>

        <footer className="text-center mt-16 py-6 border-t border-gray-200">
            <p className="text-content-tertiary text-sm">Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;