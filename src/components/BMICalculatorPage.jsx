import React, { useState, useId } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { 
  Scale, 
  Calculator, 
  HeartPulse, 
  Activity, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Share2, 
  Stethoscope, 
  Pill, 
  RefreshCw, 
  ShieldCheck
} from 'lucide-react';

export default function BMICalculatorPage() {
  const ageInputId = useId();
  const heightCmInputId = useId();
  const weightKgInputId = useId();
  const waistCmInputId = useId();
  const heightFtInputId = useId();
  const heightInInputId = useId();
  const weightLbsInputId = useId();
  const waistInInputId = useId();

  // Unit System: 'metric' | 'imperial'
  const [unitSystem, setUnitSystem] = useState('metric');
  
  // Demographics
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState('male'); // 'male' | 'female'
  const [useAsianCriteria, setUseAsianCriteria] = useState(false);
  const [isAthlete, setIsAthlete] = useState(false);

  // Metric Inputs
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(70);
  const [waistCm, setWaistCm] = useState(82);

  // Imperial Inputs
  const [heightFt, setHeightFt] = useState(5);
  const [heightIn, setHeightIn] = useState(9);
  const [weightLbs, setWeightLbs] = useState(154);
  const [waistIn, setWaistIn] = useState(32);

  // Comorbidities for GLP-1 Clinical Evaluation
  const [hasHypertension, setHasHypertension] = useState(false);
  const [hasType2Diabetes, setHasType2Diabetes] = useState(false);
  const [hasHighCholesterol, setHasHighCholesterol] = useState(false);
  const [hasSleepApnea, setHasSleepApnea] = useState(false);

  // UI States
  const [copied, setCopied] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Calculations
  const getHeightInMeters = () => {
    if (unitSystem === 'metric') {
      return (Number(heightCm) || 170) / 100;
    }
    const totalInches = (Number(heightFt) || 0) * 12 + (Number(heightIn) || 0);
    return totalInches * 0.0254;
  };

  const getWeightInKg = () => {
    if (unitSystem === 'metric') {
      return Number(weightKg) || 70;
    }
    return (Number(weightLbs) || 154) * 0.45359237;
  };

  const getWaistInMeters = () => {
    if (unitSystem === 'metric') {
      return (Number(waistCm) || 0) / 100;
    }
    return (Number(waistIn) || 0) * 0.0254;
  };

  const heightM = Math.max(getHeightInMeters(), 0.5);
  const weightValKg = Math.max(getWeightInKg(), 10);
  const waistM = getWaistInMeters();

  // 1. BMI Calculation
  const bmiValue = weightValKg / (heightM * heightM);
  const bmi = Number(bmiValue.toFixed(1));

  // 2. BMI Prime
  const upperBmiLimit = useAsianCriteria ? 23.0 : 25.0;
  const bmiPrime = Number((bmi / upperBmiLimit).toFixed(2));

  // 3. Ponderal Index (kg / m^3)
  const ponderalIndex = Number((weightValKg / (heightM * heightM * heightM)).toFixed(1));

  // 4. Healthy Weight Range for this height
  const minNormalBmi = 18.5;
  const maxNormalBmi = useAsianCriteria ? 22.9 : 24.9;
  const minHealthyWeightKg = minNormalBmi * (heightM * heightM);
  const maxHealthyWeightKg = maxNormalBmi * (heightM * heightM);

  const minHealthyWeightDisp = unitSystem === 'metric' 
    ? `${minHealthyWeightKg.toFixed(1)} kg` 
    : `${(minHealthyWeightKg * 2.20462).toFixed(1)} lbs`;

  const maxHealthyWeightDisp = unitSystem === 'metric' 
    ? `${maxHealthyWeightKg.toFixed(1)} kg` 
    : `${(maxHealthyWeightKg * 2.20462).toFixed(1)} lbs`;

  // 5. Weight difference to reach normal BMI
  let weightDifferenceText = '';
  if (weightValKg > maxHealthyWeightKg) {
    const diffKg = weightValKg - maxHealthyWeightKg;
    const diffDisp = unitSystem === 'metric' 
      ? `${diffKg.toFixed(1)} kg` 
      : `${(diffKg * 2.20462).toFixed(1)} lbs`;
    weightDifferenceText = `Lose ~${diffDisp} to reach a normal BMI`;
  } else if (weightValKg < minHealthyWeightKg) {
    const diffKg = minHealthyWeightKg - weightValKg;
    const diffDisp = unitSystem === 'metric' 
      ? `${diffKg.toFixed(1)} kg` 
      : `${(diffKg * 2.20462).toFixed(1)} lbs`;
    weightDifferenceText = `Gain ~${diffDisp} to reach a normal BMI`;
  } else {
    weightDifferenceText = 'You are within the healthy target range';
  }

  // 6. Classification & Visual Color
  const getClassification = () => {
    if (useAsianCriteria) {
      if (bmi < 18.5) return { label: 'Underweight', color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/30', level: 'low' };
      if (bmi <= 22.9) return { label: 'Normal Weight (Optimal)', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', level: 'normal' };
      if (bmi <= 27.4) return { label: 'Overweight (Increased Risk)', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', level: 'overweight' };
      return { label: 'Obese (High Risk)', color: 'text-rose-600', bg: 'bg-rose-500/10', border: 'border-rose-500/30', level: 'obese' };
    }

    if (bmi < 16.0) return { label: 'Severe Thinness', color: 'text-sky-600', bg: 'bg-sky-500/10', border: 'border-sky-500/30', level: 'low' };
    if (bmi <= 16.9) return { label: 'Moderate Thinness', color: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/30', level: 'low' };
    if (bmi <= 18.4) return { label: 'Mild Thinness', color: 'text-teal-500', bg: 'bg-teal-500/10', border: 'border-teal-500/30', level: 'low' };
    if (bmi <= 24.9) return { label: 'Normal Weight (Healthy)', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', level: 'normal' };
    if (bmi <= 29.9) return { label: 'Overweight', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/30', level: 'overweight' };
    if (bmi <= 34.9) return { label: 'Obese Class I (Moderate)', color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30', level: 'obese1' };
    if (bmi <= 39.9) return { label: 'Obese Class II (Severe)', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/30', level: 'obese2' };
    return { label: 'Obese Class III (Morbid Obesity)', color: 'text-red-700', bg: 'bg-red-500/10', border: 'border-red-500/30', level: 'obese3' };
  };

  const classification = getClassification();

  // 7. Gauge position (normalized 14 to 42 BMI)
  const gaugePercent = Math.min(Math.max(((bmi - 14) / (42 - 14)) * 100, 3), 97);

  // 8. Body Fat % Estimation (Deurenberg Formula)
  const genderMultiplier = gender === 'male' ? 1 : 0;
  const estimatedBodyFat = Math.max(0, Number(((1.20 * bmi) + (0.23 * age) - (10.8 * genderMultiplier) - 5.4).toFixed(1)));

  // 9. Body Roundness Index (BRI) & Waist-to-Height Ratio (WHtR)
  let briValue = null;
  let whtrValue = null;
  if (waistM > 0) {
    whtrValue = Number((waistM / heightM).toFixed(2));
    const term = (waistM / (2 * Math.PI)) / (0.5 * heightM);
    if (term < 1) {
      const eccentricity = Math.sqrt(1 - (term * term));
      briValue = Number((364.2 - (365.5 * eccentricity)).toFixed(1));
    }
  }

  // 10. GLP-1 & Clinical Weight Loss Medication Eligibility (Ozempic / Wegovy / Mounjaro / Zepbound)
  const hasComorbidity = hasHypertension || hasType2Diabetes || hasHighCholesterol || hasSleepApnea;
  const isGLP1Eligible = bmi >= 30 || (bmi >= 27 && hasComorbidity);
  const isBariatricEligible = bmi >= 40 || (bmi >= 35 && hasComorbidity);

  // Copy Result Functionality
  const handleCopyResults = () => {
    const summaryText = `Daily Science News BMI Assessment:
• BMI: ${bmi} kg/m² (${classification.label})
• Healthy Weight Range: ${minHealthyWeightDisp} - ${maxHealthyWeightDisp}
• Estimated Body Fat: ~${estimatedBodyFat}%
• Ponderal Index: ${ponderalIndex} kg/m³
${briValue ? `• Body Roundness Index (BRI): ${briValue} (WHtR: ${whtrValue})` : ''}
• Clinical Weight Evaluation: ${isGLP1Eligible ? 'Meets FDA BMI baseline for GLP-1 weight management evaluation' : 'Below standard GLP-1 weight loss criteria'}
Calculate yours at: https://sciencenewshub.click/bmi-calculator`;
    
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  // Structured Schema for WebApplication & MedicalWebPage
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Smart BMI & Body Roundness Index (BRI) Calculator",
    "url": "https://sciencenewshub.click/bmi-calculator",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "description": "Accurate, free interactive BMI calculator supporting Metric and Imperial units, Ponderal Index, Body Roundness Index (BRI), WHO Asian criteria, and GLP-1 weight loss medication eligibility screening.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Real-time BMI calculation in kg/cm and lbs/feet-inches",
      "World Health Organization (WHO) and Asian-specific cutoffs",
      "Ponderal Index for tall, short, and athletic body builds",
      "Body Roundness Index (BRI) & Waist-to-Height Ratio",
      "GLP-1 (Ozempic/Wegovy) clinical criteria screening",
      "Target healthy weight range and weight deficit estimation"
    ]
  };

  // FAQ Content for Schema & Rendering
  const faqs = [
    {
      q: "How is Body Mass Index (BMI) calculated?",
      a: "BMI is calculated by dividing an individual's weight in kilograms by the square of their height in meters (kg/m²). In the US customary system, the formula is: BMI = (weight in pounds × 703) ÷ (height in inches)². For example, a person who is 5'10\" (70 inches) and weighs 160 lbs has a BMI of 23.0."
    },
    {
      q: "What is considered a normal and healthy BMI?",
      a: "According to the World Health Organization (WHO) and Centers for Disease Control and Prevention (CDC), a healthy BMI for adults aged 20 and older is between 18.5 and 24.9 kg/m². A BMI below 18.5 is considered underweight, 25.0 to 29.9 is overweight, and 30.0 or greater falls into the obesity category."
    },
    {
      q: "Why are BMI cutoffs lower for people of Asian descent?",
      a: "Clinical research shows that individuals of Asian and South Asian heritage tend to develop higher proportions of visceral abdominal fat and elevated risks of type 2 diabetes and cardiovascular disease at lower BMIs. The WHO Asian criteria classifies overweight as a BMI of 23.0 to 27.4, and obesity at 27.5 or higher."
    },
    {
      q: "What are the BMI requirements for Ozempic, Wegovy, and Mounjaro?",
      a: "For FDA-approved chronic weight management (such as Wegovy and Zepbound), the standard clinical eligibility requires a BMI of 30 kg/m² or greater, or a BMI of 27 kg/m² or greater alongside at least one weight-related condition such as hypertension, type 2 diabetes, high cholesterol, or obstructive sleep apnea. Ozempic and Mounjaro are formally indicated for glycemic control in type 2 diabetes regardless of baseline BMI."
    },
    {
      q: "What is the Body Roundness Index (BRI) and why is it replacing BMI?",
      a: "The Body Roundness Index (BRI) is a newer body composition metric that incorporates waist circumference alongside height. While traditional BMI cannot distinguish between dense muscle mass and visceral abdominal fat, BRI assesses central body shape and visceral adiposity. Recent 2024–2026 epidemiological studies in JAMA Network Open demonstrated that BRI is a significantly stronger predictor of all-cause and cardiovascular mortality than BMI alone."
    },
    {
      q: "Does muscle mass make BMI inaccurate for athletes?",
      a: "Yes. Muscle tissue is approximately 18% denser than adipose fat tissue. Highly trained athletes, weightlifters, and bodybuilders frequently register high BMIs in the 'overweight' or 'obese' brackets despite having very low body fat percentages and exceptional cardiovascular health. For muscular builds, metrics such as Waist-to-Height Ratio, DEXA scans, or the Ponderal Index offer more reliable assessments."
    },
    {
      q: "Does BMI affect health insurance premiums?",
      a: "Yes. In individual underwriting and life insurance assessments, insurers use BMI as a primary actuarial risk marker. Policyholders with a BMI above 30 or below 18.5 often face higher risk-tier premiums due to statistical correlations with cardiovascular diseases, metabolic syndrome, and surgical complications, whereas maintaining a normal BMI (18.5–24.9) qualifies applicants for preferred discount tiers."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
      <SEOHead 
        title="BMI Calculator - Free Body Mass Index & BRI Calculator (Metric & Imperial)"
        description="Calculate your Body Mass Index (BMI), Body Roundness Index (BRI), healthy weight range, and GLP-1 eligibility with our free 2026 interactive clinical health calculator."
        keywords="bmi calculator, body mass index calculator, calculate bmi, check my bmi, metric bmi calculator, imperial bmi calculator, body roundness index calculator, bri vs bmi, bmi requirements for ozempic, healthy bmi range, asian bmi calculator"
        canonicalUrl="https://sciencenewshub.click/bmi-calculator"
        ogType="website"
        schema={webAppSchema}
        faq={faqs.map(f => ({ question: f.q, answer: f.a }))}
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-6xl space-y-10">
        
        {/* Navigation Breadcrumb to Health Tools Hub */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/health-tools" className="hover:text-primary transition-colors text-primary font-bold">
            Health Tools
          </Link>
          <span>/</span>
          <span className="text-foreground">BMI &amp; BRI Calculator</span>
        </nav>

        {/* Page Hero Header */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">
            <Activity size={14} /> Interactive Clinical Health Utility (2026 Edition)
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Smart BMI &amp; Body Roundness Calculator
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            Assess your Body Mass Index, target weight boundaries, Ponderal Index, and modern Body Roundness Index (BRI) with precision World Health Organization (WHO) and CDC metrics.
          </p>
        </section>

        {/* The Calculator Application Widget */}
        <section className="bg-card border rounded-3xl p-5 sm:p-8 md:p-10 shadow-lg space-y-8">
          
          {/* Unit Toggle & Fast Options Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b pb-6">
            <div className="flex items-center gap-2 p-1.5 bg-muted rounded-2xl w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  unitSystem === 'metric' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Metric Units (cm, kg)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                  unitSystem === 'imperial' 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                US / Imperial (ft, in, lbs)
              </button>
            </div>

            {/* Demographic Toggles */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none bg-muted/60 px-3 py-2 rounded-xl border hover:bg-muted transition-colors">
                <input 
                  type="checkbox" 
                  checked={useAsianCriteria}
                  onChange={(e) => setUseAsianCriteria(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>WHO Asian Cutoffs</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none bg-muted/60 px-3 py-2 rounded-xl border hover:bg-muted transition-colors">
                <input 
                  type="checkbox" 
                  checked={isAthlete}
                  onChange={(e) => setIsAthlete(e.target.checked)}
                  className="rounded text-primary focus:ring-primary"
                />
                <span>Athletic / Muscular Build</span>
              </label>
            </div>
          </div>

          {/* Calculator Grid: Inputs (Left) & Real-Time Diagnostics (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Inputs Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Gender & Age Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Gender</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        gender === 'male' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-muted/40 hover:bg-muted'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                        gender === 'female' ? 'bg-primary text-primary-foreground border-primary shadow-sm' : 'bg-muted/40 hover:bg-muted'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={ageInputId} className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Age (Years)</label>
                  <input 
                    id={ageInputId}
                    type="number" 
                    min={2} 
                    max={120} 
                    value={age}
                    onChange={(e) => setAge(Math.max(2, Math.min(120, Number(e.target.value) || 0)))}
                    className="w-full px-3.5 py-2 text-sm font-semibold border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              {/* Height & Weight Inputs */}
              {unitSystem === 'metric' ? (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor={heightCmInputId} className="font-bold uppercase tracking-wider text-muted-foreground">Height (Centimeters)</label>
                      <span className="font-bold text-primary">{heightCm} cm ({(heightCm / 100).toFixed(2)} m)</span>
                    </div>
                    <input 
                      id={heightCmInputId}
                      type="number" 
                      min={60} 
                      max={250} 
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 text-base font-bold border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <input 
                      type="range" 
                      min={100} 
                      max={220} 
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor={weightKgInputId} className="font-bold uppercase tracking-wider text-muted-foreground">Weight (Kilograms)</label>
                      <span className="font-bold text-primary">{weightKg} kg ({(weightKg * 2.20462).toFixed(1)} lbs)</span>
                    </div>
                    <input 
                      id={weightKgInputId}
                      type="number" 
                      min={20} 
                      max={300} 
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 text-base font-bold border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <input 
                      type="range" 
                      min={35} 
                      max={160} 
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Optional Waist for BRI */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor={waistCmInputId} className="font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        Waist Circumference <span className="text-[10px] lowercase font-normal text-muted-foreground">(for BRI)</span>
                      </label>
                      <span className="font-semibold text-xs text-muted-foreground">{waistCm} cm</span>
                    </div>
                    <input 
                      id={waistCmInputId}
                      type="number" 
                      min={40} 
                      max={180} 
                      value={waistCm}
                      onChange={(e) => setWaistCm(Number(e.target.value) || 0)}
                      placeholder="e.g. 82 cm (optional)"
                      className="w-full px-4 py-2 text-sm border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Feet and Inches */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">Height</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label htmlFor={heightFtInputId} className="text-[11px] font-semibold text-muted-foreground">Feet (ft)</label>
                        <input 
                          id={heightFtInputId}
                          type="number" 
                          min={2} 
                          max={8} 
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value) || 0)}
                          className="w-full px-4 py-2 text-base font-bold border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor={heightInInputId} className="text-[11px] font-semibold text-muted-foreground">Inches (in)</label>
                        <input 
                          id={heightInInputId}
                          type="number" 
                          min={0} 
                          max={11} 
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value) || 0)}
                          className="w-full px-4 py-2 text-base font-bold border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Weight in Pounds */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor={weightLbsInputId} className="font-bold uppercase tracking-wider text-muted-foreground">Weight (Pounds / lbs)</label>
                      <span className="font-bold text-primary">{weightLbs} lbs ({(weightLbs * 0.453592).toFixed(1)} kg)</span>
                    </div>
                    <input 
                      id={weightLbsInputId}
                      type="number" 
                      min={40} 
                      max={600} 
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value) || 0)}
                      className="w-full px-4 py-2.5 text-base font-bold border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <input 
                      type="range" 
                      min={80} 
                      max={350} 
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(Number(e.target.value))}
                      className="w-full accent-primary h-1.5 bg-muted rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Optional Waist in Inches */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <label htmlFor={waistInInputId} className="font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                        Waist Circumference <span className="text-[10px] lowercase font-normal text-muted-foreground">(for BRI)</span>
                      </label>
                      <span className="font-semibold text-xs text-muted-foreground">{waistIn} in</span>
                    </div>
                    <input 
                      id={waistInInputId}
                      type="number" 
                      min={15} 
                      max={75} 
                      value={waistIn}
                      onChange={(e) => setWaistIn(Number(e.target.value) || 0)}
                      placeholder="e.g. 32 in (optional)"
                      className="w-full px-4 py-2 text-sm border rounded-xl bg-background focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Comorbidities Accordion for GLP-1 Screening */}
              <div className="p-4 rounded-2xl bg-muted/40 border space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
                  <Pill size={15} className="text-primary" /> Medical Conditions (GLP-1 Screening)
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Check any diagnosed conditions below to evaluate clinical medication criteria (Ozempic/Wegovy):
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1 text-xs font-medium">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hasHypertension} 
                      onChange={(e) => setHasHypertension(e.target.checked)} 
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Hypertension</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hasType2Diabetes} 
                      onChange={(e) => setHasType2Diabetes(e.target.checked)} 
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Type 2 Diabetes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hasHighCholesterol} 
                      onChange={(e) => setHasHighCholesterol(e.target.checked)} 
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>High Cholesterol</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={hasSleepApnea} 
                      onChange={(e) => setHasSleepApnea(e.target.checked)} 
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span>Sleep Apnea</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Diagnostic Results Dashboard (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Primary BMI Scorecard */}
              <div className={`p-6 sm:p-8 rounded-3xl border ${classification.border} ${classification.bg} transition-all space-y-5 relative overflow-hidden`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Calculated Body Mass Index
                    </span>
                    <div className="flex items-baseline gap-3 mt-1">
                      <span className="text-5xl sm:text-6xl font-black tracking-tight text-foreground">
                        {bmi}
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">
                        kg/m²
                      </span>
                    </div>
                  </div>

                  <div className="text-left sm:text-right space-y-1">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border ${classification.border} ${classification.color} bg-background/80 shadow-sm`}>
                      {classification.label}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {isAthlete 
                        ? '⚠️ Athletic note: High muscle mass may inflate BMI' 
                        : (useAsianCriteria ? 'WHO Asian Population Standard' : 'WHO Global Standard')}
                    </p>
                  </div>
                </div>

                {/* Interactive Visual Scale Meter */}
                <div className="space-y-2 pt-2">
                  <div className="relative h-4 rounded-full overflow-hidden bg-gradient-to-r from-sky-400 via-emerald-400 via-amber-400 via-orange-400 to-rose-600 shadow-inner">
                    {/* Live Indicator Needle */}
                    <div 
                      className="absolute top-0 bottom-0 w-2.5 bg-foreground rounded-full shadow-lg border-2 border-background transform -translate-x-1/2 transition-all duration-300"
                      style={{ left: `${gaugePercent}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] font-bold text-muted-foreground px-1">
                    <span>16 (Thin)</span>
                    <span>18.5 (Normal)</span>
                    <span>25 (Overweight)</span>
                    <span>30 (Obese)</span>
                    <span>40+</span>
                  </div>
                </div>

                {/* Target Weight Guidance & Deficit */}
                <div className="p-4 rounded-2xl bg-background/90 border text-xs sm:text-sm space-y-2 shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <span className="font-semibold text-muted-foreground">Optimal Healthy Weight Range:</span>
                    <span className="font-extrabold text-foreground">{minHealthyWeightDisp} — {maxHealthyWeightDisp}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 border-t pt-2">
                    <span className="font-semibold text-muted-foreground">Target Adjustment:</span>
                    <span className="font-bold text-primary">{weightDifferenceText}</span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={handleCopyResults}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-background border hover:bg-muted font-bold text-xs transition-colors shadow-sm"
                  >
                    {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    {copied ? 'Copied Health Summary!' : 'Copy Summary'}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHeightCm(175);
                      setWeightKg(70);
                      setHeightFt(5);
                      setHeightIn(9);
                      setWeightLbs(154);
                      setWaistCm(82);
                      setWaistIn(32);
                      setAge(28);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground underline transition-colors"
                  >
                    <RefreshCw size={13} /> Reset Values
                  </button>
                </div>
              </div>

              {/* Advanced Biometric Diagnostic Cards (3-Col Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* 1. BMI Prime */}
                <div className="p-4 rounded-2xl border bg-card space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-muted-foreground">BMI Prime</span>
                    <Info size={13} className="text-muted-foreground" title="Ratio of individual BMI to upper normal limit (25.0)" />
                  </div>
                  <div className="text-2xl font-black text-foreground">{bmiPrime}</div>
                  <p className="text-[11px] text-muted-foreground">
                    {bmiPrime < 0.74 ? 'Underweight (<0.74)' : bmiPrime <= 1.0 ? 'Normal (≤ 1.0)' : 'Overweight (> 1.0)'}
                  </p>
                </div>

                {/* 2. Ponderal Index */}
                <div className="p-4 rounded-2xl border bg-card space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-muted-foreground">Ponderal Index</span>
                    <Info size={13} className="text-muted-foreground" title="Height-cubed index (kg/m³). Best for very tall/short statures" />
                  </div>
                  <div className="text-2xl font-black text-foreground">{ponderalIndex}</div>
                  <p className="text-[11px] text-muted-foreground">
                    Normal adult span: 11.0 – 15.0 kg/m³
                  </p>
                </div>

                {/* 3. Est. Body Fat % */}
                <div className="p-4 rounded-2xl border bg-card space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase text-muted-foreground">Est. Body Fat</span>
                    <Info size={13} className="text-muted-foreground" title="Deurenberg clinical formula estimate based on age & gender" />
                  </div>
                  <div className="text-2xl font-black text-foreground">{estimatedBodyFat}%</div>
                  <p className="text-[11px] text-muted-foreground">
                    {gender === 'male' ? 'Male ref: 10–22%' : 'Female ref: 20–32%'}
                  </p>
                </div>

              </div>

              {/* 2026 Trend: Body Roundness Index (BRI) & GLP-1 Eligibility Panel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* BRI Card */}
                <div className="p-5 rounded-2xl border bg-card space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Sparkles size={14} /> Body Roundness Index (BRI)
                  </span>
                  {briValue ? (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-foreground">{briValue}</span>
                        <span className="text-xs text-muted-foreground">WHtR: {whtrValue}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        {briValue < 3.4 
                          ? 'Low roundness (slim / minimal visceral abdominal fat).' 
                          : briValue <= 5.5 
                            ? 'Moderate roundness (healthy visceral distribution).' 
                            : 'High roundness (elevated visceral fat & metabolic risk).'}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Enter your waist circumference in the inputs to calculate your 2026 Body Roundness Index (BRI) and Waist-to-Height Ratio.
                    </p>
                  )}
                </div>

                {/* GLP-1 Medication Eligibility Card */}
                <div className="p-5 rounded-2xl border bg-card space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                    <Pill size={14} /> GLP-1 Eligibility Screening
                  </span>
                  <div>
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-md mb-1 ${
                      isGLP1Eligible ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30' : 'bg-muted text-muted-foreground'
                    }`}>
                      {isGLP1Eligible ? '✓ Meets FDA BMI Criteria' : 'Below Standard Weight Loss Cutoff'}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {isGLP1Eligible 
                        ? (bmi >= 30 
                            ? 'Meets standard FDA threshold (BMI ≥ 30) for chronic weight management medications (Wegovy, Zepbound).' 
                            : 'Meets comorbidity threshold (BMI ≥ 27 with diagnosed risk factor) for clinical evaluation.')
                        : 'Standard FDA criteria requires BMI ≥ 30, or BMI ≥ 27 with an associated metabolic condition.'}
                    </p>
                    {isBariatricEligible && (
                      <p className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 mt-1">
                        • Also meets typical evaluation baseline for metabolic/bariatric surgery (BMI ≥ 35+ with comorbidity or BMI ≥ 40).
                      </p>
                    )}
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>

        {/* High-Value Reference Tables Section */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              Official Clinical Classification Tables
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground">
              Compare global standards from the World Health Organization (WHO), the CDC, and Asian ethnic risk stratifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Table 1: Standard WHO Adult BMI */}
            <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
              <div className="px-5 py-4 border-b bg-muted/30">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Scale size={16} className="text-primary" /> WHO Standard Adult Classification
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs sm:text-sm text-left">
                  <thead className="bg-muted/50 border-b text-muted-foreground font-semibold">
                    <tr>
                      <th className="px-4 py-3">Classification</th>
                      <th className="px-4 py-3">BMI Range (kg/m²)</th>
                      <th className="px-4 py-3">BMI Prime</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y font-medium">
                    <tr className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-sky-600 font-semibold">Severe Thinness</td>
                      <td className="px-4 py-2.5">&lt; 16.0</td>
                      <td className="px-4 py-2.5">&lt; 0.64</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-sky-500 font-semibold">Moderate Thinness</td>
                      <td className="px-4 py-2.5">16.0 – 16.9</td>
                      <td className="px-4 py-2.5">0.64 – 0.68</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-teal-600 font-semibold">Mild Thinness</td>
                      <td className="px-4 py-2.5">17.0 – 18.4</td>
                      <td className="px-4 py-2.5">0.68 – 0.74</td>
                    </tr>
                    <tr className="bg-emerald-500/10 hover:bg-emerald-500/20">
                      <td className="px-4 py-2.5 text-emerald-600 font-bold">Normal (Healthy Weight)</td>
                      <td className="px-4 py-2.5 font-bold">18.5 – 24.9</td>
                      <td className="px-4 py-2.5 font-bold">0.74 – 1.00</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-amber-600 font-semibold">Overweight</td>
                      <td className="px-4 py-2.5">25.0 – 29.9</td>
                      <td className="px-4 py-2.5">1.00 – 1.20</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-orange-600 font-semibold">Obese Class I (Moderate)</td>
                      <td className="px-4 py-2.5">30.0 – 34.9</td>
                      <td className="px-4 py-2.5">1.20 – 1.40</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-rose-600 font-semibold">Obese Class II (Severe)</td>
                      <td className="px-4 py-2.5">35.0 – 39.9</td>
                      <td className="px-4 py-2.5">1.40 – 1.60</td>
                    </tr>
                    <tr className="hover:bg-muted/30">
                      <td className="px-4 py-2.5 text-red-700 font-semibold">Obese Class III (Morbid)</td>
                      <td className="px-4 py-2.5">&ge; 40.0</td>
                      <td className="px-4 py-2.5">&gt; 1.60</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: WHO Asian Specific Cutoffs & Ponderal Index */}
            <div className="space-y-6">
              
              <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="px-5 py-4 border-b bg-muted/30">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <TrendingUp size={16} className="text-primary" /> Asian &amp; South Asian Risk Cutoffs
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-muted/50 border-b text-muted-foreground font-semibold">
                      <tr>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Asian BMI Range</th>
                        <th className="px-4 py-3">Cardiovascular Risk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y font-medium">
                      <tr className="hover:bg-muted/30">
                        <td className="px-4 py-2.5 text-sky-600">Underweight</td>
                        <td className="px-4 py-2.5">&lt; 18.5</td>
                        <td className="px-4 py-2.5">Elevated (Nutritional deficiency)</td>
                      </tr>
                      <tr className="bg-emerald-500/10 hover:bg-emerald-500/20">
                        <td className="px-4 py-2.5 text-emerald-600 font-bold">Normal Range</td>
                        <td className="px-4 py-2.5 font-bold">18.5 – 22.9</td>
                        <td className="px-4 py-2.5 font-bold">Low / Baseline Risk</td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="px-4 py-2.5 text-amber-600">Overweight / Pre-obese</td>
                        <td className="px-4 py-2.5">23.0 – 27.4</td>
                        <td className="px-4 py-2.5">Increased Type 2 Diabetes Risk</td>
                      </tr>
                      <tr className="hover:bg-muted/30">
                        <td className="px-4 py-2.5 text-rose-600 font-bold">Obese</td>
                        <td className="px-4 py-2.5 font-bold">&ge; 27.5</td>
                        <td className="px-4 py-2.5">High Metabolic Syndrome Risk</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ponderal Index Reference Table */}
              <div className="border rounded-2xl overflow-hidden bg-card shadow-sm">
                <div className="px-5 py-4 border-b bg-muted/30">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Activity size={16} className="text-primary" /> Adult Ponderal Index (kg/m³)
                  </h3>
                </div>
                <div className="p-4 text-xs sm:text-sm text-muted-foreground space-y-2">
                  <p>
                    Unlike BMI which squares height (<span className="font-mono">h²</span>), the Ponderal Index cubes height (<span className="font-mono">h³</span>), modeling human tissue volume mathematically:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center font-bold">
                    <div className="p-2.5 rounded-xl bg-muted/50 border">
                      <span className="block text-sky-600">&lt; 11</span>
                      <span className="text-[11px] text-muted-foreground font-normal">Underweight</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <span className="block text-emerald-600">11 – 15</span>
                      <span className="text-[11px] text-muted-foreground font-normal">Normal Range</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20">
                      <span className="block text-amber-600">15 – 17</span>
                      <span className="text-[11px] text-muted-foreground font-normal">Overweight</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20">
                      <span className="block text-rose-600">&ge; 17</span>
                      <span className="text-[11px] text-muted-foreground font-normal">Obese</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* In-Depth Educational & Scientific Guide (E-E-A-T AdSense Compliance) */}
        <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 border-t pt-10">
          
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Understanding Body Mass Index: Formulas, Clinical Uses &amp; Limitations
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Body Mass Index (BMI), originally conceived in 1832 by Belgian mathematician and astronomer Adolphe Quetelet (as the Quetelet Index), remains the world’s most widely deployed epidemiological screening tool. While simple to calculate, modern physiological research demonstrates that BMI must be evaluated alongside central adiposity, age demographics, and muscular proportion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            <div className="p-5 rounded-2xl bg-card border space-y-2">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <HeartPulse className="text-primary" size={18} /> Overweight Health Risks
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Essential hypertension and arterial stiffness</li>
                <li>Elevated LDL cholesterol and low HDL levels</li>
                <li>Type 2 diabetes and peripheral insulin resistance</li>
                <li>Coronary artery disease and myocardial infarction</li>
                <li>Obstructive sleep apnea (OSA) and respiratory load</li>
                <li>Non-alcoholic fatty liver disease (NAFLD/NASH)</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-card border space-y-2">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <AlertTriangle className="text-amber-500" size={18} /> Underweight Health Risks
              </h3>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li>Protein-calorie malnutrition and micronutrient anemia</li>
                <li>Severe osteoporosis, trabecular bone loss &amp; fractures</li>
                <li>Compromised humoral and cellular immunocompetence</li>
                <li>Hypothalamic amenorrhea and female reproductive arrest</li>
                <li>Elevated surgical post-operative mortality risk</li>
                <li>Muscle sarcopenia and cognitive fatigue</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-card border space-y-2">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <ShieldCheck className="text-emerald-500" size={18} /> Insurance Premium Impact
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                In clinical underwriting, life and health insurance actuaries evaluate BMI to model morbidity:
              </p>
              <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
                <li><strong>BMI 18.5 – 24.9:</strong> Preferred discount tiers.</li>
                <li><strong>BMI 25 – 29.9:</strong> Standard baseline premiums.</li>
                <li><strong>BMI 30+:</strong> Graded surcharges due to cardiovascular hazard ratios.</li>
                <li><strong>BMI &lt; 18.5:</strong> Surcharges for malnutrition risk.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground">
              Mathematical Formulas: How BMI Is Computed
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Depending on the measurement system utilized, Body Mass Index operates on standardized physical proportions:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              <div className="p-4 rounded-2xl bg-muted/40 border font-mono text-xs sm:text-sm space-y-2">
                <span className="font-sans font-bold text-foreground block">Metric Formula (SI Units):</span>
                <p className="text-primary font-bold">BMI = Weight (kg) &divide; [Height (m)]&sup2;</p>
                <p className="text-xs text-muted-foreground">Example: 70 kg &divide; (1.75 m)&sup2; = 70 &divide; 3.0625 = 22.86 kg/m&sup2;</p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/40 border font-mono text-xs sm:text-sm space-y-2">
                <span className="font-sans font-bold text-foreground block">US Customary / Imperial Formula:</span>
                <p className="text-primary font-bold">BMI = 703 &times; [Weight (lbs) &divide; (Height (in))&sup2;]</p>
                <p className="text-xs text-muted-foreground">Example: 703 &times; [154 &divide; (69)&sup2;] = 108,262 &divide; 4,761 = 22.74 kg/m&sup2;</p>
              </div>
            </div>
          </div>

          {/* Body Roundness Index (BRI) Section */}
          <div className="p-6 rounded-3xl bg-muted/30 border space-y-3 not-prose">
            <div className="flex items-center gap-2">
              <Sparkles className="text-primary" size={20} />
              <h3 className="text-lg font-bold text-foreground">
                The 2024–2026 Paradigm Shift: Why Body Roundness Index (BRI) Complements BMI
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              While BMI has served medicine for nearly two centuries, its inability to differentiate between visceral abdominal fat (fat surrounding vital organs) and subcutaneous peripheral fat represents a known clinical limitation. 
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              In landmark epidemiological studies published in <em>JAMA Network Open</em>, researchers tracking over 33,000 adults demonstrated that the <strong>Body Roundness Index (BRI)</strong>—which quantifies how closely a human body approximates an ellipse by integrating waist circumference—is a far superior indicator of all-cause mortality, insulin resistance, and cardiovascular events. Combining BMI with BRI provides the most comprehensive, non-invasive metabolic snapshot available.
            </p>
          </div>

        </article>

        {/* Structured FAQ Section (FAQPage Rich Snippets) */}
        <section className="space-y-6 border-t pt-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Frequently Asked Questions About BMI &amp; Body Health
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Direct clinical answers addressing search queries on BMI formulas, medication thresholds, and accuracy.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faqItem, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx} 
                  className="border rounded-2xl bg-card overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-foreground hover:text-primary transition-colors"
                  >
                    <span>{faqItem.q}</span>
                    {isOpen ? <ChevronUp size={18} className="shrink-0 text-primary" /> : <ChevronDown size={18} className="shrink-0 text-muted-foreground" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t pt-3 bg-muted/10 animate-in fade-in duration-200">
                      {faqItem.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Medical & Clinical Disclaimer */}
        <div className="p-4 rounded-2xl bg-muted/40 border text-center text-xs text-muted-foreground/80 max-w-3xl mx-auto">
          <strong>Medical Disclaimer:</strong> This BMI and Body Roundness Index calculator is designed exclusively for informational and educational screening purposes. It is not intended to provide clinical medical diagnoses or replace personal consultations with licensed healthcare providers. Consult your physician before initiating any medical weight management or pharmaceutical regimen.
        </div>

      </main>

      <Footer />
    </div>
  );
}

