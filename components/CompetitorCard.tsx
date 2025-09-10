import React from 'react';
import type { Competitor } from '../types';
import { UspIcon, PriceIcon, FeaturesIcon, ThumbsUpIcon, ThumbsDownIcon, MarketingIcon } from './Icons';

interface CompetitorCardProps {
  competitor: Competitor;
  index: number;
}

const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start">
    <div className="flex-shrink-0 w-6 h-6 text-content-secondary mr-3 mt-1">{icon}</div>
    <div>
      <h5 className="font-semibold text-content-primary">{label}</h5>
      <p className="text-content-secondary text-sm">{value}</p>
    </div>
  </div>
);

const CompetitorCard: React.FC<CompetitorCardProps> = ({ competitor, index }) => {
  const animationDelay = { animationDelay: `${index * 100}ms` };
  const gradientClass = `gradient-bg-${((index + 2) % 6) + 1}`;
  
  return (
    <div 
      className={`card p-6 flex flex-col space-y-4 transition-all duration-300 animate-slide-in-up ${gradientClass}`}
      style={animationDelay}
    >
      <h4 className="text-2xl font-bold text-content-primary text-center">{competitor.name}</h4>
      <div className="space-y-4 pt-4 border-t border-black/10">
        <InfoItem icon={<UspIcon />} label="Unique Selling Proposition" value={competitor.usp} />
        <InfoItem icon={<PriceIcon />} label="Price Structure" value={competitor.pricing} />
        <InfoItem icon={<FeaturesIcon />} label="Key Features" value={competitor.keyFeatures} />
        <InfoItem icon={<ThumbsUpIcon />} label="Customer Likes" value={competitor.customerLikes} />
        <InfoItem icon={<ThumbsDownIcon />} label="Customer Complaints" value={competitor.customerComplaints} />
        <InfoItem icon={<MarketingIcon />} label="Marketing Strategy" value={competitor.marketingStrategy} />
      </div>
    </div>
  );
};

export default CompetitorCard;