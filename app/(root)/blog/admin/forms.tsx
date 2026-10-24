"use client";

import { useState } from "react";
import { createPost, login } from "../actions";

const input =
  "w-full rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

// installed @types/react-dom predates useFormState/useFormStatus, so track state by hand.
function useAction(fn: (prev: string | null, form: FormData) => Promise<string | null | undefined>) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const action = async (form: FormData) => {
    setPending(true);
    try {
      setError((await fn(null, form)) ?? null);
    } finally {
      setPending(false);
    }
  };
  return { error, pending, action };
}

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      disabled={pending}
      className="rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium disabled:opacity-50 transition-opacity"
    >
      {pending ? "…" : children}
    </button>
  );
}

const Error = ({ msg }: { msg: string | null }) =>
  msg ? <p role="alert" className="text-sm text-red-600 dark:text-red-400">{msg}</p> : null;

export function LoginForm() {
  const { error, pending, action } = useAction(login);
  return (
    <form action={action} className="mt-8 space-y-4 max-w-xs">
      <label className="block text-sm">
        <span className="text-zinc-700 dark:text-zinc-400">Password</span>
        <input name="password" type="password" required autoFocus className={`${input} mt-1`} />
      </label>
      <Error msg={error} />
      <Submit pending={pending}>Sign in</Submit>
    </form>
  );
}

export function PostForm() {
  const { error, pending, action } = useAction(createPost);
  return (
    <form action={action} className="mt-8 space-y-4">
      <label className="block text-sm">
        <span className="text-zinc-700 dark:text-zinc-400">Title</span>
        <input name="title" required className={`${input} mt-1`} />
      </label>
      <label className="block text-sm">
        <span className="text-zinc-700 dark:text-zinc-400">Type</span>
        <select name="type" defaultValue="article" className={`${input} mt-1`}>
          <option value="article">Bài viết</option>
          <option value="note">Ghi chú</option>
          <option value="doc">Tài liệu</option>
        </select>
      </label>
      <label className="block text-sm">
        <span className="text-zinc-700 dark:text-zinc-400">Content</span>
        <textarea name="content" required rows={14} className={`${input} mt-1 font-mono`} />
        <span className="text-xs text-zinc-600 dark:text-zinc-500">Separate paragraphs with a blank line.</span>
      </label>
      <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-400">
        <input type="checkbox" name="published" defaultChecked className="h-4 w-4" /> Publish now
      </label>
      <Error msg={error} />
      <Submit pending={pending}>Save post</Submit>
    </form>
  );
}
