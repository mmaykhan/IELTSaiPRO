import React from 'react';

export default function PricingPage() {
  return (
    <main className="max-w-container-max mx-auto px-margin-page pb-section-gap flex-1 w-full py-20 lg:py-32 flex flex-col items-center">
      <h1 className="font-h1 text-h1 text-on-surface max-w-4xl mb-stack-lg text-center">Simple, Transparent Pricing</h1>
      
      <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_8px_40px_-12px_rgba(70,72,212,0.08)] border border-outline-variant/30 p-8 md:p-12 w-full max-w-md mt-8">
        <div className="text-center mb-8">
          <span className="inline-block bg-primary-container text-on-primary-container text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-4">Beta Phase</span>
          <h2 className="text-5xl font-bold text-on-surface">$0<span className="text-xl text-on-surface-variant font-normal">/month</span></h2>
        </div>
        
        <ul className="space-y-4 mb-8 text-on-surface-variant font-body-md">
          <li className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">check_circle</span>
            AI-Powered Personalized Roadmaps
          </li>
          <li className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">check_circle</span>
            24/7 Access to Platform
          </li>
          <li className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">check_circle</span>
            Future Updates Included
          </li>
        </ul>
        
        <button className="w-full bg-primary hover:bg-surface-tint text-on-primary px-6 py-4 rounded-full font-label-md transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(99,102,241,0.4)] hover:-translate-y-1">
          Get Started for Free
        </button>
      </div>
    </main>
  );
}
