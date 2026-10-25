import Link from 'next/link'

const Logo = () => (
  <Link
    href="/"
    scroll={false}
    className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
    style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
  >
    koitran<span className="text-blue-600 dark:text-blue-400">.</span>
  </Link>
)

export default Logo;
