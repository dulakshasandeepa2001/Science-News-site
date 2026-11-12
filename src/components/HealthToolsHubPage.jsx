import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { 
  Scale, 
  Activity, 
  HeartPulse, 
  Sparkles, 
  Calculator, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  Flame, 
  Ruler, 
  Stethoscope,
  Info
} from 'lucide-react';

export default function HealthToolsHubPage() {
  const tools = [
    {
      id: 'bmi-calculator',
      title: 'Smart BMI & Body Roundness Index (BRI) Calculator',
      badge: '2026 Interactive • Active',
      status: 'active',
      path: '/bmi-calculator',
      icon: Scale,
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20',
      description: 'Comprehensive body composition calculator supporting Metric and Imperial units, Ponderal Index, WHO Asian cutoffs, and FDA GLP-1 weight loss medication eligibility screening (Ozempic/Wegovy).',
      features: [
        'Real-time Metric (kg/cm) & Imperial (lbs/ft-in) calculation',
        'Live color gauge meter with animated indicator needle',
        'Body Roundness Index (BRI) & Waist-to-Height Ratio (WHtR)',
        'Optimal healthy weight range & weight difference deficit',
        'GLP-1 (Ozempic/Wegovy) & Bariatric clinical screening checklist'
      ],
      ctaText: 'Launch BMI & BRI Calculator'
    },
    {
      id: 'bmr-calculator',
      title: 'Basal Metabolic Rate (BMR) & TDEE Calculator',
      badge: 'Coming Soon',
      status: 'upcoming',
      path: '/bmi-calculator', // fallback to tools
      icon: Flame,
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      description: 'Determine your resting metabolic rate and total daily energy expenditure based on the revised Harris-Benedict and Mifflin-St Jeor clinical equations.',
      features: [
        'Mifflin-St Jeor physiological metabolic formula',
        'Activity multiplier for sedentary to extreme training',
        'Daily calorie deficit estimation for fat loss',
        'Macronutrient energy ratio breakdowns (Protein, Carbs, Fats)'
      ],
      ctaText: 'Use Within BMI Tool'
    },
    {
      id: 'whtr-screener',
      title: 'Waist-to-Height Ratio (WHtR) Visceral Fat Screener',
      badge: 'Integrated into BMI Tool',
      status: 'integrated',
      path: '/bmi-calculator',
      icon: Ruler,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      description: 'Central adiposity screening tool used by cardiologist associations to assess hidden visceral organ fat and early cardiovascular risk markers.',
      features: [
        'Simple "Keep Your Waist to Less Than Half Your Height" metric',
        'Visceral abdominal adipose tissue risk stratification',
        'Direct correlation with early insulin resistance',
        'Fully integrated into our 2026 Smart Health Calculator'
      ],
      ctaText: 'Calculate on Smart Tool'
    }
  ];

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Scientific Health & Clinical Tools Directory",
    "url": "https://sciencenewshub.click/health-tools",
    "description": "Evidence-based clinical health calculators, body mass index tools, and metabolic assessment utilities published by Daily Science News.",
    "publisher": {
      "@type": "Organization",
      "name": "Daily Science News",
      "url": "https://sciencenewshub.click"
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <SEOHead 
        title="Health Tools Directory - Interactive Scientific & Clinical Calculators"
        description="Explore free, peer-reviewed health calculators including our 2026 Smart BMI & Body Roundness Index (BRI) Calculator, metabolic screening tools, and clinical assessment utilities."
        keywords="health tools, clinical calculators, bmi calculator, body roundness index calculator, bri calculator, health utilities, medical calculators, science tools"
        canonicalUrl="https://sciencenewshub.click/health-tools"
        ogType="website"
        schema={hubSchema}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-14 max-w-6xl space-y-12">
        
        {/* Hub Hero Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wide uppercase">
            <Activity size={14} /> Clinical Utilities &amp; Health Directory
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Interactive Health &amp; Science Tools
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Select an interactive clinical tool below to calculate personalized biometric data, analyze body composition markers, and evaluate medical health thresholds based on WHO and CDC standards.
          </p>
        </section>

        {/* Directory Grid of Tool Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const IconComponent = tool.icon;
            const isLive = tool.status === 'active';

            return (
              <div 
                key={tool.id} 
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-3xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300 group relative overflow-hidden ${
                  isLive ? 'border-emerald-500/30 hover:border-emerald-500/60' : 'hover:border-primary/40'
                }`}
              >
                {/* Top Header & Icon */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className={`p-3.5 rounded-2xl border transition-colors ${tool.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      isLive 
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30' 
                        : 'bg-muted text-muted-foreground border'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <div className="pt-2 border-t space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
                      Core Capabilities
                    </span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {tool.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 mt-4 border-t">
                  <Link
                    to={tool.path}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
                      isLive
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md'
                        : 'bg-muted text-foreground hover:bg-muted/80 border'
                    }`}
                  >
                    <span>{tool.ctaText}</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            );
          })}
        </section>

        {/* E-E-A-T Clinical Standards Banner */}
        <section className="p-6 sm:p-8 rounded-3xl bg-muted/40 border space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <ShieldCheck size={18} /> Evidence-Based Methodology &amp; Clinical Sources
          </div>
          
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            All calculations and screening algorithms deployed in the Daily Science News Health Tools directory are constructed in strict alignment with peer-reviewed medical literature, including clinical guidance from the <strong>World Health Organization (WHO)</strong>, the <strong>Centers for Disease Control and Prevention (CDC)</strong>, the <strong>National Institutes of Health (NIH)</strong>, and published findings in <em>JAMA Network Open</em>.
          </p>

          <div className="flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" /> Free &amp; Zero Registration Required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" /> Private (Calculations Run Locally in Browser)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-500" /> Regularly Updated to 2026 Guidelines
            </span>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
