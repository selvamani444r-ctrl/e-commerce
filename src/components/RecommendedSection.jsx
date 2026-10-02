import React, { useState } from 'react';
import { Sparkles, ArrowRight, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductCard } from './ProductCard';

export function RecommendedSection({
  products,
  onSelectProduct,
  onViewDeal,
  wishlist,
  onToggleWishlist,
  compareList,
  onToggleCompare,
  onOpenPriceAlert,
  recentlyViewed
}) {
  const [showAll, setShowAll] = useState(false);

  // Recommendation logic:
  // 1. If user viewed or wishlisted items, pick other items in same categories
  // 2. Otherwise pick high deal-score products
  const preferredCategories = new Set([
    ...wishlist.map(p => p.category),
    ...recentlyViewed.map(p => p.category)
  ]);

  let recommended = [];

  if (preferredCategories.size > 0) {
    recommended = products.filter(p => preferredCategories.has(p.category) && !wishlist.some(w => w.id === p.id));
  }

  // Fallback to top deal scores
  if (recommended.length < 8) {
    const extra = [...products].sort((a, b) => (b.dealScore || 0) - (a.dealScore || 0)).slice(0, 10);
    recommended = Array.from(new Set([...recommended, ...extra]));
  }

  const displayedList = showAll ? recommended : recommended.slice(0, 4);

  return (
    <section style={{ padding: '52px 0', background: 'var(--bg-body)', width: '100%', overflow: 'hidden' }}>
      <div className="container-marketplace">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#84CC16', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <Sparkles size={15} /> Personalized Engine
            </div>
            <h2 className="section-title">
              Picked For You
            </h2>
            <p className="section-subtitle">
              Intelligent suggestions tuned to your browsing history, saved wishlist, and deal preferences
            </p>
          </div>
        </div>

        {/* Product Grid */}
        <div className="recommended-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          width: '100%'
        }}>
          {displayedList.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onSelectProduct={onSelectProduct}
              onViewDeal={onViewDeal}
              isWishlisted={wishlist.some(w => w.id === product.id)}
              onToggleWishlist={onToggleWishlist}
              isCompared={compareList.some(c => c.id === product.id)}
              onToggleCompare={onToggleCompare}
              onOpenPriceAlert={onOpenPriceAlert}
            />
          ))}
        </div>

        {/* Centered Read More / Show More Button */}
        {recommended.length > 4 && (
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
              <span>{showAll ? 'Show Less' : `Read More Recommendations (${recommended.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .recommended-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
