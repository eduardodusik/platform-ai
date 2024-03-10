import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export const metadata = {
  title: "Platatform AI",
  description:
    "Description",
  themeColor: "#FFF",
};

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={cx(sfPro.variable, inter.variable)}>
    <main className="w-full h-full">
      {children}
    </main>
    <Analytics />
    </body>
    </html>
  );
}