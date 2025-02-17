import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO Metadata */}
        <title>Xolar Solution Sdn Bhd | Savings From Day 1</title>
        <meta
          name="description"
          content="Xolar Solution Sdn Bhd - Contact Page"
        />
        {/* Open Graph Metadata */}
        <meta
          property="og:title"
          content="Xolar Solution Sdn Bhd | Savings From Day 1"
        />
        <meta
          property="og:description"
          content="Find out how Xolar can help you save from day 1 with our innovative solar solutions."
        />
        <meta property="og:image" content="/xolar-logo-og.png" />{" "}
        {/* Update with the correct image path */}
        <meta property="og:url" content="https://xolar.my" />{" "}
        {/* Update with your website URL */}
        <meta property="og:type" content="website" />
        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Xolar Solution Sdn Bhd | Savings From Day 1"
        />
        <meta
          name="twitter:description"
          content="Find out how Xolar can help you save from day 1 with our innovative solar solutions."
        />
        <meta name="twitter:image" content="/xolar-logo-og.png" />{" "}
        {/* Update with the correct image path */}
        {/* Google Analytics Script */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-37DETFC81Y`} // Replace with your GA ID
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-37DETFC81Y'); // Replace with your GA ID
            `,
          }}
        ></script>
        {/* Facebook Pixel Script */}
        <script
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
              fbq('trackCustom', 'namecard')
            `,
          }}
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
