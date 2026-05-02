import React from 'react';

export default function SuccessStoriesPage() {
  return (
    <main className="max-w-container-max mx-auto px-margin-page pb-section-gap flex-1 w-full py-20 lg:py-32 flex flex-col items-center">
      <h1 className="font-h1 text-h1 text-on-surface max-w-4xl mb-stack-lg text-center">Success Stories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-5xl">
        <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_8px_40px_-12px_rgba(70,72,212,0.08)] border border-outline-variant/30 p-8">
          <div className="flex items-center gap-1 mb-4 text-[#fbbf24]">
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
          </div>
          <p className="text-lg text-on-surface-variant italic mb-6 font-body-md">&quot;Student A achieved Band 8.5 using this roadmap. The targeted advice for my weakest section made all the difference!&quot;</p>
          <div className="font-semibold text-on-surface font-label-md">- Student A</div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_8px_40px_-12px_rgba(70,72,212,0.08)] border border-outline-variant/30 p-8">
          <div className="flex items-center gap-1 mb-4 text-[#fbbf24]">
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
          </div>
          <p className="text-lg text-on-surface-variant italic mb-6 font-body-md">&quot;I went from a 6.0 to a 7.5 in just two months. The structured weekly plan kept me accountable.&quot;</p>
          <div className="font-semibold text-on-surface font-label-md">- Maria G.</div>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_8px_40px_-12px_rgba(70,72,212,0.08)] border border-outline-variant/30 p-8">
          <div className="flex items-center gap-1 mb-4 text-[#fbbf24]">
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
            <span className="material-symbols-outlined text-[20px]">star</span>
          </div>
          <p className="text-lg text-on-surface-variant italic mb-6 font-body-md">&quot;Finally an AI tool that actually understands what the IELTS examiners are looking for. Highly recommend!&quot;</p>
          <div className="font-semibold text-on-surface font-label-md">- David K.</div>
        </div>
      </div>
    </main>
  );
}
