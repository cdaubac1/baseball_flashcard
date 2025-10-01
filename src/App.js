import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ScoutingCard = () => {
  const [currentCard, setCurrentCard] = useState(0);
  
  // Sample data - you'll replace this with your Trackman data
  const batterData = [
    {
      batter: "Mike Rodriguez",
      batterSide: "R",
      batterTeam: "Eagles",
      pitcher: "Jake Thompson",
      pitcherThrows: "R",
      pitcherTeam: "Hawks",
      date: "2025-09-15",
      
      // Zone performance (1-9 standard zone numbering)
      // hot = strengths, cold = weaknesses, dead = no data/very weak
      zoneData: {
        1: { type: 'cold', avg: '.180', slugging: '.220' },
        2: { type: 'hot', avg: '.420', slugging: '.680' },
        3: { type: 'cold', avg: '.190', slugging: '.240' },
        4: { type: 'neutral', avg: '.280', slugging: '.380' },
        5: { type: 'hot', avg: '.390', slugging: '.620' },
        6: { type: 'neutral', avg: '.270', slugging: '.350' },
        7: { type: 'dead', avg: '.120', slugging: '.140' },
        8: { type: 'neutral', avg: '.290', slugging: '.400' },
        9: { type: 'cold', avg: '.200', slugging: '.260' },
      },
      
      tendencies: [
        "Crushes fastballs middle-in",
        "Chases breaking balls low",
        "Struggles vs high heat",
        "First pitch aggressive"
      ],
      
      stats: {
        avg: ".285",
        ops: ".812",
        k_rate: "22%",
        bb_rate: "9%"
      }
    },
    {
      batter: "Carlos Martinez",
      batterSide: "L",
      batterTeam: "Tigers",
      pitcher: "Sam Wilson",
      pitcherThrows: "L",
      pitcherTeam: "Panthers",
      date: "2025-09-20",
      
      zoneData: {
        1: { type: 'neutral', avg: '.260', slugging: '.380' },
        2: { type: 'cold', avg: '.180', slugging: '.210' },
        3: { type: 'hot', avg: '.410', slugging: '.720' },
        4: { type: 'hot', avg: '.380', slugging: '.580' },
        5: { type: 'neutral', avg: '.290', slugging: '.420' },
        6: { type: 'cold', avg: '.190', slugging: '.240' },
        7: { type: 'neutral', avg: '.270', slugging: '.370' },
        8: { type: 'dead', avg: '.110', slugging: '.130' },
        9: { type: 'hot', avg: '.400', slugging: '.660' },
      },
      
      tendencies: [
        "Pull hitter - outside pitch danger",
        "Good low ball hitter",
        "Weak vs high inside",
        "Patient - works counts"
      ],
      
      stats: {
        avg: ".302",
        ops: ".891",
        k_rate: "18%",
        bb_rate: "12%"
      }
    }
  ];
  
  const batter = batterData[currentCard];
  
  const getZoneColor = (type) => {
    switch(type) {
      case 'hot': return 'bg-red-500';
      case 'cold': return 'bg-blue-500';
      case 'dead': return 'bg-gray-700';
      default: return 'bg-green-500';
    }
  };
  
  const getZoneOpacity = (type) => {
    switch(type) {
      case 'hot': return 'bg-opacity-80';
      case 'cold': return 'bg-opacity-70';
      case 'dead': return 'bg-opacity-90';
      default: return 'bg-opacity-50';
    }
  };
  
  // Strike zone grid (3x3)
  const renderZone = (zoneNum) => {
    const zone = batter.zoneData[zoneNum];
    return (
      <div
        key={zoneNum}
        className={`relative border-2 border-white ${getZoneColor(zone.type)} ${getZoneOpacity(zone.type)} flex flex-col items-center justify-center text-white font-semibold`}
      >
        <div className="text-3xl font-bold">{zone.avg}</div>
        <div className="text-sm opacity-90 mt-1">SLG {zone.slugging}</div>
      </div>
    );
  };
  
  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % batterData.length);
  };
  
  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + batterData.length) % batterData.length);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{batter.batter}</h1>
                <p className="text-blue-100 mt-1">{batter.batterTeam} • {batter.batterSide}HH</p>
              </div>
              <div className="text-right text-sm">
                <p className="text-blue-100">vs {batter.pitcher}</p>
                <p className="text-blue-200 text-xs">{batter.pitcherTeam} • {batter.pitcherThrows}HP</p>
                <p className="text-blue-200 text-xs mt-1">{batter.date}</p>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-8">
            <div className={`flex items-center justify-center gap-12 ${batter.batterSide === 'L' ? 'flex-row-reverse' : ''}`}>
              {/* Batter silhouette - Much Larger - Left side for RHH, Right side for LHH */}
              <div className="flex-shrink-0">
                {batter.batterSide === 'R' ? (
                  // Right-handed batter
                  <svg width="240" height="420" viewBox="0 0 80 140" className="drop-shadow-2xl">
                    {/* Head */}
                    <circle cx="40" cy="20" r="12" fill="#1f2937" />
                    {/* Helmet */}
                    <path d="M 28 20 Q 28 12 40 12 Q 52 12 52 20 L 52 25 Q 45 28 40 28 Q 35 28 28 25 Z" fill="#374151" />
                    {/* Body */}
                    <ellipse cx="40" cy="55" rx="14" ry="22" fill="#3b82f6" />
                    {/* Back leg */}
                    <rect x="30" y="72" width="8" height="32" rx="4" fill="#e5e7eb" />
                    <rect x="28" y="102" width="12" height="18" rx="3" fill="#1f2937" />
                    {/* Front leg */}
                    <rect x="44" y="72" width="8" height="32" rx="4" fill="#e5e7eb" />
                    <rect x="42" y="102" width="12" height="18" rx="3" fill="#1f2937" />
                    {/* Back arm */}
                    <rect x="20" y="40" width="7" height="28" rx="3.5" fill="#f3f4f6" transform="rotate(-25 24 40)" />
                    {/* Bat */}
                    <rect x="10" y="15" width="6" height="55" rx="3" fill="#78350f" transform="rotate(-35 13 15)" />
                    {/* Front arm */}
                    <rect x="48" y="42" width="7" height="24" rx="3.5" fill="#f3f4f6" transform="rotate(15 52 42)" />
                  </svg>
                ) : (
                  // Left-handed batter
                  <svg width="240" height="420" viewBox="0 0 80 140" className="drop-shadow-2xl">
                    {/* Head */}
                    <circle cx="40" cy="20" r="12" fill="#1f2937" />
                    {/* Helmet */}
                    <path d="M 28 20 Q 28 12 40 12 Q 52 12 52 20 L 52 25 Q 45 28 40 28 Q 35 28 28 25 Z" fill="#374151" />
                    {/* Body */}
                    <ellipse cx="40" cy="55" rx="14" ry="22" fill="#3b82f6" />
                    {/* Front leg */}
                    <rect x="28" y="72" width="8" height="32" rx="4" fill="#e5e7eb" />
                    <rect x="26" y="102" width="12" height="18" rx="3" fill="#1f2937" />
                    {/* Back leg */}
                    <rect x="42" y="72" width="8" height="32" rx="4" fill="#e5e7eb" />
                    <rect x="40" y="102" width="12" height="18" rx="3" fill="#1f2937" />
                    {/* Front arm */}
                    <rect x="25" y="42" width="7" height="24" rx="3.5" fill="#f3f4f6" transform="rotate(-15 28 42)" />
                    {/* Bat */}
                    <rect x="64" y="15" width="6" height="55" rx="3" fill="#78350f" transform="rotate(35 67 15)" />
                    {/* Back arm */}
                    <rect x="53" y="40" width="7" height="28" rx="3.5" fill="#f3f4f6" transform="rotate(25 56 40)" />
                  </svg>
                )}
              </div>
              
              {/* Strike Zone - Much Larger */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="grid grid-cols-3 gap-2 w-96 h-96 bg-gray-800 p-3 rounded-xl shadow-2xl">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(renderZone)}
                  </div>
                  
                  {/* Home plate */}
                  <div className="flex justify-center mt-4">
                    <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-t-[40px] border-t-gray-400"></div>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="flex justify-center gap-6 text-sm mt-6">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-red-500 rounded"></div>
                    <span className="text-gray-600 font-medium">Hot Zone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-blue-500 rounded"></div>
                    <span className="text-gray-600 font-medium">Cold Zone</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-gray-700 rounded"></div>
                    <span className="text-gray-600 font-medium">Dead Zone</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats & Tendencies - Below */}
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Stats</h2>
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gray-100 p-6 rounded-lg flex flex-col">
                    <div className="text-sm text-gray-600 mb-2">AVG</div>
                    <div className="text-3xl font-bold text-gray-800 font-mono">{batter.stats.avg}</div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg flex flex-col">
                    <div className="text-sm text-gray-600 mb-2">OPS</div>
                    <div className="text-3xl font-bold text-gray-800 font-mono">{batter.stats.ops}</div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg flex flex-col">
                    <div className="text-sm text-gray-600 mb-2">K Rate</div>
                    <div className="text-3xl font-bold text-gray-800 font-mono">{batter.stats.k_rate}</div>
                  </div>
                  <div className="bg-gray-100 p-6 rounded-lg flex flex-col">
                    <div className="text-sm text-gray-600 mb-2">BB Rate</div>
                    <div className="text-3xl font-bold text-gray-800 font-mono">{batter.stats.bb_rate}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Tendencies</h2>
                <ul className="space-y-3">
                  {batter.tendencies.map((tendency, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-3 text-xl">•</span>
                      <span className="text-gray-700 text-lg">{tendency}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
            <button
              onClick={prevCard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <ChevronLeft size={20} />
              Previous
            </button>
            
            <span className="text-gray-600 text-sm">
              Card {currentCard + 1} of {batterData.length}
            </span>
            
            <button
              onClick={nextCard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoutingCard;