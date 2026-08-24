import { useState } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import SEOHead from './SEOHead.jsx';
import { Mail, MapPin, Send, CheckCircle2, MessageSquare, Clock, ExternalLink, Copy, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const EMAIL_ADDRESS = "sandeepadulaksha93@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMailtoOpen = () => {
    const subjectEncoded = encodeURIComponent(`[${formData.subject}] Message from ${formData.name || 'Website Visitor'}`);
    const bodyEncoded = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subjectEncoded}&body=${bodyEncoded}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);

    try {
      // Send form submission using free Web3Forms API to sandeepadulaksha93@gmail.com
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "09db56eb-811c-43f6-95ff-4ce291ca8234", // Web3Forms public forwarding key
          name: formData.name,
          email: formData.email,
          subject: `[Science News] ${formData.subject} - from ${formData.name}`,
          message: formData.message,
          to_email: EMAIL_ADDRESS
        })
      });

      const result = await response.json();
      if (result.success || response.ok) {
        setSubmitted(true);
      } else {
        // Fallback to mailto trigger if Web3Forms fails
        handleMailtoOpen();
        setSubmitted(true);
      }
    } catch (err) {
      console.warn("API submission error, falling back to mailto", err);
      handleMailtoOpen();
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead 
        title="Contact Us - Daily Science News"
        description="Get in touch with the editorial team at Daily Science News. Send press releases, editorial feedback, or inquiries to founder Dulaksha Sandeepa."
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
            Have a scientific tip, press release, correction, or feedback? Send a message directly to founder &amp; editor Dulaksha Sandeepa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Contact Info Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            <div className="bg-card border p-6 rounded-2xl space-y-6 shadow-sm">
              <h3 className="text-lg font-bold border-b pb-3">Editorial Contact</h3>
              
              <div className="space-y-5 text-sm">
                <div className="space-y-2">
                  <span className="font-semibold block text-xs text-muted-foreground">Direct Email Address</span>
                  <div className="p-3 rounded-xl bg-muted border flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-foreground truncate select-all">{EMAIL_ADDRESS}</span>
                    <button 
                      onClick={handleCopyEmail}
                      className="p-1.5 rounded-lg bg-background hover:bg-primary/10 hover:text-primary border transition-colors shrink-0"
                      title="Copy Email Address"
                    >
                      {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <div className="pt-1">
                  <a 
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-xs flex items-center justify-center gap-2 border border-primary/20 transition-colors"
                  >
                    <ExternalLink size={14} /> Open in Gmail / Mail App
                  </a>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs text-muted-foreground">Response Time</span>
                    <p className="text-xs text-muted-foreground">We aim to respond to all legitimate emails within 24 to 48 hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs text-muted-foreground">Location</span>
                    <p className="text-xs text-muted-foreground">Sri Lanka • Digital Global Platform</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 border p-6 rounded-2xl space-y-2">
              <h4 className="font-bold text-sm flex items-center gap-2">
                <MessageSquare size={16} className="text-primary" /> Press Releases
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Researchers and academic press officers are invited to send embargoed papers and press kits directly to <a href={`mailto:${EMAIL_ADDRESS}`} className="text-primary hover:underline">{EMAIL_ADDRESS}</a>.
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
                <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Daily Science News. Your message has been routed directly to founder Dulaksha Sandeepa (<span className="font-semibold text-foreground">{EMAIL_ADDRESS}</span>).
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-muted font-semibold text-sm rounded-xl hover:bg-muted/80 transition-colors mt-2"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold border-b pb-4">Send a Direct Message</h3>
                
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

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="flex-1 px-8 py-3 bg-primary text-primary-foreground font-bold text-sm rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 disabled:opacity-50"
                  >
                    <Send size={16} /> {loading ? "Sending Message..." : "Send Message Online"}
                  </button>

                  <button 
                    type="button" 
                    onClick={handleMailtoOpen}
                    className="px-6 py-3 bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 border"
                  >
                    <ExternalLink size={15} /> Send via Email App
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
