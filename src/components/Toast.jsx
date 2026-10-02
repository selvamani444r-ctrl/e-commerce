import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react';

export function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div key={toast.id} className="toast" onClick={() => onDismiss(toast.id)}>
          <CheckCircle2 size={18} color="#84CC16" />
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
