
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_VIPS } from '../constants';
import { TierLevel } from '../types';

const EditVIPPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const vip = MOCK_VIPS.find(v => v.id === id) || MOCK_VIPS[0];

  return (
    <div className="flex h-full min-h-screen w-full flex-col bg-white font-sans text-luxury-charcoal overflow-x-hidden antialiased">
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-100 px-8 py-5 bg-white/95 backdrop-blur-sm transition-all">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/admin/vips')}>
            <h2 className="text-xl font-serif font-bold tracking-[0.15em] text-black uppercase">GGP Heritage</h2>
          </div>
          <nav className="hidden md:flex items-center gap-10 text-[10px] font-bold tracking-widest-luxury uppercase">
            <a className="text-gray-400 hover:text-black transition-colors" href="#">Atelier</a>
            <a className="text-black pb-1 border-b border-black" href="#">Clientele</a>
            <a className="text-gray-400 hover:text-black transition-colors" href="#">Inventory</a>
          </nav>
        </div>
        <div className="flex items-center gap-8">
          <div className="relative hidden sm:block group">
            <span className="material-symbols-outlined absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 text-lg font-light">search</span>
            <input className="w-48 bg-transparent border-b border-gray-200 focus:border-black outline-none py-1.5 pl-7 text-[11px] font-semibold uppercase tracking-widest text-black placeholder:text-gray-300" placeholder="Search Registry..."/>
          </div>
          <div className="size-8 rounded-full bg-cover ring-2 ring-offset-2 ring-gray-50" style={{backgroundImage: `url('${vip.avatarUrl || 'https://picsum.photos/100/100'}')`}}></div>
        </div>
      </header>

      <main className="flex-1 flex justify-center py-16 px-6 lg:px-16 bg-[#FAFAFA]">
        <div className="flex flex-col max-w-7xl w-full gap-16">
          <div className="flex flex-col gap-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-3 text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">
              <button className="hover:text-black transition-colors" onClick={() => navigate('/admin/vips')}>Clientele</button>
              <span className="text-gray-300">/</span>
              <button className="hover:text-black transition-colors" onClick={() => navigate('/admin/vips')}>Directory</button>
              <span className="text-gray-300">/</span>
              <span className="text-black">Edit Profile</span>
            </div>
            <div className="flex flex-wrap justify-between items-end gap-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-serif text-black leading-tight tracking-tight">{vip.name}</h1>
                <div className="flex items-center gap-4 pt-1">
                  <div className="flex items-center gap-2 px-3 py-1 bg-black text-white">
                    <span className="material-symbols-outlined text-[10px] text-gold">star</span>
                    <span className="text-[9px] uppercase tracking-[0.2em] font-bold">{vip.tier} PREMIUM</span>
                  </div>
                  <p className="text-[10px] font-mono text-gray-400 tracking-widest uppercase">REF: 9942-VIP</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-black transition-colors py-3 border-b border-transparent hover:border-black" onClick={() => navigate('/admin/vips')}>Discard</button>
                <button className="px-10 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-all shadow-xl flex items-center gap-2" onClick={() => navigate('/admin/vips')}>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 flex flex-col gap-16">
              <section className="bg-white p-10 shadow-pristine border border-gray-50">
                <h3 className="text-2xl font-serif text-black mb-10">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                  {[
                    { label: 'Full Name', value: vip.name },
                    { label: 'Email Address', value: vip.email },
                    { label: 'Phone Number', value: '+1 (555) 000-0000' }
                  ].map((field) => (
                    <label key={field.label} className="block group relative">
                      <span className="absolute -top-3 left-0 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 bg-white pr-2 group-focus-within:text-gold transition-colors">{field.label}</span>
                      <input className="w-full bg-transparent border-b border-gray-200 py-3 text-base text-black focus:border-gold outline-none font-serif transition-colors" type="text" defaultValue={field.value} />
                    </label>
                  ))}
                  <label className="block group relative">
                    <span className="absolute -top-3 left-0 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 bg-white pr-2 group-focus-within:text-gold transition-colors">Region</span>
                    <div className="relative">
                      <select className="w-full bg-transparent border-b border-gray-200 py-3 text-base text-black focus:border-gold outline-none appearance-none font-serif cursor-pointer pr-8">
                        <option>North America</option>
                        <option>Europe</option>
                        <option>Asia Pacific</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-0 top-3 text-gray-300 pointer-events-none text-xl font-light">arrow_drop_down</span>
                    </div>
                  </label>
                </div>
              </section>

              <section className="bg-white p-10 shadow-pristine border border-gray-50">
                <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-6">
                  <h3 className="text-2xl font-serif text-black">Membership Tier</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Status Active</span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input checked className="absolute block w-4 h-4 rounded-full bg-white border border-gray-300 appearance-none cursor-pointer transition-all duration-300 left-0.5 top-0.5 z-10 shadow-sm accent-black" type="checkbox" readOnly />
                      <div className="block overflow-hidden h-5 rounded-full bg-black cursor-pointer transition-colors duration-300"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[TierLevel.SILVER, TierLevel.GOLD, TierLevel.PLATINUM].map((t) => (
                    <label key={t} className="relative cursor-pointer group">
                      <input className="peer sr-only" name="tier" type="radio" defaultChecked={vip.tier === t} />
                      <div className="h-full border border-gray-200 p-8 peer-checked:border-gold peer-checked:bg-gold-light/20 flex flex-col justify-between min-h-[200px] hover:border-gray-300 transition-all">
                        <span className={`text-[9px] font-bold uppercase tracking-[0.25em] ${vip.tier === t ? 'text-gold' : 'text-gray-400'}`}>{t}</span>
                        <div className="space-y-4">
                          <span className={`material-symbols-outlined text-3xl font-light ${vip.tier === t ? 'text-gold' : 'text-gray-200'}`}>{t === TierLevel.PLATINUM ? 'flight_class' : t === TierLevel.GOLD ? 'diamond' : 'shopping_bag'}</span>
                          <p className="text-xs text-gray-500 leading-relaxed font-serif italic">Curated access for {t.toLowerCase()} members.</p>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 peer-checked:opacity-100 transition-opacity">
                          <span className="material-symbols-outlined text-gold text-lg">check_circle</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="bg-black text-white p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-10 -right-10 opacity-10 pointer-events-none">
                  <span className="material-symbols-outlined text-[10rem] font-thin">key</span>
                </div>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold mb-6 flex items-center gap-3">
                  <span className="w-2 h-px bg-gold"></span> Access Key
                </h3>
                <p className="text-sm text-gray-400 mb-8 font-serif italic leading-relaxed">Secure digital entry token. Share only via encrypted channels.</p>
                <div className="bg-white/10 border border-white/20 p-5 mb-8 flex items-center justify-between group cursor-pointer hover:bg-white/15 transition-all backdrop-blur-md">
                  <code className="text-sm font-mono text-white tracking-widest truncate">8X9S0-2MKL-99VIP</code>
                  <span className="material-symbols-outlined text-gold/70 group-hover:text-gold text-sm transition-colors">content_copy</span>
                </div>
                <button className="flex items-center justify-center w-full py-4 border border-white/20 text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-500">
                  Regenerate Key
                </button>
              </div>

              <div className="p-8 bg-white border border-gray-100 shadow-pristine">
                <h3 className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-8 pb-2 border-b border-gray-100">Client Activity</h3>
                <ul className="space-y-6">
                  {[
                    { label: 'Last Access', val: '2h ago' },
                    { label: 'Acquisitions', val: '12 items' },
                    { label: 'Induction', val: vip.inductionDate }
                  ].map((act) => (
                    <li key={act.label} className="flex justify-between items-center text-sm group cursor-default">
                      <span className="text-gray-500 font-serif italic group-hover:text-black transition-colors">{act.label}</span>
                      <span className="text-black font-mono text-[10px] uppercase tracking-wider">{act.val}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditVIPPage;
