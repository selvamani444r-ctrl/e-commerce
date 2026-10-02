import React, { useState, useEffect } from 'react';
import { Award, Clock, Star, ExternalLink, ShieldCheck, Check, Sparkles, TrendingDown } from 'lucide-react';

export function DealOfTheDay({ product, onViewDeal, onSelectProduct }) {
  // Urgency Timer for Deal of the Day
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 21, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 10, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDigits = (n) => String(n).padStart(2, '0');

  // Fallback to LG OLED TV if not passed
  const deal = product || {
    id: "prod-lg-oled-55-c3",
    name: "LG 55-inch evo C3 Series 4K Smart OLED TV (OLED55C3PSA)",
    brand: "LG",
    category: "appliances",
    price: 104990,
    originalPrice: 174990,
    discount: "40% OFF",
    rating: 4.8,
    reviewCount: 4120,
    dealScore: 9.9,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=700&q=80",
    features: [
      "Self-lit OLED pixels delivering perfect black and infinite contrast",
      "α9 AI Processor Gen6 with AI Super Upscaling 4K",
      "Ultimate gaming: 0.1ms response time, NVIDIA G-Sync, AMD FreeSync",
      "Dolby Vision IQ and Dolby Atmos cinema sound with AI Sound Pro 9.1.2"
    ],
    merchants: [
      { name: "Amazon India", price: 104990, originalPrice: 174990, isBestPrice: true, shipping: "Free Scheduled Delivery & Installation" }
    ]
  };

  const savings = deal.originalPrice - deal.price;
  const bestMerchant = deal.merchants?.find(m => m.isBestPrice) || deal.merchants?.[0];

  return (
    <section style={{ padding: '48px 0', background: 'var(--bg-body)' }}>
      <div className="container-marketplace">
        
        <div className="deal-of-day-card" style={{
          background: 'var(--bg-card)',
          borderRadius: '24px',
          border: '1.5px solid rgba(132, 204, 22, 0.4)',
          boxShadow: 'var(--shadow-dropdown)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '0'
        }}>
          
          {/* LEFT: LARGE PRODUCT IMAGE WITH FLOATING TAG */}
          <div className="deal-day-img-box" style={{
            background: 'var(--bg-card-subtle)',
            padding: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              background: '#0B1220',
              color: '#84CC16',
              padding: '6px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(132, 204, 22, 0.3)'
            }}>
              <Award size={15} /> DEAL OF THE DAY
            </div>

            <img
              src={deal.image}
              alt={deal.name}
              style={{
                maxHeight: '340px',
                maxWidth: '90%',
                objectFit: 'contain',
                transition: 'transform 0.4s ease'
              }}
              className="deal-day-img"
            />
          </div>

          {/* RIGHT: DETAILS, SAVINGS CALCULATOR, TIMER & CTA */}
          <div className="deal-day-content-box" style={{ padding: '36px', display: 'flex', flexDirection: 'column' }}>
            
            {/* Top row: Brand & Rating */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {deal.brand} Flagship Entertainment
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 700, color: '#F59E0B' }}>
                <Star size={15} fill="#F59E0B" /> {deal.rating} ({deal.reviewCount?.toLocaleString('en-IN')} reviews)
              </div>
            </div>

            <h3
              onClick={() => onSelectProduct(deal)}
              style={{
                fontSize: '24px',
                fontWeight: 800,
                lineHeight: 1.3,
                color: 'var(--text-main)',
                marginBottom: '16px',
                cursor: 'pointer'
              }}
            >
              {deal.name}
            </h3>

            {/* Savings Calculator Box */}
            <div style={{
              background: 'var(--bg-card-subtle)',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              padding: '16px 20px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Special Reference Price</div>
                  <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    ₹{deal.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                    M.R.P: ₹{deal.originalPrice.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 800, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingDown size={18} /> You Save ₹{savings.toLocaleString('en-IN')} ({deal.discount})
                  </div>
                </div>
              </div>
            </div>

            {/* Key feature bullets */}
            {deal.features && (
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '22px' }}>
                {deal.features.slice(0, 3).map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                    <Check size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Live Urgency Countdown Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#0B1220',
              color: '#FFFFFF',
              padding: '12px 18px',
              borderRadius: '12px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
                <Clock size={16} color="#84CC16" />
                <span>Price lock expires in:</span>
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '16px', fontWeight: 800, color: '#84CC16', letterSpacing: '0.05em' }}>
                {formatDigits(timeLeft.hours)}h : {formatDigits(timeLeft.minutes)}m : {formatDigits(timeLeft.seconds)}s
              </div>
            </div>

            {/* View Deal Button */}
            <div className="deal-day-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: 'auto', flexWrap: 'wrap' }}>
              <button
                onClick={() => onViewDeal(deal, bestMerchant)}
                className="btn-lime"
                style={{ flex: 1, padding: '14px 24px', fontSize: '15px' }}
              >
                <span>View Deal at {bestMerchant?.name || 'Partner Store'}</span>
                <ExternalLink size={16} />
              </button>

              <button
                onClick={() => onSelectProduct(deal)}
                className="btn-secondary"
                style={{ padding: '14px 20px', fontSize: '14px' }}
              >
                Compare Offers
              </button>
            </div>

            {/* Micro disclaimer */}
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
              Prices provided for discovery. Final price & installation terms confirmed on merchant checkout.
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .deal-day-img:hover {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .deal-of-day-card {
            grid-template-columns: 1fr !important;
          }
          .deal-day-img-box {
            padding: 24px 16px !important;
          }
          .deal-day-content-box {
            padding: 24px 16px !important;
          }
          .deal-day-actions {
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
            width: 100% !important;
            gap: 10px !important;
          }
          .deal-day-actions button {
            width: 100% !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
