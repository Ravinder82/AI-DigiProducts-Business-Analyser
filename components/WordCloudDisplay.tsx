import React, { useMemo } from 'react';

// A list of common English words to ignore
const STOP_WORDS = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 
  'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 
  'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 
  'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 
  'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 
  'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 
  'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 
  'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 
  'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 
  'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 
  'will', 'just', 'don', 'should', 'now', 'd', 'll', 'm', 'o', 're', 've', 'y'
]);

const WordCloudCard: React.FC<{ text: string }> = ({ text }) => {
  const words = useMemo(() => {
    if (!text) return [];

    const wordCounts = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2 && !STOP_WORDS.has(word) && isNaN(Number(word)))
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    const sortedWords = Object.entries(wordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 40);

    if (sortedWords.length === 0) return [];

    const maxCount = sortedWords[0][1];
    const minCount = sortedWords[sortedWords.length - 1][1];

    const scale = (count: number) => {
      if (maxCount === minCount) return { size: 1.2, lightness: 40 };
      const ratio = (count - minCount) / (maxCount - minCount);
      const size = 1 + ratio * 2;
      const lightness = 50 - ratio * 30;
      return { size, lightness };
    };

    return sortedWords.map(([word, count]) => ({
      text: word,
      ...scale(count),
    })).sort(() => Math.random() - 0.5);
  }, [text]);

  return (
    <div className="relative group p-[2px] rounded-2xl animate-slide-in-up">
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient-border opacity-80 group-hover:opacity-100 blur-sm"></div>

      {/* Card content */}
      <div className="relative bg-white text-black rounded-2xl p-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 min-h-[200px] shadow-lg">
        {words.length === 0 ? (
          <p className="text-gray-500 text-center w-full">Not enough text to generate a word cloud.</p>
        ) : (
          words.map((word, index) => (
            <span
              key={index}
              className="animate-fade-in"
              style={{
                fontSize: `${word.size}rem`,
                lineHeight: 1,
                animationDelay: `${index * 25}ms`,
                fontWeight: word.size > 2.5 ? '600' : '400',
                color: `hsl(220, 15%, ${word.lightness}%)`,
                transition: 'transform 0.2s ease-in-out',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {word.text}
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default WordCloudCard;

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

@keyframes fade-in {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.4s ease forwards;
}
*/
