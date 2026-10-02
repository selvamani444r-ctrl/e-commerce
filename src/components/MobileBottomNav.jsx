import React from 'react';
import { Home, LayoutGrid, Search, Heart, Scale } from 'lucide-react';

export function MobileBottomNav({
  wishlistCount,
  compareCount,
  onOpenWishlist,
  onOpenCompare,
  onOpenCategories,
  onFocusSearch
}) {
  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mobile-bottom-nav">
      <button
        onClick={scrollToHome}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-main)',
          fontSize: '11px',
          fontWeight: 600
        }}
      >
        <Home size={20} color="#2563EB" />
        <span>Home</span>
      </button>

      <button
        onClick={onOpenCategories}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-secondary)',
          fontSize: '11px',
          fontWeight: 600
        }}
      >
        <LayoutGrid size={20} />
        <span>Categories</span>
      </button>

      <button
        onClick={onFocusSearch}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-secondary)',
          fontSize: '11px',
          fontWeight: 600
        }}
      >
        <Search size={20} />
        <span>Search</span>
      </button>

      <button
        onClick={onOpenWishlist}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-secondary)',
          fontSize: '11px',
          fontWeight: 600,
          position: 'relative'
        }}
      >
        <Heart size={20} color={wishlistCount > 0 ? "#EF4444" : "currentColor"} />
        <span>Wishlist</span>
        {wishlistCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '8px',
            background: '#EF4444',
            color: '#FFFFFF',
            fontSize: '10px',
            fontWeight: 800,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {wishlistCount}
          </span>
        )}
      </button>

      <button
        onClick={onOpenCompare}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '3px',
          color: 'var(--text-secondary)',
          fontSize: '11px',
          fontWeight: 600,
          position: 'relative'
        }}
      >
        <Scale size={20} color={compareCount > 0 ? "#84CC16" : "currentColor"} />
        <span>Compare</span>
        {compareCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '8px',
            background: '#84CC16',
            color: '#0B1220',
            fontSize: '10px',
            fontWeight: 800,
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {compareCount}
          </span>
        )}
      </button>
    </div>
  );
}
