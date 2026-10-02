import React, { useState } from 'react';
import { Tag, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { POPULAR_BRANDS } from '../data/mockData';

export function BrandsSection({ onSelectBrand }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section style={{ padding: '52px 0', background: 'var(--bg-body)' }}>
      <div className="container-marketplace">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563EB', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <Tag size={15} /> Top Makers
            </div>
            <h2 className="section-title">
              Explore Popular Brands
            </h2>
            <p className="section-subtitle">
              Discover verified deals and compare prices across leading tech, lifestyle, and home manufacturers
            </p>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="brand-responsive-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {POPULAR_BRANDS.map((brand, idx) => (
            <div
              key={brand.name}
              onClick={() => onSelectBrand(brand.name)}
              className={`nn-card ${idx >= 4 && !showAll ? 'mobile-hide-item' : ''}`}
              style={{
                cursor: 'pointer',
                padding: '20px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <div style={{
                fontSize: '32px',
                marginBottom: '10px',
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: 'var(--bg-card-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {brand.logo}
              </div>

              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2px' }}>
                {brand.name}
              </div>

              <div style={{ fontSize: '11px', fontWeight: 600, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '6px' }}>
                {brand.tag}
              </div>

              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                {brand.count}
              </div>
            </div>
          ))}
        </div>

        {/* Centered Read More / Show More Button (Mobile only) */}
        {POPULAR_BRANDS.length > 4 && (
          <div className="mobile-read-more-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '32px', width: '100%' }}>
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
              <span>{showAll ? 'Show Less Brands' : `Read More Brands (${POPULAR_BRANDS.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '11.5px', color: 'var(--text-muted)' }}>
          * Brand trademarks belong to their respective owners and are used here solely for demonstration of affiliate comparison discovery.
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .brand-responsive-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
