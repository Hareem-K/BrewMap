import { useState } from 'react';
import { Coffee, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthPageProps {
  onNavigate: (page: string) => void;
}

export default function AuthPage({ onNavigate }: AuthPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { error: signUpError } = await signUp(
          formData.email,
          formData.password,
          formData.displayName
        );
        if (signUpError) throw signUpError;
        onNavigate('home');
      } else {
        const { error: signInError } = await signIn(formData.email, formData.password);
        if (signInError) throw signInError;
        onNavigate('home');
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#4B2E05] rounded-full mb-4">
            <Coffee className="h-10 w-10 text-[#F9F4EF]" />
          </div>
          <h1 className="text-3xl font-bold text-[#4B2E05] mb-2" style={{ fontFamily: 'monospace' }}>
            {isSignUp ? 'Join BrewMap' : 'Welcome Back'}
          </h1>
          <p className="text-[#5E503F]">
            {isSignUp
              ? 'Become a BrewMate and start your coffee journey'
              : 'Sign in to continue your coffee adventure'}
          </p>
        </div>

        <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 border-2 border-[#A47551]">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
              <p className="text-red-800 font-medium text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div>
                <label htmlFor="displayName" className="block text-sm font-semibold text-[#5E503F] mb-2">
                  Display Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A47551]" />
                  <input
                    type="text"
                    id="displayName"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    required={isSignUp}
                    className="w-full pl-11 pr-4 py-2 rounded-lg border-2 border-[#D8C3A5] focus:border-[#4B2E05] focus:outline-none text-[#5E503F] bg-white"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#5E503F] mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A47551]" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-2 rounded-lg border-2 border-[#D8C3A5] focus:border-[#4B2E05] focus:outline-none text-[#5E503F] bg-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#5E503F] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#A47551]" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full pl-11 pr-4 py-2 rounded-lg border-2 border-[#D8C3A5] focus:border-[#4B2E05] focus:outline-none text-[#5E503F] bg-white"
                  placeholder="Enter your password"
                />
              </div>
              {isSignUp && (
                <p className="mt-2 text-xs text-[#A47551]">Password must be at least 6 characters</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 bg-[#4B2E05] text-[#F9F4EF] rounded-lg font-semibold hover:bg-[#5E503F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setFormData({ email: '', password: '', displayName: '' });
              }}
              className="text-sm text-[#5E503F] hover:text-[#4B2E05] font-medium"
            >
              {isSignUp
                ? 'Already have an account? Sign in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>

        {isSignUp && (
          <div className="mt-6 bg-[#F9F4EF] rounded-lg p-6 border-2 border-[#D8C3A5]">
            <h3 className="font-semibold text-[#4B2E05] mb-3">BrewMate Benefits:</h3>
            <ul className="space-y-2 text-sm text-[#5E503F]">
              <li className="flex items-start">
                <span className="mr-2">☕</span>
                <span>Save and track your favorite cafes</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☕</span>
                <span>Mark cafes as visited and build your journey</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☕</span>
                <span>Level up from Apprentice Brewer to Master Roaster</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">☕</span>
                <span>Leave reviews and share your experiences</span>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
