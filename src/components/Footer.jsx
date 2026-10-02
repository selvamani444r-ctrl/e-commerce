import React from 'react';
import { 
  ShieldCheck, ExternalLink, ArrowUp, Info, Heart 
} from 'lucide-react';
import { CATEGORIES_DATA } from '../data/mockData';

export function Footer({ onOpenLegal, onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: 'var(--bg-footer)',
      color: '#CBD5E1',
      paddingTop: '60px',
      paddingBottom: '32px',
      borderTop: '1px solid rgba(255,255,255,0.08)'
    }}>
      <div className="container-marketplace">
        
        {/* Main 5-Column Grid */}
        <div className="footer-columns-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '36px',
          marginBottom: '48px'
        }}>
          
          {/* Column 1: Brand Info & Socials */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
                border: '1px solid rgba(37, 99, 235, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
                  <rect x="20" y="20" width="16" height="60" rx="8" fill="#2563EB" />
                  <path d="M34 25 L66 75 A 8 8 0 0 0 80 70 L80 25 A 8 8 0 0 0 64 25 L64 48 L44 20 A 8 8 0 0 0 34 25 Z" fill="#3B82F6" />
                  <rect x="64" y="20" width="16" height="60" rx="8" fill="#2563EB" />
                  <circle cx="80" cy="20" r="9" fill="#84CC16" />
                </svg>
              </div>

              <div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>NEXUS</span>
                <span style={{ fontSize: '20px', fontWeight: 600, color: '#38BDF8', marginLeft: '4px' }}>NOOK</span>
              </div>
            </div>

            <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: 1.6, marginBottom: '18px' }}>
              Discover More. Shop Smarter. A smart shopping destination where users discover, compare, and access the best products and deals from leading online retailers.
            </p>

            {/* Social Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {[
                { 
                  name: 'Instagram', 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> 
                },
                { 
                  name: 'Facebook', 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> 
                },
                { 
                  name: 'YouTube', 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg> 
                },
                { 
                  name: 'Twitter / X', 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg> 
                },
                { 
                  name: 'LinkedIn', 
                  svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> 
                }
              ].map(s => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#CBD5E1',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#FFFFFF'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#CBD5E1'; }}
                >
                  {s.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Shop Departments */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Shop Departments
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('electronics')} style={{ color: '#94A3B8' }}>Electronics & Tech</a></li>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('mobiles')} style={{ color: '#94A3B8' }}>5G Smartphones</a></li>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('laptops')} style={{ color: '#94A3B8' }}>Laptops & MacBooks</a></li>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('audio')} style={{ color: '#94A3B8' }}>Audio & Headphones</a></li>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('fashion')} style={{ color: '#94A3B8' }}>Fashion & Sneakers</a></li>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('home-kitchen')} style={{ color: '#94A3B8' }}>Home & Kitchen</a></li>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('appliances')} style={{ color: '#94A3B8' }}>Smart TV & Appliances</a></li>
              <li><a href="#catalog-discovery-section" onClick={() => onSelectCategory('gaming')} style={{ color: '#94A3B8' }}>Gaming & Consoles</a></li>
            </ul>
          </div>

          {/* Column 3: Discover */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Discover & Compare
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><a href="#todays-deals-section" style={{ color: '#84CC16', fontWeight: 600 }}>Today's Best Deals</a></li>
              <li><a href="#trending-section" style={{ color: '#94A3B8' }}>Trending Products</a></li>
              <li><a href="#comparison-section" style={{ color: '#94A3B8' }}>Multi-Store Comparisons</a></li>
              <li><a href="#catalog-discovery-section" style={{ color: '#94A3B8' }}>Tech Under ₹5,000</a></li>
              <li><a href="#catalog-discovery-section" style={{ color: '#94A3B8' }}>Work From Home Picks</a></li>
              <li><button onClick={() => onOpenLegal('editorial')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Editorial Buying Guides</button></li>
              <li><button onClick={() => onOpenLegal('merchants')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Verified Merchant Directory</button></li>
            </ul>
          </div>

          {/* Column 4: Company & Legal */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Company & Policies
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><button onClick={() => onOpenLegal('about')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>About Nexus Nook</button></li>
              <li><button onClick={() => onOpenLegal('disclosure')} style={{ color: '#38BDF8', textAlign: 'left', background: 'none', fontWeight: 600 }}>Affiliate Disclosure</button></li>
              <li><button onClick={() => onOpenLegal('editorial')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Editorial Policy</button></li>
              <li><button onClick={() => onOpenLegal('privacy')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Privacy Policy</button></li>
              <li><button onClick={() => onOpenLegal('terms')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Terms & Conditions</button></li>
              <li><button onClick={() => onOpenLegal('cookies')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Cookie Policy</button></li>
              <li><button onClick={() => onOpenLegal('disclaimer')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Disclaimer</button></li>
            </ul>
          </div>

          {/* Column 5: Support & Contact */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 800, textTransform: 'uppercase', color: '#FFFFFF', letterSpacing: '0.04em', marginBottom: '16px' }}>
              Help & Partnerships
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><button onClick={() => onOpenLegal('contact')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Contact Nexus Nook</button></li>
              <li><button onClick={() => onOpenLegal('contact')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Affiliate Merchant Inquiries</button></li>
              <li><button onClick={() => onOpenLegal('contact')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Content & Press Team</button></li>
              <li><button onClick={() => onOpenLegal('contact')} style={{ color: '#94A3B8', textAlign: 'left', background: 'none' }}>Report an Outdated Deal</button></li>
            </ul>

            <div style={{ marginTop: '20px' }}>
              <button
                onClick={scrollToTop}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#FFFFFF',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  fontSize: '12px',
                  fontWeight: 600,
                  transition: 'background 0.2s ease'
                }}
              >
                <ArrowUp size={14} /> Back to top
              </button>
            </div>
          </div>

        </div>

        {/* TRUST & MANDATORY AFFILIATE DISCLOSURE CALLOUT BOX */}
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: '20px 24px',
          marginBottom: '32px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#84CC16', fontSize: '13px', fontWeight: 700, marginBottom: '6px' }}>
            <ShieldCheck size={18} />
            <span>Independent Shopping Discovery & Affiliate Transparency Disclosure</span>
          </div>
          <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: 1.6 }}>
            Nexus Nook is an independent product discovery, price comparison, and editorial review platform. When you click on a "View Deal" button or link to purchase a product from external partner merchant websites (including Amazon, Flipkart, Croma, Myntra, Tata CLiQ, and Reliance Digital), Nexus Nook may earn an affiliate commission at no additional cost to you. Product prices, availability, and merchant promotional discounts are gathered for informational comparison and are subject to immediate change on merchant sites. Always verify final checkout price, merchant return policies, and delivery terms on the destination store before placing your order. Nexus Nook does not directly stock, sell, or ship merchandise.
          </p>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="footer-bottom-bar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '12px',
          color: '#64748B',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div>
            © {new Date().getFullYear()} Nexus Nook Technologies. All rights reserved. “Discover More. Shop Smarter.”
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => onOpenLegal('privacy')} style={{ color: '#64748B', background: 'none' }}>Privacy</button>
            <button onClick={() => onOpenLegal('terms')} style={{ color: '#64748B', background: 'none' }}>Terms</button>
            <button onClick={() => onOpenLegal('disclosure')} style={{ color: '#64748B', background: 'none' }}>Disclosure</button>
            <button onClick={() => onOpenLegal('contact')} style={{ color: '#64748B', background: 'none' }}>Contact</button>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-columns-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </footer>
  );
}
