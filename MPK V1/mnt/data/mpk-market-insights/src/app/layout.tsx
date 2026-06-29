import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MPK Market Insights',
  description: 'Hybrid market signal dashboard for Chrome'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
