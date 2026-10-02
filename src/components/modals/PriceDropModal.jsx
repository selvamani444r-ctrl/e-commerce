import React, { useState } from 'react';
import { X, Bell, TrendingDown, CheckCircle2, ShieldCheck } from 'lucide-react';

export function PriceDropModal({ product, onClose, onSaveAlert }) {
  const [email, setEmail] = useState('');
  const [targetPrice, setTargetPrice] = useState(
    product ? Math.round(product.price * 0.9) : 0
  );
  const [isSaved, setIsSaved] = useState(false);

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSaved(true);
      if (onSaveAlert) {
        onSaveAlert(product, targetPrice, email);
      }
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px', padding: '28px' }}
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

        <div style={{
          width: '54px',
          height: '54px',
          borderRadius: '14px',
          background: 'var(--color-secondary-light)',
          color: '#2563EB',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <Bell size={26} />
        </div>

        <h3 style={{ fontSize: '20px', fontWeight: 800, textAlign: 'center', color: 'var(--text-main)', marginBottom: '6px' }}>
          Price Drop Alert
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '20px' }}>
          We monitor price fluctuations across online merchants every hour and send you an instant alert when it drops.
        </p>

        {/* Product mini bar */}
        <div style={{
          background: 'var(--bg-card-subtle)',
          borderRadius: '12px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px'
        }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '48px', height: '48px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '8px', padding: '2px' }}
          />
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.3 }}>
              {product.name}
            </div>
            <div style={{ fontSize: '14px', fontWeight: 800, color: '#2563EB', marginTop: '2px' }}>
              Current Price: ₹{product.price.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {isSaved ? (
          <div style={{
            background: '#F0FDF4',
            border: '1px solid #BBF7D0',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center',
            color: '#166534',
            fontWeight: 700
          }}>
            <CheckCircle2 size={24} style={{ margin: '0 auto 6px auto', display: 'block' }} />
            Alert activated! We will email you at {email} as soon as this item hits ₹{targetPrice.toLocaleString('en-IN')}.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Notify Me If Price Reaches or Falls Below:
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>₹</span>
                <input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(Number(e.target.value))}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 28px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-light)',
                    background: 'var(--bg-card)',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Your Email Address:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-light)',
                  background: 'var(--bg-card)',
                  fontSize: '14px',
                  color: 'var(--text-main)',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '12px', fontSize: '14px', borderRadius: '10px', marginTop: '6px' }}
            >
              <span>Set Price Drop Alert</span>
              <TrendingDown size={16} />
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
