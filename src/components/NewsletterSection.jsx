import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles, Send, ShieldCheck } from 'lucide-react';

export function NewsletterSection({ onShowToast }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
      if (onShowToast) {
        onShowToast(`Subscribed! Weekly deal alerts will be sent to ${email}`);
      }
      setEmail('');
    }
  };

  return (
    <section style={{ padding: '48px 0', background: 'var(--bg-card-subtle)' }}>
      <div className="container-marketplace">
        
        <div style={{
          background: 'linear-gradient(135deg, #0B1220 0%, #172554 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: '44px 32px',
          textAlign: 'center',
          boxShadow: 'var(--shadow-dropdown)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '260px',
            height: '260px',
            background: 'radial-gradient(circle, rgba(132, 204, 22, 0.25) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none'
          }} />

          <div style={{ maxWidth: '640px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255,255,255,0.1)',
              padding: '6px 14px',
              borderRadius: '999px',
              color: '#84CC16',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Mail size={14} /> VIP Deal Alerts
            </div>

            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px', color: '#FFFFFF' }}>
              Get Better Deals in Your Inbox
            </h2>

            <p style={{ fontSize: '15px', color: '#CBD5E1', lineHeight: 1.6, marginBottom: '28px' }}>
              Receive curated product discoveries, price drop notifications, buying guides, and selected offers from Nexus Nook.
            </p>

            {isSubscribed ? (
              <div style={{
                background: 'rgba(22, 163, 74, 0.2)',
                border: '1px solid #16A34A',
                padding: '14px 20px',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                color: '#86EFAC',
                fontWeight: 600
              }}>
                <CheckCircle size={20} /> You are on the VIP alert list! Check your inbox for your first curated digest.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                maxWidth: '480px',
                margin: '0 auto 16px auto',
                background: '#FFFFFF',
                padding: '5px',
                borderRadius: '14px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
              }}>
                <div style={{ paddingLeft: '12px', color: '#64748B' }}>
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  style={{
                    flex: 1,
                    padding: '10px 8px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#111827'
                  }}
                />
                <button
                  type="submit"
                  className="btn-lime"
                  style={{
                    padding: '11px 22px',
                    borderRadius: '10px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span>Subscribe</span>
                  <Send size={15} />
                </button>
              </form>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', color: '#94A3B8' }}>
              <ShieldCheck size={14} color="#84CC16" />
              <span>No spam ever. Unsubscribe anytime with a single click.</span>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 520px) {
          .newsletter-form {
            flex-direction: column !important;
            background: transparent !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .newsletter-form input {
            width: 100% !important;
            background: #FFFFFF !important;
            border-radius: 12px !important;
            padding: 12px 14px !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
          }
          .newsletter-form button {
            width: 100% !important;
            justify-content: center !important;
            border-radius: 12px !important;
            padding: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
