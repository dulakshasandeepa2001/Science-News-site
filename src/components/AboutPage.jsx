import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { 
  Beaker, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  HeartHandshake, 
  Rocket, 
  Globe, 
  Mail, 
  FileCheck2, 
  RefreshCw, 
  Scale, 
  Cpu 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DULAKSHA_PROFILE_IMG = "https://aboutmedulaksha.netlify.app/assets/profile-DjvIPdxI.png";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="About Us & Editorial Standards - Daily Science News"
        description="Learn about Daily Science News, our editorial methodology, peer-reviewed fact-checking protocols, corrections policy, and founder Dulaksha Sandeepa."
        keywords="about daily science news, Dulaksha Sandeepa, scientific journalism, editorial standards, corrections policy, peer reviewed science"
        canonicalUrl="https://sciencenewshub.click/about"
        ogType="website"
      />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24 border-b">
          <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <Sparkles size={14} /> Rigorous Scientific Journalism
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
              About Us &amp; Editorial Standards
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Daily Science News is an independent digital publication dedicated to explaining verified breakthroughs in space exploration, astrophysics, particle physics, medicine, and planetary climate.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16 max-w-4xl space-y-16">
          
          {/* Founder Section */}
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
                  <p className="text-sm font-medium text-muted-foreground">Science Explorer &amp; Digital Technology Specialist</p>
                </div>
                
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  &quot;Science is not merely a collection of isolated facts—it is a continuous pursuit of truth through empirical verification. I founded Daily Science News to translate dense academic papers, astrophysical telemetry, and peer-reviewed studies into accessible, context-rich journalism for readers worldwide.&quot;
                </p>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                  <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full border">Planetary Science &amp; Astronomy</span>
                  <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full border">AI &amp; Computational Physics</span>
                  <span className="px-3 py-1 bg-muted text-foreground text-xs font-semibold rounded-full border">Science Communication</span>
                </div>
              </div>
            </div>
          </section>

          {/* Editorial Methodology & Fact-Checking */}
          <section className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Verification Process</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">How We Verify Scientific News</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                In an era of viral misinformation and exaggerated headlines, our editorial desk enforces a multi-tier sourcing policy:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border p-6 rounded-2xl space-y-3">
                <div className="p-3 w-fit rounded-xl bg-primary/10 text-primary">
                  <FileCheck2 size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Primary Peer-Reviewed Literature</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We base reports on published research in recognized journals such as Nature, Science, The Astrophysical Journal, Physical Review Letters, Lancet, and preprints on arXiv.org.
                </p>
              </div>

              <div className="bg-card border p-6 rounded-2xl space-y-3">
                <div className="p-3 w-fit rounded-xl bg-secondary/10 text-secondary">
                  <Globe size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Direct Agency Telemetry</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mission updates are verified using official datasets, raw imagery, and flight bulletins directly from space agencies including NASA, ESA, JAXA, ISRO, and scientific consortia like CERN.
                </p>
              </div>

              <div className="bg-card border p-6 rounded-2xl space-y-3">
                <div className="p-3 w-fit rounded-xl bg-emerald-500/10 text-emerald-600">
                  <Scale size={24} />
                </div>
                <h3 className="text-lg font-bold text-foreground">Contextual Limitations</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We explicitly report study limitations, sample sizes, and alternative hypotheses. We never present early in-vitro results or unverified rumors as definitive medical cures or absolute cosmic facts.
                </p>
              </div>
            </div>
          </section>

          {/* Corrections Policy */}
          <section className="bg-muted/40 border rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <RefreshCw size={20} />
              </div>
              <h2 className="text-xl font-bold text-foreground">Corrections &amp; Updates Policy</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Accuracy is the cornerstone of trust. When a factual error, ambiguous wording, or new scientific development arises regarding a published article:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>
                <strong className="text-foreground">Prompt Editorial Updates:</strong> We promptly correct the inaccurate information within the text.
              </li>
              <li>
                <strong className="text-foreground">Transparent Correction Notes:</strong> When a substantive error is amended, a clear &quot;Correction Note&quot; is appended to the bottom or top of the report detailing what was changed and the timestamp of the update.
              </li>
              <li>
                <strong className="text-foreground">Reader Submissions:</strong> Readers and researchers are encouraged to notify our editorial team of any discrepancy by contacting us directly at <a href="mailto:contact@sciencenewshub.click" className="text-primary underline">contact@sciencenewshub.click</a>.
              </li>
            </ul>
          </section>

          {/* Responsible AI Transparency Disclosure */}
          <section className="bg-muted/40 border rounded-2xl p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600">
                <Cpu size={20} />
              </div>
              <h2 className="text-xl font-bold text-foreground">AI Usage &amp; Editorial Oversight Disclosure</h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              At Daily Science News, we utilize artificial intelligence strictly as a supportive tool for data synthesis, linguistic grammar optimization, and preliminary research outlines. We maintain strict human editorial oversight:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>No article is published without complete human editorial review, factual cross-examination, and editorial approval by Dulaksha Sandeepa.</li>
              <li>Scientific claims, author attributions, numerical data, and citations are verified independently against primary academic sources.</li>
              <li>We do not operate automated content farms or auto-generated low-value blogs.</li>
            </ul>
          </section>

          {/* Commercial Independence & Editorial Ethics */}
          <section className="bg-card border rounded-2xl p-8 space-y-4">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="text-primary" /> Editorial Independence
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Daily Science News operates completely independent of external corporate sponsors, pharmaceutical firms, or space contractors. Our coverage decisions are governed exclusively by scientific significance and public educational value. Advertising displayed on this site adheres to Google AdSense program policies and does not influence our editorial assessments or research critiques.
            </p>
            <div className="pt-2">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Contact the Editorial Desk <Mail size={16} />
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
