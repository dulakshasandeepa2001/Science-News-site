import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Contact Us - Science News Publishing"
        description="Get in touch with the editorial team at Science News Publishing. Send press releases, editorial feedback, or inquiries to founder Dulaksha Sandeepa."
        keywords="contact science news, editorial contact, press release submission, Dulaksha Sandeepa email"
        canonicalUrl="https://sciencenewshub.click/contact"
        ogType="website"
      />
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary px-3 py-1 bg-primary/10 rounded-full">
            We&apos;d Love to Hear From You
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Our Team</h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Have a scientific tip, press release, correction, or feedback? Reach out to our editorial team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-card border p-6 rounded-2xl space-y-6 shadow-sm">
              <h3 className="text-lg font-bold border-b pb-3">Editorial Contact</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs text-muted-foreground">Direct Email</span>
                    <a href="mailto:dulakshasandeepa2001@gmail.com" className="font-medium text-foreground hover:text-primary transition-colors break-all">
                      dulakshasandeepa2001@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs text-muted-foreground">Response Guarantee</span>
                    <p className="text-xs text-muted-foreground">We aim to respond to all legitimate inquiries within 24 to 48 business hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs text-muted-foreground">Location</span>
                    <p className="text-xs text-muted-foreground">Sri Lanka • Digital Global Publishing</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 border p-6 rounded-2xl space-y-2">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" /> Press Releases
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Researchers and academic press officers are invited to submit embargoed papers and press kits directly to our email.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-card border p-8 rounded-3xl shadow-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold">Message Sent Successfully!</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Thank you for reaching out to Science News Publishing. Our founder and editorial team will review your message shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 bg-muted font-semibold text-sm rounded-xl hover:bg-muted/80 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold border-b pb-4">Send a Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dr. Alex Morgan"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-2.5 text-sm border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-2.5 text-sm border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subject / Topic</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Editorial Feedback / Correction">Editorial Feedback / Correction</option>
                    <option value="Press Release Submission">Press Release Submission</option>
                    <option value="Advertising / Partnership">Advertising / Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Message</label>
                  <textarea 
                    rows={5}
                    required
                    placeholder="Write your message details here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-2.5 text-sm border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-y"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
