import { Manrope } from 'next/font/google';

import '@snapweb/ui/globals.css';
import { Providers } from '@/components/providers';

const font = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['800', '700', '500'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${font.className} font-sans antialiased lowercase dark`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
