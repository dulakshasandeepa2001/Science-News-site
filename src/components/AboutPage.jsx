import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { Beaker, Sparkles, Award, ShieldCheck, HeartHandshake, Rocket, Globe, Mail } from 'lucide-react';

const DULAKSHA_PROFILE_IMG = "https://aboutmedulaksha.netlify.app/assets/profile-DjvIPdxI.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="About Us - Daily Science News & Founder Dulaksha Sandeepa"
        description="Learn about Daily Science News, our mission, editorial team, and founder Dulaksha Sandeepa - dedicated science explorer and technology enthusiast."
        keywords="about daily science news, Dulaksha Sandeepa, science explorer, scientific journalism, editorial guidelines, EEAT"
        canonicalUrl="https://sciencenewshub.click/about"
        ogType="website"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24 border-b">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Sparkles size={14} /> Driven by Curiosity &amp; Discovery
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              About Daily Science News
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a dedicated scientific news platform bringing you verified breakthroughs in astronomy, space exploration, physics, technology, health, and climate science.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16">
          
          {/* Founder Section (E-E-A-T Credibility) */}
          <section className="bg-card border rounded-3xl p-8 md:p-12 shadow-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Beaker size={200} />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
              <div className="relative shrink-0">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl bg-muted">
                  <img 
                    src={DULAKSHA_PROFILE_IMG} 
                    alt="Dulaksha Sandeepa - Founder & Chief Editor" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if network blocks external image
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
                  <Rocket size={18} />
                </div>
              </div>

              <div className="space-y-4 text-center md:text-left">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">Founder &amp; Chief Editor</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Dulaksha Sandeepa</h2>
                  <p className="text-sm font-medium text-muted-foreground">Science Explorer &amp; Technology Specialist</p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  &quot;Science isn&apos;t just a collection of facts; it is a mindset of relentless curiosity and discovery. I founded Daily Science News to bridge the gap between complex research institutions and science enthusiasts worldwide.&quot;
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                  <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full border">Astronomy &amp; Space</span>
                  <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full border">IT &amp; AI Research</span>
                  <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full border">Scientific Journalism</span>
                </div>
              </div>
            </div>
          </section>

          {/* Mission & Core Values Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border p-6 rounded-2xl space-y-3">
              <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-lg font-bold">Accuracy &amp; Fact-Checking</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Every report is cross-referenced with peer-reviewed journals (Nature, Science, Monthly Notices of the Royal Astronomical Society) and leading agencies (NASA, ESA).
              </p>
            </div>

            <div className="bg-card border p-6 rounded-2xl space-y-3">
              <div className="p-3 w-fit rounded-xl bg-secondary/10 text-secondary">
                <Globe size={24} />
              </div>
              <h3 className="text-lg font-bold">Global Perspective</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We track scientific breakthroughs across continents — from deep-space observatories to oceanographic deep-sea expeditions in Brazil and Antarctica.
              </p>
            </div>

            <div className="bg-card border p-6 rounded-2xl space-y-3">
              <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-500">
                <HeartHandshake size={24} />
              </div>
              <h3 className="text-lg font-bold">Reader Trust &amp; Ethics</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We adhere strictly to editorial independence, transparent author attribution, and clear distinctions between news and analytical commentary.
              </p>
            </div>
          </section>

          {/* Editorial Guidelines Statement */}
          <section className="bg-muted/40 border rounded-2xl p-8 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Award className="text-primary" /> Our E-E-A-T Editorial Commitment
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In accordance with Google&apos;s Search Quality Rater Guidelines for Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T), Daily Science News maintains strict editorial oversight. Our writers and editors verify statistical data, cite academic primary sources, and provide contextual analysis to ensure our readers receive high-value, educational, and reliable scientific content.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
