import { Coffee, Github, Linkedin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#4B2E05] text-[#F9F4EF] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <Coffee className="h-5 w-5 text-[#A47551]" />
            <span className="text-sm text-[#D8C3A5]">
              BrewMap - Discover your next favorite coffee spot
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8C3A5] hover:text-[#F9F4EF] transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8C3A5] hover:text-[#F9F4EF] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://portfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8C3A5] hover:text-[#F9F4EF] transition-colors"
              aria-label="Portfolio"
            >
              <Globe className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-[#5E503F] text-center">
          <p className="text-sm text-[#D8C3A5]">
            &copy; {new Date().getFullYear()} BrewMap. Brewed with care for coffee lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
