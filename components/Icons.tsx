import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="frosted-glass" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="clear" />
        <feOffset in="blur" dx="2" dy="2" result="offsetBlur" />
        <feSpecularLighting in="blur" surfaceScale="5" specularConstant=".75" specularExponent="20" lightingColor="#cce7ff" result="specOut">
          <fePointLight x="-5000" y="-10000" z="20000" />
        </feSpecularLighting>
        <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut" />
        <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint" />
      </filter>
    </defs>
    <g filter="url(#frosted-glass)" opacity="0.8">
      <path d="M50 10 L65 40 L60 42 L60 70 L70 80 L70 90 L30 90 L30 80 L40 70 L40 42 L35 40 Z" fill="black" fillOpacity="0.8" />
      <path d="M50 10 L65 40 L35 40 Z" fill="black" fillOpacity="0.5" />
      <path d="M40 70 L30 80 L30 90 L40 90 Z" fill="black" fillOpacity="0.2" />
      <path d="M60 70 L70 80 L70 90 L60 90 Z" fill="#black" fillOpacity="0.2" />
    </g>
  </svg>
);

export const QuoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.17 48.17 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
);

export const ImpactIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.5 4.5 0 0 0 12.001 15c-1.226 0-2.383.424-3.282 1.135M15.182 16.318A4.5 4.5 0 0 1 18 19.5c0 .339-.029.67-.083 1M15.182 16.318c.542-.582 1.23-1.047 2.01-1.382M12.001 15c-.966 0-1.892.19-2.733.533M6.819 16.318a4.5 4.5 0 0 1 2.01-1.382M6.819 16.318A4.5 4.5 0 0 0 6 19.5c0 .339.029.67.084 1M12 3a8.962 8.962 0 0 1 7.748 4.516M12 3a8.962 8.962 0 0 0-7.748 4.516M12 21a8.962 8.962 0 0 0 7.748-4.516M12 21a8.962 8.962 0 0 1-7.748-4.516M15 9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const WorkaroundIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.472-2.472a.375.375 0 0 0-.53-.53L10.842 14.7a.375.375 0 0 0 .53.53Zm-2.472-2.472a.375.375 0 0 0-.53.53l2.472 2.472a.375.375 0 0 0 .53-.53L8.95 12.7zM3 8.25V7.5a2.25 2.25 0 0 1 2.25-2.25h1.5M3 8.25v1.5a2.25 2.25 0 0 0 2.25 2.25h1.5M3 15v.75a2.25 2.25 0 0 0 2.25 2.25h1.5m-3.75-6H.75" />
  </svg>
);

export const CostIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.17 0-2.996.604-.456 1.372-.688 2.147-.688 1.061 0 2.033.44 2.753 1.218" />
  </svg>
);

export const SectionIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);

// Icons for Competitor Analysis
export const UspIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

export const PriceIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.826-1.106-2.17 0-2.996.604-.456 1.372-.688 2.147-.688 1.061 0 2.033.44 2.753 1.218" />
    </svg>
);

export const FeaturesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const ThumbsUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.59-11.55c.229.083.425.215.583.385.158.17.285.386.385.621m-1.396 0c.04.1.075.206.106.316m-1.458 0c.092.236.19.463.295.681M13.48 16.75a4.5 4.5 0 0 1-1.423-.23l-3.114-1.04a4.5 4.5 0 0 0-1.423-.23H5.904M14.25 7.5a.75.75 0 0 0-.75.75v3.375c0 .621.504 1.125 1.125 1.125h3.375a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75h-4.5Z" />
    </svg>
);

export const ThumbsDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904M14.25 7.5a.75.75 0 0 0-.75.75v3.375c0 .621.504 1.125 1.125 1.125h3.375a.75.75 0 0 0 .75-.75V7.5a.75.75 0 0 0-.75-.75h-4.5Z" transform="rotate(180 12 12)" />
    </svg>
);

export const MarketingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
);

export const GapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0L10.5 15.75m3.25-2.489L15.75 10.5m-2.489 2.489-2.489 2.489m0 0L8.25 10.5m2.489 2.489L8.25 15.75M3 12h18M3 12a9 9 0 1 1 18 0 9 9 0 0 1-18 0Z" />
    </svg>
);

export const HeroBackgroundImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sky" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop stopColor="#F3F4F6" />
          <stop offset="1" stopColor="#E5E7EB" />
        </linearGradient>
        <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="30" />
        </filter>
        <radialGradient id="sun-glow" cx="0" cy="0" r="1">
          <stop stopColor="#FEF3C7" />
          <stop offset="1" stopColor="#FEF3C7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="1440" height="400" fill="url(#sky)" />
      <g opacity="0.5" filter="url(#soft-blur)">
        <ellipse cx="1200" cy="150" rx="300" ry="150" fill="url(#sun-glow)" />
        <ellipse cx="200" cy="350" rx="400" ry="100" fill="#D1FAE5" />
        <ellipse cx="800" cy="400" rx="500" ry="120" fill="#E0F2FE" />
      </g>
      <path d="M-50 400 C 200 280, 400 350, 720 320 S 1040 250, 1490 300 V 400 Z" fill="#D1FAE5" opacity="0.6" />
      <path d="M-50 400 C 300 320, 500 380, 820 350 S 1140 300, 1490 340 V 400 Z" fill="#A7F3D0" opacity="0.6" />
    </svg>
);

export const MarketVerificationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 7.5v6m3-3h-6" />
    </svg>
);

export const CompetitorAnalysisIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.5m3.75-3.75v3.75m3.75-3.75v1.5m-9.75-3.75h9.75c.621 0 1.125-.504 1.125-1.125v-9.75c0-.621-.504-1.125-1.125-1.125h-9.75c-.621 0-1.125.504-1.125 1.125v9.75c0 .621.504 1.125 1.125 1.125Zm0 0h3.75m-3.75 0p.007-3.75M12 15h.008v.008H12V15Zm.008-3.75h.008v.008h-.008v-.008Zm0 0h.008v.008h-.008v-.008Zm-3.75 0h.008v.008h-.008v-.008Zm0 0h.008v.008h-.008v-.008Z" />
    </svg>
);

export const RefreshIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.664 0l3.181-3.183m-11.664 0-3.181 3.183m0 0-3.181-3.183m3.181 3.183L12 12.121v-2.262m0 0L8.819 6.679m3.181 3.182L12 6.679v2.262" />
  </svg>
);