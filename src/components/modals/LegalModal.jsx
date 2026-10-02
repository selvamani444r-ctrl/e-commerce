import React, { useState } from 'react';
import { 
  X, ShieldCheck, FileText, Info, Mail, Phone, 
  HelpCircle, ExternalLink, CheckCircle2, Lock, Scale 
} from 'lucide-react';
import { MERCHANTS_DATA } from '../../data/mockData';

export function LegalModal({ initialTab = 'about', onClose, onShowToast }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: 'Affiliate Partnership', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSent(true);
    if (onShowToast) {
      onShowToast("Message sent to Nexus Nook team! We will reply within 24 hours.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', padding: '0', maxHeight: '88vh' }}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="#84CC16" />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF' }}>
              Nexus Nook Information & Policies
            </h3>
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

        {/* Tab Strip */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-card-subtle)',
          borderBottom: '1px solid var(--border-light)',
          padding: '0 20px',
          overflowX: 'auto'
        }}>
          {[
            { id: 'about', label: 'About Nexus Nook' },
            { id: 'disclosure', label: 'Affiliate Disclosure' },
            { id: 'merchants', label: 'Verified Merchants' },
            { id: 'contact', label: 'Contact & Inquiries' },
            { id: 'privacy', label: 'Privacy Policy' },
            { id: 'terms', label: 'Terms & Conditions' },
            { id: 'editorial', label: 'Editorial Policy' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 16px',
                fontSize: '13px',
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

        {/* Tab Content */}
        <div style={{ padding: '28px', maxHeight: '550px', overflowY: 'auto', lineHeight: 1.6, fontSize: '14px', color: 'var(--text-main)' }}>
          
          {/* ABOUT US */}
          {activeTab === 'about' && (
            <div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '14px' }}>About Nexus Nook</h2>
              <p style={{ marginBottom: '14px', color: 'var(--text-secondary)' }}>
                <strong>Nexus Nook</strong> is an independent product discovery and price comparison platform designed to help shoppers discover useful products, explore buying guides, compare available offers, and make more informed purchasing decisions.
              </p>
              
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Shopping online across multiple e-commerce websites often means clicking across endless browser tabs to find verified stock, price drops, and reliable reviews. Nexus Nook unifies product benchmarks, technical specifications, and live retailer pricing into one lightning-fast, transparent discovery portal.
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>How We Select Products</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
                Our team monitors market reception, customer return rates, long-term durability metrics, and expert lab testing. We feature products that offer outstanding build quality, authentic performance, and clear value for money across every price segment.
              </p>

              <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '20px', marginBottom: '8px' }}>Affiliate Transparency</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Nexus Nook does not directly stock or ship physical merchandise. Instead, we connect shoppers directly to official retail partners (such as Amazon India, Flipkart, Croma, and Reliance Digital) using verified affiliate tracking links.
              </p>
            </div>
          )}

          {/* AFFILIATE DISCLOSURE */}
          {activeTab === 'disclosure' && (
            <div>
              <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <ShieldCheck size={22} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong style={{ color: '#166534', fontSize: '15px' }}>Full Affiliate Transparency Commitment</strong>
                  <p style={{ color: '#166534', fontSize: '13px', marginTop: '4px' }}>
                    Nexus Nook complies fully with global and Indian advertising standards, FTC affiliate guidelines, and merchant partner operating agreements.
                  </p>
                </div>
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>Affiliate Disclosure Statement</h3>
              <p style={{ marginBottom: '14px', color: 'var(--text-secondary)' }}>
                Nexus Nook is a participant in multiple affiliate marketing programs designed to provide a means for websites to earn referral fees by linking to official merchant websites.
              </p>
              <p style={{ marginBottom: '14px', color: 'var(--text-secondary)' }}>
                When you click on links labeled <strong>“View Deal”</strong>, <strong>“Check Price”</strong>, or <strong>“Shop at Retailer”</strong> on our website and proceed to make a purchase, Nexus Nook may earn an affiliate commission at no extra cost to you.
              </p>
              <h3 style={{ fontSize: '16px', fontWeight: 700, marginTop: '18px', marginBottom: '8px' }}>Important Notice on Prices & Stock</h3>
              <p style={{ color: 'var(--text-secondary)' }}>
                Product prices and availability are updated regularly from our merchant partners. However, merchant prices may fluctuate based on real-time flash sales, coupon codes, and seller inventory. Always verify the final checkout total and seller warranty details on the merchant website before confirming your purchase.
              </p>
            </div>
          )}

          {/* VERIFIED MERCHANTS DIRECTORY */}
          {activeTab === 'merchants' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>Verified Merchant Directory</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Nexus Nook indexes deals from verified Indian online marketplaces and authorized brand flagship stores:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {MERCHANTS_DATA.map(m => (
                  <div key={m.id} style={{ background: 'var(--bg-card-subtle)', border: '1px solid var(--border-light)', borderRadius: '14px', padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <strong style={{ fontSize: '16px', color: 'var(--text-main)' }}>{m.name}</strong>
                      <span style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', background: '#DCFCE7', padding: '2px 6px', borderRadius: '4px' }}>
                        {m.badge}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Tracked Deals: <strong>{m.trackedDeals}</strong>
                    </div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      Standard Return Policy: <strong>{m.returnDays}</strong>
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      Affiliate ID: {m.affiliateTrackingTag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CONTACT & PARTNERSHIPS */}
          {activeTab === 'contact' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '6px' }}>Contact Nexus Nook</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                Have questions regarding a product recommendation, affiliate partnership, or want to report an expired coupon? Reach out to our team:
              </p>

              {isSent ? (
                <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '24px', borderRadius: '14px', textAlign: 'center', color: '#166534' }}>
                  <CheckCircle2 size={32} style={{ margin: '0 auto 8px auto' }} />
                  <h4 style={{ fontSize: '18px', fontWeight: 800 }}>Thank you for reaching out!</h4>
                  <p style={{ fontSize: '13.5px', marginTop: '6px' }}>Our partnership desk will respond to your inquiry within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your name"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="name@company.com"
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Subject Inquiry</label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}
                    >
                      <option value="Affiliate Partnership">Affiliate Merchant Partnership</option>
                      <option value="Editorial Product Inclusion">Editorial Product Inclusion</option>
                      <option value="Report Expired Deal">Report Expired Deal or Incorrect Price</option>
                      <option value="General Support">General Support & Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, display: 'block', marginBottom: '4px' }}>Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Please provide details about your inquiry..."
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--bg-card)' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: '12px', borderRadius: '10px' }}>
                    Send Message to Nexus Nook
                  </button>
                </form>
              )}
            </div>
          )}

          {/* PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Privacy Policy</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Your privacy is paramount. Nexus Nook does not collect credit card numbers, banking credentials, or personal payment data, as all financial transactions take place exclusively on the external merchant's secure platform.
              </p>
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginTop: '14px', marginBottom: '6px' }}>Data We Collect</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                We use browser localStorage solely to preserve your selected dark/light theme, recent searches, wishlist items, and comparison selections locally on your device. We do not sell your personal information.
              </p>
            </div>
          )}

          {/* TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Terms & Conditions</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                By accessing Nexus Nook, you acknowledge that all product data, benchmark specs, and merchant prices are provided for informational discovery only. Nexus Nook makes no warranties regarding external merchant inventory or transit times.
              </p>
            </div>
          )}

          {/* EDITORIAL POLICY */}
          {activeTab === 'editorial' && (
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, marginBottom: '10px' }}>Editorial Policy & Integrity</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                Our editorial team maintains 100% independence from commercial merchant relationships. We do not accept paid placements to inflate product star ratings, and we regularly test both strengths and shortcomings in our Pros & Cons breakdowns.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
