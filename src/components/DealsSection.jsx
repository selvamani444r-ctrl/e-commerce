import React, { useState, useEffect } from 'react';
import { Flame, Clock, Tag, ExternalLink, Zap, ArrowRight, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

export function DealsSection({
  products,
  onSelectProduct,
  onViewDeal
}) {
  // Live dynamic countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 42, seconds: 18 });
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 12, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n) => String(n).padStart(2, '0');

  // Flash deals & heavy discount products
  const allDeals = products.filter(p => p.isFlashSale || parseInt(p.discount) >= 25);
  const dealProducts = showAll ? allDeals : allDeals.slice(0, 4);

  return (
    <section id="todays-deals-section" style={{
      padding: '52px 0',
      background: 'linear-gradient(180deg, var(--bg-body) 0%, var(--bg-card-subtle) 100%)',
      width: '100%',
      overflow: 'hidden'
    }}>
      <div className="container-marketplace">
        
        {/* Deals Banner Header with Countdown */}
        <div className="deals-banner-header" style={{
          background: 'linear-gradient(135deg, #0B1220 0%, #1E293B 100%)',
          color: '#FFFFFF',
          borderRadius: '20px',
          padding: '24px 30px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: 'var(--shadow-dropdown)'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.2)', color: '#F87171', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
              <Flame size={14} color="#EF4444" /> Limited Time Flash Sale
            </div>
            <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              Today’s Best Deals & Price Slashes
            </h2>
            <p style={{ fontSize: '14px', color: '#94A3B8', marginTop: '4px' }}>
              Explore selected offers and discover products that match your budget and interests
            </p>
          </div>

          {/* Countdown Clock Box */}
          <div className="deals-clock-box" style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1', fontSize: '13px', fontWeight: 600 }}>
              <Clock size={18} color="#84CC16" /> Deal ends in:
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                background: '#070B13',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 12px',
                borderRadius: '10px',
                textAlign: 'center',
                minWidth: '46px'
              }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#84CC16', fontFamily: 'monospace' }}>
                  {formatDigits(timeLeft.hours)}
                </span>
                <div style={{ fontSize: '9.5px', color: '#94A3B8', textTransform: 'uppercase' }}>HRS</div>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#64748B' }}>:</span>
              
              <div style={{
                background: '#070B13',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 12px',
                borderRadius: '10px',
                textAlign: 'center',
                minWidth: '46px'
              }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#84CC16', fontFamily: 'monospace' }}>
                  {formatDigits(timeLeft.minutes)}
                </span>
                <div style={{ fontSize: '9.5px', color: '#94A3B8', textTransform: 'uppercase' }}>MIN</div>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 800, color: '#64748B' }}>:</span>
              
              <div style={{
                background: '#070B13',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '8px 12px',
                borderRadius: '10px',
                textAlign: 'center',
                minWidth: '46px'
              }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#84CC16', fontFamily: 'monospace' }}>
                  {formatDigits(timeLeft.seconds)}
                </span>
                <div style={{ fontSize: '9.5px', color: '#94A3B8', textTransform: 'uppercase' }}>SEC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Deals Cards Grid */}
        <div className="deals-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          width: '100%'
        }}>
          {dealProducts.map(product => {
            const bestMerchant = product.merchants?.find(m => m.isBestPrice) || product.merchants?.[0];
            const claimedPercent = Math.min(94, Math.max(45, (product.id.length * 7) % 95));

            return (
              <div
                key={product.id}
                className="nn-card"
                style={{
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                {/* Discount Badge & Timer pill */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{
                    background: '#EF4444',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px'
                  }}>
                    {product.discount || 'LIMITED DEAL'}
                  </span>
                  
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> Ends soon
                  </span>
                </div>

                {/* Product Image */}
                <div
                  onClick={() => onSelectProduct(product)}
                  style={{
                    height: '180px',
                    width: '100%',
                    background: 'var(--bg-card-subtle)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '14px',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxHeight: '150px', maxWidth: '85%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>

                {/* Product Name */}
                <h3
                  onClick={() => onSelectProduct(product)}
                  style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    lineHeight: 1.35,
                    marginBottom: '8px',
                    cursor: 'pointer',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.name}
                </h3>

                {/* Claimed Progress Bar */}
                <div style={{ marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    <span>Claimed: <strong>{claimedPercent}%</strong></span>
                    <span style={{ color: '#EF4444', fontWeight: 600 }}>Limited Stock</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'var(--border-light)', borderRadius: '999px', overflow: 'hidden' }}>
                    <div style={{ width: `${claimedPercent}%`, height: '100%', background: 'linear-gradient(90deg, #EF4444 0%, #F59E0B 100%)', borderRadius: '999px' }} />
                  </div>
                </div>

                {/* Price Display */}
                <div style={{ marginTop: 'auto', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)' }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Verified on: <strong style={{ color: '#2563EB' }}>{bestMerchant?.name || 'Partner Store'}</strong>
                  </div>
                </div>

                {/* Affiliate CTA */}
                <button
                  onClick={() => onViewDeal(product, bestMerchant)}
                  className="btn-deal"
                >
                  <span>View Deal</span>
                  <ExternalLink size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Centered Read More / Show More Button */}
        {allDeals.length > 4 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '32px', width: '100%' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 28px',
                borderRadius: '12px',
                fontSize: '13.5px',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>{showAll ? 'Show Less' : `Read More Best Deals (${allDeals.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .deals-banner-header {
            text-align: center !important;
            justify-content: center !important;
            padding: 20px 16px !important;
          }
          .deals-clock-box {
            justify-content: center !important;
          }
          .deals-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
