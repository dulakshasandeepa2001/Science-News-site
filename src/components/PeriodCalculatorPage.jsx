import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Heart, 
  Sparkles, 
  Droplets, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Download, 
  Share2, 
  Flame, 
  Activity, 
  ShieldCheck, 
  Pill, 
  Coffee, 
  HelpCircle, 
  RefreshCw, 
  FileText, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';

export default function PeriodCalculatorPage() {
  // ----------------------------------------------------
  // Default State: Last Period started 14 days ago
  // ----------------------------------------------------
  const getInitialDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() - 14);
    return d.toISOString().split('T')[0];
  };

  const [lastPeriodDate, setLastPeriodDate] = useState(getInitialDateString());
  const [periodDuration, setPeriodDuration] = useState(5); // 1-10 days
  const [cycleLength, setCycleLength] = useState(28); // 21-45 days
  const [lutealPhase, setLutealPhase] = useState(14); // 10-16 days
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Calendar View Navigation
  const [viewMonthDate, setViewMonthDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const [activeTab, setActiveTab] = useState('calendar'); // 'calendar' | 'schedule' | 'phases'
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // ----------------------------------------------------
  // Predictive Reproductive Calculations
  // ----------------------------------------------------
  const cycleData = useMemo(() => {
    const parsedStart = new Date(lastPeriodDate + 'T00:00:00');
    const validCycleLength = Math.max(20, Math.min(50, Number(cycleLength) || 28));
    const validDuration = Math.max(1, Math.min(12, Number(periodDuration) || 5));
    const validLuteal = Math.max(9, Math.min(18, Number(lutealPhase) || 14));

    // Generate 6 upcoming cycles
    const cycles = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 6; i++) {
      const cycleStart = new Date(parsedStart);
      cycleStart.setDate(cycleStart.getDate() + i * validCycleLength);

      const periodEnd = new Date(cycleStart);
      periodEnd.setDate(periodEnd.getDate() + validDuration - 1);

      const nextCycleStart = new Date(cycleStart);
      nextCycleStart.setDate(nextCycleStart.getDate() + validCycleLength);

      // Ovulation occurs lutealPhase days before the NEXT period start
      const ovulationDate = new Date(nextCycleStart);
      ovulationDate.setDate(ovulationDate.getDate() - validLuteal);

      // Fertile window: 5 days prior to ovulation up to ovulation day (+1 day cushion)
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(fertileStart.getDate() - 5);

      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(fertileEnd.getDate() + 1);

      // Pregnancy test recommended date (1 day after expected missed period)
      const pregnancyTestDate = new Date(nextCycleStart);
      pregnancyTestDate.setDate(pregnancyTestDate.getDate() + 1);

      // Estimated Due Date if conception occurs on ovulation date (LMP + 280 days + cycle adjustment)
      const estimatedDueDate = new Date(cycleStart);
      estimatedDueDate.setDate(estimatedDueDate.getDate() + 280 + (validCycleLength - 28));

      cycles.push({
        cycleIndex: i + 1,
        cycleStart,
        periodEnd,
        nextCycleStart,
        ovulationDate,
        fertileStart,
        fertileEnd,
        pregnancyTestDate,
        estimatedDueDate
      });
    }

    // Determine current cycle and phase based on today
    let currentCycle = cycles[0];
    for (let c of cycles) {
      if (today >= c.cycleStart && today < c.nextCycleStart) {
        currentCycle = c;
        break;
      }
    }

    const diffDays = Math.floor((today - currentCycle.cycleStart) / (1000 * 60 * 60 * 24));
    const currentCycleDay = diffDays >= 0 ? diffDays + 1 : 1;

    let currentPhase = 'Follicular Phase';
    let phaseDescription = 'Estrogen rises as ovarian follicles mature.';
    let conceptionChance = 'Low';
    let badgeColor = 'bg-blue-500/10 text-blue-600 border-blue-500/20';

    if (today >= currentCycle.cycleStart && today <= currentCycle.periodEnd) {
      currentPhase = 'Menstrual Phase';
      phaseDescription = 'Active uterine lining shedding. Progesterone and estrogen at baseline.';
      conceptionChance = 'Very Low';
      badgeColor = 'bg-rose-500/10 text-rose-600 border-rose-500/20';
    } else if (today.getTime() === currentCycle.ovulationDate.getTime()) {
      currentPhase = 'Ovulation Day (Peak Fertility)';
      phaseDescription = 'Mature egg released from dominant Graafian follicle. Highest conception probability.';
      conceptionChance = 'Peak (Highest)';
      badgeColor = 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    } else if (today >= currentCycle.fertileStart && today <= currentCycle.fertileEnd) {
      currentPhase = 'Fertile Window';
      phaseDescription = 'Sperm can survive up to 5 days in fertile cervical mucus waiting for ovulation.';
      conceptionChance = 'High';
      badgeColor = 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    } else if (today > currentCycle.ovulationDate) {
      currentPhase = 'Luteal Phase';
      phaseDescription = 'Corpus luteum produces progesterone. Pre-menstrual phase.';
      conceptionChance = 'Low';
      badgeColor = 'bg-purple-500/10 text-purple-600 border-purple-500/20';
    }

    // Next period calculation
    const upcomingPeriod = cycles.find(c => c.cycleStart > today) || cycles[1];
    const daysUntilNextPeriod = Math.ceil((upcomingPeriod.cycleStart - today) / (1000 * 60 * 60 * 24));

    return {
      cycles,
      currentCycle,
      currentCycleDay,
      currentPhase,
      phaseDescription,
      conceptionChance,
      badgeColor,
      upcomingPeriod,
      daysUntilNextPeriod
    };
  }, [lastPeriodDate, periodDuration, cycleLength, lutealPhase]);

  // ----------------------------------------------------
  // Calendar Grid Builder for the View Month
  // ----------------------------------------------------
  const calendarMonthData = useMemo(() => {
    const year = viewMonthDate.getFullYear();
    const month = viewMonthDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();

    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      const dateObj = new Date(year, month, dayNum);
      dateObj.setHours(0, 0, 0, 0);

      let status = 'normal';
      let cycleDayNumber = null;
      let label = null;

      // Check against all projected cycles
      for (let c of cycleData.cycles) {
        if (dateObj >= c.cycleStart && dateObj < c.nextCycleStart) {
          const cDay = Math.floor((dateObj - c.cycleStart) / (1000 * 60 * 60 * 24)) + 1;
          cycleDayNumber = cDay;
        }

        if (dateObj >= c.cycleStart && dateObj <= c.periodEnd) {
          status = 'period';
          const pDay = Math.floor((dateObj - c.cycleStart) / (1000 * 60 * 60 * 24)) + 1;
          label = `Day ${pDay}`;
          break;
        } else if (dateObj.getTime() === c.ovulationDate.getTime()) {
          status = 'ovulation';
          label = 'Ovulation';
          break;
        } else if (dateObj >= c.fertileStart && dateObj <= c.fertileEnd) {
          status = 'fertile';
          label = 'Fertile';
          break;
        }
      }

      const isToday = dateObj.getTime() === today.getTime();

      days.push({
        dayNum,
        dateObj,
        status,
        label,
        cycleDayNumber,
        isToday
      });
    }

    return {
      firstDayIndex,
      totalDaysInMonth,
      days,
      monthName: viewMonthDate.toLocaleString('default', { month: 'long', year: 'numeric' })
    };
  }, [viewMonthDate, cycleData]);

  // Month navigation
  const prevMonth = () => {
    setViewMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setViewMonthDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const jumpToToday = () => {
    const today = new Date();
    setViewMonthDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  // Quick Preset Handlers
  const setPresetDate = (daysAgo) => {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    setLastPeriodDate(d.toISOString().split('T')[0]);
  };

  const copySummary = () => {
    const text = `🌸 My Menstrual Cycle & Ovulation Forecast (Daily Science News)
Next Expected Period: ${cycleData.upcomingPeriod.cycleStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} (${cycleData.daysUntilNextPeriod} days away)
Estimated Ovulation: ${cycleData.currentCycle.ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
Fertile Window: ${cycleData.currentCycle.fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${cycleData.currentCycle.fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
Average Cycle Length: ${cycleLength} days
Period Duration: ${periodDuration} days
Calculated via: https://sciencenewshub.click/period-calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // ----------------------------------------------------
  // Schema.org Structured Data
  // ----------------------------------------------------
  const pageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Scientific Period Calculator & Ovulation Calendar",
        "url": "https://sciencenewshub.click/period-calculator",
        "applicationCategory": "HealthApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Evidence-based menstrual cycle calculator estimating future period dates, fertile windows, peak ovulation days, and dysmenorrhea pain management."
      },
      {
        "@type": "MedicalWebPage",
        "name": "Period Calculator, Ovulation Prediction & Menstrual Pain Relief Protocol",
        "url": "https://sciencenewshub.click/period-calculator",
        "about": [
          { "@type": "MedicalCondition", "name": "Dysmenorrhea" },
          { "@type": "MedicalSignOrSymptom", "name": "Menstrual Cramps" },
          { "@type": "MedicalProcedure", "name": "Ovulation Prediction" }
        ],
        "author": {
          "@type": "Organization",
          "name": "Daily Science News Medical Editorial Board",
          "url": "https://sciencenewshub.click"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I calculate my next period date accurately?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Identify Day 1 as the first day of full menstrual bleeding (not light spotting). Add your average cycle length (typically 28 days, normal range 21–35 days) to Day 1. For example, if your period started on May 1st with a 28-day cycle, your next period is expected on May 29th."
            }
          },
          {
            "@type": "Question",
            "name": "What is the most effective evidence-based relief for menstrual cramps (dysmenorrhea)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Over-the-counter NSAIDs (like ibuprofen or naproxen) target the root cause of dysmenorrhea by inhibiting COX enzymes and reducing prostaglandins. Applying heat therapy (heating pad or warm bath at 40°C) relaxes uterine muscles. Gentle yoga (Child's Pose, Cat-Cow) and ginger tea provide proven complementary relief."
            }
          },
          {
            "@type": "Question",
            "name": "When does ovulation typically occur in a menstrual cycle?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ovulation occurs approximately 14 days before the start of the next menstrual period (during the luteal phase). In a 28-day cycle, this is around Day 14. In a 32-day cycle, ovulation happens around Day 18."
            }
          },
          {
            "@type": "Question",
            "name": "When should you consult a doctor for period pain or irregular bleeding?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Consult a healthcare provider if period pain is severe enough to disrupt daily life, worsens progressively, is accompanied by soaking through a pad/tampon every hour, or occurs with painful intercourse or pelvic pain between periods, which can indicate endometriosis, fibroids, or adenomyosis."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <SEOHead 
        title="Period Calculator & Ovulation Calendar - Scientific Cycle & Fertility Tracker"
        description="Calculate future period days, peak ovulation date, and fertile windows with our interactive 2026 calendar. Includes evidence-based menstrual cramp (dysmenorrhea) relief and clinical guides."
        keywords="period calculator, menses calculator, ovulation calculator, menstrual cycle tracker, fertile window calculator, period pain relief, dysmenorrhea treatment, next period date"
        canonicalUrl="https://sciencenewshub.click/period-calculator"
        ogType="website"
        schema={pageSchema}
      />

      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-5xl space-y-12">
        
        {/* ======================================================== */}
        {/* HERO TITLE SECTION */}
        {/* ======================================================== */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold tracking-wide uppercase border border-rose-500/20">
            <Droplets size={14} /> 2026 Interactive Clinical Utility
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Period &amp; Ovulation Calculator
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Estimate future menstrual cycle dates, peak ovulation days, and fertile windows using clinical reproductive medicine algorithms and ACOG-standard cycle modeling.
          </p>
        </section>

        {/* ======================================================== */}
        {/* MAIN CALCULATOR & CALENDAR CONTAINER */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Input Configuration Card (4 Cols on LG) */}
          <section className="lg:col-span-5 bg-card border rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2 font-bold text-base text-foreground">
                <CalendarIcon className="h-5 w-5 text-rose-500" />
                <span>Cycle Parameters</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setLastPeriodDate(getInitialDateString());
                  setPeriodDuration(5);
                  setCycleLength(28);
                  setLutealPhase(14);
                }}
                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                title="Reset to clinical defaults"
              >
                <RefreshCw size={13} /> Reset
              </button>
            </div>

            {/* Parameter 1: First Day of Last Period */}
            <div className="space-y-2.5">
              <label className="text-sm font-semibold text-foreground flex items-center justify-between">
                <span>First Day of Your Last Period:</span>
                <span className="text-xs text-muted-foreground font-normal">Day 1 of bleeding</span>
              </label>

              <input 
                type="date" 
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border bg-background text-foreground text-sm font-medium focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 transition-all outline-none"
              />

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-muted-foreground self-center mr-1">Quick set:</span>
                <button
                  type="button"
                  onClick={() => setPresetDate(7)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  1 wk ago
                </button>
                <button
                  type="button"
                  onClick={() => setPresetDate(14)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  2 wks ago
                </button>
                <button
                  type="button"
                  onClick={() => setPresetDate(21)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  3 wks ago
                </button>
                <button
                  type="button"
                  onClick={() => setPresetDate(28)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-muted/70 hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  4 wks ago
                </button>
              </div>
            </div>

            {/* Parameter 2: Bleeding Duration */}
            <div className="space-y-2.5 pt-2 border-t">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  How long did it last?
                </label>
                <span className="text-sm font-black text-rose-500 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  {periodDuration} {periodDuration === 1 ? 'day' : 'days'}
                </span>
              </div>

              <input 
                type="range"
                min="1"
                max="10"
                step="1"
                value={periodDuration}
                onChange={(e) => setPeriodDuration(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer h-2 bg-muted rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>1 day</span>
                <span className="font-semibold text-foreground">Average: 4–6 days</span>
                <span>10 days</span>
              </div>
            </div>

            {/* Parameter 3: Average Cycle Length */}
            <div className="space-y-2.5 pt-2 border-t">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">
                  Average Length of Cycles:
                </label>
                <span className="text-sm font-black text-amber-500 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  {cycleLength} days
                </span>
              </div>

              <input 
                type="range"
                min="21"
                max="45"
                step="1"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-muted rounded-lg"
              />

              {/* Cycle length chips */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                {[24, 26, 28, 30, 32].map((len) => (
                  <button
                    key={len}
                    type="button"
                    onClick={() => setCycleLength(len)}
                    className={`py-1 text-xs rounded-lg font-medium transition-all ${
                      cycleLength === len 
                        ? 'bg-amber-500 text-white shadow-sm' 
                        : 'bg-muted/70 hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {len} d
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-muted-foreground leading-normal">
                {cycleLength >= 21 && cycleLength <= 35 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                    <CheckCircle2 size={12} /> Within regular physiological range (21–35 days)
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1">
                    <AlertCircle size={12} /> Outside standard 21–35 day range; cycle may be irregular
                  </span>
                )}
              </p>
            </div>

            {/* Advanced Toggle: Luteal Phase Duration */}
            <div className="pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground flex items-center justify-between w-full py-1"
              >
                <span>Advanced Ovulation Settings</span>
                {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>

              {showAdvanced && (
                <div className="mt-3 p-3.5 rounded-2xl bg-muted/40 space-y-2 border">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span>Luteal Phase Duration:</span>
                    <span className="text-primary font-bold">{lutealPhase} days</span>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="16"
                    step="1"
                    value={lutealPhase}
                    onChange={(e) => setLutealPhase(Number(e.target.value))}
                    className="w-full accent-primary cursor-pointer h-1.5 bg-muted rounded-lg"
                  />
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    Standard luteal phase is constant at 14 days across most women.
                  </p>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={copySummary}
                className="flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-muted transition-all active:scale-95"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Forecast'}</span>
              </button>
            </div>
          </section>

          {/* RIGHT COLUMN: Interactive Calendar & Forecast Dashboard (7 Cols on LG) */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* KPI Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              
              {/* Card 1: Next Period */}
              <div className="p-4 rounded-2xl bg-card border shadow-sm space-y-1 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500">
                  <Droplets size={14} /> Next Period
                </div>
                <div className="text-base sm:text-lg font-black text-foreground">
                  {cycleData.upcomingPeriod.cycleStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  In {cycleData.daysUntilNextPeriod} {cycleData.daysUntilNextPeriod === 1 ? 'day' : 'days'}
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-rose-500/5 rounded-bl-full pointer-events-none" />
              </div>

              {/* Card 2: Peak Ovulation */}
              <div className="p-4 rounded-2xl bg-card border shadow-sm space-y-1 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-500">
                  <Sparkles size={14} /> Peak Ovulation
                </div>
                <div className="text-base sm:text-lg font-black text-foreground">
                  {cycleData.currentCycle.ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  Egg release window
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-amber-500/5 rounded-bl-full pointer-events-none" />
              </div>

              {/* Card 3: Fertile Window */}
              <div className="p-4 rounded-2xl bg-card border shadow-sm space-y-1 col-span-2 sm:col-span-1 relative overflow-hidden">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-500">
                  <Heart size={14} /> Fertile Window
                </div>
                <div className="text-sm sm:text-base font-black text-foreground">
                  {cycleData.currentCycle.fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {cycleData.currentCycle.fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                  6-day conception span
                </div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
              </div>

            </div>

            {/* Current Phase Status Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${cycleData.badgeColor}`}>
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                  Today's Cycle Status
                </span>
                <span className="text-sm sm:text-base font-extrabold block">
                  Cycle Day {cycleData.currentCycleDay} • {cycleData.currentPhase}
                </span>
                <span className="text-xs opacity-85 block">
                  {cycleData.phaseDescription}
                </span>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-background/80 shadow-sm border shrink-0 text-foreground">
                Conception: {cycleData.conceptionChance}
              </span>
            </div>

            {/* TAB CONTROLS (Calendar vs 6-Month Schedule) */}
            <div className="flex items-center border-b justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('calendar')}
                  className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'calendar' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <CalendarIcon size={15} /> Calendar View
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('schedule')}
                  className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                    activeTab === 'schedule' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Clock size={15} /> 6-Month Forecast
                </button>
              </div>

              {activeTab === 'calendar' && (
                <button
                  type="button"
                  onClick={jumpToToday}
                  className="text-xs font-bold text-primary hover:underline pb-3"
                >
                  Today
                </button>
              )}
            </div>

            {/* ==================================================== */}
            {/* TAB 1: VISUAL INTERACTIVE CALENDAR (SCREENSHOT MATCH) */}
            {/* ==================================================== */}
            {activeTab === 'calendar' && (
              <div className="bg-card border rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                
                {/* Calendar Legend Bar (Matches user's screenshot) */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b text-xs">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
                      Period
                    </span>
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-500 inline-block"></span>
                      Fertile Window
                    </span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Sparkles size={13} className="text-amber-500" />
                      Ovulation Day
                    </span>
                  </div>

                  {/* Month Switcher Controls */}
                  <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-all"
                      aria-label="Previous Month"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="text-xs font-bold px-2 text-foreground min-w-[110px] text-center">
                      {calendarMonthData.monthName}
                    </span>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="p-1 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-all"
                      aria-label="Next Month"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Day of Week Headers */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center text-[11px] font-black tracking-wider text-muted-foreground uppercase py-1">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Calendar Date Cells Grid */}
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {/* Empty filler cells before 1st of month */}
                  {Array.from({ length: calendarMonthData.firstDayIndex }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="h-14 sm:h-16 rounded-xl bg-muted/10 opacity-30" />
                  ))}

                  {/* Month Days */}
                  {calendarMonthData.days.map((day) => {
                    const isPeriod = day.status === 'period';
                    const isOvulation = day.status === 'ovulation';
                    const isFertile = day.status === 'fertile';

                    let cellBg = 'bg-card hover:bg-muted/40 border border-border/60 text-foreground';
                    let dayColor = 'text-foreground';
                    let badgeNode = null;

                    if (isPeriod) {
                      cellBg = 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300 shadow-sm';
                      dayColor = 'text-rose-700 dark:text-rose-300 font-black';
                      badgeNode = (
                        <div className="flex items-center gap-0.5 text-[10px] font-bold text-rose-600 dark:text-rose-400">
                          <Droplets size={11} className="fill-rose-500 text-rose-500" />
                          <span>{day.label}</span>
                        </div>
                      );
                    } else if (isOvulation) {
                      cellBg = 'bg-amber-500/20 border-amber-500 shadow-md ring-2 ring-amber-400/40 text-amber-900 dark:text-amber-100';
                      dayColor = 'text-amber-900 dark:text-amber-100 font-black';
                      badgeNode = (
                        <div className="flex items-center gap-0.5 text-[9px] font-extrabold px-1 py-0.5 rounded-full bg-amber-400 text-amber-950">
                          <Sparkles size={9} />
                          <span>Peak</span>
                        </div>
                      );
                    } else if (isFertile) {
                      cellBg = 'bg-amber-500/10 border-amber-400/50 text-amber-800 dark:text-amber-300';
                      dayColor = 'text-amber-800 dark:text-amber-300 font-bold';
                      badgeNode = (
                        <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                          Fertile
                        </span>
                      );
                    }

                    return (
                      <div
                        key={day.dayNum}
                        className={`h-14 sm:h-16 rounded-2xl p-1.5 flex flex-col justify-between transition-all relative ${cellBg} ${
                          day.isToday ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className={`text-xs sm:text-sm ${dayColor}`}>
                            {day.dayNum}
                          </span>
                          {day.isToday && (
                            <span className="text-[8px] font-black uppercase px-1 py-0.2 rounded bg-primary text-primary-foreground">
                              Today
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col items-center">
                          {badgeNode}
                          {day.cycleDayNumber && !isPeriod && (
                            <span className="text-[9px] text-muted-foreground opacity-60">
                              c.{day.cycleDayNumber}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footnote on Accuracy */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-muted-foreground border-t">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    Predictions based on regular {cycleLength}-day cycle model
                  </span>
                  <span>ACOG Medical Guidance</span>
                </div>

              </div>
            )}

            {/* ==================================================== */}
            {/* TAB 2: 6-MONTH FORWARD PROJECTION SCHEDULE */}
            {/* ==================================================== */}
            {activeTab === 'schedule' && (
              <div className="bg-card border rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground">
                    Projected 6-Month Menstrual Timeline
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Expected dates for upcoming cycles based on your current cycle parameters.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/40 text-muted-foreground font-bold uppercase text-[10px]">
                        <th className="p-3">Cycle #</th>
                        <th className="p-3">Period Start (Day 1)</th>
                        <th className="p-3">Bleeding Range</th>
                        <th className="p-3">Fertile Window</th>
                        <th className="p-3">Peak Ovulation</th>
                        <th className="p-3">Due Date if Conceived</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {cycleData.cycles.map((c) => (
                        <tr key={c.cycleIndex} className="hover:bg-muted/20 transition-colors">
                          <td className="p-3 font-bold text-foreground">Cycle {c.cycleIndex}</td>
                          <td className="p-3 font-semibold text-rose-600 dark:text-rose-400">
                            {c.cycleStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {c.cycleStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {c.periodEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="p-3 font-medium text-amber-600 dark:text-amber-400">
                            {c.fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {c.fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="p-3 font-bold text-amber-500">
                            {c.ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {c.estimatedDueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 rounded-2xl bg-muted/40 text-xs text-muted-foreground flex items-start gap-2">
                  <Info size={16} className="text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong>Clinical Note:</strong> Cycle lengths can vary naturally from month to month due to stress, travel, illness, or hormonal shifts. These calendar predictions are mathematical estimates and should not be used as a primary contraceptive method.
                  </span>
                </div>
              </div>
            )}

          </section>

        </div>

        {/* ======================================================== */}
        {/* COMPREHENSIVE MEDICAL & CLINICAL SEO KNOWLEDGE BASE */}
        {/* ======================================================== */}
        <section className="space-y-12 border-t pt-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={14} /> Clinical Review &amp; Educational Guide
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Evidence-Based Menstrual Health &amp; Cycle Science
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Detailed physiological breakdown of the female reproductive cycle, hormonal interplay, evidence-based dysmenorrhea relief, and fertility window biology reviewed against American College of Obstetricians and Gynecologists (ACOG) and NHS guidelines.
            </p>
          </div>

          {/* ==================================================== */}
          {/* SECTION 1: MENSTRUAL CYCLE PHASES & IMAGE 1 */}
          {/* ==================================================== */}
          <article className="bg-card border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                Reproductive Biology • Core Physiology
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground">
                The Four Phases of the Menstrual Cycle &amp; Hormonal Feedback
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The menstrual cycle is a continuous, exquisitely orchestrated hormonal feedback loop regulated by the hypothalamic-pituitary-ovarian (HPO) axis. While the average cycle length is 28 days, physiological variation between 21 and 35 days is clinically normal.
              </p>
            </div>

            {/* EMBEDDED IMAGE 1 */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border shadow-md bg-muted">
                <img 
                  src="/assets/images/menstrual-cycle-phases-ovulation-chart.jpg" 
                  alt="Medical Infographic of Menstrual Cycle Phases showing Hormonal Changes, Ovarian Cycle, and Uterine Endometrium Changes"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center italic">
                Figure 1: Complete physiological map of the human menstrual cycle, illustrating fluctuating pituitary gonadotropins (FSH, LH), ovarian steroids (Estrogen, Progesterone), and structural endometrial remodeling across 28 days.
              </p>
            </div>

            {/* 4 Phases Breakdown Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-muted/30 border space-y-2">
                <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  1. Menstrual Phase (Days 1–5)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Triggered by the rapid involution of the corpus luteum and subsequent drop in progesterone. The functional layer of the endometrium sheds through the cervix and vagina. Bleeding typically lasts 2 to 7 days, with average blood loss of 30 to 40 mL.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border space-y-2">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  2. Follicular Phase (Days 6–13)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Pituitary follicle-stimulating hormone (FSH) promotes the recruitment and maturation of ovarian follicles. A single dominant Graafian follicle emerges, secreting increasing amounts of estradiol to rebuild the uterine lining (proliferative phase).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border space-y-2">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  3. Ovulation Phase (Day 14 ± 2)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Sustained peak estradiol triggers positive feedback on the pituitary, unleashing the massive Luteinizing Hormone (LH) surge. Within 24 to 36 hours, the dominant follicle ruptures, expelling the secondary oocyte into the fallopian tube. The egg remains viable for 12 to 24 hours.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border space-y-2">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  4. Luteal Phase (Days 15–28)
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The ruptured follicle collapses into the corpus luteum, producing large quantities of progesterone and moderate estrogen. Progesterone converts the endometrium into a nutrient-rich, secretory state primed for blastocyst implantation. If unfertilized, the cycle resets.
                </p>
              </div>
            </div>
          </article>

          {/* ==================================================== */}
          {/* SECTION 2: EVIDENCE-BASED DYSMENORRHEA PAIN RELIEF */}
          {/* ==================================================== */}
          <article className="bg-card border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">
                Clinical Therapeutics • Pain Management
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground">
                Relieving Period Pain (Dysmenorrhea): Evidence-Based Treatment Protocol
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Primary dysmenorrhea (menstrual cramping without underlying pelvic pathology) affects up to 90% of reproductive-age individuals. It is mediated by excessive endometrial prostaglandin production (specifically PGF2α), which induces severe uterine myometrial hypercontractility and ischemia.
              </p>
            </div>

            {/* EMBEDDED IMAGE 2 */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border shadow-md bg-muted">
                <img 
                  src="/assets/images/period-pain-relief-treatments-guide.jpg" 
                  alt="Infographic of Period Pain Dysmenorrhea Relief: Heat Therapy, Over-the-counter NSAIDs, Gentle Movement and Yoga, Anti-inflammatory Nutrition and Herbal Teas"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center italic">
                Figure 2: Four-pillar multi-modal treatment strategy for dysmenorrhea: Topical continuous heat application, targeted prostaglandin inhibition via NSAIDs, gentle pelvic decompression yoga, and anti-inflammatory phytomedicines.
              </p>
            </div>

            {/* 4 Treatment Pillars in Depth */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Pillar 1: NSAIDs */}
              <div className="p-6 rounded-2xl bg-muted/30 border space-y-3">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-base">
                  <Pill size={18} />
                  <span>1. Over-the-Counter (OTC) NSAIDs</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Mechanism:</strong> Nonsteroidal anti-inflammatory drugs (e.g., Ibuprofen 400–600 mg every 6 hours, or Naproxen sodium 220–440 mg every 12 hours) inhibit the cyclooxygenase (COX-1 and COX-2) enzymes, halting the enzymatic conversion of arachidonic acid into pain-inducing prostaglandins.
                </p>
                <div className="p-3 rounded-xl bg-background border text-[11px] text-muted-foreground space-y-1">
                  <strong>Clinical Timing:</strong> Initiate NSAID therapy 1 to 2 days prior to anticipated menstruation or immediately at the first sign of bleeding/cramping before prostaglandin accumulation peaks.
                </div>
              </div>

              {/* Pillar 2: Heat Therapy */}
              <div className="p-6 rounded-2xl bg-muted/30 border space-y-3">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-base">
                  <Flame size={18} />
                  <span>2. Continuous Heat Therapy</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Mechanism:</strong> Applying a localized heating pad, thermal abdominal patch, or soaking in a warm bath (approx. 40°C / 104°F) stimulates cutaneous thermoreceptors to block spinal pain signals (Gate Control Theory) and promotes local pelvic vasodilation, relieving uterine muscle hypoxia.
                </p>
                <div className="p-3 rounded-xl bg-background border text-[11px] text-muted-foreground space-y-1">
                  <strong>Comparative Efficacy:</strong> Multiple randomized clinical trials have shown continuous low-level topical heat is as effective as standard doses of ibuprofen for acute cramp reduction.
                </div>
              </div>

              {/* Pillar 3: Gentle Movement & Yoga */}
              <div className="p-6 rounded-2xl bg-muted/30 border space-y-3">
                <div className="flex items-center gap-2 text-blue-500 font-bold text-base">
                  <Activity size={18} />
                  <span>3. Gentle Movement &amp; Restorative Yoga</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Mechanism:</strong> Light aerobic exercise (brisk walking, swimming) releases circulating beta-endorphins, which bind to mu-opioid receptors in the central nervous system to attenuate nociceptive perception.
                </p>
                <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong>Child’s Pose (Balasana):</strong> Lengthens the sacral spine and relieves pelvic floor muscle spasm.</li>
                  <li><strong>Cat-Cow (Marjaryasana-Bitilasana):</strong> Enhances lumbo-pelvic circulation and decompresses spinal nerves.</li>
                  <li><strong>Cobra Pose (Bhujangasana):</strong> Gently stretches tight abdominal fascia.</li>
                </ul>
              </div>

              {/* Pillar 4: Herbal Teas & Anti-Inflammatory Diet */}
              <div className="p-6 rounded-2xl bg-muted/30 border space-y-3">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-base">
                  <Coffee size={18} />
                  <span>4. Herbal Infusions &amp; Anti-Inflammatory Diet</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Phytotherapy:</strong> Systematic reviews demonstrate that ginger powder (750–2,000 mg/day or fresh ginger tea) possesses significant anti-inflammatory properties comparable to ibuprofen in randomized trials.
                </p>
                <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside">
                  <li><strong>Chamomile &amp; Fennel Tea:</strong> Rich in antispasmodic compounds (apigenin, anethole) that relax smooth muscle fibers.</li>
                  <li><strong>Magnesium &amp; Omega-3:</strong> Dietary magnesium (300 mg/day) relaxes myometrial smooth muscle; EPA/DHA fatty acids displace arachidonic acid from cell membranes.</li>
                </ul>
              </div>

            </div>
          </article>

          {/* ==================================================== */}
          {/* SECTION 3: FERTILE WINDOW & CONCEPTION SCIENCE */}
          {/* ==================================================== */}
          <article className="bg-card border rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                Fertility Science • Conception Probability
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-foreground">
                The Biological Fertile Window: Ovulation &amp; Conception Timing
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The physiological "fertile window" spans approximately 6 days: the 5 days preceding ovulation plus the day of ovulation itself. This clinical window is dictated by human gamete lifespans in the female reproductive tract.
              </p>
            </div>

            {/* EMBEDDED IMAGE 3 */}
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden border shadow-md bg-muted">
                <img 
                  src="/assets/images/fertile-window-ovulation-calendar-conception.jpg" 
                  alt="Educational Medical Infographic of Fertile Window and Ovulation Day showing 5-day sperm viability, ovulation peak, and conception probability curve"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center italic">
                Figure 3: Conception probability curve across the menstrual cycle. Peak fertility occurs on the two days immediately preceding ovulation and the day of ovulation, driven by fertile cervical mucus and sperm longevity.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-muted/30 border space-y-2">
                <span className="text-xs font-bold text-foreground block">
                  Sperm Longevity (Up to 5 Days)
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Under the influence of high pre-ovulatory estrogen, cervical crypts produce clear, stretchy, alkaline mucus (spinnbarkeit) that nourishes and shields spermatozoa, allowing them to remain viable in the fallopian tubes for 3 to 5 days.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border space-y-2">
                <span className="text-xs font-bold text-foreground block">
                  Oocyte Viability (12–24 Hours)
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Following follicle rupture, the unfertilized secondary oocyte degenerates within 12 to 24 hours. Because the egg's lifespan is brief, viable sperm must already be stationed in the ampulla of the fallopian tube when ovulation occurs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-muted/30 border space-y-2">
                <span className="text-xs font-bold text-foreground block">
                  Pregnancy Testing Timing
                </span>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Implantation occurs 6 to 12 days post-ovulation (most commonly 8–10 days). Home urine pregnancy tests detect human chorionic gonadotropin (hCG), which is most reliable on or after the first day of an expected missed period.
                </p>
              </div>
            </div>
          </article>

          {/* ==================================================== */}
          {/* SECTION 4: RED FLAGS & WHEN TO CONSULT A DOCTOR */}
          {/* ==================================================== */}
          <article className="p-6 sm:p-8 rounded-3xl bg-rose-500/5 border border-rose-500/20 space-y-6">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-base">
              <AlertCircle size={20} />
              <span>When to See a Physician: Clinical Red Flags &amp; Secondary Dysmenorrhea</span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              While mild-to-moderate cramping and cyclical mood changes are common, severe menstrual pain or abnormal uterine bleeding can signal underlying gynecological conditions that require specialized diagnostic evaluation. Consult an obstetrician-gynecologist (OB/GYN) if you experience:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-foreground">
              <div className="p-3.5 rounded-xl bg-background border flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Severe, Incapacitating Pain:</strong> Pain that is unresponsive to maximum OTC NSAID doses or prevents school/work attendance.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Heavy Menstrual Bleeding (Menorrhagia):</strong> Soaking through one or more sanitary pads or tampons every hour for two consecutive hours.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Intermenstrual Bleeding:</strong> Spotting, bleeding after sexual intercourse, or unpredictable bleeding between regular cycles.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Dyspareunia &amp; Chronic Pelvic Pain:</strong> Pain during sexual intercourse or persistent lower abdominal pain outside menstruation.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Progressive Worsening:</strong> Menstrual cramps that worsen markedly over time in individuals over age 25.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-background border flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Systemic Symptoms:</strong> Fever, chills, unusual foul-smelling vaginal discharge, or signs of pelvic infection (PID).</span>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground italic border-t pt-3">
              *Potential underlying secondary etiologies include Endometriosis, Adenomyosis, Uterine Leiomyomas (Fibroids), Endometrial Polyps, and Pelvic Inflammatory Disease. Early clinical diagnosis significantly prevents chronic pelvic morbidity.
            </p>
          </article>

          {/* ==================================================== */}
          {/* SECTION 5: INTERACTIVE ACCORDION FAQS */}
          {/* ==================================================== */}
          <article className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-foreground">
                Frequently Asked Questions (FAQ)
              </h3>
              <p className="text-xs text-muted-foreground">
                Common questions regarding period tracking, ovulation calculations, and cycle variability.
              </p>
            </div>

            <div className="space-y-2">
              {[
                {
                  q: 'How do I calculate my cycle length manually?',
                  a: 'Identify Day 1 as the first day of actual full menstrual bleeding (not light pre-period spotting). Count every day starting from Day 1 up to the day before your next period begins. For greatest accuracy, record this count for at least 3 consecutive cycles, sum them together, and divide by 3 to calculate your rolling average cycle length.'
                },
                {
                  q: 'Can I get pregnant right before or during my menstrual period?',
                  a: 'While the probability is very low for individuals with regular 28-day cycles, it is physiologically possible—especially in individuals with short cycles (e.g., 21–24 days). In a 21-day cycle, ovulation occurs around Day 7. Because viable sperm can survive in cervical mucus for up to 5 days, intercourse during the late days of menstruation could lead to conception.'
                },
                {
                  q: 'Why is my period late if my pregnancy test is negative?',
                  a: 'A late period is technically defined as 8 or more days past expected arrival. Non-pregnancy causes include psychological or physical stress (elevated cortisol suppresses hypothalamic GnRH), acute illness, significant caloric restriction, intense athletic training, thyroid disorders, and hormonal imbalances like Polycystic Ovary Syndrome (PCOS).'
                },
                {
                  q: 'What is the difference between primary and secondary dysmenorrhea?',
                  a: 'Primary dysmenorrhea is recurrent menstrual cramping caused solely by normal uterine prostaglandins without any identifiable pelvic pathology, typically beginning in adolescence. Secondary dysmenorrhea is menstrual pain caused by a structural or medical condition, such as endometriosis, adenomyosis, or uterine fibroids, and often begins later in life.'
                },
                {
                  q: 'Can online period calculators be used as birth control?',
                  a: 'No. Calendar-based period calculators and ovulation algorithms provide statistical estimates based on past averages. Because natural biological cycle lengths fluctuate due to stress, travel, or hormone variations, calendar predictions alone are not a reliable contraceptive method.'
                },
                {
                  q: 'Why do I experience fatigue and mood swings before my period?',
                  a: 'Premenstrual symptoms (PMS) and Premenstrual Dysphoric Disorder (PMDD) are driven by the rapid post-ovulatory drop in estrogen and progesterone during the late luteal phase. This hormonal decline directly affects central neurotransmitters, particularly serotonin and GABA, leading to irritability, food cravings, and fatigue.'
                }
              ].map((faq, idx) => (
                <div key={idx} className="border rounded-2xl bg-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-3 hover:bg-muted/40 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={16} className={`shrink-0 transition-transform ${activeFaq === idx ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t bg-muted/10">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </article>

          {/* ==================================================== */}
          {/* SECTION 6: CLINICAL CITATIONS & E-E-A-T SOURCES */}
          {/* ==================================================== */}
          <article className="p-6 rounded-3xl bg-muted/30 border space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
              <FileText size={15} /> Clinical Guidelines &amp; Academic References
            </div>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside leading-relaxed">
              <li>American College of Obstetricians and Gynecologists (ACOG). <em>Abnormal Uterine Bleeding &amp; Dysmenorrhea Clinical Practice Guidelines</em>.</li>
              <li>National Institute of Child Health and Human Development (NICHD). <em>Menstruation and Menstrual Cycle Physiology</em>.</li>
              <li>Cleveland Clinic Health Library. <em>Dysmenorrhea (Menstrual Cramps): Symptoms, Causes &amp; Pain Management</em>.</li>
              <li>Mayo Clinic. <em>Menstrual cycle: What's normal, what's not &amp; Fertility Window Calculations</em>.</li>
              <li>National Health Service (NHS UK). <em>Period pain (dysmenorrhea) and menstrual health protocols</em>.</li>
              <li>Daily et al. <em>Efficacy of Ginger for Alleviating the Symptoms of Primary Dysmenorrhea: A Systematic Review and Meta-analysis of Randomized Clinical Trials</em>. Pain Medicine.</li>
            </ul>
          </article>

        </section>

      </main>

      <Footer />
    </div>
  );
}
