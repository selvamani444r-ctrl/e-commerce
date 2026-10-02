import React, { useState } from 'react';
import { History, Trash2, ExternalLink, Star, ChevronDown, ChevronUp } from 'lucide-react';

export function RecentlyViewed({
  recentlyViewed,
  onSelectProduct,
  onViewDeal,
  onClearHistory
}) {
  const [showAll, setShowAll] = useState(false);

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section style={{ padding: '44px 0', background: 'var(--bg-body)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container-marketplace">
        
        {/* Section Header */}
        <div className="recently-viewed-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={20} color="#2563EB" />
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
              Recently Viewed
            </h2>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              ({recentlyViewed.length} items saved locally)
            </span>
          </div>

          <button
            onClick={onClearHistory}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: 'var(--text-muted)',
              background: 'transparent',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#EF4444'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Trash2 size={13} />
            <span>Clear History</span>
          </button>
        </div>

        {/* Recently Viewed Grid */}
        <div className="recently-viewed-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}>
          {recentlyViewed.map((product, idx) => {
            const bestMerchant = product.merchants?.find(m => m.isBestPrice) || product.merchants?.[0];
            return (
              <div
                key={product.id}
                className={`nn-card ${idx >= 4 && !showAll ? 'mobile-hide-item' : ''}`}
                style={{
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <div
                  onClick={() => onSelectProduct(product)}
                  style={{
                    height: '140px',
                    width: '100%',
                    background: 'var(--bg-card-subtle)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '10px',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxHeight: '110px', maxWidth: '85%', objectFit: 'contain' }}
                  />
                </div>

                <h4
                  onClick={() => onSelectProduct(product)}
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: 'var(--text-main)',
                    marginBottom: '4px',
                    cursor: 'pointer',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.name}
                </h4>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: 'auto', marginBottom: '8px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-main)' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onViewDeal(product, bestMerchant)}
                  className="btn-deal"
                  style={{ padding: '7px 10px', fontSize: '12px' }}
                >
                  <span>View Deal</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Centered Read More / Show More Button (Mobile only) */}
        {recentlyViewed.length > 4 && (
          <div className="mobile-read-more-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '28px', width: '100%' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>{showAll ? 'Show Less' : `Read More History (${recentlyViewed.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .recently-viewed-header {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 10px !important;
          }
          .recently-viewed-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
