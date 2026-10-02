import React, { useState } from 'react';
import { Layers, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { FEATURED_COLLECTIONS } from '../data/mockData';

export function FeaturedCollections({ onSelectCollection }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section style={{ padding: '52px 0', background: 'var(--bg-body)', width: '100%', overflow: 'hidden' }}>
      <div className="container-marketplace">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#84CC16', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <Layers size={15} /> Curated Guides
            </div>
            <h2 className="section-title">
              Featured Shopping Collections
            </h2>
            <p className="section-subtitle">
              Hand-picked collections organized by budget, lifestyle, and work setups
            </p>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="featured-collections-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
          width: '100%'
        }}>
          {FEATURED_COLLECTIONS.map((collection, idx) => (
            <div
              key={collection.id}
              onClick={() => onSelectCollection(collection)}
              className={`nn-card ${idx >= 4 && !showAll ? 'mobile-hide-item' : ''}`}
              style={{
                cursor: 'pointer',
                borderRadius: '18px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {/* Banner Image */}
              <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden' }}>
                <img
                  src={collection.image}
                  alt={collection.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  className="collection-img"
                />
                
                {/* Tag pill */}
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(11, 18, 32, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#84CC16',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  {collection.tag}
                </div>

                {/* Count pill */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  color: '#0B1220',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                }}>
                  {collection.productCount}
                </div>
              </div>

              {/* Text Info */}
              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '6px', wordBreak: 'break-word' }}>
                  {collection.title}
                </h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '14px', wordBreak: 'break-word' }}>
                  {collection.subtitle}
                </p>

                {/* CTA text */}
                <div style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-light)'
                }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2563EB', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Browse Collection</span>
                    <ArrowRight size={14} />
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Curated Deals
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered Read More / Show More Button (Mobile only) */}
        {FEATURED_COLLECTIONS.length > 4 && (
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
              <span>{showAll ? 'Show Less' : `Read More Collections (${FEATURED_COLLECTIONS.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}

      </div>

      <style>{`
        .nn-card:hover .collection-img {
          transform: scale(1.08);
        }
        @media (max-width: 640px) {
          .featured-collections-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
