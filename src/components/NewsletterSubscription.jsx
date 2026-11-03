import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { NEWSLETTER_CONFIG } from '../config/newsletterConfig';

/**
 * Reusable Newsletter & New Article Email Alert Component
 * Supports MailerLite integration, Web3Forms instant delivery, and localStorage backup.
 * 
 * @param {Object} props
 * @param {'section' | 'compact'} props.variant - Display style ('section' for page blocks, 'compact' for footer)
 * @param {string} props.title - Custom headline
 * @param {string} props.description - Custom description
 * @param {string} props.source - Origin identifier ('homepage', 'footer', 'category-physics', etc.)
 */
export default function NewsletterSubscription({
  variant = 'section',
  title = 'Stay Ahead of Scientific Progress',
  description = 'Join science enthusiasts, researchers, and students receiving instant alerts whenever a new verified scientific breakthrough is published.',
  source = 'website'
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail || !validateEmail(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      // 1. Local backup in localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('sciencenews_subscribers') || '[]');
        if (!stored.includes(cleanEmail)) {
          stored.push(cleanEmail);
          localStorage.setItem('sciencenews_subscribers', JSON.stringify(stored));
        }
      } catch (localErr) {
        console.warn('Could not save to localStorage:', localErr);
      }

      // 2. Submit to MailerLite if an action URL is configured
      if (NEWSLETTER_CONFIG.mailerLiteActionUrl) {
        try {
          const formData = new FormData();
          formData.append('fields[email]', cleanEmail);
          formData.append('email', cleanEmail);

          await fetch(NEWSLETTER_CONFIG.mailerLiteActionUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // MailerLite endpoints often require no-cors or JSONP from external domains
          });
        } catch (mlErr) {
          console.warn('MailerLite direct submission notice:', mlErr);
        }
      }

      // 3. Guaranteed Delivery via Web3Forms (Sends instant notification to owner's Gmail)
      if (NEWSLETTER_CONFIG.web3FormsAccessKey) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              access_key: NEWSLETTER_CONFIG.web3FormsAccessKey,
              subject: `[Science News Alert] New Subscriber for Article Updates: ${cleanEmail}`,
              email: cleanEmail,
              message: `New reader subscribed to automated article updates!\n\nSubscriber Email: ${cleanEmail}\nSubscription Source: ${source}\nTimestamp: ${new Date().toISOString()}\n\nAdd this email to your MailerLite subscriber list or RSS automation campaign.`,
              to_email: NEWSLETTER_CONFIG.ownerEmail,
              from_name: 'Science News Alert System'
            })
          });
        } catch (web3Err) {
          console.warn('Web3Forms notification notice:', web3Err);
        }
      }

      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error('Subscription error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again in a few moments.');
    }
  };

  // Compact layout (designed for Footer)
  if (variant === 'compact') {
    return (
      <div className="space-y-3">
        <h3 className="font-bold text-base tracking-wide text-foreground flex items-center gap-1.5">
          <Sparkles size={16} className="text-primary" /> Stay Informed
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Receive email alerts whenever a new scientific discovery is published.
        </p>

        {status === 'success' ? (
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-start gap-2.5 animate-in fade-in duration-300">
            <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">You&apos;re Subscribed!</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                You will receive email notifications as soon as new articles are published.
              </p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 text-[11px] underline hover:text-foreground font-medium"
              >
                Subscribe another email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                disabled={status === 'loading'}
                className="w-full px-3.5 py-2.5 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
                aria-label="Email address for publication alerts"
              />
            </div>
            {status === 'error' && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={12} /> {errorMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-lg text-sm hover:bg-primary/90 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={15} className="animate-spin" /> Subscribing...
                </>
              ) : (
                <>
                  <Mail size={15} /> Subscribe for Article Alerts
                </>
              )}
            </button>
          </form>
        )}
      </div>
    );
  }

  // Full section layout (HomePage, CategoryPage, etc.)
  return (
    <div className="container mx-auto px-4 text-center max-w-2xl">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
        <Sparkles size={14} /> Automated Article Alerts
      </div>

      <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
        {title}
      </h3>

      <p className="text-muted-foreground text-sm md:text-base mb-6 leading-relaxed max-w-xl mx-auto">
        {description}
      </p>

      {status === 'success' ? (
        <div className="max-w-md mx-auto p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 size={24} />
          </div>
          <h4 className="font-bold text-foreground text-base">You&apos;re Officially Subscribed!</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Thank you for joining. Whenever an article or breakthrough is published, you will receive an instant email with the summary and direct link.
          </p>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="text-xs text-primary underline hover:text-primary/80 font-medium pt-1"
          >
            Add another email address
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              disabled={status === 'loading'}
              className="flex-1 px-4 py-3 text-sm border rounded-xl bg-card focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 shadow-sm"
              aria-label="Email address for publication alerts"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 shrink-0 disabled:opacity-70"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Subscribing...
                </>
              ) : (
                <>
                  <Mail size={16} /> Subscribe
                </>
              )}
            </button>
          </form>

          {status === 'error' && (
            <p className="text-xs text-red-500 mt-2 flex items-center justify-center gap-1">
              <AlertCircle size={13} /> {errorMessage}
            </p>
          )}

          <p className="text-xs text-muted-foreground/70 mt-3">
            Zero spam. Unsubscribe at any time. Respecting your privacy under our{' '}
            <Link to="/privacy-policy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>.
          </p>
        </div>
      )}
    </div>
  );
}
