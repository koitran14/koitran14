import Link from "next/link";
import { isAdmin } from "@/lib/blog";
import { logout } from "../actions";
import { LoginForm, PostForm } from "./forms";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const admin = isAdmin();

  return (
    <div className="py-8 pb-24">
      <div className="flex items-baseline justify-between">
        <Link href="/blog" className="text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">← Notes</Link>
        {admin && (
          <form action={logout}>
            <button className="text-sm text-zinc-600 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100">Sign out</button>
          </form>
        )}
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {admin ? "New post" : "Admin"}
      </h1>
      {!process.env.ADMIN_PASSWORD && (
        <p className="mt-4 text-sm text-amber-600">Set ADMIN_PASSWORD in .env to enable admin.</p>
      )}
      {admin ? <PostForm /> : <LoginForm />}
    </div>
  );
}
