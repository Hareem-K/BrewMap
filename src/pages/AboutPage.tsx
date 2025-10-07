import { Coffee, Heart, MapPin, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4B2E05] mb-4" style={{ fontFamily: 'monospace' }}>
            About BrewMap
          </h1>
          <p className="text-xl text-[#5E503F]">
            Your guide to discovering the world's best coffee spots
          </p>
        </div>

        <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 mb-8 border-2 border-[#A47551]">
          <div className="flex items-start space-x-4 mb-6">
            <div className="flex-shrink-0">
              <Coffee className="h-12 w-12 text-[#4B2E05]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#4B2E05] mb-3">Our Story</h2>
              <p className="text-[#5E503F] leading-relaxed mb-4">
                BrewMap was brewed to help coffee lovers discover the best spots in every city.
                We believe that finding the perfect cafe shouldn't be a matter of luck - it should
                be an adventure filled with delightful discoveries.
              </p>
              <p className="text-[#5E503F] leading-relaxed">
                Whether you're searching for a cozy corner to read, a productive study space,
                or simply the best espresso in town, BrewMap is here to guide your coffee journey.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-6 border-2 border-[#D8C3A5]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#D8C3A5] rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6 text-[#4B2E05]" />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05]">Our Mission</h3>
            </div>
            <p className="text-[#5E503F] leading-relaxed">
              To connect coffee enthusiasts with exceptional cafes around the world,
              making every cup of coffee a memorable experience.
            </p>
          </div>

          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-6 border-2 border-[#D8C3A5]">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-[#D8C3A5] rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-[#4B2E05]" />
              </div>
              <h3 className="text-xl font-bold text-[#4B2E05]">Our Values</h3>
            </div>
            <p className="text-[#5E503F] leading-relaxed">
              Community, quality, and the simple joy of a perfectly brewed cup.
              We celebrate local cafes and the baristas who craft them.
            </p>
          </div>
        </div>

        <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 border-2 border-[#A47551]">
          <div className="flex items-center space-x-3 mb-6">
            <Users className="h-8 w-8 text-[#4B2E05]" />
            <h2 className="text-2xl font-bold text-[#4B2E05]">Join the BrewMate Community</h2>
          </div>
          <p className="text-[#5E503F] leading-relaxed mb-6">
            Become a BrewMate and unlock the full potential of your coffee adventures.
            Track your visits, save your favorite spots, and level up from Apprentice Brewer
            to Master Roaster as you explore cafes around the world.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-[#EADAC1] p-4 rounded-lg border border-[#D8C3A5]">
              <div className="text-2xl font-bold text-[#4B2E05] mb-1">Level 1</div>
              <div className="text-sm font-semibold text-[#5E503F]">Apprentice Brewer</div>
              <div className="text-xs text-[#A47551] mt-1">1-9 cafes</div>
            </div>
            <div className="bg-[#EADAC1] p-4 rounded-lg border border-[#D8C3A5]">
              <div className="text-2xl font-bold text-[#4B2E05] mb-1">Level 2</div>
              <div className="text-sm font-semibold text-[#5E503F]">Bean Connoisseur</div>
              <div className="text-xs text-[#A47551] mt-1">10-19 cafes</div>
            </div>
            <div className="bg-[#EADAC1] p-4 rounded-lg border border-[#D8C3A5]">
              <div className="text-2xl font-bold text-[#4B2E05] mb-1">Level 3</div>
              <div className="text-sm font-semibold text-[#5E503F]">Latte Lover</div>
              <div className="text-xs text-[#A47551] mt-1">20-39 cafes</div>
            </div>
            <div className="bg-[#EADAC1] p-4 rounded-lg border border-[#D8C3A5]">
              <div className="text-2xl font-bold text-[#4B2E05] mb-1">Level 4</div>
              <div className="text-sm font-semibold text-[#5E503F]">Espresso Expert</div>
              <div className="text-xs text-[#A47551] mt-1">40-59 cafes</div>
            </div>
            <div className="bg-[#EADAC1] p-4 rounded-lg border border-[#D8C3A5]">
              <div className="text-2xl font-bold text-[#4B2E05] mb-1">Level 5</div>
              <div className="text-sm font-semibold text-[#5E503F]">Master Roaster</div>
              <div className="text-xs text-[#A47551] mt-1">60+ cafes</div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#F9F4EF] rounded-lg shadow-lg p-8 text-center border-2 border-[#D8C3A5]">
          <Coffee className="h-16 w-16 mx-auto mb-4 text-[#A47551]" />
          <h3 className="text-xl font-bold text-[#4B2E05] mb-3">Have an Idea?</h3>
          <p className="text-[#5E503F] mb-4">
            We're always looking to improve BrewMap. Share your thoughts and help us brew something even better!
          </p>
        </div>
      </div>
    </div>
  );
}
