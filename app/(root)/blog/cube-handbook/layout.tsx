import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";

// The handbook keeps its research-note typography inside the site layout.
const newsreader = Newsreader({ subsets: ["latin", "vietnamese"], style: ["normal", "italic"], variable: "--font-newsreader" });
const archivo = Archivo({ subsets: ["latin", "vietnamese"], variable: "--font-archivo" });
const mono = JetBrains_Mono({ subsets: ["latin", "vietnamese"], variable: "--font-jbmono" });

export default function HandbookLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${newsreader.variable} ${archivo.variable} ${mono.variable}`}>{children}</div>;
}
