"use client";

export default function PrintButton() {
  return (
    <button type="button" className="quote-print-button" onClick={() => window.print()}>
      Print
    </button>
  );
}
