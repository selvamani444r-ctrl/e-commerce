import React, { useState } from 'react';
import { 
  X, Star, Heart, Scale, ExternalLink, ShieldCheck, 
  Check, AlertTriangle, Truck, RotateCcw, Bell, Share2, 
  ChevronRight, Tag, HelpCircle, ArrowRight 
} from 'lucide-react';

export function ProductDetailModal({
  product,
  onClose,
  onViewDeal,
  isWishlisted,
  onToggleWishlist,
  isCompared,
  onToggleCompare,
  onOpenPriceAlert,
  allProducts,
  onSelectProduct
}) {
  if (!product) return null;

  const [activeTab, setActiveTab] = useState('overview'); // overview, specs, proscons, comparison, faq
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image);

  const bestMerchant = product.merchants?.find(m => m.isBestPrice) || product.merchants?.[0] || {
    name: 'Online Partner',
    price: product.price,
    originalPrice: product.originalPrice
  };

  const savings = product.originalPrice - product.price;

  // Related products from same category
  const relatedProducts = allProducts
    ?.filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3) || [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1000px', padding: '0', overflow: 'hidden' }}
      >
        {/* Top Breadcrumb & Close Bar */}
        <div style={{
          padding: '14px 24px',
          background: 'var(--bg-card-subtle)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
            <span>Home</span>
            <ChevronRight size={13} />
            <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
            <ChevronRight size={13} />
            <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{product.subcategory || product.brand}</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Product Hero Top Grid: Left Gallery + Right Details */}
        <div style={{ padding: '28px', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px'
          }}>
            
            {/* LEFT: GALLERY & THUMBNAILS */}
            <div>
              {/* Main Image */}
              <div style={{
                height: '380px',
                background: 'var(--bg-card-subtle)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '14px'
              }}>
                <img
                  src={selectedImage}
                  alt={product.name}
                  style={{ maxHeight: '330px', maxWidth: '85%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                />

                {product.discount && (
                  <span style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: '#84CC16',
                    color: '#0B1220',
                    fontSize: '12px',
                    fontWeight: 800,
                    padding: '4px 10px',
                    borderRadius: '6px'
                  }}>
                    {product.discount}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 1 && (
                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {product.gallery.map((imgUrl, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '10px',
                        border: selectedImage === imgUrl ? '2px solid #2563EB' : '1px solid var(--border-light)',
                        background: 'var(--bg-card-subtle)',
                        padding: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <img src={imgUrl} alt={`thumb-${i}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT: BUY BOX & PRODUCT SUMMARY */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Brand, Deal Score & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {product.brand} Official Hardware
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13.5px', fontWeight: 700, color: '#F59E0B' }}>
                  <Star size={15} fill="#F59E0B" /> {product.rating} / 5
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>({product.reviewCount?.toLocaleString('en-IN')} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '14px' }}>
                {product.name}
              </h2>

              {/* Short summary */}
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
                {product.shortDescription}
              </p>

              {/* Price & Savings Callout Box */}
              <div style={{
                background: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '14px',
                padding: '18px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.price && (
                    <span style={{ fontSize: '15px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {savings > 0 && (
                    <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '12.5px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                      Save ₹{savings.toLocaleString('en-IN')} ({product.discount})
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  <ShieldCheck size={16} color="#16A34A" />
                  <span>Lowest verified deal at <strong>{bestMerchant.name}</strong> with {bestMerchant.shipping || 'Free Prime Delivery'}</span>
                </div>
              </div>

              {/* CTAs Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {/* Primary Affiliate View Deal CTA */}
                <button
                  onClick={() => onViewDeal(product, bestMerchant)}
                  className="btn-lime btn-deal-lg"
                  style={{ flex: 1, minWidth: '200px' }}
                >
                  <span>View Best Deal at {bestMerchant.name}</span>
                  <ExternalLink size={17} />
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="btn-secondary"
                  style={{ padding: '14px 18px', borderRadius: '14px' }}
                  title="Add to Wishlist"
                >
                  <Heart size={18} fill={isWishlisted ? "#EF4444" : "none"} color={isWishlisted ? "#EF4444" : "currentColor"} />
                </button>

                {/* Compare Checkbox */}
                <button
                  onClick={() => onToggleCompare(product)}
                  className="btn-secondary"
                  style={{ padding: '14px 18px', borderRadius: '14px' }}
                  title="Compare Product"
                >
                  <Scale size={18} color={isCompared ? "#2563EB" : "currentColor"} />
                </button>

                {/* Price Alert */}
                <button
                  onClick={() => onOpenPriceAlert(product)}
                  className="btn-secondary"
                  style={{ padding: '14px 18px', borderRadius: '14px' }}
                  title="Price Drop Alert"
                >
                  <Bell size={18} />
                </button>
              </div>

              {/* Mandatory Affiliate Disclosure */}
              <div style={{
                background: 'rgba(37, 99, 235, 0.05)',
                border: '1px solid rgba(37, 99, 235, 0.15)',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '11.5px',
                color: 'var(--text-secondary)',
                lineHeight: 1.45
              }}>
                <strong>Affiliate Notice:</strong> Nexus Nook may earn a commission from qualifying purchases made through partner links at no extra cost to you. Final price and stock are confirmed on {bestMerchant.name}.
              </div>

            </div>

          </div>
        </div>

        {/* TABS NAVIGATION */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-light)',
          background: 'var(--bg-card-subtle)',
          padding: '0 24px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'overview', label: 'Key Highlights' },
            { id: 'comparison', label: 'Price Comparison' },
            { id: 'specs', label: 'Technical Specifications' },
            { id: 'proscons', label: 'Pros & Cons' },
            { id: 'faq', label: 'Buying FAQs' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '14px 18px',
                fontSize: '13.5px',
                fontWeight: activeTab === tab.id ? 700 : 500,
                color: activeTab === tab.id ? '#2563EB' : 'var(--text-secondary)',
                borderBottom: activeTab === tab.id ? '2px solid #2563EB' : '2px solid transparent',
                background: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB PANELS */}
        <div style={{ padding: '28px', maxHeight: '400px', overflowY: 'auto' }}>
          
          {/* TAB 1: OVERVIEW & HIGHLIGHTS */}
          {activeTab === 'overview' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>Product Highlights</h4>
              {product.features && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                  {product.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'var(--bg-card-subtle)', padding: '12px 16px', borderRadius: '12px' }}>
                      <Check size={16} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{ fontSize: '13px', color: 'var(--text-main)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRICE COMPARISON TABLE */}
          {activeTab === 'comparison' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>
                Multi-Store Price Benchmark for {product.name}
              </h4>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-card-subtle)', borderBottom: '2px solid var(--border-light)' }}>
                      <th style={{ padding: '10px 14px', fontSize: '12px' }}>STORE</th>
                      <th style={{ padding: '10px 14px', fontSize: '12px' }}>OFFER PRICE</th>
                      <th style={{ padding: '10px 14px', fontSize: '12px' }}>DELIVERY</th>
                      <th style={{ padding: '10px 14px', fontSize: '12px' }}>RETURNS</th>
                      <th style={{ padding: '10px 14px', fontSize: '12px', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.merchants?.map((m, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '12px 14px', fontWeight: 700 }}>
                          {m.name} {m.isBestPrice && <span style={{ background: '#84CC16', color: '#0B1220', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>LOWEST</span>}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '15px', fontWeight: 800, color: m.isBestPrice ? '#16A34A' : 'var(--text-main)' }}>
                          ₹{m.price.toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '12.5px' }}>{m.shipping}</td>
                        <td style={{ padding: '12px 14px', fontSize: '12.5px' }}>{m.returnDays}</td>
                        <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                          <button
                            onClick={() => onViewDeal(product, m)}
                            className={m.isBestPrice ? "btn-lime" : "btn-primary"}
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            <span>View Deal</span>
                            <ExternalLink size={12} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>Technical Specifications</h4>
              {product.specs ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} style={{ background: 'var(--bg-card-subtle)', padding: '12px 16px', borderRadius: '10px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{key}</div>
                      <div style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>{value}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Specifications available on the merchant product page.</p>
              )}
            </div>
          )}

          {/* TAB 4: PROS & CONS */}
          {activeTab === 'proscons' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>Editorial Verdict: Pros & Cons</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '18px', borderRadius: '14px' }}>
                  <h5 style={{ color: '#166534', fontSize: '14px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Check size={16} /> Reasons to Buy
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#166534' }}>
                    {product.pros?.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '18px', borderRadius: '14px' }}>
                  <h5 style={{ color: '#991B1B', fontSize: '14px', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertTriangle size={16} /> Things to Consider
                  </h5>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#991B1B' }}>
                    {product.cons?.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQs */}
          {activeTab === 'faq' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>Frequently Asked Questions</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: 'var(--bg-card-subtle)', padding: '14px 18px', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', marginBottom: '4px' }}>How does Nexus Nook ensure prices are accurate?</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>We sync verified pricing across participating retailers regularly. Always check the final checkout amount on the merchant website before completing your purchase.</div>
                </div>
                <div style={{ background: 'var(--bg-card-subtle)', padding: '14px 18px', borderRadius: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '13.5px', marginBottom: '4px' }}>Is warranty covered by the brand?</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>Yes, all linked partner stores offer official manufacturer brand warranty valid across authorized service centers in India.</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
