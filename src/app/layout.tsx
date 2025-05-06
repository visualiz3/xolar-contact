import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

// Google Font Setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Xolar Solution Sdn Bhd | Savings From Day 1",
  description: "Xolar Solution Sdn Bhd - Contact Page",
  openGraph: {
    title: "Xolar Solution Sdn Bhd | Savings From Day 1",
    description:
      "Find out how Xolar can help you save from day 1 with our innovative solar solutions.",
    images: ["/xolar-logo-og.png"],
    url: "https://xolar.my",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xolar Solution Sdn Bhd | Savings From Day 1",
    description:
      "Find out how Xolar can help you save from day 1 with our innovative solar solutions.",
    images: ["/xolar-logo-og.png"],
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
        {/* <Script
          async
          src="https://www.googletagmanager.com/gtm.js?id=GTM-5S7RBCBM"
        ></Script>
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-37DETFC81Y`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-37DETFC81Y');
          `}
        </Script> */}
        {/* Facebook Pixel Script */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1320897905761892'); // Replace with your Pixel ID
              fbq('track', 'PageView');
            `,
          }}
        ></script> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
      <GoogleTagManager gtmId="GTM-5S7RBCBM" />
    </html>
  );
}
