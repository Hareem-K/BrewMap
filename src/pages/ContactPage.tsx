import { useState } from 'react';
import { Github, Linkedin, Globe, Send, Coffee } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error: submitError } = await supabase
        .from('feedback')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        });

      if (submitError) throw submitError;

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#EADAC1]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#4B2E05] mb-4" style={{ fontFamily: 'monospace' }}>
            Get in Touch
          </h1>
          <p className="text-xl text-[#5E503F]">
            We'd love to hear from you! Share your feedback or just say hello.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 border-2 border-[#A47551]">
            <h2 className="text-2xl font-bold text-[#4B2E05] mb-6">Send us a Message</h2>

            {success && (
              <div className="mb-6 p-4 bg-green-100 border-2 border-green-400 rounded-lg">
                <p className="text-green-800 font-medium">
                  Thanks for reaching out! We'll get back to you soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-lg">
                <p className="text-red-800 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#5E503F] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#D8C3A5] focus:border-[#4B2E05] focus:outline-none text-[#5E503F] bg-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#5E503F] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#D8C3A5] focus:border-[#4B2E05] focus:outline-none text-[#5E503F] bg-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#5E503F] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border-2 border-[#D8C3A5] focus:border-[#4B2E05] focus:outline-none text-[#5E503F] bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-[#4B2E05] text-[#F9F4EF] rounded-lg font-semibold hover:bg-[#5E503F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 border-2 border-[#D8C3A5]">
              <h2 className="text-2xl font-bold text-[#4B2E05] mb-6">Connect With Us</h2>

              <div className="space-y-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-[#EADAC1] rounded-lg hover:bg-[#D8C3A5] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#4B2E05] rounded-full flex items-center justify-center group-hover:bg-[#5E503F] transition-colors">
                    <Github className="h-6 w-6 text-[#F9F4EF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#4B2E05]">GitHub</div>
                    <div className="text-sm text-[#5E503F]">Check out our code</div>
                  </div>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-[#EADAC1] rounded-lg hover:bg-[#D8C3A5] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#4B2E05] rounded-full flex items-center justify-center group-hover:bg-[#5E503F] transition-colors">
                    <Linkedin className="h-6 w-6 text-[#F9F4EF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#4B2E05]">LinkedIn</div>
                    <div className="text-sm text-[#5E503F]">Connect professionally</div>
                  </div>
                </a>

                <a
                  href="https://portfolio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-[#EADAC1] rounded-lg hover:bg-[#D8C3A5] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#4B2E05] rounded-full flex items-center justify-center group-hover:bg-[#5E503F] transition-colors">
                    <Globe className="h-6 w-6 text-[#F9F4EF]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#4B2E05]">Portfolio</div>
                    <div className="text-sm text-[#5E503F]">View our work</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-[#F9F4EF] rounded-lg shadow-lg p-8 text-center border-2 border-[#D8C3A5]">
              <Coffee className="h-16 w-16 mx-auto mb-4 text-[#A47551]" />
              <h3 className="text-xl font-bold text-[#4B2E05] mb-3">
                Suggest a Feature
              </h3>
              <p className="text-[#5E503F]">
                Have an idea to make BrewMap better? We're all ears! Use the form to share your suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
