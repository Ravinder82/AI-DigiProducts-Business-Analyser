import React, { useState, useEffect } from 'react';
import { CheckIcon } from './Icons';

interface AgentLoadingIndicatorProps {
  title: string;
  steps: string[];
  gradientClass?: string;
}

const AgentLoadingIndicator: React.FC<AgentLoadingIndicatorProps> = ({ 
  title, 
  steps,
  gradientClass = "from-teal-500 via-cyan-500 to-sky-500"
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // This effect ensures we see the first step immediately
    setCurrentStepIndex(0);

    const interval = setInterval(() => {
      setCurrentStepIndex(prevIndex => {
        if (prevIndex < steps.length - 1) {
          return prevIndex + 1;
        }
        // When it reaches the end, it stays on the last step until the loading is finished.
        return prevIndex;
      });
    }, 2500); // Change message every 2.5 seconds

    return () => clearInterval(interval);
  }, [steps]);

  return (
    <div className="relative group p-[2px] rounded-2xl animate-slide-in-up max-w-2xl mx-auto">
      <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${gradientClass} animate-gradient-border opacity-80 group-hover:opacity-100 blur-sm`}></div>
      <div className="relative bg-white text-black rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-content-primary mb-2 text-center">{title}</h3>
        <p className="text-content-tertiary mb-8 text-center">Our AI agent is performing deep analysis. Please wait...</p>
        
        <div className="space-y-4 text-left">
          {steps.map((step, index) => (
            <div key={index} className={`flex items-center transition-all duration-500 ${index <= currentStepIndex ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-6 h-6 mr-4 flex-shrink-0 flex items-center justify-center">
                {index < currentStepIndex && (
                  <CheckIcon className="w-6 h-6 text-emerald-500 animate-fade-in" />
                )}
                {index === currentStepIndex && (
                  <div className="w-5 h-5 border-2 border-dashed rounded-full animate-spin border-brand-primary"></div>
                )}
                {index > currentStepIndex && (
                   <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                )}
              </div>
              <p className={`font-medium transition-colors duration-300 ${index === currentStepIndex ? 'text-content-primary' : 'text-content-secondary'}`}>{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentLoadingIndicator;