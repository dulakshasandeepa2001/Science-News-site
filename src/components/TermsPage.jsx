import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { FileCheck, ShieldAlert, Scale } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Terms of Service & Disclaimer - Science News Publishing"
        description="Terms of Service, Educational Scientific Content Disclaimer, and Intellectual Property Policies for Science News Publishing."
        keywords="terms of service, disclaimer, science news publishing, copyright notice, legal terms"
        canonicalUrl="https://sciencenewshub.click/terms"
        ogType="website"
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl space-y-10">
        
        {/* Header */}
        <div className="space-y-4 border-b pb-8">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Scale size={18} /> Legal Agreement &amp; Terms
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Terms of Service &amp; Disclaimer</h1>
          <p className="text-muted-foreground text-sm">Last Updated: August 16, 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground text-sm md:text-base leading-relaxed">
          
          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <FileCheck className="text-primary" size={20} /> 1. Terms of Agreement
            </h2>
            <p>
              By accessing and using Science News Publishing (accessible at <a href="https://sciencenewshub.click" className="text-primary hover:underline">https://sciencenewshub.click</a>), you agree to be bound by these Terms of Service, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl border-amber-500/30">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <ShieldAlert className="text-amber-500" size={20} /> 2. Scientific Content Disclaimer
            </h2>
            <p>
              The articles, blog posts, and scientific commentary provided on Science News Publishing are for informational and educational purposes only. While our editorial team makes every effort to verify facts against academic publications, peer-reviewed journals, and official space agency announcements, we make no representations or warranties of any kind regarding the completeness, accuracy, or reliability of any information contained on the site.
            </p>
            <p className="text-xs md:text-sm text-muted-foreground bg-muted p-3 rounded-lg">
              Medical, health, or technological reports published on this platform should not be treated as professional medical advice, diagnosis, or technical engineering specifications. Always consult qualified professionals before acting on health or technical data.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">3. Intellectual Property &amp; Copyright</h2>
            <p>
              All original text content, site branding, logo designs, and editorial commentary on Science News Publishing are the intellectual property of Science News Publishing and founder Dulaksha Sandeepa unless otherwise noted. Scientific imagery, mission renders, and astronomical photographs are used under fair use news reporting guidelines with appropriate attribution to primary agencies (NASA, ESA, ESO, INGV, etc.).
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">4. External Links Disclaimer</h2>
            <p>
              Science News Publishing may contain links to external third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">5. Governing Law &amp; Contact</h2>
            <p>
              These terms shall be governed and construed in accordance with the laws applicable to digital publishing. For any questions regarding these Terms of Service, please contact us via email at <a href="mailto:sandeepadulaksha93@gmail.com" className="text-primary hover:underline">sandeepadulaksha93@gmail.com</a>.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
