import React from 'react';
import { SectionIcon } from './Icons';

interface AnalysisSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  prose?: boolean;
  action?: React.ReactNode;
}

const AnalysisSection: React.FC<AnalysisSectionProps> = ({ title, children, className = '', prose = true, action }) => (
  <section className={`card relative p-6 sm:p-8 animate-slide-in-up ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="flex items-center text-2xl font-bold text-content-primary">
        <SectionIcon className="h-6 w-6 mr-3 text-brand-primary" />
        {title}
      </h3>
      {action && <div>{action}</div>}
    </div>
    <div className={prose ? "text-content-secondary space-y-4 prose max-w-none prose-p:text-content-secondary prose-ul:text-content-secondary prose-li:text-content-secondary" : ""}>
        {children}
    </div>
  </section>
);

export default AnalysisSection;