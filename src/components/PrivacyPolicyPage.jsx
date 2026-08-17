import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Privacy Policy - Science News Publishing"
        description="Official Privacy Policy for Science News Publishing. Learn about how we collect, use, and protect your data, including Google AdSense cookies and DART policies."
        keywords="privacy policy, Science News Publishing, Google AdSense cookies, DART cookie, data protection, GDPR, CCPA"
        canonicalUrl="https://sciencenewshub.click/privacy-policy"
        ogType="website"
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl space-y-10">
        
        {/* Header */}
        <div className="space-y-4 border-b pb-8">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
            <Shield size={18} /> Legal &amp; Compliance
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-muted-foreground text-sm">Last Updated: August 16, 2026</p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground text-sm md:text-base leading-relaxed">
          
          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Lock className="text-primary" size={20} /> 1. Introduction
            </h2>
            <p>
              At Science News Publishing (accessible from <a href="https://sciencenewshub.click" className="text-primary hover:underline">https://sciencenewshub.click</a>), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Science News Publishing and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">2. Log Files</h2>
            <p>
              Science News Publishing follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services&apos; analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users&apos; movement on the website, and gathering demographic information.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl border-primary/30">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="text-primary" size={20} /> 3. Cookies and Web Beacons (Google AdSense Compliance)
            </h2>
            <p>
              Like any other website, Science News Publishing uses &apos;cookies&apos;. These cookies are used to store information including visitors&apos; preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users&apos; experience by customizing our web page content based on visitors&apos; browser type and/or other information.
            </p>
            
            <div className="bg-muted p-4 rounded-xl space-y-2 mt-4">
              <h3 className="font-bold text-foreground text-sm">Google DoubleClick DART Cookie</h3>
              <p className="text-xs md:text-sm">
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to <a href="https://sciencenewshub.click" className="text-primary hover:underline">sciencenewshub.click</a> and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>
              </p>
            </div>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">4. Advertising Partners Privacy Policies</h2>
            <p>
              Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Science News Publishing, which are sent directly to users&apos; browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p>
              Note that Science News Publishing has no access to or control over these cookies that are used by third-party advertisers.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">5. Google Analytics 4 &amp; Usage Tracking</h2>
            <p>
              We use Google Analytics (GA4) to understand how visitors interact with our content, which articles are most read, and how we can improve our reporting. Google Analytics collects data such as pages viewed, duration of visit, operating system, device type, and approximate geographic location (IP anonymization enabled). This data is processed in aggregate and is not linked to personally identifiable information.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">6. GDPR, CCPA &amp; CPRA Privacy Rights</h2>
            <p>
              Under the General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA/CPRA), users have specific data protection rights:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
              <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data under certain conditions.</li>
              <li><strong>The right to restrict processing</strong> – You have the right to object to or restrict processing of your personal data.</li>
              <li><strong>The right to opt-out</strong> – You have the right to opt-out of the sale or sharing of your personal data for cross-context behavioral advertising.</li>
            </ul>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">7. Managing and Revoking Cookie Consent</h2>
            <p>
              You can modify or withdraw your cookie preferences at any time using the cookie settings banner available on our website or through your web browser&apos;s privacy settings. Declining advertising cookies will not remove ads, but will make ads non-personalized.
            </p>
          </section>

          <section className="space-y-3 bg-card border p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground">8. Children&apos;s Information (COPPA)</h2>
            <p>
              Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. Science News Publishing does not knowingly collect any Personal Identifiable Information from children under the age of 13.
            </p>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
