"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [answers, setAnswers] = useState({
    englishLevel: "",
    targetBand: "",
    timeUntilExam: "",
    weeklyHours: "",
    strugglingSection: "",
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<string>("");
  const roadmapRef = useRef<HTMLElement>(null);

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleBuildRoadmap = async () => {
    setIsGenerating(true);
    setRoadmap("");
    
    try {
      const response = await fetch("/api/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
      
      const data = await response.json();
      if (data.roadmap) {
        setRoadmap(data.roadmap);
        setTimeout(() => {
          roadmapRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else if (data.error) {
        alert("Error generating roadmap: " + data.error);
      }
    } catch (error: any) {
      console.error("Failed to fetch roadmap:", error);
      alert("Failed to fetch roadmap. Please check the console.");
    } finally {
      setIsGenerating(false);
    }
  };

  const getButtonClass = (isActive: boolean, extraClasses: string = "px-6 py-3") => {
    return `${extraClasses} rounded-full font-label-md text-label-md transition-colors border border-transparent ${
      isActive
        ? "bg-primary-container text-on-primary-container shadow-sm"
        : "bg-surface-container hover:bg-primary-fixed hover:text-on-primary-fixed-variant text-on-surface-variant"
    }`;
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-page pb-section-gap flex-1 w-full">
      <section className="flex flex-col items-center text-center py-20 lg:py-32 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary-container/20 rounded-full blur-[100px] -z-10"></div>
        <h1 className="font-h1 text-h1 text-on-surface max-w-4xl mb-stack-lg">
          What&apos;s Your Target IELTS Band?
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-12">
          Tell us your goal, and our AI will build the exact roadmap to get you there. No guesswork, just a personalized path to success.
        </p>
        <button 
          onClick={handleBuildRoadmap}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-surface-tint text-on-primary font-label-md text-label-md px-8 py-4 rounded-full shadow-[0_10px_30px_-10px_rgba(99,102,241,0.4)] transition-all duration-300 hover:-translate-y-1 disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating your roadmap...
            </>
          ) : (
            "Build My Roadmap"
          )}
        </button>
      </section>

      <section className="max-w-3xl mx-auto">
        <div className="bg-surface-container-lowest rounded-[24px] shadow-[0_8px_40px_-12px_rgba(70,72,212,0.08)] border border-outline-variant/30 p-8 md:p-12">
          <div className="flex flex-col gap-stack-lg">
            
            <div className="border-b border-outline-variant/20 pb-8 last:border-0 last:pb-0">
              <h3 className="font-h3 text-h3 text-on-surface mb-stack-md flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md">1</span>
                Current English level?
              </h3>
              <div className="flex flex-wrap gap-3">
                {["Beginner", "Intermediate", "Advanced"].map((level) => (
                  <button 
                    key={level}
                    onClick={() => handleSelect("englishLevel", level)}
                    className={getButtonClass(answers.englishLevel === level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-outline-variant/20 pb-8 last:border-0 last:pb-0">
              <h3 className="font-h3 text-h3 text-on-surface mb-stack-md flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md">2</span>
                Target IELTS band?
              </h3>
              <div className="flex flex-wrap gap-3">
                {["6.0", "6.5", "7.0", "7.5", "8.0+"].map((band) => (
                  <button 
                    key={band}
                    onClick={() => handleSelect("targetBand", band)}
                    className={getButtonClass(answers.targetBand === band, "px-5 py-3")}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-outline-variant/20 pb-8 last:border-0 last:pb-0">
              <h3 className="font-h3 text-h3 text-on-surface mb-stack-md flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md">3</span>
                Time until exam?
              </h3>
              <div className="flex flex-wrap gap-3">
                {["1 month", "3 months", "6 months+"].map((time) => (
                  <button 
                    key={time}
                    onClick={() => handleSelect("timeUntilExam", time)}
                    className={getButtonClass(answers.timeUntilExam === time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-outline-variant/20 pb-8 last:border-0 last:pb-0">
              <h3 className="font-h3 text-h3 text-on-surface mb-stack-md flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md">4</span>
                Weekly study hours?
              </h3>
              <div className="flex flex-wrap gap-3">
                {["2-5 hours", "5-10 hours", "10+ hours"].map((hours) => (
                  <button 
                    key={hours}
                    onClick={() => handleSelect("weeklyHours", hours)}
                    className={getButtonClass(answers.weeklyHours === hours)}
                  >
                    {hours}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-b border-outline-variant/20 pb-8 last:border-0 last:pb-0">
              <h3 className="font-h3 text-h3 text-on-surface mb-stack-md flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-md text-label-md">5</span>
                Most struggling section?
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Listening", icon: "headphones" },
                  { label: "Reading", icon: "menu_book" },
                  { label: "Writing", icon: "edit" },
                  { label: "Speaking", icon: "mic" }
                ].map((section) => (
                  <button 
                    key={section.label}
                    onClick={() => handleSelect("strugglingSection", section.label)}
                    className={getButtonClass(answers.strugglingSection === section.label, "px-6 py-3 flex items-center gap-2")}
                  >
                    <span className="material-symbols-outlined text-[18px]">{section.icon}</span>
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {roadmap && (
        <section ref={roadmapRef} className="max-w-4xl mx-auto mt-16 mb-24 scroll-mt-24 w-full">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 transition-all duration-500 ease-in-out opacity-100 translate-y-0">
            <h2 className="text-3xl font-bold font-manrope text-slate-900 dark:text-white mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
              Your Personalized Roadmap
            </h2>
            <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none prose-headings:font-manrope prose-p:font-inter prose-li:font-inter">
              <ReactMarkdown>{roadmap}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

