import { useState } from 'react';
import { Search, MapPin, Wifi, Plug, PawPrint, BookOpen } from 'lucide-react';
import React from "react";

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReduced(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return prefersReduced;
}

/** Tiny pixel-ish steam puffs */
function Steam() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="absolute -top-6 left-1/2 -translate-x-1/2 h-10 w-10 pointer-events-none select-none"
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    >
      {/* Puff 1 */}
      <rect x="14" y="22" width="4" height="4" fill="#F9F4EF" opacity="0.8">
        <animate attributeName="y" from="22" to="2" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.9;0" dur="2.6s" repeatCount="indefinite" />
      </rect>
      {/* Puff 2 */}
      <rect x="10" y="24" width="3" height="3" fill="#E7DED4" opacity="0.7">
        <animate attributeName="y" from="24" to="6" dur="2.3s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.8;0" dur="2.3s" begin="0.5s" repeatCount="indefinite" />
      </rect>
      {/* Puff 3 */}
      <rect x="18" y="24" width="3" height="3" fill="#D8C3A5" opacity="0.7">
        <animate attributeName="y" from="24" to="6" dur="2.1s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0;0.8;0" dur="2.1s" begin="1s" repeatCount="indefinite" />
      </rect>

      {/* gentle wander */}
      <g>
        <animateTransform
          attributeName="transform"
          type="translate"
          values="0,0; -1,-1; 0,-2; 1,-3; 0,-4"
          dur="2.6s"
          repeatCount="indefinite"
        />
      </g>
    </svg>
  );
}

/** Cute cup with early-2000s/pixel vibes, using your palette */
function CoffeeCup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      style={{ imageRendering: "pixelated" }}
      aria-hidden
    >
      {/* saucer */}
      <rect x="8" y="48" width="48" height="4" fill="#5E503F" />
      <rect x="12" y="52" width="40" height="2" fill="#4B2E05" opacity="0.8" />
      {/* cup body */}
      <rect x="14" y="22" width="28" height="22" rx="2" fill="#F9F4EF" />
      <rect x="16" y="24" width="24" height="14" fill="#A47551" opacity="0.25" />
      {/* rim highlight */}
      <rect x="14" y="22" width="28" height="2" fill="#E7DED4" />
      {/* handle */}
      <path d="M42 26 h6 v14 h-6" fill="none" stroke="#F9F4EF" strokeWidth="4" />
      <path d="M44 28 h2 v10 h-2" fill="#D8C3A5" />
      {/* tiny shadow */}
      <rect x="18" y="44" width="20" height="2" fill="#D8C3A5" opacity="0.5" />
    </svg>
  );
}

function Bean({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={{ imageRendering: "pixelated" }} aria-hidden>
      <path d="M12 3c-4 0-7 3.5-7 7.5S8 21 12 21s7-3.5 7-7.5S16 3 12 3Z" fill="#A47551" stroke="#5E503F" strokeWidth="2"/>
      <path d="M9 9c2 0 2.5 2.2 5 2.2" stroke="#F9F4EF" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}


export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    { id: 'open-now', label: 'Open Now', icon: MapPin },
    { id: 'wifi', label: 'Has Wi-Fi', icon: Wifi },
    { id: 'outlets', label: 'Has Outlets', icon: Plug },
    { id: 'pet-friendly', label: 'Pet Friendly', icon: PawPrint },
    { id: 'study-spots', label: 'Study Spots', icon: BookOpen },
  ];

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const prefersReduced = usePrefersReducedMotion();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-10">
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-3 md:gap-4">

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-[#3b2600] leading-snug md:leading-normal">
              Find Your Perfect Coffee Spot
            </h1>
            {/* Cup + steam */}
            <div className="relative">
              <CoffeeCup className="h-12 w-12 md:h-16 md:w-16 drop-shadow-[0_2px_0_rgba(0,0,0,0.25)]" />
              {!prefersReduced && <Steam />}
            </div>
          </div>

          <p className="text-lg text-[#5E503F] leading-relaxed">
              Discover cozy cafes, track your visits, and become a Master Roaster
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-8 md:mt-10 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter a city, postal code, or use your location..."
              className="w-full px-6 py-4 pr-24 rounded-lg border-2 border-[#A47551] focus:border-[#4B2E05] focus:outline-none text-[#5E503F] placeholder-[#A47551] bg-[#F9F4EF] shadow-lg"
            />
            <button
              type="submit"
              className="group absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-[#4B2E05] text-[#F9F4EF] rounded-md hover:bg-[#5E503F] transition-colors flex items-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>

              {/* Bean bounce */}
              <Bean className="h-5 w-5 transform transition-transform duration-300 ease-out
                              group-hover:-translate-y-1 group-active:translate-y-0" />
            </button>
          </div>
        </form>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-[#4B2E05] mb-4">Filter by:</h2>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const isSelected = selectedFilters.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full border-2 transition-all ${
                    isSelected
                      ? 'bg-[#4B2E05] text-[#F9F4EF] border-[#4B2E05]'
                      : 'bg-[#F9F4EF] text-[#5E503F] border-[#A47551] hover:border-[#4B2E05]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-6 border-2 border-[#D8C3A5]">
            <div className="aspect-video bg-[#D8C3A5] rounded-lg flex items-center justify-center mb-4">
              <div className="text-center text-[#5E503F]">
                <MapPin className="h-16 w-16 mx-auto mb-2" />
                <p className="text-lg font-medium">Map View</p>
                <p className="text-sm text-[#A47551] mt-1">
                  Google Maps integration coming soon
                </p>
              </div>
            </div>
            <p className="text-sm text-[#5E503F] text-center">
              Search for cafes to see them on the map
            </p>
          </div>

          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-6 border-2 border-[#D8C3A5]">
            <h3 className="text-xl font-bold text-[#4B2E05] mb-4" style={{ fontFamily: 'monospace' }}>
              Nearby Cafes
            </h3>
            <div className="space-y-4">
              <div className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-[#A47551] mb-3" />
                <p className="text-[#5E503F]">Search for a location to discover cafes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-[#F9F4EF] rounded-lg shadow-lg p-8 border-2 border-[#A47551]">
          <h2 className="text-2xl font-bold text-[#4B2E05] mb-4 text-center" style={{ fontFamily: 'monospace' }}>
            Join the BrewMate Community
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#D8C3A5] rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="h-8 w-8 text-[#4B2E05]" />
              </div>
              <h3 className="font-semibold text-[#4B2E05] mb-2">Discover</h3>
              <p className="text-sm text-[#5E503F]">Find amazing cafes near you or anywhere in the world</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#D8C3A5] rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-8 w-8 text-[#4B2E05]" />
              </div>
              <h3 className="font-semibold text-[#4B2E05] mb-2">Track</h3>
              <p className="text-sm text-[#5E503F]">Mark cafes as visited and build your coffee journey</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-[#D8C3A5] rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-8 w-8 text-[#4B2E05]" />
              </div>
              <h3 className="font-semibold text-[#4B2E05] mb-2">Level Up</h3>
              <p className="text-sm text-[#5E503F]">Climb the ranks from Apprentice Brewer to Master Roaster</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
