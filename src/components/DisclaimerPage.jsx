import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { AlertCircle, FileText, HeartPulse, ExternalLink, HelpCircle, ShieldCheck } from 'lucide-react';

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Disclaimer - Daily Science News"
        description="Official Disclaimer for Daily Science News. Important information regarding scientific news, health/medical reporting, external references, and editorial policies."
        keywords="disclaimer, Daily Science News, medical disclaimer, scientific reporting disclaimer, editorial policy"
        canonicalUrl="https://sciencenewshub.click/disclaimer"
        ogType="website"
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl space-y-10">
        
        {/* Header */}
        <div className="space-y-4 border-b pb-8">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <AlertCircle size={18} /> Legal &amp; Editorial Disclaimers
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Website Disclaimer</h1>
          <p className="text-muted-foreground text-sm">Last Updated: August 17, 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground text-sm md:text-base leading-relaxed">
          
          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileText className="text-primary" size={20} /> 1. General Informational Purpose
            </h2>
            <p>
              The information provided by <strong>Daily Science News</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) on <a href="https://sciencenewshub.click" className="text-primary hover:underline">https://sciencenewshub.click</a> (the &quot;Site&quot;) is for general informational, educational, and journalistic purposes only. All information on the Site is provided in good faith, summarizing peer-reviewed research papers, space agency press releases, and scientific journals.
            </p>
            <p>
              While we strive to keep information accurate and up to date, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any scientific claim or data presented on the Site.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl border-amber-500/30">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <HeartPulse className="text-amber-500" size={20} /> 2. Medical &amp; Health Information Disclaimer (No Medical Advice)
            </h2>
            <p>
              The Site contains articles covering medical research, pharmaceutical developments, neuroscience, genetics, and health technologies. <strong>This content is strictly for journalistic and educational purposes and DOES NOT constitute professional medical advice, diagnosis, or treatment.</strong>
            </p>
            <p>
              Never disregard professional medical advice or delay in seeking it because of something you have read on Daily Science News. Always consult a qualified healthcare provider with any questions you may have regarding a medical condition or treatment plan.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <ExternalLink className="text-primary" size={20} /> 3. External Links &amp; Scientific Citations
            </h2>
            <p>
              Our articles regularly link to external websites such as NASA, ESA, Nature, Science, arXiv, university research centers, and third-party institutions. Such external links are investigated, monitored, and checked for relevance, but we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on external sites.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="text-primary" size={20} /> 4. Advertising &amp; Google AdSense Disclosure
            </h2>
            <p>
              Daily Science News participates in advertising networks, including <strong>Google AdSense</strong>. Third-party advertisers may display contextual advertisements on our pages. The presence of an advertisement on our Site does not constitute an endorsement, guarantee, or recommendation of any product, service, or business advertised.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="text-primary" size={20} /> 5. Contact &amp; Editorial Inquiries
            </h2>
            <p>
              If you have any questions regarding this Disclaimer or wish to report a factual error in any of our published articles, please reach out to our editorial desk via our <a href="/contact" className="text-primary hover:underline">Contact Us page</a> or by email at <a href="mailto:contact@sciencenewshub.click" className="text-primary hover:underline">contact@sciencenewshub.click</a>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
