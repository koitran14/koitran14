"use client";

import { motion, useReducedMotion } from "framer-motion";

const soft = [0.33, 1, 0.68, 1] as const;
const tags = { div: motion.div, section: motion.section, li: motion.li } as const;

/**
 * Fades and lifts its content into place the first time it scrolls into view.
 * `delay` staggers siblings; `zoom` adds a slight scale-up for images; `as` keeps
 * semantic wrappers (section, li). Renders statically for reduced-motion users.
 */
export const Reveal = ({
  children,
  delay = 0,
  zoom = false,
  as = "div",
  ...rest
}: {
  children: React.ReactNode;
  delay?: number;
  zoom?: boolean;
  as?: keyof typeof tags;
  className?: string;
  id?: string;
}) => {
  const reduce = useReducedMotion();
  if (reduce) {
    const Tag = as;
    return <Tag {...rest}>{children}</Tag>;
  }
  const M = tags[as];
  return (
    <M
      {...rest}
      initial={{ opacity: 0, y: 28, scale: zoom ? 0.96 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: soft }}
    >
      {children}
    </M>
  );
};
