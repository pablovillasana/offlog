import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { AlertProvider } from "~/components/providers/alert-provider";

export const metadata: Metadata = {
  title: "Offlog | Dashboard",
  description:
    "Offlog is a simple and easy-to-use logging system for your offroad data.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <AlertProvider>{children}</AlertProvider>
      </body>
    </html>
  );
}
