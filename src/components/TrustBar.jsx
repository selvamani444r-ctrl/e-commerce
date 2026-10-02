import React from 'react';
import { Compass, ShieldCheck, Scale, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export function TrustBar() {
  const trustItems = [
    {
      icon: <Compass size={22} color="#2563EB" />,
      title: "Millions of Products Discovered",
      desc: "Curated catalog of tested tech & lifestyle"
    },
    {
      icon: <ShieldCheck size={22} color="#16A34A" />,
      title: "Trusted Marketplace Links",
      desc: "Direct official URLs with zero spoofing"
    },
    {
      icon: <Scale size={22} color="#84CC16" />,
      title: "Smart Product Comparison",
      desc: "Live pricing & specs side-by-side"
    },
    {
      icon: <RefreshCw size={22} color="#F59E0B" />,
      title: "Updated Deals Daily",
      desc: "Scanned & verified every 30 minutes"
    },
    {
      icon: <FileText size={22} color="#8B5CF6" />,
      title: "Independent Affiliate Reviews",
      desc: "Objective lab testing & buying guides"
    }
  ];

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border-light)',
      borderBottom: '1px solid var(--border-light)',
      padding: '18px 0',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <div className="container-marketplace">
        <div className="trust-bar-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px'
        }}>
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="trust-bar-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 10px',
                borderRadius: '12px',
                transition: 'background 0.2s ease'
              }}
            >
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'var(--bg-card-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.25 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .trust-bar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .trust-bar-item {
            padding: 6px !important;
          }
        }
        @media (max-width: 480px) {
          .trust-bar-grid {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
