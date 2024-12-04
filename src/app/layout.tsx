import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from '@/contexts/auth-context';

const ploni = localFont({
  src: [
    {
      path: './fonts/ploni-black-aaa.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/ploni-ultrabold-aaa.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/ploni-bold-aaa.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/ploni-demibold-aaa.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/ploni-medium-aaa.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/ploni-regular-aaa.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/ploni-light-aaa.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/ploni-ultralight-aaa.woff2',
      weight: '200',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: "Drive It Console",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" className={ploni.className}>
      <body
        className={`${ploni.className} antialiased`}
        dir="rtl"
      >
        <AuthProvider>
          <main className="">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
