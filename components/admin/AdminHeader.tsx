"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/admin" className="text-xl font-bold text-neutral-900">
          MKCZ Admin
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            News
          </Link>
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            target="_blank"
          >
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}
