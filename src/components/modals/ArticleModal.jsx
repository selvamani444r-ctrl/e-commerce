import React from 'react';
import { X, BookOpen, Clock, Calendar, User, ShieldCheck, Share2 } from 'lucide-react';

export function ArticleModal({ article, onClose }) {
  if (!article) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', padding: '0', maxHeight: '90vh' }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-card-subtle)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#2563EB', textTransform: 'uppercase' }}>
            Nexus Nook Editorial Guide
          </span>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Article Body */}
        <div style={{ padding: '32px', overflowY: 'auto', maxHeight: 'calc(90vh - 65px)' }}>
          {/* Featured Image */}
          <div style={{ width: '100%', height: '280px', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
            <img src={article.featuredImage} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <h1 style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.3, marginBottom: '14px' }}>
            {article.title}
          </h1>

          {/* Metadata */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-light)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={14} /> {article.author}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {article.date}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> {article.readTime}
            </span>
          </div>

          {/* Article Text */}
          <div style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
            {article.content}
          </div>

          {/* Bottom Disclosure Box */}
          <div style={{
            marginTop: '36px',
            background: 'var(--bg-card-subtle)',
            border: '1px solid var(--border-light)',
            borderRadius: '14px',
            padding: '18px 22px',
            fontSize: '12.5px',
            color: 'var(--text-secondary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: '#16A34A', marginBottom: '4px' }}>
              <ShieldCheck size={16} /> Independent Editorial Policy
            </div>
            Nexus Nook’s editorial ratings and product inclusions are never sponsored or influenced by retailers. If you purchase through our verified comparison links, we may earn an affiliate commission at no extra cost to you.
          </div>
        </div>
      </div>
    </div>
  );
}
