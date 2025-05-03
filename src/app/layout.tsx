import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const departureMono = localFont({
  src: [
    {
      path: "../../public/fonts/DepartureMono.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-departure-mono",
  display: "swap", // Prevents invisible text (as if I know what this means)
});

export const metadata: Metadata = {
  title: "Pomodoro...Idler?",
  description: "pp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${departureMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
