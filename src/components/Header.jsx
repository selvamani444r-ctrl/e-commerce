import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Heart, Scale, Moon, Sun, Menu, X, Mic, Camera, 
  MapPin, ChevronDown, ExternalLink, ShieldCheck, Sparkles, 
  SlidersHorizontal, Tag, BellRing, Settings, Info, ArrowRight, Laptop, Smartphone, Headphones, Shirt, Home, Tv, Activity, Gamepad2
} from 'lucide-react';
import { CATEGORIES_DATA, POPULAR_BRANDS } from '../data/mockData';

export function Header({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  wishlist,
  compareList,
  onOpenWishlist,
  onOpenCompare,
  onOpenAdmin,
  onOpenLegal,
  theme,
  toggleTheme,
  clickCount,
  onVoiceSearch,
  onCameraSearch
}) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Sony WH-1000XM5', 'MacBook Air M3', 'OLED TV', 'Running Shoes'
  ]);
  const searchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const trendingKeywords = [
    'iPhone 16 Pro', 'AirPods Pro 2', 'Dell XPS', 'Dyson Airwrap', 'boAt ANC', 'Kindle Paperwhite'
  ];

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current && !searchRef.current.contains(event.target) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(event.target)
      ) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (!recentSearches.includes(searchQuery.trim())) {
        setRecentSearches([searchQuery.trim(), ...recentSearches.slice(0, 4)]);
      }
      setIsSearchFocused(false);
      setIsMobileMenuOpen(false);
      const catalogEl = document.getElementById('catalog-discovery-section');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const selectSuggestion = (term) => {
    setSearchQuery(term);
    setIsSearchFocused(false);
    setIsMobileMenuOpen(false);
    const catalogEl = document.getElementById('catalog-discovery-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 900, boxShadow: 'var(--shadow-dropdown)', width: '100%' }}>
      {/* 1. TOP UTILITY BAR */}
      <div style={{
        background: 'var(--bg-header-top)',
        color: '#94A3B8',
        fontSize: '12px',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div className="container-marketplace" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#84CC16', fontWeight: 600, fontSize: '11.5px' }}>
              <Sparkles size={13} /> Best Deals Live
            </span>
            <span className="d-none-sm" style={{ fontSize: '11.5px' }}>
              Today's verified price drops across 6+ major retailers
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button 
              onClick={() => onOpenLegal('disclosure')} 
              style={{ color: '#94A3B8', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}
            >
              <Info size={12} /> <span className="d-none-sm">Affiliate </span>Disclosure
            </button>
            <button 
              onClick={onOpenAdmin} 
              style={{ 
                color: '#38BDF8', 
                fontSize: '11px', 
                fontWeight: 600, 
                background: 'rgba(56, 189, 248, 0.1)', 
                padding: '2px 8px', 
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Settings size={12} /> <span className="d-none-sm">CMS </span>({clickCount} Clicks)
            </button>
            <button 
              onClick={toggleTheme} 
              aria-label="Toggle theme" 
              style={{ color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 6px', borderRadius: '4px' }}
            >
              {theme === 'dark' ? <Sun size={13} color="#FBBF24" /> : <Moon size={13} color="#94A3B8" />}
              <span style={{ fontSize: '11px' }}>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <div style={{
        background: 'var(--bg-header-main)',
        padding: '10px 0',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div className="container-marketplace">
          {/* Main Flex Row */}
          <div className="header-main-row" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
            
            {/* Logo & Mobile Menu Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="mobile-menu-btn"
                aria-label="Toggle Mobile Menu"
                style={{ color: '#FFFFFF', padding: '6px', borderRadius: '8px', background: 'rgba(255,255,255,0.08)' }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              {/* Nexus Nook Brand Logo */}
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                  border: '1.5px solid rgba(37, 99, 235, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)',
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
                    <rect x="20" y="20" width="16" height="60" rx="8" fill="#2563EB" />
                    <path d="M34 25 L66 75 A 8 8 0 0 0 80 70 L80 25 A 8 8 0 0 0 64 25 L64 48 L44 20 A 8 8 0 0 0 34 25 Z" fill="#3B82F6" />
                    <rect x="64" y="20" width="16" height="60" rx="8" fill="#2563EB" />
                    <circle cx="80" cy="20" r="9" fill="#84CC16" />
                  </svg>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', lineHeight: 1 }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.03em' }}>NEXUS</span>
                    <span style={{ fontSize: '20px', fontWeight: 600, color: '#3B82F6', marginLeft: '3px', letterSpacing: '-0.02em' }}>NOOK</span>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#84CC16', marginLeft: '3px', display: 'inline-block' }}></span>
                  </div>
                  <div className="d-none-sm" style={{ fontSize: '8.5px', fontWeight: 600, letterSpacing: '0.12em', color: '#94A3B8', marginTop: '2px' }}>
                    DISCOVER MORE • SHOP SMARTER
                  </div>
                </div>
              </a>
            </div>

            {/* Location Delivery Indicator (Desktop only) */}
            <div className="delivery-loc-box" style={{ alignItems: 'center', gap: '8px', color: '#CBD5E1', fontSize: '13px' }}>
              <MapPin size={18} color="#3B82F6" />
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8', lineHeight: 1 }}>Deliver to</div>
                <div style={{ fontWeight: 600, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  India, 560001 <ChevronDown size={12} />
                </div>
              </div>
            </div>

            {/* DESKTOP SMART SEARCH BAR */}
            <div className="header-search-desktop" ref={searchRef} style={{ flex: 1, maxWidth: '640px', position: 'relative' }}>
              <form onSubmit={handleSearchSubmit} style={{
                display: 'flex',
                alignItems: 'center',
                background: '#FFFFFF',
                borderRadius: '12px',
                padding: '2px 4px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
                border: isSearchFocused ? '2px solid #2563EB' : '2px solid transparent',
                transition: 'all 0.2s ease'
              }}>
                <select 
                  value={selectedCategory} 
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    background: '#F1F5F9',
                    border: 'none',
                    borderRight: '1px solid #E2E8F0',
                    padding: '10px 12px',
                    borderRadius: '9px 0 0 9px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    color: '#1E293B',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Departments</option>
                  {CATEGORIES_DATA.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search for products, brands and categories..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    color: '#111827',
                    background: 'transparent'
                  }}
                />

                <button
                  type="button"
                  onClick={onVoiceSearch}
                  title="Search by Voice"
                  style={{ padding: '8px', color: '#64748B' }}
                >
                  <Mic size={18} />
                </button>

                <button
                  type="button"
                  onClick={onCameraSearch}
                  title="Search by Image"
                  style={{ padding: '8px', color: '#64748B' }}
                >
                  <Camera size={18} />
                </button>

                <button
                  type="submit"
                  aria-label="Search"
                  style={{
                    background: '#2563EB',
                    color: '#FFFFFF',
                    padding: '9px 18px',
                    borderRadius: '9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Search size={18} />
                </button>
              </form>

              {/* SEARCH SUGGESTIONS & AUTOCOMPLETE DROPDOWN */}
              {isSearchFocused && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  right: 0,
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  boxShadow: 'var(--shadow-dropdown)',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  zIndex: 1000,
                  color: '#111827'
                }}>
                  <div style={{ marginBottom: '14px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={13} color="#2563EB" /> Trending Right Now
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {trendingKeywords.map(keyword => (
                        <button
                          key={keyword}
                          type="button"
                          onClick={() => selectSuggestion(keyword)}
                          style={{
                            background: '#F1F5F9',
                            color: '#1E293B',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            fontSize: '12.5px',
                            fontWeight: 500
                          }}
                        >
                          {keyword}
                        </button>
                      ))}
                    </div>
                  </div>

                  {recentSearches.length > 0 && (
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: '6px' }}>
                        Recent Searches
                      </div>
                      {recentSearches.map(term => (
                        <div
                          key={term}
                          onClick={() => selectSuggestion(term)}
                          style={{
                            padding: '8px 10px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '13.5px',
                            color: '#334155'
                          }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Search size={14} color="#94A3B8" /> {term}
                          </span>
                          <ArrowRight size={14} color="#CBD5E1" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Icons: Wishlist & Compare Tool */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {/* Compare Button */}
              <button
                onClick={onOpenCompare}
                title="Compare Selected Products"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FFFFFF',
                  padding: '7px 10px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative'
                }}
              >
                <Scale size={18} color="#38BDF8" />
                <div style={{ textAlign: 'left', lineHeight: 1.1 }} className="d-none-sm">
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>Compare</div>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Products</div>
                </div>
                {compareList.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
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
                    {compareList.length}
                  </span>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                title="View Saved Wishlist"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#FFFFFF',
                  padding: '7px 10px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  position: 'relative'
                }}
              >
                <Heart size={18} color="#F43F5E" fill={wishlist.length > 0 ? "#F43F5E" : "none"} />
                <div style={{ textAlign: 'left', lineHeight: 1.1 }} className="d-none-sm">
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>Saved</div>
                  <div style={{ fontSize: '12px', fontWeight: 600 }}>Wishlist</div>
                </div>
                {wishlist.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
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
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* MOBILE SEARCH BAR (Row 2 on mobile: 100% full width, clean) */}
          <div className="header-search-mobile" ref={mobileSearchRef} style={{ marginTop: '10px', width: '100%', position: 'relative' }}>
            <form onSubmit={handleSearchSubmit} style={{
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              borderRadius: '10px',
              padding: '2px 4px',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
              border: isSearchFocused ? '2px solid #2563EB' : '2px solid transparent',
              width: '100%'
            }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder="Search products, brands, deals..."
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '13.5px',
                  color: '#111827',
                  background: 'transparent',
                  minWidth: 0
                }}
              />

              <button
                type="button"
                onClick={onVoiceSearch}
                title="Search by Voice"
                style={{ padding: '6px', color: '#64748B' }}
              >
                <Mic size={16} />
              </button>

              <button
                type="button"
                onClick={onCameraSearch}
                title="Search by Image"
                style={{ padding: '6px', color: '#64748B' }}
              >
                <Camera size={16} />
              </button>

              <button
                type="submit"
                aria-label="Search"
                style={{
                  background: '#2563EB',
                  color: '#FFFFFF',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Search size={16} />
              </button>
            </form>

            {/* Mobile Autocomplete Suggestions */}
            {isSearchFocused && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 6px)',
                left: 0,
                right: 0,
                background: '#FFFFFF',
                borderRadius: '12px',
                boxShadow: 'var(--shadow-dropdown)',
                border: '1px solid #E2E8F0',
                padding: '12px',
                zIndex: 1000,
                color: '#111827'
              }}>
                <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '8px' }}>
                  Popular Searches
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {trendingKeywords.slice(0, 4).map(kw => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => selectSuggestion(kw)}
                      style={{
                        background: '#F1F5F9',
                        color: '#1E293B',
                        padding: '5px 10px',
                        borderRadius: '6px',
                        fontSize: '12px'
                      }}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. CATEGORY NAVIGATION BAR & MEGA MENU */}
      <div style={{
        background: 'var(--bg-header-sub)',
        padding: '6px 0',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative'
      }}>
        <div className="container-marketplace" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', overflow: 'hidden' }}>
          
          <div className="category-scroll-strip" style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto', paddingBottom: '2px', WebkitOverflowScrolling: 'touch', minWidth: 0, maxWidth: '100%', flex: 1 }}>
            {/* All Categories Mega Menu Trigger */}
            <button
              onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: isMegaMenuOpen ? '#2563EB' : 'rgba(255,255,255,0.08)',
                color: '#FFFFFF',
                fontSize: '12.5px',
                fontWeight: 700,
                padding: '5px 12px',
                borderRadius: '8px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <Menu size={15} /> All Categories <ChevronDown size={13} />
            </button>

            {/* Quick Department Links */}
            {CATEGORIES_DATA.slice(0, 8).map((cat) => {
              const isActive = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.slug);
                    setIsMegaMenuOpen(false);
                    const catalogEl = document.getElementById('catalog-discovery-section');
                    if (catalogEl) {
                      catalogEl.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
                    color: isActive ? '#38BDF8' : '#E2E8F0',
                    fontSize: '12.5px',
                    fontWeight: isActive ? 700 : 500,
                    padding: '5px 10px',
                    borderRadius: '6px',
                    whiteSpace: 'nowrap',
                    background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Quick Right link to Flash Deals */}
          <a
            href="#todays-deals-section"
            className="d-none-sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#84CC16',
              fontSize: '12.5px',
              fontWeight: 700,
              whiteSpace: 'nowrap',
              padding: '5px 10px'
            }}
          >
            <Tag size={13} /> Flash Deals <span style={{ background: '#EF4444', color: '#FFF', fontSize: '9px', padding: '1px 4px', borderRadius: '4px', textTransform: 'uppercase' }}>Live</span>
          </a>
        </div>

        {/* MEGA MENU FLYOUT (Desktop) */}
        {isMegaMenuOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-card)',
            color: 'var(--text-main)',
            boxShadow: 'var(--shadow-dropdown)',
            borderTop: '2px solid #2563EB',
            borderBottom: '1px solid var(--border-light)',
            padding: '28px 0',
            zIndex: 999,
            animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
          }}>
            <div className="container-marketplace">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '24px'
              }}>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Laptop size={16} /> Electronics & Tech
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('mobiles'); setIsMegaMenuOpen(false); }}>5G Smartphones</a></li>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('laptops'); setIsMegaMenuOpen(false); }}>Laptops & MacBooks</a></li>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('audio'); setIsMegaMenuOpen(false); }}>Noise Cancelling Headphones</a></li>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('gaming'); setIsMegaMenuOpen(false); }}>Consoles & Gaming Rigs</a></li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Home size={16} /> Home, Living & Kitchen
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('appliances'); setIsMegaMenuOpen(false); }}>OLED 4K Smart TVs</a></li>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('home-kitchen'); setIsMegaMenuOpen(false); }}>Espresso Coffee Machines</a></li>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('appliances'); setIsMegaMenuOpen(false); }}>Air Purifiers</a></li>
                  </ul>
                </div>

                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shirt size={16} /> Fashion & Beauty
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13.5px' }}>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('fashion'); setIsMegaMenuOpen(false); }}>Running Shoes & Sneakers</a></li>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('beauty'); setIsMegaMenuOpen(false); }}>Dyson Hair Multi-Stylers</a></li>
                    <li><a href="#catalog-discovery-section" onClick={() => { setSelectedCategory('fitness'); setIsMegaMenuOpen(false); }}>GPS Sports Watches</a></li>
                  </ul>
                </div>

                <div style={{ background: 'var(--bg-card-subtle)', padding: '16px', borderRadius: '12px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-main)', marginBottom: '12px' }}>
                    Popular Marketplace Brands
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {POPULAR_BRANDS.slice(0, 6).map(brand => (
                      <button
                        key={brand.name}
                        onClick={() => {
                          setSearchQuery(brand.name);
                          setIsMegaMenuOpen(false);
                          const catalogEl = document.getElementById('catalog-discovery-section');
                          if (catalogEl) {
                            catalogEl.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        style={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--border-light)',
                          color: 'var(--text-main)',
                          fontSize: '12px',
                          fontWeight: 600,
                          padding: '5px 10px',
                          borderRadius: '6px'
                        }}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. FUNCTIONAL MOBILE MENU DRAWER OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="modal-overlay" 
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ justifyContent: 'flex-start', padding: 0 }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '85%',
              maxWidth: '320px',
              height: '100vh',
              background: 'var(--bg-card)',
              color: 'var(--text-main)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--shadow-modal)',
              animation: 'slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              overflowY: 'auto'
            }}
          >
            {/* Drawer Header */}
            <div style={{
              padding: '16px 20px',
              background: 'var(--bg-header-main)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800 }}>NEXUS</span>
                <span style={{ fontSize: '18px', fontWeight: 600, color: '#3B82F6' }}>NOOK</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                aria-label="Close menu"
                style={{ color: '#FFFFFF', padding: '4px' }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Quick Navigation Items */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Quick Navigation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a 
                  href="#todays-deals-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#EF4444' }}
                >
                  <Tag size={16} /> Today's Best Deals
                </a>
                <a 
                  href="#trending-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}
                >
                  <Sparkles size={16} color="#2563EB" /> Trending Right Now
                </a>
                <a 
                  href="#comparison-section" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)' }}
                >
                  <Scale size={16} color="#38BDF8" /> Price Comparison
                </a>
              </div>
            </div>

            {/* All Departments */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                Shop by Department
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => { setSelectedCategory('all'); setIsMobileMenuOpen(false); const el = document.getElementById('catalog-discovery-section'); if(el) el.scrollIntoView({ behavior: 'smooth' }); }}
                  style={{ textAlign: 'left', padding: '7px 0', fontSize: '13.5px', fontWeight: selectedCategory === 'all' ? 700 : 500, color: selectedCategory === 'all' ? '#2563EB' : 'var(--text-main)' }}
                >
                  All Departments ({CATEGORIES_DATA.length})
                </button>
                {CATEGORIES_DATA.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setIsMobileMenuOpen(false);
                      const el = document.getElementById('catalog-discovery-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{ textAlign: 'left', padding: '7px 0', fontSize: '13.5px', fontWeight: selectedCategory === cat.slug ? 700 : 500, color: selectedCategory === cat.slug ? '#2563EB' : 'var(--text-main)' }}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Tools & Settings */}
            <div style={{ padding: '16px 20px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenWishlist(); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-main)', textAlign: 'left' }}
                >
                  <Heart size={16} color="#EF4444" /> Saved Wishlist ({wishlist.length})
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenCompare(); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: 'var(--text-main)', textAlign: 'left' }}
                >
                  <Scale size={16} color="#38BDF8" /> Compare Products ({compareList.length})
                </button>
                <button 
                  onClick={() => { setIsMobileMenuOpen(false); onOpenLegal('disclosure'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', color: '#2563EB', textAlign: 'left' }}
                >
                  <Info size={16} /> Affiliate Disclosure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .header-search-mobile {
          display: none;
        }
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 900px) {
          .delivery-loc-box { display: none !important; }
        }
        @media (max-width: 768px) {
          .d-none-sm { display: none !important; }
          .header-search-desktop { display: none !important; }
          .header-search-mobile { display: block !important; }
          .mobile-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
