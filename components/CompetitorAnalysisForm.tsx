import React from 'react';

interface CompetitorAnalysisFormProps {
  onSubmit: (industry: string, problem: string) => void;
  isLoading: boolean;
  industry: string;
  problem: string;
  onIndustryChange: (value: string) => void;
  onProblemChange: (value: string) => void;
}

const CompetitorAnalysisForm: React.FC<CompetitorAnalysisFormProps> = ({ onSubmit, isLoading, industry, problem, onIndustryChange, onProblemChange }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(industry, problem);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 card gradient-bg-2">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ca-industry-input" className="block text-lg font-medium mb-2 text-content-primary">
            Enter an Industry
          </label>
          <input
            id="ca-industry-input"
            type="text"
            value={industry}
            onChange={(e) => onIndustryChange(e.target.value)}
            placeholder="e.g., Project Management Software"
            className="w-full px-4 py-3 bg-white text-content-primary border border-black/10 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200 placeholder:text-content-secondary"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="problem-input" className="block text-lg font-medium mb-2 text-content-primary">
            Specific Problem They Solve
          </label>
          <textarea
            id="problem-input"
            value={problem}
            onChange={(e) => onProblemChange(e.target.value)}
            placeholder="e.g., Task tracking for small creative teams"
            className="w-full px-4 py-3 bg-white text-content-primary border border-black/10 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none transition duration-200 placeholder:text-content-secondary min-h-[100px]"
            disabled={isLoading}
          />
        </div>
        <div className="pt-2">
            <button
                type="submit"
                disabled={isLoading || !industry || !problem}
                className="w-full flex items-center justify-center px-6 py-3 bg-brand-primary text-white font-semibold rounded-md shadow-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-primary disabled:bg-slate-400 disabled:text-gray-700 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                </>
                ) : (
                'Analyze Competitors'
                )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default CompetitorAnalysisForm;