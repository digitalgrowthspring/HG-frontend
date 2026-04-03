import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components/Navigation";
import { HeroMagic } from "@/components/HeroMagic";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Jumping Castle Rentals Fourways`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Jumping castle and inflatable rentals in Fourways, Johannesburg. Free delivery, setup included. Kids jump. You relax. We handle the rest.",
  icons: {
    icon: [
      { url: "/icon.png?v=3", type: "image/png" },
    ],
    shortcut: ["/icon.png?v=3"],
    apple: [{ url: "/icon.png?v=3", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {gtmId ? (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        ) : null}
      </head>
      <body style={{ margin: 0 }}>
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <HeroMagic />
        <Header />
        <main className="site-main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
