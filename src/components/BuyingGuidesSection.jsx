import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, ArrowRight, User, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { EDITORIAL_ARTICLES } from '../data/mockData';

export function BuyingGuidesSection({ onOpenArticle }) {
  const [showAll, setShowAll] = useState(false);
  const displayedArticles = showAll ? EDITORIAL_ARTICLES : EDITORIAL_ARTICLES.slice(0, 4);

  return (
    <section style={{ padding: '56px 0', background: 'var(--bg-body)', width: '100%', overflow: 'hidden' }}>
      <div className="container-marketplace">
        
        {/* Section Header */}
        <div className="section-header">
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#2563EB', fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
              <BookOpen size={15} /> Editorial Lab
            </div>
            <h2 className="section-title">
              Smart Shopping Guides
            </h2>
            <p className="section-subtitle">
              Helpful comparisons and buying guides designed to make product research easier
            </p>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="buying-guides-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          width: '100%'
        }}>
          {displayedArticles.map(article => (
            <article
              key={article.id}
              onClick={() => onOpenArticle(article)}
              className="nn-card"
              style={{
                cursor: 'pointer',
                borderRadius: '18px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {/* Image banner */}
              <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  className="guide-card-img"
                />
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  background: 'rgba(11, 18, 32, 0.85)',
                  backdropFilter: 'blur(4px)',
                  color: '#84CC16',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '6px'
                }}>
                  {article.category}
                </span>
              </div>

              {/* Text content */}
              <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                
                {/* Meta author & date */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <User size={13} /> {article.author}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {article.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '18px', fontWeight: 800, lineHeight: 1.35, color: 'var(--text-main)', marginBottom: '10px', wordBreak: 'break-word' }}>
                  {article.title}
                </h3>

                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px', wordBreak: 'break-word' }}>
                  {article.excerpt}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#2563EB', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    Read Full Guide <ArrowRight size={15} />
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    Independent Review
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Centered Read More / Show More Button */}
        {EDITORIAL_ARTICLES.length > 4 && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '32px', width: '100%' }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '11px 28px',
                borderRadius: '12px',
                fontSize: '13.5px',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <span>{showAll ? 'Show Less Guides' : `Read More Shopping Guides (${EDITORIAL_ARTICLES.length - 4} more)`}</span>
              {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        )}

      </div>

      <style>{`
        .nn-card:hover .guide-card-img {
          transform: scale(1.05);
        }
        @media (max-width: 640px) {
          .buying-guides-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
