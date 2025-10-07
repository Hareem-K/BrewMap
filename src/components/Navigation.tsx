import { Coffee, User, LogOut, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}


export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <nav className="bg-[#4B2E05] text-[#F9F4EF] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="/BrewMap_logo.png"
                alt="BrewMap"
                className="h-18 md:h-28 w-auto"
              />

            </button>

            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => onNavigate('home')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'home'
                    ? 'bg-[#5E503F] text-[#F9F4EF]'
                    : 'text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF]'
                }`}
              >
                Find a Cafe
              </button>

              <button
                onClick={() => onNavigate('about')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'about'
                    ? 'bg-[#5E503F] text-[#F9F4EF]'
                    : 'text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF]'
                }`}
              >
                About
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === 'contact'
                    ? 'bg-[#5E503F] text-[#F9F4EF]'
                    : 'text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF]'
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user && profile ? (
              <>
                <button
                  onClick={() => onNavigate('favorites')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF] transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Favorites</span>
                </button>

                <button
                  onClick={() => onNavigate('profile')}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium bg-[#A47551] text-[#F9F4EF] hover:bg-[#5E503F] transition-colors"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">{profile.display_name || 'BrewMate'}</span>
                </button>

                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-md text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF] transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('auth')}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium bg-[#A47551] text-[#F9F4EF] hover:bg-[#5E503F] transition-colors"
              >
                <Coffee className="h-4 w-4" />
                <span>Become a BrewMate</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden bg-[#4B2E05] border-t border-[#5E503F]">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
              currentPage === 'home'
                ? 'bg-[#5E503F] text-[#F9F4EF]'
                : 'text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF]'
            }`}
          >
            Find a Cafe
          </button>

          <button
            onClick={() => onNavigate('about')}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
              currentPage === 'about'
                ? 'bg-[#5E503F] text-[#F9F4EF]'
                : 'text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF]'
            }`}
          >
            About
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
              currentPage === 'contact'
                ? 'bg-[#5E503F] text-[#F9F4EF]'
                : 'text-[#D8C3A5] hover:bg-[#5E503F] hover:text-[#F9F4EF]'
            }`}
          >
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}
