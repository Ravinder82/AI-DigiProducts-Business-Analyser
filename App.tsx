import React, { useState, useCallback } from 'react';
import type { MarketAnalysisResult, CompetitorAnalysisResult, GoToMarketStrategyResult } from './types';
import { getMarketAnalysis, getCompetitorAnalysis, getGoToMarketStrategy } from './services/geminiService';
import MarketVerificationForm from './components/IndustryInputForm';
import MarketVerificationResultDisplay from './components/AnalysisResultDisplay';
import CompetitorAnalysisForm from './components/CompetitorAnalysisForm';
import CompetitorAnalysisResultDisplay from './components/CompetitorAnalysisResultDisplay';
import GoToMarketStrategyResultDisplay from './components/GoToMarketStrategyResultDisplay';
import { LogoIcon, HeroBackgroundImage, MarketVerificationIcon, CompetitorAnalysisIcon, GoToMarketIcon } from './components/Icons';
import AgentLoadingIndicator from './components/AgentLoadingIndicator';

type Agent = 'marketVerification' | 'competitorAnalysis' | 'goToMarketStrategy';

const goToMarketStrategySteps = [
    "Synthesizing market & competitor data...",
    "Conducting deep web research with Google...",
    "Defining the ideal target audience & problems...",
    "Formulating key indicators and red flags...",
    "Compiling the final strategic report...",
];

