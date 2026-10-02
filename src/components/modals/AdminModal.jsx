import React, { useState } from 'react';
import { 
  X, Settings, Plus, Trash2, Edit3, Check, 
  ExternalLink, BarChart3, Database, ShieldCheck, Tag 
} from 'lucide-react';
import { CATEGORIES_DATA } from '../../data/mockData';

export function AdminModal({
  isOpen,
  onClose,
  products,
  onAddProduct,
  onDeleteProduct,
  clickLogs
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'add' | 'analytics'
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'electronics',
    subcategory: 'Tech Gadget',
    price: '',
    originalPrice: '',
    discount: '15% OFF',
    rating: 4.8,
    merchantName: 'Amazon India',
    affiliateUrl: 'https://amazon.in/dp/sample?tag=nexusnook-amz-21',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=80',
    shortDescription: 'High quality affiliate product added via Nexus Nook admin.',
    isFeatured: true,
    isTrending: true,
    isDealOfTheDay: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      id: `prod-custom-${Date.now()}`,
      name: formData.name,
      brand: formData.brand,
      category: formData.category,
      subcategory: formData.subcategory,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      discount: formData.discount,
      rating: Number(formData.rating),
      reviewCount: 1,
      dealScore: 9.5,
      badge: 'New Arrival',
      image: formData.image,
      shortDescription: formData.shortDescription,
      merchants: [
        {
          name: formData.merchantName,
          price: Number(formData.price),
          originalPrice: Number(formData.originalPrice || formData.price),
          shipping: 'Free Express Delivery',
          returnDays: '7 Days Return',
          inStock: true,
          rating: 4.8,
          isBestPrice: true,
          affiliateUrl: formData.affiliateUrl
        }
      ],
      affiliateUrl: formData.affiliateUrl,
      isFeatured: formData.isFeatured,
      isTrending: formData.isTrending,
      isDealOfTheDay: formData.isDealOfTheDay,
      tags: [formData.brand, formData.category]
    };

    onAddProduct(newProduct);
    setActiveTab('products');
    alert('Product successfully added to Nexus Nook marketplace catalog!');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '950px', padding: '0', maxHeight: '88vh' }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'var(--bg-header-main)',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38BDF8' }}>
              <Settings size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
                Nexus Nook Affiliate CMS & Product Manager
              </h3>
              <p style={{ fontSize: '12px', color: '#94A3B8' }}>
                Headless e-commerce & API-ready catalog controller
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Subnav Tabs */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-card-subtle)',
          borderBottom: '1px solid var(--border-light)',
          padding: '0 24px'
        }}>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '12px 18px',
              fontSize: '13.5px',
              fontWeight: activeTab === 'products' ? 700 : 500,
              color: activeTab === 'products' ? '#2563EB' : 'var(--text-secondary)',
              borderBottom: activeTab === 'products' ? '2px solid #2563EB' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer'
            }}
          >
            Manage Products ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('add')}
            style={{
              padding: '12px 18px',
              fontSize: '13.5px',
              fontWeight: activeTab === 'add' ? 700 : 500,
              color: activeTab === 'add' ? '#2563EB' : 'var(--text-secondary)',
              borderBottom: activeTab === 'add' ? '2px solid #2563EB' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Plus size={15} /> Add New Affiliate Product
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            style={{
              padding: '12px 18px',
              fontSize: '13.5px',
              fontWeight: activeTab === 'analytics' ? 700 : 500,
              color: activeTab === 'analytics' ? '#2563EB' : 'var(--text-secondary)',
              borderBottom: activeTab === 'analytics' ? '2px solid #2563EB' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BarChart3 size={15} /> Affiliate Clicks & Conversion Logs
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '24px', maxHeight: '550px', overflowY: 'auto' }}>
          
          {/* TAB 1: PRODUCT LIST */}
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Total active catalog items: <strong>{products.length}</strong>
                </span>
                <button onClick={() => setActiveTab('add')} className="btn-primary" style={{ fontSize: '12.5px', padding: '6px 14px' }}>
                  <Plus size={14} /> Add Product
                </button>
              </div>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ background: 'var(--bg-card-subtle)', borderBottom: '2px solid var(--border-light)' }}>
                      <th style={{ padding: '10px' }}>PRODUCT</th>
                      <th style={{ padding: '10px' }}>CATEGORY</th>
                      <th style={{ padding: '10px' }}>PRICE</th>
                      <th style={{ padding: '10px' }}>PRIMARY MERCHANT</th>
                      <th style={{ padding: '10px' }}>STATUS</th>
                      <th style={{ padding: '10px', textAlign: 'right' }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 20).map(p => (
                      <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={p.image} alt={p.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'contain' }} />
                          <div>
                            <div style={{ fontWeight: 700, color: 'var(--text-main)', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {p.name}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.brand}</div>
                          </div>
                        </td>
                        <td style={{ padding: '10px', textTransform: 'capitalize' }}>{p.category}</td>
                        <td style={{ padding: '10px', fontWeight: 700 }}>₹{p.price.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '10px', color: '#2563EB', fontWeight: 600 }}>{p.merchants?.[0]?.name || 'Amazon India'}</td>
                        <td style={{ padding: '10px' }}>
                          {p.isTrending && <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px', marginRight: '4px' }}>Trending</span>}
                          {p.isFeatured && <span style={{ background: '#E0F2FE', color: '#0369A1', fontSize: '10.5px', padding: '2px 6px', borderRadius: '4px' }}>Featured</span>}
                        </td>
                        <td style={{ padding: '10px', textAlign: 'right' }}>
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            style={{ color: '#EF4444', padding: '4px', background: 'none', cursor: 'pointer' }}
                            title="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ADD PRODUCT FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleCreateProduct} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Product Title *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Sony WH-1000XM6 Headphones"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Sony, Apple, Samsung"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                >
                  {CATEGORIES_DATA.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  placeholder="e.g. Wireless Audio"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Discounted Deal Price (₹) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="24999"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Original / M.R.P Price (₹)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="29990"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Affiliate Merchant</label>
                <select
                  name="merchantName"
                  value={formData.merchantName}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                >
                  <option value="Amazon India">Amazon India</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Croma Retail">Croma Retail</option>
                  <option value="Reliance Digital">Reliance Digital</option>
                  <option value="Myntra">Myntra</option>
                  <option value="Tata CLiQ Luxury">Tata CLiQ Luxury</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Affiliate Tracking URL *</label>
                <input
                  type="url"
                  name="affiliateUrl"
                  value={formData.affiliateUrl}
                  onChange={handleInputChange}
                  required
                  placeholder="https://merchant.com/item?tag=nexusnook"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
                />
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '20px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                  <input type="checkbox" name="isTrending" checked={formData.isTrending} onChange={handleInputChange} />
                  Trending Product
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                  <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} />
                  Featured Collection
                </label>
              </div>

              <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
                  <Plus size={16} /> Save Product to Catalog
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: CLICK ANALYTICS */}
          {activeTab === 'analytics' && (
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '14px' }}>
                Affiliate Outbound Clicks Tracker
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Real-time log of user clicks on "View Deal" actions, tracked with affiliate destination parameters.
              </p>

              {clickLogs && clickLogs.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {clickLogs.map((log, i) => (
                    <div key={i} style={{ background: 'var(--bg-card-subtle)', padding: '12px 16px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                      <div>
                        <strong>{log.productName}</strong>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Merchant: {log.merchantName} • Time: {log.timestamp}</div>
                      </div>
                      <span style={{ background: '#DCFCE7', color: '#166534', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px' }}>
                        Redirect Verified
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  No affiliate outbound clicks registered in this session yet. Click any "View Deal" button on the marketplace to simulate tracking!
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
