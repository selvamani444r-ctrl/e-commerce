import React, { useState, useEffect } from 'react';
import { ExternalLink, ShieldCheck, CheckCircle2, ArrowRight, Tag, Clock, X } from 'lucide-react';

export function AffiliateRedirectModal({
  product,
  merchant,
  onClose,
  onProceed
}) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Auto proceed
      onProceed();
    }
  }, [countdown]);

  if (!product || !merchant) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '520px', padding: '28px', textAlign: 'center' }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--bg-card-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-secondary)'
          }}
        >
          <X size={18} />
        </button>

        {/* Animated Redirect Pulsing Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--color-secondary-light)',
          color: '#2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          position: 'relative'
        }}>
          <ExternalLink size={28} />
          <span style={{
            position: 'absolute',
            inset: '-6px',
            borderRadius: '50%',
            border: '2px dashed #2563EB',
            animation: 'spin 8s linear infinite'
          }} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px' }}>
          Redirecting to {merchant.name}...
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Applying verified discount tracker & matching lowest current offer.
        </p>

        {/* Product Snapshot Box */}
        <div style={{
          background: 'var(--bg-card-subtle)',
          border: '1px solid var(--border-light)',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
          textAlign: 'left',
          marginBottom: '20px'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '64px', height: '64px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '10px', padding: '4px' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
              {product.brand}
            </div>
            <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
              {product.name}
            </div>
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#16A34A', marginTop: '2px' }}>
              ₹{merchant.price.toLocaleString('en-IN')}
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '6px', fontWeight: 500 }}>
                ({product.discount || 'Special Offer'})
              </span>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '22px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={15} color="#16A34A" /> Direct Retail Partner
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={15} color="#2563EB" /> 100% Genuine Warranty
          </span>
        </div>

        {/* Proceed Action Button */}
        <button
          onClick={onProceed}
          className="btn-lime"
          style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '12px', marginBottom: '14px' }}
        >
          <span>Continue to {merchant.name} ({countdown}s)</span>
          <ArrowRight size={17} />
        </button>

        {/* Affiliate Disclosure Micro-Text */}
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.45 }}>
          <strong>Transparency Notice:</strong> Nexus Nook may earn an affiliate commission when you complete a purchase on {merchant.name}. You pay the exact same price (or lower with our tracked coupons). Prices and availability are verified at the time of redirect.
        </div>
      </div>

      <style>{`
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
