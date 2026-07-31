import Link from "next/link";
export default function NotFound() { return <main className="not-found"><div><span>♡</span><p className="eyebrow">Page not found</p><h1>Let’s find our way back.</h1><p>The page you were looking for may have moved or no longer exists.</p><Link href="/" className="button">Return home →</Link></div></main>; }
