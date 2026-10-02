import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertCircle, ExternalLink, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';

export function PriceComparisonSection({ products, onViewDeal, onSelectProduct }) {
  // Flagship items with multi-merchant entries
  const comparisonProducts = products.filter(p => p.merchants && p.merchants.length >= 3).slice(0, 4);
  const [selectedProductId, setSelectedProductId] = useState(comparisonProducts[0]?.id || 'prod-sony-wh1000xm5');

  const currentProduct = products.find(p => p.id === selectedProductId) || comparisonProducts[0];

  return (
    <section id="comparison-section" style={{
      padding: '52px 0',
      background: 'var(--bg-body)'
    }}>
      <div className="container-marketplace">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563EB', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <Scale size={15} /> Multi-Retailer Benchmark
            </div>
            <h2 className="section-title">
              Compare Before You Buy
            </h2>
            <p className="section-subtitle">
              See product differences, pricing, shipping speeds, and return policies across major merchants in one place
            </p>
          </div>

          {/* Product selector buttons */}
          <div className="comparison-tabs" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', WebkitOverflowScrolling: 'touch', minWidth: 0, maxWidth: '100%', width: '100%' }}>
            {comparisonProducts.map(p => {
              const isSelected = p.id === selectedProductId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  style={{
                    background: isSelected ? '#2563EB' : 'var(--bg-card)',
                    color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                    border: isSelected ? '1px solid #2563EB' : '1px solid var(--border-light)',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {p.brand} {p.subcategory}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comparison Showcase Container */}
        {currentProduct && (
          <div className="nn-card" style={{ padding: '24px', overflow: 'hidden' }}>
            {/* Top Product Snapshot Header */}
            <div className="comparison-product-header" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              paddingBottom: '20px',
              borderBottom: '1px solid var(--border-light)',
              marginBottom: '20px'
            }}>
              <div className="comparison-product-info" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'contain', background: 'var(--bg-card-subtle)', padding: '6px', flexShrink: 0 }}
                />
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
                    {currentProduct.brand} • {currentProduct.category}
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                    {currentProduct.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={14} fill="#F59E0B" color="#F59E0B" />
                      <strong>{currentProduct.rating} / 5</strong>
                    </div>
                    <span>({currentProduct.reviewCount?.toLocaleString('en-IN')} reviews)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectProduct(currentProduct)}
                className="btn-secondary comparison-specs-btn"
                style={{ fontSize: '13px', padding: '9px 18px' }}
              >
                View Full Specs & Overview
              </button>
            </div>

            {/* 1. DESKTOP TABLE VIEW (> 768px) */}
            <div className="comparison-desktop-table" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-card-subtle)', borderBottom: '2px solid var(--border-light)' }}>
                    <th style={{ padding: '14px 16px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>ONLINE MERCHANT</th>
                    <th style={{ padding: '14px 16px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>CURRENT PRICE</th>
                    <th style={{ padding: '14px 16px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>SAVINGS / DISCOUNT</th>
                    <th style={{ padding: '14px 16px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>ESTIMATED DELIVERY</th>
                    <th style={{ padding: '14px 16px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>RETURN WINDOW</th>
                    <th style={{ padding: '14px 16px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>MERCHANT RATING</th>
                    <th style={{ padding: '14px 16px', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProduct.merchants.map((merchant, idx) => {
                    const isLowest = merchant.isBestPrice;
                    return (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid var(--border-light)',
                          background: isLowest ? 'rgba(37, 99, 235, 0.04)' : 'transparent',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        {/* Merchant Name & Badge */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <strong style={{ fontSize: '14px', color: 'var(--text-main)' }}>{merchant.name}</strong>
                            {isLowest && (
                              <span style={{
                                background: '#84CC16',
                                color: '#0B1220',
                                fontSize: '10.5px',
                                fontWeight: 800,
                                padding: '2px 6px',
                                borderRadius: '4px'
                              }}>
                                LOWEST PRICE
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Price */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ fontSize: '17px', fontWeight: 800, color: isLowest ? '#16A34A' : 'var(--text-main)' }}>
                            ₹{merchant.price.toLocaleString('en-IN')}
                          </div>
                          {merchant.originalPrice > merchant.price && (
                            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                              ₹{merchant.originalPrice.toLocaleString('en-IN')}
                            </div>
                          )}
                        </td>

                        {/* Discount */}
                        <td style={{ padding: '16px' }}>
                          <span style={{
                            background: '#DCFCE7',
                            color: '#166534',
                            fontSize: '12px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            {Math.round(((merchant.originalPrice - merchant.price) / merchant.originalPrice) * 100)}% OFF
                          </span>
                        </td>

                        {/* Shipping */}
                        <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-main)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Truck size={15} color="#2563EB" />
                            <span>{merchant.shipping}</span>
                          </div>
                        </td>

                        {/* Return Policy */}
                        <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-main)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <RotateCcw size={15} color="#16A34A" />
                            <span>{merchant.returnDays}</span>
                          </div>
                        </td>

                        {/* Merchant Rating */}
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12.5px', fontWeight: 700, color: '#F59E0B' }}>
                            <Star size={13} fill="#F59E0B" /> {merchant.rating} / 5
                          </div>
                        </td>

                        {/* View Deal Button */}
                        <td style={{ padding: '16px', textAlign: 'right' }}>
                          <button
                            onClick={() => onViewDeal(currentProduct, merchant)}
                            className={isLowest ? "btn-lime" : "btn-primary"}
                            style={{
                              padding: '8px 16px',
                              fontSize: '13px',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            <span>View Deal</span>
                            <ExternalLink size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* 2. MOBILE CARD VIEW (<= 768px: clean responsive cards) */}
            <div className="comparison-mobile-cards" style={{ display: 'none', flexDirection: 'column', gap: '14px' }}>
              {currentProduct.merchants.map((merchant, idx) => {
                const isLowest = merchant.isBestPrice;
                const discountPercent = Math.round(((merchant.originalPrice - merchant.price) / merchant.originalPrice) * 100);
                return (
                  <div 
                    key={idx}
                    style={{
                      background: isLowest ? 'rgba(37, 99, 235, 0.05)' : 'var(--bg-card-subtle)',
                      border: isLowest ? '1.5px solid #2563EB' : '1px solid var(--border-light)',
                      borderRadius: '14px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    {/* Merchant Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '15px', color: 'var(--text-main)' }}>{merchant.name}</strong>
                        {isLowest && (
                          <span style={{
                            background: '#84CC16',
                            color: '#0B1220',
                            fontSize: '10px',
                            fontWeight: 800,
                            padding: '2px 6px',
                            borderRadius: '4px'
                          }}>
                            LOWEST
                          </span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', fontWeight: 700, color: '#F59E0B' }}>
                        <Star size={13} fill="#F59E0B" /> {merchant.rating}
                      </div>
                    </div>

                    {/* Price and Savings Row */}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '20px', fontWeight: 800, color: isLowest ? '#16A34A' : 'var(--text-main)' }}>
                          ₹{merchant.price.toLocaleString('en-IN')}
                        </span>
                        {merchant.originalPrice > merchant.price && (
                          <span style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through', marginLeft: '8px' }}>
                            ₹{merchant.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                      {discountPercent > 0 && (
                        <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>

                    {/* Delivery & Returns Info */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-secondary)', paddingTop: '6px', borderTop: '1px solid var(--border-light)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Truck size={14} color="#2563EB" /> {merchant.shipping}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <RotateCcw size={14} color="#16A34A" /> {merchant.returnDays}
                      </span>
                    </div>

                    {/* Centered CTA Button */}
                    <button
                      onClick={() => onViewDeal(currentProduct, merchant)}
                      className={isLowest ? "btn-lime" : "btn-deal"}
                      style={{
                        width: '100%',
                        padding: '11px',
                        fontSize: '13.5px',
                        justifyContent: 'center',
                        borderRadius: '10px'
                      }}
                    >
                      <span>View Deal at {merchant.name}</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer strip */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '18px',
              padding: '12px 16px',
              background: 'var(--bg-card-subtle)',
              borderRadius: '10px',
              fontSize: '12px',
              color: 'var(--text-secondary)'
            }}>
              <AlertCircle size={16} color="#64748B" style={{ flexShrink: 0 }} />
              <span>
                <strong>Affiliate Price Notice:</strong> Prices and stock availability are provided for comparison and may fluctuate. Verify final price and delivery pin-code on merchant site before purchase.
              </span>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 768px) {
          .comparison-desktop-table {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
          }
          .comparison-mobile-cards {
            display: flex !important;
            width: 100% !important;
          }
          .comparison-product-header {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .comparison-product-info {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
          .comparison-specs-btn {
            width: 100% !important;
            max-width: 300px !important;
            justify-content: center !important;
            margin: 0 auto !important;
          }
          .comparison-tabs {
            justify-content: flex-start !important;
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
