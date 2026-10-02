import React, { useState, useMemo, useEffect } from 'react';
import { 
  SlidersHorizontal, Search, RotateCcw, LayoutGrid, List, 
  ChevronDown, ChevronUp, Star, Tag, Check, Filter, X, Sparkles 
} from 'lucide-react';
import { ProductCard } from './ProductCard';
import { CATEGORIES_DATA } from '../data/mockData';

export function ProductDiscoverySection({
  products,
  onSelectProduct,
  onViewDeal,
  wishlist,
  onToggleWishlist,
  compareList,
  onToggleCompare,
  onOpenPriceAlert,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery
}) {
  // Filter States
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [maxPrice, setMaxPrice] = useState(250000);
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [selectedMerchant, setSelectedMerchant] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  // Reset to 4 items whenever search or filters change
  useEffect(() => {
    setVisibleCount(4);
  }, [selectedCategory, searchQuery, selectedBrand, maxPrice, minRating, minDiscount, selectedMerchant, sortBy]);

  // Extract unique brands and merchants from data
  const brands = useMemo(() => {
    const bSet = new Set(products.map(p => p.brand));
    return ['all', ...Array.from(bSet).sort()];
  }, [products]);

  const merchants = [
    { id: 'all', label: 'All Merchants' },
    { id: 'Amazon India', label: 'Amazon India' },
    { id: 'Flipkart', label: 'Flipkart' },
    { id: 'Croma Retail', label: 'Croma Retail' },
    { id: 'Reliance Digital', label: 'Reliance Digital' },
    { id: 'Myntra', label: 'Myntra' },
    { id: 'Tata CLiQ Luxury', label: 'Tata CLiQ' }
  ];

  // Filtering Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesSubcat = p.subcategory?.toLowerCase().includes(q);
        const matchesTag = p.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesBrand && !matchesSubcat && !matchesTag) {
          return false;
        }
      }
      // Brand
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      // Rating
      if (minRating > 0 && p.rating < minRating) {
        return false;
      }
      // Discount
      if (minDiscount > 0) {
        const discNum = parseInt(p.discount) || 0;
        if (discNum < minDiscount) return false;
      }
      // Merchant
      if (selectedMerchant !== 'all') {
        const hasMerchant = p.merchants?.some(m => m.name === selectedMerchant);
        if (!hasMerchant) return false;
      }

      return true;
    });
  }, [products, selectedCategory, searchQuery, selectedBrand, maxPrice, minRating, minDiscount, selectedMerchant]);

  // Sorting Logic
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'popularity':
        return list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return list.sort((a, b) => b.rating - a.rating);
      case 'discount-desc':
        return list.sort((a, b) => (parseInt(b.discount) || 0) - (parseInt(a.discount) || 0));
      case 'deal-score':
        return list.sort((a, b) => (b.dealScore || 0) - (a.dealScore || 0));
      case 'relevance':
      default:
        return list;
    }
  }, [filteredProducts, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMaxPrice(250000);
    setMinRating(0);
    setMinDiscount(0);
    setSelectedMerchant('all');
    setSearchQuery('');
    setSortBy('relevance');
  };

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) +
    (selectedBrand !== 'all' ? 1 : 0) +
    (maxPrice < 250000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (minDiscount > 0 ? 1 : 0) +
    (selectedMerchant !== 'all' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <section id="catalog-discovery-section" style={{ padding: '56px 0', background: 'var(--bg-body)' }}>
      <div className="container-marketplace">
        
        {/* Header Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div>
            <h2 className="section-title">
              Product Discovery & Deal Finder
            </h2>
            <p className="section-subtitle">
              Showing <strong>{sortedProducts.length}</strong> verified marketplace offers
              {selectedCategory !== 'all' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          <div className="discovery-controls-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn-secondary mobile-filter-btn"
              style={{ display: 'none' }}
            >
              <SlidersHorizontal size={16} />
              <span>Filters ({activeFilterCount})</span>
            </button>

            {/* Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  border: '1px solid var(--border-light)',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="relevance">Featured & Relevant</option>
                <option value="deal-score">Highest Deal Score</option>
                <option value="popularity">Most Popular (Reviews)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Customer Rated</option>
                <option value="discount-desc">Biggest Discount %</option>
              </select>
            </div>

            {/* Grid / List Mode */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: '10px',
              padding: '2px'
            }}>
              <button
                onClick={() => setViewMode('grid')}
                aria-label="Grid view"
                style={{
                  padding: '6px 8px',
                  borderRadius: '8px',
                  background: viewMode === 'grid' ? 'var(--color-secondary-light)' : 'transparent',
                  color: viewMode === 'grid' ? '#2563EB' : 'var(--text-secondary)'
                }}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                aria-label="List view"
                style={{
                  padding: '6px 8px',
                  borderRadius: '8px',
                  background: viewMode === 'list' ? 'var(--color-secondary-light)' : 'transparent',
                  color: viewMode === 'list' ? '#2563EB' : 'var(--text-secondary)'
                }}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* ACTIVE FILTER PILLS STRIP */}
        {activeFilterCount > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>Active Filters:</span>
            
            {selectedCategory !== 'all' && (
              <span style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Category: {selectedCategory}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('all')} />
              </span>
            )}

            {selectedBrand !== 'all' && (
              <span style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Brand: {selectedBrand}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSelectedBrand('all')} />
              </span>
            )}

            {maxPrice < 250000 && (
              <span style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Under ₹{maxPrice.toLocaleString('en-IN')}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setMaxPrice(250000)} />
              </span>
            )}

            {minRating > 0 && (
              <span style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Rating: {minRating}★+
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setMinRating(0)} />
              </span>
            )}

            {minDiscount > 0 && (
              <span style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Discount: {minDiscount}%+
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setMinDiscount(0)} />
              </span>
            )}

            {selectedMerchant !== 'all' && (
              <span style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', padding: '4px 10px', borderRadius: '999px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Store: {selectedMerchant}
                <X size={13} style={{ cursor: 'pointer' }} onClick={() => setSelectedMerchant('all')} />
              </span>
            )}

            <button
              onClick={handleResetFilters}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#EF4444',
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                marginLeft: '8px'
              }}
            >
              <RotateCcw size={13} /> Reset All
            </button>
          </div>
        )}

        {/* MAIN LAYOUT: SIDEBAR FILTERS + PRODUCT GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: '28px' }} className="discovery-grid-layout">
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="desktop-sidebar nn-card" style={{ padding: '20px', height: 'fit-content', position: 'sticky', top: '130px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: '1px solid var(--border-light)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 800 }}>
                <SlidersHorizontal size={18} color="#2563EB" /> Filters
              </div>
              {activeFilterCount > 0 && (
                <button onClick={handleResetFilters} style={{ fontSize: '12px', color: '#EF4444', fontWeight: 600 }}>
                  Clear
                </button>
              )}
            </div>

            {/* Filter 1: Department */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                Department / Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                <option value="all">All Departments</option>
                {CATEGORIES_DATA.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Filter 2: Brand */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                <option value="all">All Brands</option>
                {brands.filter(b => b !== 'all').map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Filter 3: Price Slider */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                <span>Max Budget</span>
                <span style={{ color: '#2563EB', fontWeight: 800 }}>₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="250000"
                step="2000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#2563EB', cursor: 'pointer' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>
                <span>₹1,000</span>
                <span>₹2,50,000+</span>
              </div>
            </div>

            {/* Filter 4: Minimum Customer Rating */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                Customer Rating
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[4.5, 4.0, 3.5].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(minRating === rating ? 0 : rating)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 10px',
                      borderRadius: '8px',
                      background: minRating === rating ? 'var(--color-secondary-light)' : 'transparent',
                      border: minRating === rating ? '1px solid #2563EB' : '1px solid transparent',
                      color: minRating === rating ? '#2563EB' : 'var(--text-main)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" /> {rating} Stars & Above
                    </span>
                    {minRating === rating && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 5: Minimum Discount */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                Minimum Discount
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {[10, 20, 30, 50].map(disc => (
                  <button
                    key={disc}
                    onClick={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      background: minDiscount === disc ? '#84CC16' : 'var(--bg-card-subtle)',
                      color: minDiscount === disc ? '#0B1220' : 'var(--text-main)',
                      border: '1px solid var(--border-light)',
                      cursor: 'pointer'
                    }}
                  >
                    {disc}%+
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 6: Store / Merchant */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                Available Merchant
              </label>
              <select
                value={selectedMerchant}
                onChange={(e) => setSelectedMerchant(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'var(--bg-card-subtle)',
                  border: '1px solid var(--border-light)',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  outline: 'none'
                }}
              >
                {merchants.map(m => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>
          </aside>

          {/* PRODUCT RESULTS CATALOG */}
          <div>
            {sortedProducts.length === 0 ? (
              /* EMPTY STATE */
              <div className="nn-card" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <Search size={44} color="#94A3B8" style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '8px' }}>
                  No Products Found Matching Your Filters
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 20px auto' }}>
                  Try relaxing your price slider, clearing specific brand selections, or searching for broader terms.
                </p>
                <button onClick={handleResetFilters} className="btn-primary">
                  <RotateCcw size={16} /> Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="discovery-products-grid" style={{
                  display: 'grid',
                  gridTemplateColumns: viewMode === 'grid' 
                    ? 'repeat(auto-fill, minmax(260px, 1fr))' 
                    : '1fr',
                  gap: '20px'
                }}>
                  {sortedProducts.slice(0, visibleCount).map(product => (
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

                {/* Centered Read More / Show Less Button */}
                {sortedProducts.length > 4 && (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '36px', width: '100%' }}>
                    {visibleCount < sortedProducts.length ? (
                      <button
                        onClick={() => setVisibleCount(prev => prev + 4)}
                        className="btn-secondary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 32px',
                          fontSize: '14px',
                          fontWeight: 700,
                          borderRadius: '12px',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <span>Read More Products ({sortedProducts.length - visibleCount} remaining)</span>
                        <ChevronDown size={16} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setVisibleCount(4)}
                        className="btn-secondary"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '12px 32px',
                          fontSize: '14px',
                          fontWeight: 700,
                          borderRadius: '12px',
                          boxShadow: 'var(--shadow-sm)'
                        }}
                      >
                        <span>Show Less Products (Reset to 4)</span>
                        <ChevronUp size={16} />
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {isMobileFilterOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setIsMobileFilterOpen(false)}
          style={{ justifyContent: 'flex-end', padding: 0 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '380px',
              height: '100vh',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-modal)',
              animation: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              overflowY: 'auto'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'var(--bg-card-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 800 }}>
                <SlidersHorizontal size={18} color="#2563EB" />
                <span>Filters & Refine</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {activeFilterCount > 0 && (
                  <button 
                    onClick={handleResetFilters}
                    style={{ fontSize: '12.5px', color: '#EF4444', fontWeight: 600, background: 'none' }}
                  >
                    Reset
                  </button>
                )}
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'var(--bg-card)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Filter Controls Body */}
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '22px', flex: 1, overflowY: 'auto' }}>
              
              {/* Category */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Department / Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Departments</option>
                  {CATEGORIES_DATA.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                >
                  <option value="all">All Brands</option>
                  {brands.filter(b => b !== 'all').map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Price Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <span>Max Budget</span>
                  <span style={{ color: '#2563EB', fontWeight: 800 }}>₹{maxPrice.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="250000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#2563EB' }}
                />
              </div>

              {/* Min Rating */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Minimum Customer Rating
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {[0, 3.5, 4.0, 4.5].map(r => (
                    <button
                      key={r}
                      onClick={() => setMinRating(r)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: minRating === r ? '1.5px solid #2563EB' : '1px solid var(--border-light)',
                        background: minRating === r ? 'var(--color-secondary-light)' : 'var(--bg-card-subtle)',
                        color: minRating === r ? '#2563EB' : 'var(--text-main)',
                        textAlign: 'center'
                      }}
                    >
                      {r === 0 ? 'Any' : `${r}★+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min Discount */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Discount Range
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                  {[0, 15, 30, 40].map(d => (
                    <button
                      key={d}
                      onClick={() => setMinDiscount(d)}
                      style={{
                        padding: '8px 4px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: minDiscount === d ? '1.5px solid #2563EB' : '1px solid var(--border-light)',
                        background: minDiscount === d ? 'var(--color-secondary-light)' : 'var(--bg-card-subtle)',
                        color: minDiscount === d ? '#2563EB' : 'var(--text-main)',
                        textAlign: 'center'
                      }}
                    >
                      {d === 0 ? 'All' : `${d}%+`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Merchant */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                  Merchant Store
                </label>
                <select
                  value={selectedMerchant}
                  onChange={(e) => setSelectedMerchant(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'var(--bg-card-subtle)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-main)',
                    fontSize: '13.5px',
                    outline: 'none'
                  }}
                >
                  {merchants.map(m => (
                    <option key={m.id} value={m.id}>{m.label}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Apply Button Footer */}
            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', background: 'var(--bg-card)' }}>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '12px' }}
              >
                Apply Filters ({sortedProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .discovery-grid-layout {
            grid-template-columns: 1fr !important;
          }
          .desktop-sidebar {
            display: none !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 640px) {
          .discovery-products-grid {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
          .discovery-controls-row {
            width: 100% !important;
            justify-content: space-between !important;
          }
        }
      `}</style>
    </section>
  );
}
