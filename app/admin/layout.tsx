import type { Metadata } from "next";
import "../[locale]/globals.css";

export const metadata: Metadata = {
  title: "Admin Panel - MKCZ",
  description: "News management admin panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
