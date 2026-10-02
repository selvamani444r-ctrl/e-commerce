import React from 'react';
import { X, Scale, Star, ExternalLink, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export function ComparisonModal({
  compareList,
  onClose,
  onRemoveFromCompare,
  onClearCompare,
  onViewDeal
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1100px', padding: '28px' }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '18px', borderBottom: '1px solid var(--border-light)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-secondary-light)', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Scale size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                Side-by-Side Product Comparison
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Comparing {compareList.length} of 4 selected products
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {compareList.length > 0 && (
              <button
                onClick={onClearCompare}
                style={{ fontSize: '13px', color: '#EF4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', background: 'none' }}
              >
                <Trash2 size={14} /> Clear All
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'var(--bg-card-subtle)',
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

        {compareList.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <Scale size={48} color="#94A3B8" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px' }}>No Products Selected For Comparison</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Click the "Compare" checkbox on any product card in the marketplace to compare specs and prices side-by-side.
            </p>
            <button onClick={onClose} className="btn-primary">
              Browse Products
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <tbody>
                {/* 1. PRODUCT IMAGES & REMOVE */}
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ width: '160px', padding: '16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '13px' }}>
                    PRODUCT
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} style={{ padding: '16px', verticalAlign: 'top', minWidth: '220px' }}>
                      <div style={{ position: 'relative', textAlign: 'center' }}>
                        <button
                          onClick={() => onRemoveFromCompare(product.id)}
                          style={{
                            position: 'absolute',
                            top: '-8px',
                            right: '-8px',
                            background: '#EF4444',
                            color: '#FFFFFF',
                            borderRadius: '50%',
                            width: '24px',
                            height: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                          title="Remove from comparison"
                        >
                          <X size={14} />
                        </button>

                        <img
                          src={product.image}
                          alt={product.name}
                          style={{ width: '110px', height: '110px', objectFit: 'contain', background: 'var(--bg-card-subtle)', borderRadius: '12px', padding: '8px' }}
                        />
                        <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '8px', color: 'var(--text-main)', lineHeight: 1.3 }}>
                          {product.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>{product.brand}</div>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 2. PRICE & DISCOUNT */}
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '13px' }}>
                    PRICE & DISCOUNT
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} style={{ padding: '16px' }}>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-main)' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                        ₹{product.originalPrice?.toLocaleString('en-IN')}
                      </div>
                      <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '11px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>
                        {product.discount}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 3. CUSTOMER RATING */}
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '13px' }}>
                    RATING & REVIEWS
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} style={{ padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 700, color: '#F59E0B' }}>
                        <Star size={15} fill="#F59E0B" /> {product.rating} / 5
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                        {product.reviewCount?.toLocaleString('en-IN')} ratings
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 4. DEAL SCORE */}
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '13px' }}>
                    NEXUS DEAL SCORE
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} style={{ padding: '16px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '6px' }}>
                        {product.dealScore || 9.5} / 10 Excellent
                      </span>
                    </td>
                  ))}
                </tr>

                {/* 5. TOP FEATURES */}
                <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '13px' }}>
                    KEY HIGHLIGHTS
                  </td>
                  {compareList.map(product => (
                    <td key={product.id} style={{ padding: '16px', fontSize: '12.5px', verticalAlign: 'top' }}>
                      <ul style={{ listStyle: 'disc', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {product.features?.slice(0, 3).map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>

                {/* 6. PRIMARY DEAL ACTION */}
                <tr>
                  <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '13px' }}>
                    DIRECT MERCHANT CTA
                  </td>
                  {compareList.map(product => {
                    const bestMerchant = product.merchants?.find(m => m.isBestPrice) || product.merchants?.[0];
                    return (
                      <td key={product.id} style={{ padding: '16px' }}>
                        <button
                          onClick={() => onViewDeal(product, bestMerchant)}
                          className="btn-deal"
                          style={{ padding: '10px 14px', fontSize: '13px' }}
                        >
                          <span>View Deal ({bestMerchant?.name})</span>
                          <ExternalLink size={14} />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
