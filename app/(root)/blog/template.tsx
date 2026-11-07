"use client";

import { usePathname } from "next/navigation";
import styles from "./blog-motion.module.css";

export default function BlogTemplate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reading = pathname !== "/blog" && !pathname.startsWith("/blog/admin");

  return (
    <div className={`${styles.page} ${reading ? styles.reader : ""}`}>
      {children}
    </div>
  );
}
