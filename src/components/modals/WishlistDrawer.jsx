import React from 'react';
import { X, Heart, ExternalLink, Trash2, Scale, ShoppingBag, Sparkles } from 'lucide-react';

export function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onClearWishlist,
  onViewDeal,
  onSelectProduct,
  onToggleCompare,
  compareList
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100vh',
          background: 'var(--bg-card)',
          boxShadow: 'var(--shadow-dropdown)',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'relative'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-card-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={20} color="#EF4444" fill="#EF4444" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)' }}>
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {wishlist.length > 0 && (
              <button
                onClick={onClearWishlist}
                title="Clear Wishlist"
                style={{ fontSize: '12px', color: '#EF4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', background: 'none' }}
              >
                <Trash2 size={13} /> Clear
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close wishlist drawer"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Wishlist Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {wishlist.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <Heart size={44} color="#94A3B8" style={{ margin: '0 auto 14px auto', display: 'block' }} />
              <h4 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '6px' }}>Your Wishlist is Empty</h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Tap the heart icon on any product in the marketplace to save deals here for later comparison.
              </p>
              <button onClick={onClose} className="btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>
                Explore Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {wishlist.map(product => {
                const bestMerchant = product.merchants?.find(m => m.isBestPrice) || product.merchants?.[0];
                const isCompared = compareList.some(c => c.id === product.id);

                return (
                  <div
                    key={product.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      padding: '12px',
                      borderRadius: '14px',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-card)',
                      boxShadow: 'var(--shadow-sm)',
                      position: 'relative'
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => { onSelectProduct(product); onClose(); }}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '10px',
                        background: 'var(--bg-card-subtle)',
                        padding: '6px',
                        flexShrink: 0,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>

                    {/* Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                          {product.brand}
                        </span>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          style={{ color: '#94A3B8', padding: '2px', background: 'none' }}
                          title="Remove item"
                        >
                          <X size={15} />
                        </button>
                      </div>

                      <h4
                        onClick={() => { onSelectProduct(product); onClose(); }}
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
                        <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-main)' }}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        {product.originalPrice > product.price && (
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                            ₹{product.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => onViewDeal(product, bestMerchant)}
                          className="btn-deal"
                          style={{ flex: 1, padding: '6px 10px', fontSize: '12px' }}
                        >
                          <span>View Deal</span>
                          <ExternalLink size={12} />
                        </button>

                        <button
                          onClick={() => onToggleCompare(product)}
                          style={{
                            padding: '6px 8px',
                            borderRadius: '8px',
                            background: isCompared ? '#2563EB' : 'var(--bg-card-subtle)',
                            color: isCompared ? '#FFFFFF' : 'var(--text-main)',
                            border: '1px solid var(--border-light)',
                            fontSize: '11px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Scale size={12} />
                          <span>{isCompared ? 'Added' : 'Compare'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer Notice */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-light)', background: 'var(--bg-card-subtle)', fontSize: '11.5px', color: 'var(--text-secondary)' }}>
          Items in your wishlist are saved to your browser session. Clicking "View Deal" redirects to our verified merchant partner.
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
