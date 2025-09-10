import React from 'react';
import type { PainPoint } from '../types';

// Inline SVG icons
const QuoteIcon: React.FC = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.17 6A4.17 4.17 0 0 0 3 10.17V13a1 1 0 0 0 1 1h3v2H4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h5v-7A4.17 4.17 0 0 0 7.17 6zM21.17 6A4.17 4.17 0 0 0 17 10.17V13a1 1 0 0 0 1 1h3v2h-3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h5v-7A4.17 4.17 0 0 0 21.17 6z" fill="currentColor" />
  </svg>
);

const ImpactIcon: React.FC = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21s-6.716-4.35-9.243-7.02C-0.04 9.79 3.663 4 8.5 4 10.992 4 12 6 12 6s1.008-2 3.5-2C20.337 4 24.04 9.79 21.243 13.98 18.716 16.65 12 21 12 21z" fill="currentColor" />
  </svg>
);

const WorkaroundIcon: React.FC = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.7 6.3a1 1 0 0 0-1.4 0l-1 1 3.4 3.4 1-1a1 1 0 0 0 0-1.4l-2-2zM3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor" />
  </svg>
);

const CostIcon: React.FC = () => (
  <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M7 12a5 5 0 0 0 10 0 5 5 0 0 0-10 0z" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface PainPointCardProps {
  painPoint: PainPoint;
  index: number;
}

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-6 h-6 text-gray-600 mr-3 mt-1">{icon}</div>
    <div>
      <h5 className="font-semibold text-black">{label}</h5>
      <p className="text-gray-700">{value}</p>
    </div>
  </div>
);

const PainPointCard: React.FC<PainPointCardProps> = ({ painPoint, index }) => {
  const animationDelay = { animationDelay: `${index * 100}ms` } as React.CSSProperties;

  return (
    <div
      className="relative group p-[2px] rounded-2xl animate-slide-in-up"
      style={animationDelay}
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-border opacity-80 group-hover:opacity-100 blur-sm"></div>

      {/* Card content */}
      <div className="relative bg-white text-black rounded-2xl p-6 flex flex-col space-y-4 transition-all duration-300 shadow-lg">
        <h4 className="text-xl font-bold">{index + 1}. {painPoint.point}</h4>
        <div className="space-y-4 pt-4 border-t border-gray-300">
          <InfoItem icon={<QuoteIcon />} label="User Quote" value={painPoint.exampleQuote ? `\"${painPoint.exampleQuote}\"` : '—'} />
          <InfoItem icon={<ImpactIcon />} label="Emotional Impact" value={painPoint.emotionalImpact || '—'} />
          <InfoItem icon={<WorkaroundIcon />} label="Current Workaround" value={painPoint.workaround || '—'} />
          <InfoItem icon={<CostIcon />} label="Estimated Cost" value={painPoint.cost || '—'} />
        </div>
      </div>
    </div>
  );
};

export default PainPointCard;

// Demo component
export const PainPointCardDemo: React.FC = () => {
  const demo: PainPoint[] = [
    {
      point: 'Signing up feels confusing',
      exampleQuote: 'I had to try three times to register — it kept throwing an error.',
      emotionalImpact: 'Frustration, uncertainty',
      workaround: 'Contacted support, used referral link',
      cost: '$120 (support time)'
    } as PainPoint,
    {
      point: 'Search results are irrelevant',
      exampleQuote: 'I type exact product name but see unrelated items.',
      emotionalImpact: 'Annoyed, wastes time',
      workaround: 'Use external search engine',
      cost: '$0 (time loss)'
    } as PainPoint,
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {demo.map((p, i) => (
        <PainPointCard key={i} painPoint={p} index={i} />
      ))}
    </div>
  );
};

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
*/