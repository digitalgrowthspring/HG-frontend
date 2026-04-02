import type { ReactNode } from 'react';
import '../app/terms-conditions/legal.css';

interface LegalShellProps {
  badge?: string;
  title: string;
  date?: string;
  children: ReactNode;
}

export default function LegalShell({ badge = 'Legal', title, date, children }: LegalShellProps) {
  return (
    <div className="legal-page">
      <div className="legal-blob-1" />
      <div className="legal-blob-2" />
      <div className="legal-blob-3" />

      <section className="legal-hero">
        <div className="legal-container">
          <div className="legal-badge">
            <span className="legal-badge-dot" />
            {badge}
          </div>
          <h1>{title}</h1>
          {date && (
            <p className="legal-meta">
              Last updated: {date} &nbsp;·&nbsp; heavenlygiggles.com
            </p>
          )}
        </div>
      </section>

      <div className="legal-body">
        <div className="legal-container">
          {children}
        </div>
      </div>
    </div>
  );
}
