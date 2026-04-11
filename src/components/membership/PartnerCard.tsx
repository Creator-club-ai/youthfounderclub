"use client";

import { useState } from "react";
import Image from "next/image";

export interface ServiceItem {
  name: string;
  note?: string;
  original?: string;
  member: string;
  accent?: boolean;
}

interface PartnerCardProps {
  logo: string;
  logoAlt: string;
  invertLogo?: boolean;
  logoScale?: number;
  category: string;
  headline: string;
  headlineAccent: string;
  items: ServiceItem[];
  previewCount?: number;
}

export default function PartnerCard({
  logo,
  logoAlt,
  invertLogo = false,
  logoScale,
  category,
  headline,
  headlineAccent,
  items,
  previewCount = 2,
}: PartnerCardProps) {
  const [open, setOpen] = useState(false);
  const extraCount = items.length - previewCount;

  return (
    <div className={`ms-pcard ${open ? "ms-pcard-open" : ""}`}>
      {/* Header */}
      <div className="ms-pcard-header">
        <div className="ms-pcard-logo-wrap">
          <Image
            src={logo}
            alt={logoAlt}
            fill
            style={{
              objectFit: "contain",
              objectPosition: "left center",
              filter: invertLogo ? "invert(1)" : "none",
              transform: logoScale ? `scale(${logoScale})` : "none",
              transformOrigin: "left center",
            }}
          />
        </div>
        <span className="ms-pcard-cat en">{category}</span>
      </div>

      {/* Body */}
      <div className="ms-pcard-body">
        <p className="ms-pcard-headline ko">
          {headline}{" "}
          <strong className="ms-pcard-accent">{headlineAccent}</strong>
        </p>

        {/* Preview items */}
        <ul className="ms-pcard-list ko">
          {items.slice(0, previewCount).map((item, i) => (
            <li key={i} className="ms-pcard-item">
              <span className="ms-pcard-name">
                {item.name}
                {item.note && <span className="ms-pcard-note">{item.note}</span>}
              </span>
              <span className={`ms-pcard-price ${item.accent ? "ms-pcard-price-accent" : ""}`}>
                {item.original && <s>{item.original}</s>}
                <strong>{item.member}</strong>
              </span>
            </li>
          ))}
        </ul>

        {/* Expandable items */}
        {extraCount > 0 && (
          <>
            <div className={`ms-pcard-extra ${open ? "ms-pcard-extra-open" : ""}`}>
              <div className="ms-pcard-extra-inner">
                <ul className="ms-pcard-list ko">
                  {items.slice(previewCount).map((item, i) => (
                    <li key={i} className="ms-pcard-item">
                      <span className="ms-pcard-name">
                        {item.name}
                        {item.note && <span className="ms-pcard-note">{item.note}</span>}
                      </span>
                      <span className={`ms-pcard-price ${item.accent ? "ms-pcard-price-accent" : ""}`}>
                        {item.original && <s>{item.original}</s>}
                        <strong>{item.member}</strong>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              className="ms-pcard-toggle ko"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {open ? (
                <>접기 <span className="ms-pcard-toggle-icon">↑</span></>
              ) : (
                <>혜택 {extraCount}개 더 보기 <span className="ms-pcard-toggle-icon">↓</span></>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
