import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Heavenly Giggles | Jumping Castle Rental & Hire Fourways" },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
