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
  twitter: {
    card: "summary_large_image",
    title: "Precedent - Building blocks for your Next.js project",
    description:
      "Precedent is the all-in-one solution for your Next.js project. It includes a design system, authentication, analytics, and more.",
    creator: "@steventey",
  },
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