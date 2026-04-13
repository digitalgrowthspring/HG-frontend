# Heavenly Giggles — Client Brief

> Single source of truth for brand, context, and structure.

## Who They Are

**Heavenly Giggles** is a jumping castle and inflatable water slide rental company based in Fourways, Johannesburg.

- **Website:** https://heavenlygiggles.com
- **Backend:** https://wp.heavenlygiggles.com (WordPress/WooCommerce — not public-facing)
- **WhatsApp:** Primary support channel (+27 82 822 8864) (env: NEXT_PUBLIC_WHATSAPP)
- **Target market:** Parents in the Fourways/Johannesburg area planning kids' parties

## Brand Identity

### Colors
| Name | Hex | Usage |
|---|---|---|
| Teal | `#4ECDC4` | Primary brand, buttons, CTAs |
| Pink | `#FF6B9D` | Accents, highlights |
| White | `#FFFFFF` | Backgrounds |
| Dark | `#2C3E50` | Body text |

### Fonts
- **Heading:** Fredoka (Google Fonts)
- **Body:** Nunito (Google Fonts)

### Logo
- Text logo used in nav — no image logo in current build

## Voice & Tone
- Fun, warm, and reassuring — parents want stress-free party planning
- Never: corporate, cold, or overly formal
- CTA pattern: `Rent Online Now` (primary) + `Speak to Us on WhatsApp` (secondary)

## Products & Pricing

| Product | Slug | Price |
|---|---|---|
| Standard Jumping Castle 4m x 4m | standard-jumping-castle-4m-x-4m | R700 |
| Jumping Castle & Slide 7m x 4m | jumping-castle-slide-7m-x-4m | R900 |
| Inflatable Water Slide 7m x 1m | inflatable-water-slide-7m-x-1m | R800 |

## Delivery Pricing
- Postcode 2191 (Fourways): Free delivery
- Johannesburg fallback: R120

## Tech Stack
- **Frontend:** Next.js (App Router), vanilla CSS, Vercel
- **Backend:** WordPress/WooCommerce on Cloudways (wp.heavenlygiggles.com)
- **Payments:** PayFast via WooCommerce order-pay handoff
- **Repo:** github.com/digitalgrowthspring/HG-frontend
- **Vercel Root Directory:** frontend/

## Key Decisions
- Custom booking flow — no rental plugin reintroduced
- Booking: weekend-first, weekdays blocked by default, holiday exceptions
- Checkout creates pending WooCommerce order → redirects to order-pay URL → PayFast
- No Tailwind — vanilla CSS only, all values via tokens in globals.css
- Static product data (3 SKUs) — WooCommerce REST API is auth-gated
