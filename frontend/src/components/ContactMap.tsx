"use client";

import { useState } from "react";

interface ContactMapProps {
  embedSrc: string;
  directionsHref: string;
  title: string;
}

export default function ContactMap({ embedSrc, directionsHref, title }: ContactMapProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="contact-map">
      {isActive ? (
        <iframe
          src={embedSrc}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="contact-map-frame"
        />
      ) : (
        <div className="contact-map-placeholder">
          <button type="button" className="btn-hg-secondary" onClick={() => setIsActive(true)}>
            Show map
          </button>
        </div>
      )}
      <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="contact-map-directions">
        Get directions
      </a>
    </div>
  );
}
