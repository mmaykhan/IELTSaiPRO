"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { 
  Headphones, 
  BookOpen, 
  PenTool, 
  Mic2, 
  CheckCircle2, 
  Loader2, 
  Sparkles, 
  Target, 
  Trophy, 
  Calendar, 
  Clock, 
  AlertCircle, 
  Star, 
  Info,
  Book,
  Lightbulb
} from "lucide-react";

export default function Home() {
  const [answers, setAnswers] = useState({
    englishLevel: "",
    targetBand: "",
    timeUntilExam: "",
    weeklyHours: "",
    strugglingSection: "",
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [roadmap, setRoadmap] = useState<any>(null);
  const roadmapRef = useRef<HTMLElement>(null);

  const handleSelect = (key: keyof typeof answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleBuildRoadmap = async () => {
    setIsGenerating(true);
    setRoadmap(null);
    
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
    return `${extraClasses} rounded-full font-label-md text-label-md transition-all duration-200 border ${
      isActive
        ? "bg-primary text-white border-primary shadow-lg scale-105"
        : "bg-white hover:bg-slate-50 text-slate-600 border-slate-200"
    }`;
  };

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes("listening")) return <Headphones className="w-5 h-5" />;
    if (cat.includes("reading")) return <BookOpen className="w-5 h-5" />;
    if (cat.includes("writing")) return <PenTool className="w-5 h-5" />;
    if (cat.includes("speaking")) return <Mic2 className="w-5 h-5" />;
    return <CheckCircle2 className="w-5 h-5" />;
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] pb-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6"
          >
            Your Path to <span className="text-primary">IELTS Success</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto mb-10"
          >
            Get a personalized, week-by-week study plan tailored to your level and goals. Powered by AI, designed for your success.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button 
              onClick={handleBuildRoadmap}
              disabled={isGenerating}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-primary/20 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Crafting Your Strategy...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate My Roadmap
                </>
              )}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white p-8 md:p-12">
          <div className="space-y-12">
            
            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <Target className="w-4 h-4 text-primary" />
                Current English level?
              </label>
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

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <Trophy className="w-4 h-4 text-primary" />
                Target IELTS band?
              </label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  <Calendar className="w-4 h-4 text-primary" />
                  Time until exam?
                </label>
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

              <div className="space-y-4">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-primary" />
                  Weekly study hours?
                </label>
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
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-primary" />
                Most struggling section?
              </label>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Listening", icon: Headphones },
                  { label: "Reading", icon: BookOpen },
                  { label: "Writing", icon: PenTool },
                  { label: "Speaking", icon: Mic2 }
                ].map((section) => (
                  <button 
                    key={section.label}
                    onClick={() => handleSelect("strugglingSection", section.label)}
                    className={getButtonClass(answers.strugglingSection === section.label, "px-6 py-3 flex items-center gap-2")}
                  >
                    <section.icon className="w-4 h-4" />
                    {section.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      {roadmap && (
        <section ref={roadmapRef} className="max-w-5xl mx-auto px-6 space-y-12 scroll-mt-24">
          
          {/* Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary text-white rounded-3xl p-8 md:p-12 shadow-2xl shadow-primary/20 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
                  <Star className="w-3 h-3 fill-white" />
                  Your Custom Plan
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">{roadmap.summary.title}</h2>
                <p className="text-white/80 text-lg">{roadmap.summary.description}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-white/70">Overall Readiness</span>
                  <span className="text-xl font-bold">0%</span>
                </div>
                <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                  <div className="w-0 h-full bg-white rounded-full transition-all duration-1000 ease-out" style={{ width: '5%' }}></div>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                  <Info className="w-3 h-3" />
                  Targeting Band {answers.targetBand} by {roadmap.summary.estimatedSuccessDate}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Week Cards */}
          <div className="grid grid-cols-1 gap-8">
            {roadmap.weeks.map((week: any, idx: number) => (
              <motion.div
                key={week.weekNumber}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col md:flex-row gap-6"
              >
                <div className="flex-none flex flex-col items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-primary font-bold text-lg group-hover:scale-110 transition-transform">
                    {week.weekNumber}
                  </div>
                  <div className="flex-1 w-0.5 bg-slate-200 my-2 group-last:hidden"></div>
                </div>
                
                <div className="flex-1 bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/40 border border-slate-100 hover:border-primary/20 transition-all">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    {week.title}
                  </h3>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    {week.tasks.map((task: any, tIdx: number) => (
                      <div key={tIdx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                          {getIcon(task.category)}
                          {task.category}
                        </div>
                        <p className="font-semibold text-slate-800 leading-tight">{task.task}</p>
                        <p className="text-sm text-slate-500">{task.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Extra Info */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 shadow-2xl"
            >
              <h3 className="text-xl font-bold flex items-center gap-3">
                <Book className="w-6 h-6 text-blue-400" />
                Recommended Resources
              </h3>
              <ul className="space-y-4">
                {roadmap.resources.map((res: any, i: number) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 uppercase text-[10px] font-bold">
                      {res.type.slice(0, 3)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">{res.name}</h4>
                      <p className="text-sm text-slate-400">Available at {res.url.includes('example') ? 'official portals' : res.url}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-amber-50 rounded-3xl p-8 border border-amber-100 space-y-6"
            >
              <h3 className="text-xl font-bold text-amber-900 flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                Expert Tips for Band {answers.targetBand}
              </h3>
              <div className="space-y-4">
                {roadmap.proTips.map((tip: string, i: number) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-amber-800 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}

