import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Tag, Star, CheckCircle, ExternalLink, Zap } from 'lucide-react';

export function HeroSection({ onExploreDeals, onBrowseCategories, onSelectProduct, sampleProducts }) {
  // Select hero floating products
  const sonyXM5 = sampleProducts?.find(p => p.id === 'prod-sony-wh1000xm5') || {
    name: 'Sony WH-1000XM5 ANC',
    price: 24999,
    originalPrice: 34990,
    discount: '29% OFF',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80'
  };

  const macbook = sampleProducts?.find(p => p.id === 'prod-apple-macbook-air-m3') || {
    name: 'MacBook Air 13.6″ M3',
    price: 124990,
    originalPrice: 134900,
    discount: '7% OFF',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80'
  };

  return (
    <section style={{
      background: 'linear-gradient(180deg, var(--bg-header-sub) 0%, var(--bg-body) 100%)',
      padding: '48px 0 36px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative ambient radial glow */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, rgba(132, 204, 22, 0.05) 50%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        filter: 'blur(60px)'
      }} />

      <div className="container-marketplace">
        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center'
        }}>
          
          {/* LEFT: HERO COPY & CALL TO ACTIONS */}
          <div className="hero-left-content" style={{ zIndex: 2 }}>
            {/* Pill Tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(37, 99, 235, 0.12)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              padding: '6px 14px',
              borderRadius: '9999px',
              color: '#38BDF8',
              fontSize: '12.5px',
              fontWeight: 700,
              letterSpacing: '0.02em',
              marginBottom: '20px'
            }}>
              <Zap size={14} color="#84CC16" />
              <span>Smart Price Comparison & Affiliate Discovery</span>
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(32px, 4.5vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              marginBottom: '18px',
              color: 'var(--text-main)'
            }}>
              Discover Products <br />
              <span className="text-gradient-blue">You’ll Love.</span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '560px',
              marginBottom: '32px'
            }}>
              Explore trending products, compare offers, discover trusted brands, and find the right deal before you buy.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta-buttons" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '28px' }}>
              <button
                onClick={onExploreDeals}
                className="btn-deal btn-deal-lg"
                style={{ width: 'auto', padding: '14px 28px' }}
              >
                <span>Explore Deals</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={onBrowseCategories}
                className="btn-secondary"
                style={{ padding: '14px 24px', borderRadius: '14px', fontSize: '15px' }}
              >
                Browse Categories
              </button>
            </div>

            {/* Value Indicators */}
            <div className="hero-value-indicators" style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '18px',
              fontSize: '13px',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="#16A34A" /> 100% Verified Deals
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="#16A34A" /> Multiple Merchant Comparisons
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} color="#16A34A" /> Zero Hidden Charges
              </div>
            </div>
          </div>

          {/* RIGHT: REALISTIC HERO PRODUCT COMPOSITION & FLOATING CARDS */}
          <div style={{ position: 'relative', minHeight: '440px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Main Showcase Showcase Card */}
            <div style={{
              width: '100%',
              maxWidth: '430px',
              background: 'var(--bg-card)',
              borderRadius: '24px',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-dropdown)',
              overflow: 'hidden',
              position: 'relative',
              zIndex: 3
            }}>
              {/* Product Hero Image */}
              <div style={{ position: 'relative', height: '260px', background: 'var(--bg-card-subtle)', overflow: 'hidden' }}>
                <img
                  src={sonyXM5.image}
                  alt={sonyXM5.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                />
                
                {/* Floating Best Deal Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  background: 'linear-gradient(135deg, #84CC16 0%, #65A30D 100%)',
                  color: '#0B1220',
                  fontWeight: 800,
                  fontSize: '11.5px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Tag size={13} /> {sonyXM5.discount || '29% OFF'}
                </div>

                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(11, 18, 32, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  Trending Deal
                </div>
              </div>

              {/* Showcase Card Details */}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                    {sonyXM5.brand || 'Sony Audio'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>
                    <Star size={14} fill="#F59E0B" /> {sonyXM5.rating || 4.8} <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>(14.8k)</span>
                  </div>
                </div>

                <h3 style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.3, marginBottom: '12px' }}>
                  {sonyXM5.name}
                </h3>

                {/* Multi-Store Price Comparison Visual */}
                <div style={{
                  background: 'var(--bg-card-subtle)',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  marginBottom: '16px'
                }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Compared across 4 online stores:
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                        ₹{sonyXM5.price.toLocaleString('en-IN')}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'line-through', marginLeft: '8px' }}>
                        ₹{sonyXM5.originalPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      Save ₹{(sonyXM5.originalPrice - sonyXM5.price).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* View Deal Button */}
                <button
                  onClick={() => onSelectProduct(sonyXM5)}
                  className="btn-deal"
                  style={{ width: '100%', padding: '12px' }}
                >
                  <span>View Deal & Compare Prices</span>
                  <ExternalLink size={15} />
                </button>
              </div>
            </div>

            {/* FLOATING CARD 1: MacBook Air M3 (Top Right) */}
            <div className="float-anim" style={{
              position: 'absolute',
              top: '-15px',
              right: '-20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              padding: '12px 16px',
              boxShadow: 'var(--shadow-dropdown)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 4,
              maxWidth: '250px'
            }}>
              <img
                src={macbook.image}
                alt="MacBook"
                style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#84CC16', textTransform: 'uppercase' }}>
                  Top Ultrabook
                </div>
                <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px' }}>
                  MacBook Air M3
                </div>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB' }}>
                  ₹{macbook.price.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* FLOATING CARD 2: Price Drop Tracker (Bottom Left) */}
            <div className="float-anim-delay" style={{
              position: 'absolute',
              bottom: '-10px',
              left: '-25px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              padding: '12px 16px',
              boxShadow: 'var(--shadow-dropdown)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              zIndex: 4,
              maxWidth: '260px'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: '#FEF2F2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#EF4444'
              }}>
                <TrendingUp size={22} />
              </div>
              <div>
                <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#EF4444', textTransform: 'uppercase' }}>
                  Price Dropped Just Now
                </div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-main)' }}>
                  Samsung Galaxy S24 Ultra
                </div>
                <div style={{ fontSize: '11px', color: '#16A34A', fontWeight: 600 }}>
                  Lowest verified in 30 days
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .hero-left-content {
            text-align: center !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
          .hero-left-content h1 {
            text-align: center !important;
          }
          .hero-left-content p {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .hero-cta-buttons {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            gap: 12px !important;
          }
          .hero-cta-buttons button {
            width: 100% !important;
            max-width: 320px !important;
            justify-content: center !important;
            text-align: center !important;
          }
          .hero-value-indicators {
            justify-content: center !important;
            text-align: center !important;
          }
          .float-anim, .float-anim-delay {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
