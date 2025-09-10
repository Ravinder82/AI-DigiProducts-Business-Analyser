import React from 'react';

interface GoToMarketStrategyFormProps {
  onSubmit: (audience: string, problems: string) => void;
  isLoading: boolean;
  audience: string;
  problems: string;
  onAudienceChange: (value: string) => void;
  onProblemsChange: (value: string) => void;
}

const GoToMarketStrategyForm: React.FC<GoToMarketStrategyFormProps> = ({ onSubmit, isLoading, audience, problems, onAudienceChange, onProblemsChange }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(audience, problems);
  };

  return (
    <div className="relative group p-[2px] rounded-2xl animate-slide-in-up max-w-2xl mx-auto">
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 animate-gradient-border opacity-80 group-hover:opacity-100 blur-sm"></div>

      {/* Card content */}
      <div className="relative bg-white text-black rounded-2xl p-6 shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
           <div>
              <label htmlFor="audience-input" className="block text-lg font-medium mb-2 text-black">
                Describe your Target Audience
              </label>
              <textarea
                id="audience-input"
                value={audience}
                onChange={(e) => onAudienceChange(e.target.value)}
                placeholder="e.g., Freelance graphic designers who work in small teams of 2-3 people."
                className="w-full px-4 py-3 bg-white text-black border border-gray-800 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200 placeholder:text-gray-500 min-h-[80px]"
                disabled={isLoading}
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="problems-input" className="block text-lg font-medium mb-2 text-black">
                What problems are they dealing with?
              </label>
              <textarea
                id="problems-input"
                value={problems}
                onChange={(e) => onProblemsChange(e.target.value)}
                placeholder="e.g., They struggle with sharing project files and getting feedback from clients in an organized way. Email threads get messy and cloud storage is disconnected from their design workflow."
                className="w-full px-4 py-3 bg-white text-black border border-gray-800 rounded-md focus:ring-2 focus:ring-sky-500 focus:outline-none transition duration-200 placeholder:text-gray-500 min-h-[100px]"
                disabled={isLoading}
                rows={4}
              />
            </div>
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading || !audience || !problems}
              className="w-full flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Developing Strategy...
                </>
              ) : (
                'Generate Strategy'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GoToMarketStrategyForm;