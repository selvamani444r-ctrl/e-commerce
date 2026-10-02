import React from 'react';
import { Star, Heart, Scale, ExternalLink, Tag, ShieldCheck, Check, Sparkles, Bell } from 'lucide-react';

export function ProductCard({
  product,
  onSelectProduct,
  onViewDeal,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onOpenPriceAlert,
  className = ''
}) {
  const bestMerchant = product.merchants?.find(m => m.isBestPrice) || product.merchants?.[0] || {
    name: 'Online Retailer',
    price: product.price,
    originalPrice: product.originalPrice
  };

  const savings = (product.originalPrice || 0) - (product.price || 0);

  return (
    <div className={`nn-product-card ${className}`}>
      {/* Top Image Section */}
      <div className="product-img-wrapper" onClick={() => onSelectProduct(product)} style={{ cursor: 'pointer' }}>
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80';
          }}
        />

        {/* Badges on Top Left */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 2 }}>
          {product.badge && (
            <span className={product.badge === 'Best Deal' ? 'badge badge-deal' : 'badge badge-verified'}>
              <Sparkles size={11} /> {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="badge badge-sale">
              {product.discount}
            </span>
          )}
        </div>

        {/* Top Right Action Tools: Wishlist & Price Alert */}
        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product);
            }}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isWishlisted ? '#EF4444' : '#64748B',
              transition: 'all 0.18s ease'
            }}
          >
            <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
          </button>

          {/* Price Alert Notify Trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenPriceAlert(product);
            }}
            title="Price Drop Alert"
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748B',
              transition: 'all 0.18s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#2563EB'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#64748B'}
          >
            <Bell size={16} />
          </button>
        </div>

        {/* Compare Checkbox pill on bottom left of image */}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            background: isCompared ? '#2563EB' : 'rgba(255, 255, 255, 0.88)',
            color: isCompared ? '#FFFFFF' : '#334155',
            fontSize: '11px',
            fontWeight: 700,
            padding: '3px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            transition: 'all 0.15s ease'
          }}
        >
          <Scale size={12} />
          <span>{isCompared ? 'Comparing' : 'Compare'}</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Brand & Deal Score */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {product.brand}
          </span>
          {product.dealScore && (
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '1px 6px', borderRadius: '4px' }}>
              Deal Score: {product.dealScore}/10
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onSelectProduct(product)}
          style={{
            fontSize: '14.5px',
            fontWeight: 700,
            color: 'var(--text-main)',
            lineHeight: 1.35,
            marginBottom: '6px',
            cursor: 'pointer',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short summary description */}
        <p style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          lineHeight: 1.4,
          marginBottom: '8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {product.shortDescription}
        </p>

        {/* Ratings & Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            background: '#FEF3C7',
            color: '#B45309',
            fontSize: '11.5px',
            fontWeight: 700,
            padding: '2px 6px',
            borderRadius: '4px'
          }}>
            <Star size={12} fill="#B45309" />
            <span>{product.rating}</span>
          </div>
          <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>
            ({product.reviewCount?.toLocaleString('en-IN')} reviews)
          </span>
        </div>

        {/* Price & Savings */}
        <div style={{ marginTop: 'auto', marginBottom: '12px', paddingTop: '8px', borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              ₹{product.price?.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                ₹{product.originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Store / Merchant Availability Label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px', fontSize: '11.5px' }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              Best offer at <strong style={{ color: '#2563EB' }}>{bestMerchant.name}</strong>
            </span>
            {savings > 0 && (
              <span style={{ color: '#16A34A', fontWeight: 600 }}>
                Save ₹{savings.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* PRIMARY AFFILIATE CTA BUTTON */}
        <button
          onClick={() => onViewDeal(product, bestMerchant)}
          className="btn-deal"
          style={{ marginBottom: '8px' }}
        >
          <span>View Deal</span>
          <ExternalLink size={14} />
        </button>

        {/* Affiliate Disclosure Micro-Text */}
        <div style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)' }}>
          Opens merchant page • Prices may vary
        </div>
      </div>
    </div>
  );
}
