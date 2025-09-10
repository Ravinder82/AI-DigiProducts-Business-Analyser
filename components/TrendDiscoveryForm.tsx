import React, { useState } from 'react';

interface TrendDiscoveryFormProps {
  onSubmit: (areaOfInterest: string) => void;
  isLoading: boolean;
}

const TrendDiscoveryForm: React.FC<TrendDiscoveryFormProps> = ({ onSubmit, isLoading }) => {
  const [area, setArea] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(area);
  };

  return (
    <div className="relative group p-[2px] rounded-2xl animate-slide-in-up max-w-2xl mx-auto">
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-border opacity-80 group-hover:opacity-100 blur-sm"></div>
      <div className="relative bg-white text-black rounded-2xl p-6 shadow-lg">
        <form onSubmit={handleSubmit}>
          <label htmlFor="area-input" className="block text-lg font-medium mb-2 text-black">
            Enter a Broad Area of Interest
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="area-input"
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g., AI tools for developers, Pet tech"
              className="flex-grow w-full px-4 py-3 bg-white text-black border border-gray-800 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none transition duration-200 placeholder:text-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !area}
              className="flex items-center justify-center px-6 py-3 bg-gray-800 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Discovering...
                </>
              ) : (
                'Discover Trends'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrendDiscoveryForm;
