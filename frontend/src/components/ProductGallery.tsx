"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  name: string;
  mainSrc: string;
  angles: string[];
}

export default function ProductGallery({ name, mainSrc, angles }: ProductGalleryProps) {
  const photos = [mainSrc, ...angles];
  const [active, setActive] = useState(0);

  return (
    <div className="product-gallery">
      <div className="hg-hero-photo product-hero-photo">
        <Image
          key={photos[active]}
          src={photos[active]}
          alt={name}
          width={1600}
          height={900}
          className="hg-hero-img product-hero-img"
          priority
          fetchPriority="high"
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>

      {photos.length > 1 ? (
        <div className="product-gallery-thumbs" role="group" aria-label={`${name} photos`}>
          {photos.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`product-gallery-thumb${active === index ? " is-active" : ""}`}
              aria-pressed={active === index}
              aria-label={`${name}, photo ${index + 1}`}
              onClick={() => setActive(index)}
            >
              <Image src={src} alt="" width={240} height={180} sizes="90px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
