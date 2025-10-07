import { useEffect, useState } from 'react';
import { Heart, MapPin, Star, Coffee } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Favorite } from '../types';

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'visited' | 'wishlist'>('all');

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          cafe:cafes(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (err) {
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisited = async (favoriteId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .update({ visited: !currentStatus })
        .eq('id', favoriteId);

      if (error) throw error;
      fetchFavorites();
    } catch (err) {
      console.error('Error updating favorite:', err);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;
      fetchFavorites();
    } catch (err) {
      console.error('Error removing favorite:', err);
    }
  };

  const filteredFavorites = favorites.filter(fav => {
    if (filter === 'visited') return fav.visited;
    if (filter === 'wishlist') return !fav.visited;
    return true;
  });

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1] flex items-center justify-center">
        <div className="text-center">
          <Heart className="h-16 w-16 mx-auto text-[#A47551] mb-4" />
          <p className="text-[#5E503F]">Please sign in to view your favorites</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4B2E05] mb-4" style={{ fontFamily: 'monospace' }}>
            Your Favorite Cafes
          </h1>
          <p className="text-lg text-[#5E503F]">
            Track your coffee adventures and wishlist
          </p>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-[#4B2E05] text-[#F9F4EF]'
                : 'bg-[#F9F4EF] text-[#5E503F] border-2 border-[#D8C3A5] hover:border-[#4B2E05]'
            }`}
          >
            All ({favorites.length})
          </button>
          <button
            onClick={() => setFilter('visited')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filter === 'visited'
                ? 'bg-[#4B2E05] text-[#F9F4EF]'
                : 'bg-[#F9F4EF] text-[#5E503F] border-2 border-[#D8C3A5] hover:border-[#4B2E05]'
            }`}
          >
            Visited ({favorites.filter(f => f.visited).length})
          </button>
          <button
            onClick={() => setFilter('wishlist')}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              filter === 'wishlist'
                ? 'bg-[#4B2E05] text-[#F9F4EF]'
                : 'bg-[#F9F4EF] text-[#5E503F] border-2 border-[#D8C3A5] hover:border-[#4B2E05]'
            }`}
          >
            Wishlist ({favorites.filter(f => !f.visited).length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Coffee className="h-12 w-12 mx-auto text-[#A47551] mb-3 animate-pulse" />
            <p className="text-[#5E503F]">Loading your favorites...</p>
          </div>
        ) : filteredFavorites.length === 0 ? (
          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-12 text-center border-2 border-[#D8C3A5]">
            <Heart className="h-16 w-16 mx-auto text-[#A47551] mb-4" />
            <h3 className="text-xl font-bold text-[#4B2E05] mb-2">No favorites yet</h3>
            <p className="text-[#5E503F]">
              {filter === 'all'
                ? 'Start exploring and add your favorite cafes!'
                : filter === 'visited'
                ? "You haven't marked any cafes as visited yet."
                : 'Add cafes to your wishlist to visit later!'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((favorite) => (
              <div
                key={favorite.id}
                className="bg-[#F9F4EF] rounded-lg shadow-lg overflow-hidden border-2 border-[#D8C3A5] hover:border-[#4B2E05] transition-colors"
              >
                <div className="aspect-video bg-[#D8C3A5] flex items-center justify-center">
                  <Coffee className="h-16 w-16 text-[#5E503F]" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#4B2E05] mb-2">
                    {favorite.cafe?.name || 'Unknown Cafe'}
                  </h3>

                  <div className="flex items-start space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-[#A47551] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#5E503F]">
                      {favorite.cafe?.address || 'Address not available'}
                    </p>
                  </div>

                  {favorite.cafe?.google_rating && (
                    <div className="flex items-center space-x-2 mb-3">
                      <Star className="h-4 w-4 text-[#A47551] fill-[#A47551]" />
                      <span className="text-sm font-semibold text-[#5E503F]">
                        {favorite.cafe.google_rating}
                      </span>
                    </div>
                  )}

                  {favorite.notes && (
                    <p className="text-sm text-[#5E503F] mb-4 italic">
                      "{favorite.notes}"
                    </p>
                  )}

                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleVisited(favorite.id, favorite.visited)}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                        favorite.visited
                          ? 'bg-[#4B2E05] text-[#F9F4EF] hover:bg-[#5E503F]'
                          : 'bg-[#D8C3A5] text-[#5E503F] hover:bg-[#A47551] hover:text-[#F9F4EF]'
                      }`}
                    >
                      {favorite.visited ? 'Visited' : 'Mark Visited'}
                    </button>

                    <button
                      onClick={() => removeFavorite(favorite.id)}
                      className="py-2 px-4 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                      title="Remove from favorites"
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
