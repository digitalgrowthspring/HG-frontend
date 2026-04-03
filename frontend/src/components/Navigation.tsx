'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? '27828828864';
const WA_LINK = `https://wa.me/${WHATSAPP}?text=Hi%2C%20I%27d%20like%20to%20book%20a%20jumping%20castle!`;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="glass-header">
      <div className="container header-content header-inner">
        <Link href="/" className="site-logo-link" onClick={closeMenu}>
          <Image src="/hg-logo.png" alt="Heavenly Giggles" width={250} height={129} priority fetchPriority="high" sizes="250px" className="site-logo" />
        </Link>
        <div className="header-actions">
          <Link href="/rentals" className="nav-link nav-link-subtle header-link-desktop">
            Rentals
          </Link>
          <Link href="/about-us" className="nav-link nav-link-subtle header-link-desktop">
            About
          </Link>
          <Link href="/contact-us" className="nav-link nav-link-subtle header-link-desktop">
            Contact
          </Link>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp nav-link-cta">
            WhatsApp Us
          </a>
          <button
            type="button"
            className={`burger-button${isMenuOpen ? ' is-open' : ''}`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`mobile-menu-panel${isMenuOpen ? ' is-open' : ''}`}>
        <Link href="/rentals" className="mobile-menu-link" onClick={closeMenu}>Rentals</Link>
        <Link href="/about-us" className="mobile-menu-link" onClick={closeMenu}>About</Link>
        <Link href="/contact-us" className="mobile-menu-link" onClick={closeMenu}>Contact</Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <p className="site-footer-tagline">
            Kids Jump. <span className="site-footer-tagline-highlight">You Relax.</span> We Handle the Rest.
          </p>
        </div>
        <div className="site-footer-nav">
          <span className="site-footer-nav-label">Quick Links</span>
          <div className="site-footer-quick-links">
            <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
            <span className="site-footer-separator" aria-hidden="true">|</span>
            <Link href="/terms-conditions" className="footer-link">T&amp;Cs</Link>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom">
        <p>&copy; Heavenly Giggles {new Date().getFullYear()} &mdash; All rights reserved.</p>
      </div>
    </footer>
  );
}
