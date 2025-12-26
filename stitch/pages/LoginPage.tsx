
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@ggp-heritage.com');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    navigate('/admin/vips');
  };

  return (
    <div className="bg-stone-light text-luxury-charcoal antialiased min-h-screen flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-br from-gold/5 to-transparent rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-gradient-to-tl from-gold/5 to-transparent rounded-full blur-[120px]"></div>
      </div>

      <header className="w-full px-8 py-6 lg:px-12 lg:py-8 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="h-8 w-8 border border-luxury-black flex items-center justify-center rotate-45 transition-transform duration-500 group-hover:rotate-90">
            <div className="h-4 w-4 bg-luxury-black -rotate-45 transition-transform duration-500 group-hover:-rotate-90"></div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-luxury-black font-serif font-semibold tracking-widest text-lg leading-none">GGP</h1>
            <span className="text-[8px] uppercase tracking-widest-2xl text-gold-dark mt-1">Heritage</span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)] animate-pulse"></div>
            <span className="text-[9px] uppercase tracking-widest font-sans font-medium text-gray-500">System Secure</span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 shadow-sharp bg-white overflow-hidden min-h-[600px] transition-all duration-500">
          <div className="relative hidden lg:block overflow-hidden bg-black group">
            <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuBw6C6xP3vYVP56hqfoqw9FVDyTlI4brkkAmrjjtF6Ykb6c6zOJjFZtDYT1C2zNRV9SzfUbwD7QWHl0y1Df10io9CdEQDFHZWCrJRCOKeYblLevq4qSuqKWpKzg7r1UjwsJvBeV191IJuz4Ng1OdQynXdc3MV-9znPj67UlHOrtZZl8R2ZGYQwUboSluCywSMxikikD4BccufyCDZnsKyVWL3gHf6rH30DK3O0AUe4140YBf-jj_RIFJy1oPYhw_VMp9nE4gg35CAt-')] bg-cover bg-center grayscale contrast-125 opacity-70 group-hover:scale-105 transition-transform duration-[2s] ease-in-out"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30"></div>
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <div className="w-12 h-[1px] bg-gold mb-8"></div>
              <blockquote className="font-luxury text-3xl font-light italic leading-snug mb-6 text-white/95">
                "True luxury requires genuine materials and the craftsman's sincerity."
              </blockquote>
              <div className="flex items-center gap-4">
                <span className="text-[10px] uppercase tracking-widest-2xl text-gold-light">The Heritage Collection</span>
                <div className="h-[1px] flex-grow bg-white/20"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center px-8 py-12 sm:px-12 lg:px-20 bg-white relative">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <span className="material-symbols-outlined text-4xl text-gold">diamond</span>
            </div>
            <div className="mb-14">
              <p className="text-gold-dark text-[9px] uppercase tracking-widest-2xl font-bold mb-5 flex items-center gap-2">
                <span className="w-3 h-[1px] bg-gold-dark"></span> Authentification
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-luxury-black mb-4">Admin Portal</h2>
              <p className="text-gray-400 text-xs font-light tracking-wide max-w-xs leading-relaxed">
                Welcome back. Please enter your credentials to access the exclusive GGP Heritage Mall network.
              </p>
            </div>
            <form className="space-y-10" onSubmit={handleLogin}>
              <div className="group relative">
                <input
                  className="peer w-full bg-transparent border-b border-gray-200 py-3 text-luxury-black placeholder-transparent focus:border-gold transition-colors duration-500 font-sans font-light text-base outline-none"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label className="absolute left-0 -top-3.5 text-[10px] text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold-dark" htmlFor="email">
                  Email Address
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 peer-focus:w-full"></div>
              </div>

              <div className="group relative">
                <input
                  className="peer w-full bg-transparent border-b border-gray-200 py-3 text-luxury-black placeholder-transparent focus:border-gold transition-colors duration-500 font-sans font-light text-base outline-none"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="absolute left-0 -top-3.5 text-[10px] text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-xs peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold-dark" htmlFor="password">
                  Password
                </label>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-500 peer-focus:w-full"></div>
                <button className="absolute right-0 top-3 text-gray-300 hover:text-gold-dark transition-colors duration-300" type="button">
                  <span className="material-symbols-outlined text-lg font-light">visibility_off</span>
                </button>
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input className="peer sr-only" type="checkbox" />
                    <div className="w-3.5 h-3.5 border border-gray-300 peer-checked:border-luxury-black peer-checked:bg-luxury-black transition-all duration-300"></div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 group-hover:text-luxury-black transition-colors select-none">Remember Me</span>
                </label>
                <a className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-gold-dark transition-colors border-b border-transparent hover:border-gold-dark/50 pb-0.5" href="#">Forgot Password?</a>
              </div>

              <button className="group relative w-full overflow-hidden bg-luxury-black py-4 px-8 mt-4 transition-all duration-500 hover:shadow-xl hover:bg-black" type="submit">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                <span className="relative flex items-center justify-center gap-4 text-white text-xs font-bold uppercase tracking-widest-xl">
                  Enter Portal
                  <span className="material-symbols-outlined text-base font-light group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                </span>
              </button>
            </form>

            <div className="mt-auto pt-16 text-center lg:text-left">
              <p className="text-[9px] text-gray-300 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2">
                <span className="material-symbols-outlined text-sm">support_agent</span>
                Concierge Support: <a className="text-luxury-black hover:text-gold-dark border-b border-gray-200 hover:border-gold-dark pb-0.5 transition-colors ml-1" href="#">Contact Desk</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 text-center relative z-10 opacity-60 hover:opacity-100 transition-opacity duration-500">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-sans">
          © 2024 GGP Heritage Mall • Private Admin Environment
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
