"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navigation = [
  { href: "/#uzmanlik", label: "Hizmetlerimiz" },
  { href: "/#projeler", label: "Projeler" },
  { href: "/#hakkimizda", label: "Hakkımızda" },
];

export function SiteHeader({ logo = "" }: { logo?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Durmaz Kardeşler ana sayfa">
          <img
            className="brand-image header-brand-image"
            src={logo || "/logo.svg"}
            alt="Durmaz Kardeşler Yapı İnşaat"
          />
        </Link>
        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Ana menü">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-contact-mobile" href="/#teklif-formu" onClick={() => setMenuOpen(false)}>
            Teklif isteyin <ArrowUpRight size={16} />
          </Link>
        </nav>
        <Link className="header-cta" href="/#teklif-formu">
          Teklif Al <ArrowUpRight size={16} />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
