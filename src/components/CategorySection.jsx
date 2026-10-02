import React, { useState } from 'react';
import { ArrowRight, ChevronRight, LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';

export function CategorySection({ onSelectCategory, selectedCategory }) {
  const [showAll, setShowAll] = useState(false);

  return (
    <section style={{ padding: '56px 0', background: 'var(--bg-body)' }}>
      <div className="container-marketplace">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563EB', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <LayoutGrid size={15} /> Departments
            </div>
            <h2 className="section-title">
              Shop by Category
            </h2>
            <p className="section-subtitle">
              Explore thousands of curated products with price comparison across online stores
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('all')}
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13.5px',
              fontWeight: 700,
              padding: '8px 18px',
              borderRadius: '10px'
            }}
          >
            <span>View All Departments</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Category Grid */}
        <div className="category-responsive-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px'
        }}>
          {CATEGORIES_DATA.map((cat, idx) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`nn-card ${idx >= 4 && !showAll ? 'mobile-hide-item' : ''}`}
                style={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  padding: '18px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  border: isSelected ? '2px solid #2563EB' : '1px solid var(--border-light)',
                  background: isSelected ? 'var(--color-secondary-light)' : 'var(--bg-card)',
                  position: 'relative'
                }}
              >
                {/* Image Bubble */}
                <div style={{
                  width: '92px',
                  height: '92px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  background: 'var(--bg-card-subtle)',
                  marginBottom: '14px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease'
                }} className="category-img-container">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=300&q=80';
                    }}
                  />
                </div>

                {/* Name */}
                <div style={{
                  fontSize: '14.5px',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  lineHeight: 1.3,
                  marginBottom: '4px'
                }}>
                  {cat.name}
                </div>

                {/* Product Count */}
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                  marginBottom: '10px'
                }}>
                  {cat.count}
                </div>

                {/* Micro Arrow Pill */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#2563EB',
                  marginTop: 'auto'
                }}>
                  <span>Explore</span>
                  <ChevronRight size={13} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Centered Read More / Show More Button (Mobile only) */}
        {CATEGORIES_DATA.length > 4 && (
          <div className="mobile-read-more-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '28px', width: '100%' }}>
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
              <span>{showAll ? 'Show Less Categories' : `Read More Categories (${CATEGORIES_DATA.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}

      </div>

      <style>{`
        .nn-card:hover .category-img-container img {
          transform: scale(1.1);
        }
        @media (max-width: 640px) {
          .category-responsive-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
