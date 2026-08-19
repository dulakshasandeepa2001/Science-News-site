import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Cookie, X, Check, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: true,
    advertising: true,
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem('science_news_cookie_consent');
      if (!consent) {
        // Show after a brief delay for smoother UX
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error('Error checking cookie consent:', e);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentData = {
      essential: true,
      analytics: true,
      advertising: true,
      timestamp: new Date().toISOString(),
      status: 'accepted_all'
    };
    try {
      localStorage.setItem('science_news_cookie_consent', JSON.stringify(consentData));
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  const handleDeclineNonEssential = () => {
    const consentData = {
      essential: true,
      analytics: false,
      advertising: false,
      timestamp: new Date().toISOString(),
      status: 'essential_only'
    };
    try {
      localStorage.setItem('science_news_cookie_consent', JSON.stringify(consentData));
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const consentData = {
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString(),
      status: 'custom'
    };
    try {
      localStorage.setItem('science_news_cookie_consent', JSON.stringify(consentData));
    } catch (e) {
      console.error(e);
    }
    setIsVisible(false);
    setShowPreferences(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-heading"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-card text-card-foreground border border-border/80 shadow-2xl rounded-2xl p-5 md:p-6 backdrop-blur-lg bg-card/95">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 text-primary font-bold text-base">
            <div className="p-2 rounded-xl bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <span id="cookie-consent-heading">Cookie &amp; Privacy Choices</span>
          </div>
          <button
            onClick={handleDeclineNonEssential}
            className="text-muted-foreground hover:text-foreground p-1 rounded-lg transition-colors"
            aria-label="Dismiss cookie notice"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4">
          We use cookies and similar tracking technologies to enhance site navigation, deliver personalized scientific content, analyze traffic with Google Analytics, and serve relevant advertisements through Google AdSense. Read our{' '}
          <Link to="/privacy-policy" className="text-primary underline font-medium hover:text-primary/80">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="text-primary underline font-medium hover:text-primary/80">
            Terms of Service
          </Link>.
        </p>

        {/* Detailed Preferences Panel */}
        {showPreferences && (
          <div className="space-y-3 mb-4 pt-3 border-t border-border/60 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <div>
                <p className="font-semibold text-foreground">Strictly Necessary</p>
                <p className="text-muted-foreground text-[11px]">Required for website security and core functionality.</p>
              </div>
              <span className="text-[11px] font-bold text-primary px-2 py-0.5 rounded bg-primary/10">Always Active</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <div>
                <p className="font-semibold text-foreground">Analytics &amp; Performance</p>
                <p className="text-muted-foreground text-[11px]">Helps us understand readership and improve articles.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                aria-label="Enable Analytics cookies"
              />
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40">
              <div>
                <p className="font-semibold text-foreground">Personalized Advertising (AdSense)</p>
                <p className="text-muted-foreground text-[11px]">Enables relevant ads through Google AdSense &amp; partners.</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.advertising}
                onChange={(e) => setPreferences({ ...preferences, advertising: e.target.checked })}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                aria-label="Enable Advertising cookies"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {showPreferences ? (
            <Button
              onClick={handleSavePreferences}
              size="sm"
              className="w-full bg-primary text-primary-foreground font-semibold"
            >
              <Check className="h-3.5 w-3.5 mr-1.5" /> Save Preferences
            </Button>
          ) : (
            <>
              <Button
                onClick={handleAcceptAll}
                size="sm"
                className="flex-1 bg-primary text-primary-foreground font-semibold"
              >
                Accept All
              </Button>
              <Button
                onClick={handleDeclineNonEssential}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Essential Only
              </Button>
              <Button
                onClick={() => setShowPreferences(true)}
                variant="ghost"
                size="sm"
                className="px-2.5"
                aria-label="Customize cookie settings"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
