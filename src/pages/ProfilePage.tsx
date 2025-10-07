import { Coffee, MapPin, Award, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { TIER_NAMES, TIER_REQUIREMENTS } from '../types';

export default function ProfilePage() {
  const { profile } = useAuth();

  if (!profile) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1] flex items-center justify-center">
        <div className="text-center">
          <Coffee className="h-16 w-16 mx-auto text-[#A47551] mb-4" />
          <p className="text-[#5E503F]">Loading profile...</p>
        </div>
      </div>
    );
  }

  const currentTier = profile.tier_level as 1 | 2 | 3 | 4 | 5;
  const currentTierName = TIER_NAMES[currentTier];
  const nextTier = currentTier < 5 ? (currentTier + 1) as 1 | 2 | 3 | 4 | 5 : null;
  const nextTierName = nextTier ? TIER_NAMES[nextTier] : null;
  const nextTierRequirement = nextTier ? TIER_REQUIREMENTS[nextTier].min : null;
  const cafesUntilNextTier = nextTierRequirement ? nextTierRequirement - profile.cafes_visited : 0;

  const getTierColor = (tier: number) => {
    switch (tier) {
      case 1: return 'bg-[#D8C3A5]';
      case 2: return 'bg-[#A47551]';
      case 3: return 'bg-[#8B6F47]';
      case 4: return 'bg-[#5E503F]';
      case 5: return 'bg-[#4B2E05]';
      default: return 'bg-[#D8C3A5]';
    }
  };

  const getTierProgress = () => {
    if (currentTier === 5) return 100;
    const currentMin = TIER_REQUIREMENTS[currentTier].min;
    const nextMin = nextTierRequirement || 60;
    const range = nextMin - currentMin;
    const progress = profile.cafes_visited - currentMin;
    return Math.min((progress / range) * 100, 100);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 mb-8 border-2 border-[#A47551]">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#4B2E05] mb-2" style={{ fontFamily: 'monospace' }}>
                {profile.display_name || 'BrewMate'}
              </h1>
              <p className="text-[#5E503F]">{profile.email}</p>
            </div>
            <div className={`${getTierColor(currentTier)} p-4 rounded-full`}>
              <Award className="h-8 w-8 text-[#F9F4EF]" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-[#EADAC1] rounded-lg p-6 border border-[#D8C3A5]">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="h-6 w-6 text-[#4B2E05]" />
                <span className="text-sm font-semibold text-[#5E503F]">Cafes Visited</span>
              </div>
              <p className="text-3xl font-bold text-[#4B2E05]">{profile.cafes_visited}</p>
            </div>

            <div className="bg-[#EADAC1] rounded-lg p-6 border border-[#D8C3A5]">
              <div className="flex items-center space-x-3 mb-2">
                <Coffee className="h-6 w-6 text-[#4B2E05]" />
                <span className="text-sm font-semibold text-[#5E503F]">Current Tier</span>
              </div>
              <p className="text-2xl font-bold text-[#4B2E05]">{currentTierName}</p>
              <p className="text-sm text-[#A47551] mt-1">Level {currentTier}</p>
            </div>
          </div>
        </div>

        {currentTier < 5 && (
          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 mb-8 border-2 border-[#D8C3A5]">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="h-6 w-6 text-[#4B2E05]" />
              <h2 className="text-2xl font-bold text-[#4B2E05]">Progress to {nextTierName}</h2>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm text-[#5E503F] mb-2">
                <span>{profile.cafes_visited} cafes</span>
                <span>{nextTierRequirement} cafes</span>
              </div>
              <div className="w-full bg-[#EADAC1] rounded-full h-4 overflow-hidden border border-[#D8C3A5]">
                <div
                  className={`h-full ${getTierColor(nextTier!)} transition-all duration-500`}
                  style={{ width: `${getTierProgress()}%` }}
                />
              </div>
            </div>

            <p className="text-[#5E503F]">
              Visit <span className="font-bold text-[#4B2E05]">{cafesUntilNextTier}</span> more {cafesUntilNextTier === 1 ? 'cafe' : 'cafes'} to reach {nextTierName}!
            </p>
          </div>
        )}

        {currentTier === 5 && (
          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 mb-8 border-2 border-[#4B2E05] text-center">
            <Award className="h-16 w-16 mx-auto mb-4 text-[#4B2E05]" />
            <h2 className="text-2xl font-bold text-[#4B2E05] mb-2">Congratulations!</h2>
            <p className="text-[#5E503F]">
              You've reached the highest tier! You're a true Master Roaster.
            </p>
          </div>
        )}

        <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 border-2 border-[#D8C3A5]">
          <h2 className="text-2xl font-bold text-[#4B2E05] mb-6">All Tiers</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((tier) => {
              const tierNum = tier as 1 | 2 | 3 | 4 | 5;
              const isCurrentTier = tier === currentTier;
              const isPastTier = tier < currentTier;
              const requirements = TIER_REQUIREMENTS[tierNum];

              return (
                <div
                  key={tier}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                    isCurrentTier
                      ? 'bg-[#EADAC1] border-[#4B2E05]'
                      : isPastTier
                      ? 'bg-[#EADAC1] border-[#D8C3A5] opacity-60'
                      : 'bg-white border-[#D8C3A5]'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${getTierColor(tier)} w-12 h-12 rounded-full flex items-center justify-center`}>
                      <span className="text-[#F9F4EF] font-bold">{tier}</span>
                    </div>
                    <div>
                      <div className="font-bold text-[#4B2E05]">{TIER_NAMES[tierNum]}</div>
                      <div className="text-sm text-[#5E503F]">
                        {requirements.min === requirements.max
                          ? `${requirements.min}+ cafes`
                          : `${requirements.min}-${requirements.max} cafes`}
                      </div>
                    </div>
                  </div>
                  {isCurrentTier && (
                    <span className="px-3 py-1 bg-[#4B2E05] text-[#F9F4EF] text-sm font-semibold rounded-full">
                      Current
                    </span>
                  )}
                  {isPastTier && (
                    <span className="text-[#A47551] text-sm font-semibold">
                      Completed
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
