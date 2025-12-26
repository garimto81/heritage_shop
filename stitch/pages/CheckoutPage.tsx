
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center animate-in fade-in duration-700">
        <span className="material-symbols-outlined text-8xl text-gold mb-6 font-thin">verified</span>
        <h1 className="text-4xl font-serif text-luxury-black mb-4">Order Confirmed</h1>
        <p className="text-gray-500 max-w-md mx-auto mb-10">Your complimentary selections have been secured. Our white-glove concierge will notify you once your package is dispatched.</p>
        <button 
          className="bg-luxury-black text-white px-10 py-4 uppercase tracking-widest text-xs font-bold hover:bg-gold transition-all"
          onClick={() => navigate('/lounge/home')}
        >
          Return to Lounge
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white text-luxury-black font-manrope antialiased overflow-x-hidden min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/lounge/home')}>
            <span className="material-symbols-outlined text-luxury-black text-3xl">diamond</span>
            <h2 className="text-luxury-black text-2xl font-serif font-bold tracking-tight">LUXE VIP</h2>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 text-gray-500 text-xs uppercase tracking-widest font-medium">
              <span className="material-symbols-outlined text-lg text-gold">verified</span>
              <span>Official Boutique</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-stone-light px-4 py-2 rounded-sm border border-gray-100">
              <div className="h-1.5 w-1.5 rounded-full bg-luxury-black"></div>
              <span className="text-xs font-semibold uppercase tracking-widest text-luxury-black">Platinum Member</span>
            </div>
            <button className="text-luxury-black hover:text-gold transition-colors">
              <span className="material-symbols-outlined">person</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <nav className="mb-12 flex items-center justify-center md:justify-start text-xs uppercase tracking-widest font-medium text-gray-400">
            <button className="hover:text-black transition-colors" onClick={() => navigate('/lounge/home')}>Selection</button>
            <span className="mx-4 text-gray-200">/</span>
            <span className="hover:text-black transition-colors cursor-default">Details</span>
            <span className="mx-4 text-gray-200">/</span>
            <span className="text-black border-b border-gold pb-0.5">Confirmation</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 flex flex-col gap-12">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl md:text-5xl font-serif text-luxury-black">Secure Checkout</h1>
                <p className="text-gray-500 font-light text-lg">Finalize your complimentary boutique order.</p>
              </div>

              <section>
                <h3 className="font-serif text-xl text-luxury-black mb-6 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold"></span> Contact
                </h3>
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span className="text-luxury-black text-lg font-light">alexandra.sterling@luxe.com</span>
                  <span className="flex items-center gap-1.5 text-xs text-gold uppercase tracking-widest border border-gold/30 px-2 py-1 bg-[#F2E8D5]/20">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> Verified
                  </span>
                </div>
              </section>

              <section>
                <h3 className="font-serif text-xl text-luxury-black mb-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-gold"></span> Shipping Address
                </h3>
                <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
                  <input className="col-span-1 md:col-span-2 border-b border-gray-100 py-2 outline-none text-lg font-light focus:border-black transition-colors" placeholder="Full Name" />
                  <input className="col-span-1 md:col-span-2 border-b border-gray-100 py-2 outline-none text-lg font-light focus:border-black transition-colors" placeholder="Street Address" />
                  <input className="col-span-1 border-b border-gray-100 py-2 outline-none text-lg font-light focus:border-black transition-colors" placeholder="City" />
                  <input className="col-span-1 border-b border-gray-100 py-2 outline-none text-lg font-light focus:border-black transition-colors" placeholder="ZIP Code" />
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <input className="h-4 w-4 rounded-sm border-gray-300 accent-black" id="save-address" type="checkbox" />
                  <label className="text-sm text-gray-500 font-light" htmlFor="save-address">Save as preferred delivery address</label>
                </div>
              </section>

              <div className="bg-stone-light p-6 border border-gray-100 flex gap-5 items-start">
                <span className="material-symbols-outlined text-gold mt-1">local_shipping</span>
                <div>
                  <h4 className="text-luxury-black font-serif text-lg">White Glove Concierge Delivery</h4>
                  <p className="text-gray-500 font-light text-sm mt-2 leading-relaxed">
                    Your complimentary items will be hand-packaged in our signature boutique boxes and delivered via priority secure courier. Signature required upon receipt.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28 bg-white border border-gray-100 p-8 md:p-10 shadow-pristine">
                <div className="flex justify-between items-baseline mb-8 border-b border-gray-100 pb-6 font-serif">
                  <h2 className="text-2xl text-luxury-black">Your Selection</h2>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold font-sans">Privilege Access</span>
                </div>

                <div className="flex flex-col gap-8 mb-10">
                  <div className="flex gap-6">
                    <div className="h-24 w-24 flex-shrink-0 bg-stone-light border border-gray-100 overflow-hidden">
                      <img className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCyn20r2P7Ub1AHoiu9b72pJseEkJK_eVNVyb8b_7mHVNoMmt35WqtJAmjHN5t4EHelxUeJblQdEXY95-TTCouve_06a6vzrt5jcxObXgtB8kjLBIeFMfHb0E8YVnr8UA7O1kac1DrLjpYEjB-v81jk02FvXfg1bBBoLRMHjazhbS8qILdv6A0-sHTsdOLVvKCCBWaP8RtWiyH9gtLYUmytf91TQYt-I78Krmyx8afQK-FRLpletH17K9kKCwtA0oiC7PIy_6oQzK9" alt="Product" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-luxury-black font-serif text-lg">Midnight Noir Tote</h3>
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 mb-3">Grain Leather / Onyx</p>
                      <span className="px-2 py-0.5 bg-black text-white text-[10px] uppercase tracking-widest font-medium w-fit">Complimentary</span>
                    </div>
                  </div>
                </div>

                <div className="mb-8 space-y-4 pt-6 border-t border-gray-100 text-sm">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="font-light">Subtotal Value</span>
                    <span className="line-through">$3,450.00</span>
                  </div>
                  <div className="flex items-center justify-between text-gold">
                    <span className="font-medium">VIP Benefit Applied</span>
                    <span>- $3,450.00</span>
                  </div>
                  <div className="flex items-center justify-between text-luxury-black text-xs font-bold uppercase tracking-widest">
                    <span>Shipping</span>
                    <span>Free Priority</span>
                  </div>
                  <div className="mt-6 flex items-center justify-between pt-6 border-t border-luxury-black font-serif">
                    <span className="text-lg text-luxury-black">Total Due</span>
                    <span className="text-3xl text-luxury-black">$0.00</span>
                  </div>
                </div>

                <button 
                  className="w-full bg-luxury-black py-5 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-gold transition-all shadow-xl flex items-center justify-center gap-3 group"
                  onClick={() => setCompleted(true)}
                >
                  Confirm Redemption
                  <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>

                <p className="mt-6 text-center text-[10px] text-gray-400 uppercase tracking-wider leading-relaxed">
                  By confirming, you agree to the VIP Terms.<br/>All complimentary items are final.
                </p>
                <div className="mt-8 flex justify-center gap-6 pt-6 opacity-40">
                  <span className="material-symbols-outlined text-luxury-black">lock</span>
                  <span className="material-symbols-outlined text-luxury-black">security</span>
                  <span className="material-symbols-outlined text-luxury-black">verified_user</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-100 py-10 text-center">
        <div className="flex justify-center mb-6">
          <span className="material-symbols-outlined text-gray-400 text-2xl">diamond</span>
        </div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">© 2024 LUXE VIP. Private Invitation Only.</p>
      </footer>
    </div>
  );
};

export default CheckoutPage;
