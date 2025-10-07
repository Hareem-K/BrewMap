import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'auth':
        return <AuthPage onNavigate={setCurrentPage} />;
      case 'profile':
        return <ProfilePage />;
      case 'favorites':
        return <FavoritesPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className="flex-1">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
