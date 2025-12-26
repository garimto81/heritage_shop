
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_VIPS } from '../constants';
import { TierLevel } from '../types';

const VIPManagementPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FCFCFC] font-sans text-luxury-black min-h-screen flex flex-col antialiased">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-md px-10 py-5 transition-all">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/admin/vips')}>
            <div className="size-9 text-black">
              <svg className="w-full h-full transform group-hover:scale-105 transition-transform duration-500 ease-out" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
              </svg>
            </div>
            <h2 className="text-lg font-serif font-medium tracking-widest uppercase text-black">GGP Heritage</h2>
          </div>
          <nav className="hidden lg:flex items-center gap-8 pl-8 border-l border-gray-100 text-[11px] font-semibold tracking-widest-luxury uppercase">
            <a className="text-black border-b border-black pb-0.5" href="#">VIP List</a>
            <a className="text-gray-400 hover:text-black transition-colors pb-0.5" href="#">Inventory</a>
            <a className="text-gray-400 hover:text-black transition-colors pb-0.5" href="#">Requests</a>
          </nav>
        </div>
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <button className="text-gray-300 hover:text-gold transition-colors duration-300 relative">
              <span className="material-symbols-outlined font-light text-[22px]">notifications</span>
              <span className="absolute top-0.5 right-0.5 size-1.5 bg-black rounded-full"></span>
            </button>
            <button className="text-gray-300 hover:text-black transition-colors duration-300">
              <span className="material-symbols-outlined font-light text-[22px]">settings</span>
            </button>
          </div>
          <div className="flex items-center gap-4 pl-6 border-l border-gray-100">
            <div className="text-right hidden md:block">
              <p className="text-[11px] font-bold uppercase tracking-widest text-black">Admin</p>
            </div>
            <div className="size-9 rounded-full overflow-hidden border border-gray-100 shadow-sm cursor-pointer hover:border-gold transition-colors duration-300" style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB9YvCb-IHKdc3biOW_O26cvNEP6gWOt2rpmV_KlP5NMNRCcgUp_Wi6Q9jZRbkk70NqWbExQ0wGimxOxtSbQTpBIetRvJm0ESq2fC8AhTfaeflczh37N2suJETxL2B8fmgxwRqN4zppMJ-uWRAOK0oHxaNtQZxBwy3o-1Ff21omp97x53p_qmUDKSL9iqpStZ7TyFsPZsFyfOe16IpYc2MOptNFTtr7RM1izWyA_J5Klce8M8mbCs5REjau8UslMfcZjXrxdEuY63M7')`, backgroundSize: 'cover' }}></div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full px-6 md:px-16 py-12">
        <div className="w-full max-w-[1600px] flex flex-col gap-14">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 pb-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-gold"></div>
                <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase">Management Console</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif font-normal text-black tracking-tight leading-tight">
                VIP <span className="italic font-light text-gray-400">List</span>
              </h1>
            </div>
            <button 
              onClick={() => navigate('/admin/invite')}
              className="group relative overflow-hidden bg-black text-white h-12 px-10 flex items-center justify-center transition-all duration-500 hover:shadow-lg"
            >
              <span className="absolute inset-0 w-full h-full bg-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <div className="relative flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px] font-light">add</span>
                <span className="text-[11px] font-bold tracking-widest uppercase">Concierge Entry</span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative bg-white p-10 shadow-pristine group hover:-translate-y-1 transition-transform duration-500 border border-transparent hover:border-gray-100">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Total Members</p>
                <p className="text-5xl font-serif text-black">1,240</p>
                <p className="text-[10px] text-gray-400 font-medium mt-1 tracking-widest"><span className="text-black font-bold">+12%</span> THIS MONTH</p>
              </div>
            </div>
            <div className="relative bg-white p-10 shadow-pristine group hover:-translate-y-1 transition-transform duration-500 border border-transparent hover:border-gray-100">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"></div>
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Active Elite</p>
                <p className="text-5xl font-serif text-black">1,100</p>
                <div className="w-12 h-px bg-gray-200 mt-2 overflow-hidden">
                  <div className="h-full bg-gold w-[88%]"></div>
                </div>
              </div>
            </div>
            <div className="relative bg-white p-10 shadow-pristine group hover:-translate-y-1 transition-transform duration-500 border border-transparent hover:border-gray-100">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gray-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-right"></div>
              <div className="flex flex-col items-center justify-center text-center gap-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Pending Review</p>
                <p className="text-5xl font-serif text-black">140</p>
                <p className="text-[10px] text-gray-400 font-medium mt-1 tracking-widest italic font-serif">Requires Attention</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 justify-between items-end pt-6">
            <div className="w-full lg:w-1/3 relative group">
              <input className="w-full bg-transparent border-b border-gray-200 py-3 pl-0 pr-10 font-serif text-lg text-black placeholder-gray-300 focus:border-black focus:ring-0 transition-colors duration-300 outline-none" placeholder="Search client dossier..." type="text"/>
              <button className="absolute right-0 top-3 text-gray-300 group-focus-within:text-black transition-colors duration-300">
                <span className="material-symbols-outlined font-light">search</span>
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-8 w-full lg:w-auto justify-end">
              <div className="flex items-center gap-3">
                <span className="uppercase text-[10px] tracking-widest text-gray-400 font-bold">Filter</span>
                <div className="h-px w-4 bg-gray-300"></div>
              </div>
              <button className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-black hover:text-gold transition-colors">
                Tier: All <span className="material-symbols-outlined text-[16px] text-gray-400">expand_more</span>
              </button>
              <button className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-black hover:text-gold transition-colors">
                Status: Active <span className="material-symbols-outlined text-[16px] text-gray-400">expand_more</span>
              </button>
              <button className="text-[10px] text-gray-300 hover:text-black uppercase tracking-widest font-bold transition-colors ml-4 border-b border-transparent hover:border-black pb-px">Reset View</button>
            </div>
          </div>

          <div className="w-full bg-white shadow-pristine rounded-sm overflow-hidden border border-gray-50">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Client Profile</th>
                    <th className="py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Contact</th>
                    <th className="py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Tier Level</th>
                    <th className="py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Access</th>
                    <th className="py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">Induction</th>
                    <th className="py-6 px-8 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {MOCK_VIPS.map((vip) => (
                    <tr key={vip.id} className="group hover:bg-[#FAFAFA] transition-all duration-500 ease-out cursor-pointer" onClick={() => navigate(`/admin/edit/${vip.id}`)}>
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-5">
                          <div className="size-11 rounded-full p-[3px] border border-gray-100 group-hover:border-gold transition-colors duration-500">
                            {vip.avatarUrl ? (
                              <div className="w-full h-full rounded-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" style={{ backgroundImage: `url('${vip.avatarUrl}')` }}></div>
                            ) : (
                              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-xs font-serif italic">
                                {vip.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            )}
                          </div>
                          <span className="font-serif text-lg text-black group-hover:translate-x-1 transition-transform duration-300">{vip.name}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <span className="text-xs font-medium text-gray-500 tracking-wide">{vip.email}</span>
                      </td>
                      <td className="py-6 px-8">
                        <span className={`inline-flex items-center gap-2 px-3 py-1.5 border text-[9px] uppercase tracking-[0.15em] font-bold ${vip.tier === TierLevel.GOLD ? 'border-[#E8DCC4] text-[#C5A059]' : 'border-gray-200 text-gray-500'}`}>
                          <span className="material-symbols-outlined text-[12px]">{vip.tier === TierLevel.GOLD ? 'diamond' : 'stars'}</span> {vip.tier}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <label className="inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
                          <input checked={vip.status === 'ACTIVE'} className="sr-only peer" type="checkbox" readOnly />
                          <div className="relative w-8 h-4 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-black transition-colors"></div>
                        </label>
                      </td>
                      <td className="py-6 px-8">
                        <span className="text-xs text-gray-400 font-light font-mono">{vip.inductionDate}</span>
                      </td>
                      <td className="py-6 px-8 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-2 group-hover:translate-x-0">
                          <button className="p-2 text-gray-400 hover:text-black transition-colors" title="Edit">
                            <span className="material-symbols-outlined text-[18px] font-light">edit_note</span>
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-900 transition-colors" title="Remove" onClick={(e) => e.stopPropagation()}>
                            <span className="material-symbols-outlined text-[18px] font-light">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-white border-t border-gray-50">
              <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
                Viewing <span className="text-black font-bold">1-4</span> of <span className="text-black font-bold">1,240</span> Entries
              </p>
              <div className="flex items-center gap-2">
                <button className="size-8 flex items-center justify-center text-gray-300 hover:text-black transition-all disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined text-[18px]">west</span>
                </button>
                <div className="flex items-center gap-1 mx-2">
                  <button className="size-8 flex items-center justify-center text-xs font-bold text-white bg-black rounded-none shadow-lg">1</button>
                  <button className="size-8 flex items-center justify-center text-xs font-medium text-gray-400 hover:text-black transition-all">2</button>
                  <button className="size-8 flex items-center justify-center text-xs font-medium text-gray-400 hover:text-black transition-all hidden sm:flex">3</button>
                  <span className="size-8 flex items-center justify-center text-xs text-gray-300 font-serif italic">...</span>
                  <button className="size-8 flex items-center justify-center text-xs font-medium text-gray-400 hover:text-black transition-all">62</button>
                </div>
                <button className="size-8 flex items-center justify-center text-gray-300 hover:text-black transition-all">
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </button>
              </div>
            </div>
          </div>
          <div className="text-center pt-8 pb-4">
            <p className="text-[9px] text-gray-300 font-light tracking-[0.3em] uppercase">GGP Heritage • Exclusive Admin Portal • 2024</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VIPManagementPage;
