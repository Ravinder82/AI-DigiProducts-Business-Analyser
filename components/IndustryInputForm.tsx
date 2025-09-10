import React, { useState } from 'react';

interface MarketVerificationFormProps {
  onSubmit: (industry: string) => void;
  isLoading: boolean;
}

const MarketVerificationForm: React.FC<MarketVerificationFormProps> = ({ onSubmit, isLoading }) => {
  const [industry, setIndustry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(industry);
  };

  return (
    <div className="relative group p-[2px] rounded-2xl animate-slide-in-up max-w-2xl mx-auto">
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-border opacity-80 group-hover:opacity-100 blur-sm"></div>

      {/* Card content */}
      <div className="relative bg-white text-black rounded-2xl p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <label htmlFor="industry-input" className="block text-lg font-medium mb-2 text-black">
            Enter an Industry
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="industry-input"
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Independent Coffee Shops, SaaS Startups"
              className="flex-grow w-full px-4 py-3 bg-white text-black border border-gray-800 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 placeholder:text-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !industry}
              className="flex items-center justify-center px-6 py-3 bg-gray-300 text-black font-semibold rounded-md shadow-md hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze Market'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarketVerificationForm;

/* Tailwind CSS additions
@keyframes gradient-border {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient-border {
  background-size: 200% 200%;
  animation: gradient-border 4s linear infinite;
}

@keyframes slide-in-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-slide-in-up {
  animation: slide-in-up 0.5s ease-out;
}
*/