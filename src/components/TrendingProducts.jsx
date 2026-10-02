import React, { useState } from 'react';
import { TrendingUp, ArrowRight, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { ProductCard } from './ProductCard';

export function TrendingProducts({
  products,
  onSelectProduct,
  onViewDeal,
  wishlist,
  onToggleWishlist,
  compareList,
  onToggleCompare,
  onOpenPriceAlert
}) {
  const [activeTab, setActiveTab] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Filter trending items
  const trendingItems = products.filter(p => p.isTrending);

  const filterTabs = [
    { id: 'all', label: 'All Trending' },
    { id: 'audio', label: 'Audio & Sound' },
    { id: 'mobiles', label: 'Smartphones' },
    { id: 'laptops', label: 'Laptops & PCs' },
    { id: 'fashion', label: 'Fashion & Wear' },
    { id: 'home-kitchen', label: 'Smart Living' }
  ];

  const allFiltered = trendingItems.filter(p => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowAll(false);
  };

  return (
    <section id="trending-section" style={{ padding: '48px 0', background: 'var(--bg-body)', width: '100%', overflow: 'hidden' }}>
      <div className="container-marketplace">
        
        {/* Section Header with Tabs */}
        <div className="section-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#EF4444', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <TrendingUp size={15} /> High Search Volume
            </div>
            <h2 className="section-title">
              Trending Right Now
            </h2>
            <p className="section-subtitle">
              Discover the products shoppers are searching for today across top marketplaces
            </p>
          </div>

          {/* Filter Pills */}
          <div className="filter-tabs-strip" style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '4px', WebkitOverflowScrolling: 'touch', minWidth: 0, maxWidth: '100%', width: '100%' }}>
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                style={{
                  background: activeTab === tab.id ? '#0B1220' : 'var(--bg-card)',
                  color: activeTab === tab.id ? '#84CC16' : 'var(--text-main)',
                  border: activeTab === tab.id ? '1px solid #0B1220' : '1px solid var(--border-light)',
                  padding: '7px 14px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="trending-products-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          width: '100%'
        }}>
          {allFiltered.map((product, idx) => (
            <ProductCard
              key={product.id}
              product={product}
              className={idx >= 4 && !showAll ? 'mobile-hide-item' : ''}
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

        {/* Centered Read More / Show More Button (Mobile only) */}
        {allFiltered.length > 4 && (
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
              <span>{showAll ? 'Show Less' : `Read More Trending Deals (${allFiltered.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .trending-products-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
