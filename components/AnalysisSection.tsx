import React from 'react';
import { SectionIcon } from './Icons';

interface AnalysisSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  prose?: boolean;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, children, className = '', prose = true }) => (
  <section className={`card relative p-6 sm:p-8 animate-slide-in-up ${className}`}>
    <h3 className="flex items-center text-2xl font-bold mb-4 text-content-primary">
      <SectionIcon className="h-6 w-6 mr-3 text-brand-primary" />
      {title}
    </h3>
    <div className={prose ? "text-content-secondary space-y-4 prose max-w-none prose-p:text-content-secondary prose-ul:text-content-secondary prose-li:text-content-secondary" : ""}>
        {children}
    </div>
  </section>
);

export default AnalysisSection;