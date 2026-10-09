import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Muhammad Muneeb — AI/ML Engineer",
  description:
    "AI/ML engineer building practical machine learning systems, intelligent applications, and research-driven prototypes.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Portfolio",
    "Python",
    "PyTorch",
  ],
  openGraph: {
    title: "[YOUR NAME] — AI/ML Engineer",
    description:
      "AI/ML engineer building practical machine learning systems, intelligent applications, and research-driven prototypes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "[YOUR NAME] — AI/ML Engineer",
    description:
      "AI/ML engineer building practical machine learning systems, intelligent applications, and research-driven prototypes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme) document.documentElement.setAttribute('data-theme', theme);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
