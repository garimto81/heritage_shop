
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = MOCK_PRODUCTS.find(p => p.id === id) || MOCK_PRODUCTS[0];

  return (
    <div className="bg-white text-gray-900 font-manrope antialiased min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300">
        <div className="bg-luxury-black text-white text-[10px] uppercase tracking-[0.2em] text-center py-2 font-medium">
          Private Viewing • Platinum Tier Access Only
        </div>
        <div className="px-6 py-5 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <button className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-black">
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <nav className="hidden lg:flex items-center gap-10 text-xs uppercase tracking-widest font-medium text-gray-500">
              <a className="hover:text-black transition-colors" href="#" onClick={() => navigate('/lounge/home')}>New Season</a>
              <a className="hover:text-black transition-colors" href="#">Maison</a>
            </nav>
          </div>
          <div className="flex-shrink-0 flex items-center justify-center gap-2 cursor-pointer" onClick={() => navigate('/lounge/home')}>
            <span className="material-symbols-outlined text-gold !text-[24px]">crown</span>
            <h2 className="text-2xl font-serif font-bold tracking-widest text-luxury-black">PRIVÉ</h2>
          </div>
          <div className="flex items-center gap-6 md:gap-8">
            <div className="hidden lg:flex items-center border-b border-gray-200 pb-1 focus-within:border-black transition-colors">
              <input className="bg-transparent border-none p-0 text-sm placeholder-gray-400 text-black focus:ring-0 w-32 outline-none" placeholder="Search..."/>
              <span className="material-symbols-outlined text-gray-400 text-[18px]">search</span>
            </div>
            <button className="relative group text-gray-800 hover:text-gold transition-colors" onClick={() => navigate('/lounge/checkout')}>
              <span className="material-symbols-outlined text-[22px]">local_mall</span>
              <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-luxury-black text-[9px] text-white font-medium">1</span>
            </button>
            <button className="text-gray-800 hover:text-gold transition-colors hidden sm:block">
              <span className="material-symbols-outlined text-[22px]">person</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-16 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-20">
          <div className="lg:col-span-7 flex flex-col gap-2">
            <div className="w-full aspect-[4/5] overflow-hidden bg-stone-light relative group shadow-sm">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105" style={{ backgroundImage: `url('${product.imageUrl}')` }}></div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="aspect-[4/5] overflow-hidden bg-stone-light relative group shadow-sm">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNoE66GcT5YrrZpKRn2cXXOxwei5nsqfoPoBIoRQoggWbvw9ig384rGU_BZFEvWgWHY-x9nDhchye5sRx7cnDbgoMTUi47gJPDvKycL__V7T07VZ17enZHjivs5Z2zL7c8mivnUZkQQqLHmntngqqZW1mc579cAY3WWe7Ywl1BQKnTKxmS6raNWm1CcvR8K2VwGem8ZTLE8IUf-HmKtkw0W7tcllYbGSYWWCONZGRhdZbCUSGlbQDX43kjPqOvI0004rwdDPekHVue')` }}></div>
              </div>
              <div className="aspect-[4/5] overflow-hidden bg-stone-light relative group shadow-sm">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-105" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuATbdccW58GUUO04ulUTnyLqBR3qlnaOUBqEDwPHJJqIpZIsVTdorpyqYACaI3QwYtkqsVyo5KbCy5IjWeqnvXiPY1p_8WL_avu_0F0-_UdwFsQgxK7msKq7dXGfl6sbSH1a4vAYhpux5aHZJTW_OIgs-rU_Yhob_XNYzsRYfAPVmHWa56XquPHIhAYcCf5fpSTQVsOouFsb_zqMteoHlEG6t6kUCO4-oxMIc2OLK05eGBEO7S33Vu_8Kh0-wEcAWpIGDPQ-0gmsaz-')` }}></div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative lg:pt-4">
            <div className="sticky top-32 flex flex-col h-full">
              <nav className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gray-400 mb-8">
                <a className="hover:text-black transition-colors" href="#" onClick={() => navigate('/lounge/home')}>Exclusives</a>
                <span className="text-gold">•</span>
                <span className="text-gray-400">{product.category}</span>
                <span className="text-gold">•</span>
                <span className="text-luxury-black font-bold">{product.name}</span>
              </nav>

              <div className="mb-8 border-b border-gray-100 pb-8">
                <h1 className="text-4xl lg:text-5xl font-serif text-luxury-black mb-3 leading-tight">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <span className="text-gold font-serif italic text-lg">Signature Collection</span>
                  <span className="h-px w-8 bg-gray-200"></span>
                  <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Ref. {product.refCode}</span>
                </div>
              </div>

              <div className="prose prose-sm prose-gray max-w-none mb-10">
                <p className="font-serif text-lg leading-relaxed text-gray-600">{product.description}</p>
              </div>

              <div className="mb-10 bg-[#F5F0E6]/30 border border-gold/20 p-5 flex items-start gap-4 shadow-elegant">
                <div className="text-gold pt-1">
                  <span className="material-symbols-outlined">diamond</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-luxury-black mb-1">Platinum Privilege Active</h4>
                  <p className="text-xs text-gray-600 font-serif italic leading-relaxed">
                    Your status grants you priority access. You are eligible to claim <span className="text-luxury-black font-bold not-italic">1 of 2</span> remaining complimentary allocations for this period.
                  </p>
                </div>
              </div>

              <div className="mb-10 space-y-6">
                <div className="flex justify-between items-end mb-4 border-b border-gray-100 pb-2 text-xs font-bold uppercase tracking-widest">
                  <span className="text-luxury-black">Select Size</span>
                  <button className="text-gray-400 hover:text-luxury-black transition-colors underline decoration-gray-300 underline-offset-4">Size Guide</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <button className="h-14 border border-gray-100 bg-stone-light text-gray-300 flex items-center justify-center text-xs uppercase tracking-widest font-medium cursor-not-allowed relative overflow-hidden" disabled>
                    Small <span className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[1px]"><span className="bg-white px-2 py-0.5 text-[8px] border border-gray-200 text-gray-400">Waitlist</span></span>
                  </button>
                  <button className="h-14 border border-luxury-black bg-luxury-black text-white flex flex-col items-center justify-center text-xs uppercase tracking-widest font-medium transition-all shadow-lg ring-1 ring-luxury-black ring-offset-2">
                    <span>Medium</span>
                  </button>
                  <button className="h-14 border border-gray-200 bg-white text-gray-600 hover:border-gold hover:text-gold flex items-center justify-center text-xs uppercase tracking-widest font-medium transition-all">Large</button>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-12">
                <button 
                  className="w-full h-14 bg-luxury-black text-white hover:bg-gray-800 uppercase tracking-[0.15em] text-sm font-bold flex items-center justify-center gap-4 transition-all shadow-xl hover:shadow-2xl group"
                  onClick={() => navigate('/lounge/checkout')}
                >
                  <span>Add to Bag (Complimentary)</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-widest">Complimentary Express Shipping Included</p>
              </div>

              <div className="border-t border-gray-200">
                {['Composition & Care', 'Delivery & Concierge', 'Authenticity'].map((detail) => (
                  <details key={detail} className="group py-5 cursor-pointer border-b border-gray-200">
                    <summary className="flex items-center justify-between font-serif text-lg text-luxury-black list-none hover:text-gold transition-colors">
                      <span>{detail}</span>
                      <span className="material-symbols-outlined text-gray-400 font-light group-open:rotate-180 transition-transform">expand_more</span>
                    </summary>
                    <div className="pt-4 text-sm text-gray-500 leading-relaxed font-light">
                      Premium luxury quality standard. Expert verification and white-glove service included.
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white py-16 px-6 lg:px-12 mt-12">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-gold">crown</span>
            <span className="text-sm font-serif font-bold tracking-widest text-luxury-black uppercase">PRIVÉ</span>
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-widest text-gray-500">
            <a className="hover:text-black transition-colors" href="#">Legal</a>
            <a className="hover:text-black transition-colors" href="#">Privacy</a>
            <a className="hover:text-black transition-colors" href="#">Concierge</a>
          </div>
          <p className="text-xs text-gray-400 font-medium">© 2024 LUXE VIP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailPage;
