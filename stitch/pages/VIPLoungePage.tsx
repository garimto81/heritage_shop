
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';

const VIPLoungePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white font-manrope text-luxury-black antialiased">
      <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-gray-100 bg-white/95 backdrop-blur-md px-6 py-5 lg:px-12 transition-all duration-300">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/lounge/home')}>
            <div className="flex size-9 items-center justify-center rounded-full border border-gold text-gold transition-colors group-hover:bg-gold group-hover:text-white">
              <span className="material-symbols-outlined text-lg">diamond</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-serif text-xl font-bold tracking-widest uppercase text-luxury-black leading-none">VIP LOUNGE</h2>
              <span className="text-[9px] tracking-[0.3em] text-gray-400 uppercase">By Invitation Only</span>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-wider">
            <a className="text-luxury-black border-b border-black" href="#">Collections</a>
            <a className="text-gray-400 hover:text-black transition-colors" href="#">Atelier</a>
            <a className="text-gray-400 hover:text-black transition-colors" href="#">Concierge</a>
          </nav>
        </div>
        <div className="flex flex-1 justify-end items-center gap-8">
          <div className="hidden md:flex items-center border-b border-gray-200 px-1 py-1 w-48 focus-within:border-gold transition-all duration-300">
            <span className="material-symbols-outlined text-gray-400 text-[18px]">search</span>
            <input className="w-full bg-transparent border-none text-sm text-luxury-black placeholder-gray-400 focus:ring-0 ml-2 py-0 outline-none" placeholder="Search..."/>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative group p-1 text-luxury-black hover:text-gold transition-colors" onClick={() => navigate('/lounge/checkout')}>
              <span className="material-symbols-outlined font-light">shopping_bag</span>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">2</span>
            </button>
            <div className="hidden sm:flex items-center gap-4 pl-6 border-l border-gray-200">
              <div className="text-right hidden xl:block">
                <p className="text-[10px] text-gold font-bold uppercase tracking-widest">Diamond Tier</p>
                <p className="text-sm font-serif font-semibold text-luxury-black">Alexander V.</p>
              </div>
              <div className="size-9 rounded-full bg-cover bg-center ring-2 ring-gray-100" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7QHTzip-kCbcK73RtTacnpXksTf3_lcCdVhEIZFN8yQZAEwO4UD42IXecjhgWQOS01Fc7JmBb_dkEH22CN2T1xr-UNQsZIzzaPaGWoy_BQlK3qPBSgurRTK_AcYV_vRM3L139H4BTiSoNZUPnGwjIJLur-BmkhH_FNcMTV3JoSO9ODnPHQj-avq15bHo9dnNp39O_COIItHu8xEKN6G-ErZeNhp5E1ZTDpsdQiPtLCLnlSuQwOwz6DXo0tBv4hCBwpVZlyZEOO2Om')` }}></div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">
        <div className="w-full max-w-[1600px] px-6 md:px-12 lg:px-16 py-10 flex flex-col gap-16">
          <section className="relative w-full overflow-hidden rounded-sm bg-gray-50 h-[500px] shadow-sm">
            <div className="absolute inset-0 z-0">
              <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuADMtqiWvx6FCC_ANgGWKJqQlz-7Amyxgy-SlRYgdbogmA_fu4zB0zWhhU7a4EDPaAUXv7J6wOggqMiUA91JmKhqr3ZAE1MKhYEMW2v3S69Eoo7YWJRAxyd89uCgJknD77crqGqLmln-y-ciOiZoTPHd2qQll3u0piPRqNKRW6BoHT_3JRSBgiSJ-pvNpL8TpwxY2NoI6qrayFJT3H7jMHOclN67ckfyD9lYUyXM5nly6B2-htPF9UpJ43LcTCWS8vTp_ZuclnrS7CF')` }}></div>
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40"></div>
            </div>
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-4xl">
              <span className="mb-6 inline-flex items-center gap-2 w-fit px-0 py-1 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                <span className="h-[1px] w-8 bg-gold"></span> Exclusive Access
              </span>
              <h1 className="mb-6 font-serif text-5xl md:text-7xl text-luxury-black leading-tight">
                The Diamond <br/><span className="italic font-light text-gray-500">Collection</span>
              </h1>
              <p className="mb-10 text-lg text-gray-600 font-light max-w-lg leading-relaxed border-l-2 border-gold pl-6">
                Welcome, Alexander. Your tier grants you complimentary access to our most exquisite selections for the season.
              </p>
              <div className="flex flex-wrap gap-6">
                <button className="bg-luxury-black px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white hover:bg-gold transition-all duration-300 shadow-lg">View Allowance</button>
                <button className="border border-luxury-black px-10 py-4 text-xs font-bold uppercase tracking-[0.15em] text-luxury-black hover:bg-gray-50 transition-all duration-300">Contact Concierge</button>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 border-y border-gray-100 py-8">
            {[
              { label: 'Current Status', icon: 'verified', val: 'Diamond Member' },
              { label: 'Complimentary Gifts', val: '2 of 3', progress: true },
              { label: 'Renewal Date', icon: 'calendar_month', val: 'November 12, 2024', italic: true }
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between px-8 py-4 md:py-0">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
                  <div className="flex items-center gap-3">
                    {stat.icon && <span className={`material-symbols-outlined text-2xl ${stat.icon === 'verified' ? 'text-gold' : 'text-gray-400'}`}>{stat.icon}</span>}
                    <p className={`text-xl font-serif text-luxury-black ${stat.italic ? 'italic' : ''}`}>{stat.val}</p>
                  </div>
                </div>
                {stat.progress && (
                  <div className="h-12 w-12 relative">
                    <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                      <path className="text-gray-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="1.5"></path>
                      <path className="text-gold" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="66, 100" strokeWidth="1.5"></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-8 items-center justify-center">
            <h3 className="font-serif text-3xl text-luxury-black text-center">Curated Selections</h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 border-b border-gray-100 pb-4 w-full max-w-5xl text-xs font-bold uppercase tracking-widest">
              <button className="pb-3 border-b-2 border-luxury-black text-luxury-black">All Collections</button>
              {['Leather Goods', 'Fragrance', 'Timepieces', 'Travel', 'Accessories'].map((cat) => (
                <button key={cat} className="pb-3 border-b-2 border-transparent hover:border-gray-300 text-gray-400 hover:text-luxury-black transition-all">{cat}</button>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {MOCK_PRODUCTS.concat(MOCK_PRODUCTS).map((prod, i) => (
              <div key={i} className="group flex flex-col gap-6 cursor-pointer" onClick={() => navigate(`/lounge/product/${prod.id}`)}>
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 shadow-sm">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-105" style={{ backgroundImage: `url('${prod.imageUrl}')` }}></div>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"></div>
                  {i === 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-luxury-black text-[9px] uppercase font-bold px-3 py-1.5 tracking-widest shadow-sm">Limited Edition</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-[0.2em]">{prod.category}</p>
                  <h4 className="font-serif text-xl text-luxury-black group-hover:text-gold transition-colors">{prod.name}</h4>
                  <div className="h-px w-8 bg-gray-200 my-2 group-hover:w-16 group-hover:bg-gold transition-all duration-500"></div>
                  <button className="text-xs font-bold uppercase tracking-widest text-luxury-black border-b border-transparent hover:border-luxury-black pb-0.5 transition-all">Claim Complimentary</button>
                </div>
              </div>
            ))}
          </section>

          <div className="flex justify-center mt-12 mb-12">
            <button className="group relative px-8 py-3 text-sm font-bold uppercase tracking-widest text-luxury-black transition-all">
              <span className="absolute inset-0 border border-gray-200 transition-all group-hover:border-gold"></span>
              <span className="flex items-center gap-3 relative z-10">
                Discover More <span className="material-symbols-outlined text-base transition-transform group-hover:translate-y-1">expand_more</span>
              </span>
            </button>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 bg-gray-50 py-16 px-6 text-center">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex size-10 items-center justify-center rounded-full border border-gray-300 text-gray-400">
              <span className="material-symbols-outlined text-xl">diamond</span>
            </div>
            <span className="font-serif text-2xl font-bold tracking-widest uppercase text-luxury-black">VIP Lounge</span>
            <p className="text-xs text-gray-400 uppercase tracking-widest max-w-sm leading-loose">
              Exquisite craftsmanship. Unparalleled exclusivity. <br/> Reserved for our most distinguished members.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-xs font-bold uppercase tracking-widest text-gray-500 mt-4">
            <a className="hover:text-gold transition-colors" href="#">Concierge Service</a>
            <a className="hover:text-gold transition-colors" href="#">Terms of Exclusivity</a>
            <a className="hover:text-gold transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-gold transition-colors" href="#">Boutique Finder</a>
          </div>
          <div className="w-full max-w-xs h-px bg-gray-200 my-4"></div>
          <div className="text-[10px] text-gray-400 tracking-wider">© 2024 The Diamond Collection. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default VIPLoungePage;