const App: React.FC = () => {
  const [activeAgent, setActiveAgent] = useState<Agent>('marketVerification');
  
  // State for Market Verification Agent
  const [industry, setIndustry] = useState<string>('');
  const [marketAnalysisResult, setMarketAnalysisResult] = useState<MarketAnalysisResult | null>(null);
  
  // State for Competitor Analysis Agent
  const [competitorIndustry, setCompetitorIndustry] = useState<string>('');
  const [specificProblem, setSpecificProblem] = useState<string>('');
  const [competitorAnalysisResult, setCompetitorAnalysisResult] = useState<CompetitorAnalysisResult | null>(null);

  // State for Go-to-Market Strategy Agent
  const [goToMarketStrategyResult, setGoToMarketStrategyResult] = useState<GoToMarketStrategyResult | null>(null);

  // General state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState<string>('');

  const handleMarketAnalysisRequest = useCallback(async (requestedIndustry: string, isDeeper = false) => {
    if (!requestedIndustry) {
      setError('Please enter an industry to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setMarketAnalysisResult(null);
    setCompetitorAnalysisResult(null); // Reset subsequent steps
    setGoToMarketStrategyResult(null); // Reset subsequent steps
    setIndustry(requestedIndustry);
    setLoadingMessage(isDeeper ? `Conducting deeper analysis for ${requestedIndustry}...` : `Analyzing market for ${requestedIndustry}...`);

    try {
      const result = await getMarketAnalysis(requestedIndustry, isDeeper);
      setMarketAnalysisResult(result);
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
    setCompetitorIndustry(industry);
    setSpecificProblem(problem);
    setLoadingMessage(`Analyzing competitors for ${industry}...`);

    try {
      const result = await getCompetitorAnalysis(industry, problem);
      setCompetitorAnalysisResult(result);
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
    setLoadingMessage(`Developing Go-to-Market strategy...`);

    try {
      const result = await getGoToMarketStrategy(marketAnalysisResult, competitorAnalysisResult, competitorIndustry, specificProblem);
      setGoToMarketStrategyResult(result);
    } catch(e) {
      console.error(e);
      setError('An error occurred while generating the strategy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [marketAnalysisResult, competitorAnalysisResult, competitorIndustry, specificProblem]);

  const handleAnalyzeCompetitorsFromIdealSolution = useCallback((idealSolution: string) => {
    if (!industry) {
      setError("Industry context is missing for competitor analysis.");
      return;
    }
    setActiveAgent('competitorAnalysis');
    
    const mainElement = document.querySelector('main');
    mainElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });

    handleCompetitorAnalysisRequest(industry, idealSolution);
  }, [industry, handleCompetitorAnalysisRequest]);

  const handleGoToMarket = useCallback(() => {
    setActiveAgent('goToMarketStrategy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  const AgentButton: React.FC<{agent: Agent, label: string, icon: React.ReactNode}> = ({ agent, label, icon }) => (
    <button 
        onClick={() => setActiveAgent(agent)}
        className={`flex items-center justify-center gap-3 px-4 py-2 text-sm sm:text-base sm:px-6 sm:py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-brand-primary ${activeAgent === agent ? 'bg-white text-content-primary shadow-lg scale-105' : 'bg-white/60 text-content-secondary hover:bg-white hover:scale-100'}`}
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
              Strategic insights at your fingertips. Select an agent to begin your analysis.
            </p>
          </div>
      </header>
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <nav className="flex justify-center flex-wrap gap-2 sm:gap-4 -mt-16 sm:-mt-18 z-20 relative">
            <AgentButton agent="marketVerification" label="Market Verification" icon={<MarketVerificationIcon className="w-6 h-6"/>} />
            <AgentButton agent="competitorAnalysis" label="Competitor Analysis" icon={<CompetitorAnalysisIcon className="w-6 h-6"/>} />
            <AgentButton agent="goToMarketStrategy" label="Go-to-Market Strategy" icon={<GoToMarketIcon className="w-6 h-6"/>} />
        </nav>

        <main className="mt-12">
          {activeAgent === 'marketVerification' && (
            <div className="animate-fade-in">
              <MarketVerificationForm onSubmit={(industry) => handleMarketAnalysisRequest(industry)} isLoading={isLoading} />
              {marketAnalysisResult && !isLoading && !error && (
                <div className="mt-12 animate-fade-in">
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
              <CompetitorAnalysisForm 
                onSubmit={handleCompetitorAnalysisRequest} 
                isLoading={isLoading} 
                industry={competitorIndustry}
                problem={specificProblem}
                onIndustryChange={setCompetitorIndustry}
                onProblemChange={setSpecificProblem}
              />
               {competitorAnalysisResult && !isLoading && !error && (
                <div className="mt-12 animate-fade-in">
                  <CompetitorAnalysisResultDisplay result={competitorAnalysisResult} industry={competitorIndustry} problem={specificProblem} onGoToMarketStrategy={handleGoToMarket} gradientIndex={3}/>
                </div>
              )}
            </div>
          )}

          {activeAgent === 'goToMarketStrategy' && (
            <div className="animate-fade-in">
              {!competitorAnalysisResult ? (
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg animate-slide-in-up max-w-2xl mx-auto">
                    <GoToMarketIcon className="w-16 h-16 mx-auto text-brand-primary opacity-50 mb-4" />
                    <h3 className="text-xl font-semibold text-content-primary">Prerequisite Step Missing</h3>
                    <p className="mt-2 text-content-secondary">
                        Please run a Competitor Analysis first to provide the necessary context for developing a Go-to-Market strategy.
                    </p>
                    <button onClick={() => setActiveAgent('competitorAnalysis')} className="mt-6 px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark transition-all">
                        Go to Competitor Analysis
                    </button>
                </div>
              ) : (
                <>
                  {isLoading && (
                    <AgentLoadingIndicator 
                        title="Developing Go-to-Market Strategy"
                        steps={goToMarketStrategySteps}
                    />
                  )}
                  {!goToMarketStrategyResult && !isLoading && (
                    <div className="text-center p-8 bg-white rounded-2xl shadow-lg animate-slide-in-up max-w-2xl mx-auto">
                      <GoToMarketIcon className="w-16 h-16 mx-auto text-brand-primary opacity-50 mb-4" />
                      <h3 className="text-xl font-semibold text-content-primary">Ready for the Final Step?</h3>
                      <p className="mt-2 text-content-secondary">
                          Our AI agent will now analyze the previous results, conduct its own research, and define a target audience and strategic path forward.
                      </p>
                      <button 
                        onClick={handleGoToMarketStrategyRequest} 
                        className="mt-6 inline-flex items-center gap-3 px-8 py-3 bg-brand-primary text-white font-semibold rounded-lg shadow-md hover:bg-brand-dark transition-all transform hover:scale-105"
                      >
                        <GoToMarketIcon className="w-6 h-6" />
                        Develop Go-to-Market Strategy
                      </button>
                    </div>
                  )}
                  
                  {goToMarketStrategyResult && !isLoading && !error && (
                    <div className="mt-12 animate-fade-in">
                      <GoToMarketStrategyResultDisplay result={goToMarketStrategyResult} gradientIndex={4}/>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {error && (
            <div className="mt-8 text-center bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg animate-fade-in">
              <p>{error}</p>
            </div>
          )}

          {isLoading && !marketAnalysisResult && !competitorAnalysisResult && !goToMarketStrategyResult && (
            <div className="mt-12 text-center flex flex-col items-center justify-center animate-fade-in">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
              <h2 className="text-2xl font-semibold mt-6 text-content-primary">{loadingMessage}</h2>
              <p className="text-content-tertiary mt-2">Our AI agent is conducting deep analysis. This may take a moment.</p>
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