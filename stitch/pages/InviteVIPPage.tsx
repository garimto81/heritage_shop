
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InviteVIPPage: React.FC = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="bg-lux-gray text-text-main font-sans min-h-screen flex flex-col relative overflow-hidden">
      <header className="flex items-center justify-between whitespace-nowrap border-b border-lux-border bg-white/90 backdrop-blur-md px-8 py-4 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/admin/vips')}>
          <div className="size-8 flex items-center justify-center text-lux-gold">
            <span className="material-symbols-outlined text-3xl font-light">diamond</span>
          </div>
          <h2 className="text-lux-black text-lg font-serif font-semibold tracking-wide">GGP Heritage <span className="text-lux-gold text-xs italic ml-1 font-sans font-light tracking-widest uppercase">Admin Suite</span></h2>
        </div>
        <div className="flex flex-1 justify-end gap-8 items-center">
          <button className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors">Concierge</button>
          <button className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors" onClick={() => navigate('/')}>Logout</button>
          <div className="relative size-10 rounded-full border border-lux-border p-0.5 shadow-sm">
            <div className="bg-center bg-no-repeat bg-cover rounded-full w-full h-full" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6KvQwZKuMNR8L1bhvjxO5B5X_U_SjLvZaLEOMj40mN72-ZsAAJWlVB1wxDZIYipQxQSaFa9d4n8eAPfavl7mIUcqgN6ZGfl2zChxd2bGRTcDzv9VPt9jHVQMkv2olPJlqx-Cee5NZhM95IbtmwHX8XqWKkFk7mpbjw7ZcOA_A7ZmgYB1nxsF2tpNtzRDNmoL5JHshPtB1_bgM7kGxnm4hpDnu4pqnh9nvYm5jiiF_tBBvmdHHRDhVJMFynOppASrW0NtZyDiH7jsw')` }}></div>
          </div>
        </div>
      </header>

      <div className="flex-grow relative bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-stone-light/95 z-0 backdrop-blur-[2px]"></div>
        
        <div className="relative z-10 px-4 md:px-10 lg:px-40 flex flex-col items-center py-16">
          <div className="max-w-[900px] w-full">
            <div className="flex flex-wrap gap-3 px-4 py-2 items-center mb-6 justify-center">
              <button className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-lux-gold transition-colors" onClick={() => navigate('/admin/vips')}>Dashboard</button>
              <span className="text-lux-gold/40 text-[10px]">/</span>
              <button className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase hover:text-lux-gold transition-colors" onClick={() => navigate('/admin/vips')}>VIPs</button>
              <span className="text-lux-gold/40 text-[10px]">/</span>
              <span className="text-lux-gold text-[10px] font-bold tracking-[0.2em] uppercase border-b border-lux-gold/30 pb-0.5">New Invitation</span>
            </div>

            <div className="flex flex-col items-center text-center gap-4 px-4 py-6 mb-10">
              <span className="text-lux-gold text-[10px] font-bold tracking-[0.4em] uppercase mb-1">Maison Privée</span>
              <h1 className="text-lux-black text-4xl md:text-6xl font-serif font-medium leading-tight">Generate Invitation</h1>
              <p className="text-gray-500 text-lg font-light max-w-lg mx-auto mt-2 font-serif italic">Create a prestigious access pass for the Heritage Mall.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10 bg-white border border-white rounded-lg p-10 md:p-16 shadow-pristine relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lux-gold/40 to-transparent"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                <label className="flex flex-col flex-1 gap-3">
                  <span className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase flex justify-between">Recipient Email <span className="text-lux-gold">*</span></span>
                  <input className="w-full h-14 px-5 text-base text-lux-black border border-gray-200 focus:border-lux-gold outline-none rounded-sm font-light tracking-wide bg-gray-50/30" placeholder="vip@example.com" required type="email" />
                </label>
                <label className="flex flex-col flex-1 gap-3">
                  <span className="text-gray-500 text-[10px] font-bold tracking-[0.2em] uppercase">Recipient Name</span>
                  <input className="w-full h-14 px-5 text-base text-lux-black border border-gray-200 focus:border-lux-gold outline-none rounded-sm font-light tracking-wide bg-gray-50/30" placeholder="e.g. Eleanor Rigby" type="text" />
                </label>
              </div>

              <div className="flex flex-col gap-6 pt-4">
                <span className="text-lux-black text-[10px] font-bold tracking-[0.2em] uppercase border-b border-lux-border pb-3">Select Membership Tier</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {['silver', 'gold'].map((tier) => (
                    <label key={tier} className="cursor-pointer relative group">
                      <input className="sr-only peer" name="tier" type="radio" value={tier} defaultChecked={tier === 'gold'} />
                      <div className="h-full p-6 rounded-sm border border-lux-border bg-white flex flex-col gap-3 transition-all duration-300 peer-checked:border-lux-gold peer-checked:bg-stone-50 group-hover:border-gray-300 hover:shadow-lg">
                        <div className="flex justify-between items-start">
                          <div className="flex flex-col">
                            <span className={`font-serif text-2xl ${tier === 'gold' ? 'text-lux-gold' : 'text-lux-charcoal'}`}>{tier.charAt(0).toUpperCase() + tier.slice(1)}</span>
                            <span className="text-gray-400 text-[9px] uppercase tracking-[0.15em] mt-1">{tier === 'gold' ? 'Priority Access' : 'Standard Privileges'}</span>
                          </div>
                          <div className={`size-8 rounded-full flex items-center justify-center border ${tier === 'gold' ? 'bg-lux-gold-light/20 border-lux-gold/20 text-lux-gold' : 'bg-gray-50 border-gray-100 text-gray-400'}`}>
                            <span className="material-symbols-outlined font-light text-lg">{tier === 'gold' ? 'workspace_premium' : 'diamond'}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-xs text-gray-500 font-light leading-relaxed">
                          {tier === 'gold' ? 'Early access to limited editions, concierge service, and exclusive gifts.' : 'Access to seasonal collections and standard complimentary offerings.'}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6 pt-4">
                <span className="text-lux-black text-[10px] font-bold tracking-[0.2em] uppercase border-b border-lux-border pb-3">Delivery Method</span>
                <div className="flex flex-col sm:flex-row gap-6">
                  {['email', 'qr'].map((type) => (
                    <label key={type} className="cursor-pointer relative flex-1">
                      <input className="sr-only peer" name="reg_type" type="radio" value={type} defaultChecked={type === 'email'} />
                      <div className="flex items-center gap-5 p-5 py-6 rounded-sm border border-lux-border bg-white transition-all peer-checked:bg-stone-50 peer-checked:border-lux-gold">
                        <div className="size-10 flex items-center justify-center border border-gray-100 rounded-full bg-gray-50 peer-checked:text-lux-gold">
                          <span className="material-symbols-outlined text-xl font-light">{type === 'email' ? 'mail' : 'qr_code_2'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-lux-black font-medium text-sm font-serif">{type === 'email' ? 'Automated Email' : 'Generate QR Code'}</span>
                          <span className="text-gray-400 text-xs font-light mt-0.5">{type === 'email' ? 'Send direct' : 'Manual share'}</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-6 mt-8 pt-10 border-t border-lux-border">
                <button type="button" className="text-gray-400 hover:text-black text-[10px] font-bold tracking-[0.2em] uppercase transition-colors" onClick={() => navigate('/admin/vips')}>Cancel</button>
                <button type="submit" className="h-14 px-12 rounded-sm bg-lux-black text-white hover:bg-lux-charcoal font-bold tracking-[0.2em] uppercase text-[10px] transition-all duration-500 shadow-xl flex items-center gap-3 border border-transparent hover:border-lux-gold/30">
                  <span>Create VIP Access</span>
                  <span className="material-symbols-outlined text-base text-lux-gold">arrow_forward</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-[500px] border border-white shadow-2xl flex flex-col relative rounded-sm p-12">
            <div className="absolute top-0 left-0 size-6 border-t-2 border-l-2 border-lux-gold"></div>
            <div className="absolute top-0 right-0 size-6 border-t-2 border-r-2 border-lux-gold"></div>
            <div className="absolute bottom-0 left-0 size-6 border-b-2 border-l-2 border-lux-gold"></div>
            <div className="absolute bottom-0 right-0 size-6 border-b-2 border-r-2 border-lux-gold"></div>
            
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 p-3 rounded-full bg-stone-50 border border-lux-gold/10">
                <span className="material-symbols-outlined text-4xl text-lux-gold font-thin">verified</span>
              </div>
              <h3 className="text-lux-black text-3xl font-serif mb-2">Invitation Issued</h3>
              <p className="text-gray-500 font-light text-sm tracking-wide mb-8">The VIP access pass has been successfully generated.</p>
              
              <div className="w-full flex flex-col gap-3">
                <button 
                  className="w-full h-12 bg-lux-black text-white font-bold tracking-[0.2em] uppercase text-[10px] hover:bg-lux-gold transition-colors flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => setSuccess(false)}
                >
                  Send Email
                </button>
                <button 
                  className="w-full h-12 text-gray-400 hover:text-black font-bold tracking-[0.2em] uppercase text-[10px] transition-colors"
                  onClick={() => { setSuccess(false); navigate('/admin/vips'); }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteVIPPage;
