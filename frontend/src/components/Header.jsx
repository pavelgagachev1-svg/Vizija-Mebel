import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const LangToggle = ({ className = "", dark = false }) => {
  const { lang, setLang } = useLang();
  return (
    <div className={`inline-flex items-center border rounded-full overflow-hidden text-xs font-display font-bold tracking-widest ${
      dark ? "border-white/40" : "border-foreground/20"
    } ${className}`} data-testid="lang-toggle">
      {["mk", "en"].map((l) => (
        <button
          key={l}
          data-testid={`lang-${l}`}
          onClick={() => setLang(l)}
          className={`px-3 py-1.5 uppercase transition-colors duration-300 ${
            dark
              ? lang === l ? "bg-white text-foreground" : "text-white hover:bg-white/10"
              : lang === l ? "bg-foreground text-background" : "text-foreground hover:bg-foreground/5"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
};

export const Header = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const isDarkHero = !scrolled && (location.pathname === "/" || location.pathname === "/about");

  const links = [
    { to: "/", label: t.nav.home, testid: "nav-home" },
    { to: "/about", label: t.nav.about, testid: "nav-about" },
    { to: "/products", label: t.nav.products, testid: "nav-products" },
    { to: "/custom", label: t.nav.custom, testid: "nav-custom" },
    { to: "/gallery", label: t.nav.gallery, testid: "nav-gallery" },
    { to: "/contact", label: t.nav.contact, testid: "nav-contact" },
  ];

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-10 flex items-center justify-between h-[72px]">
        <Link to="/" data-testid="logo-link" className="flex flex-col leading-none group">
          <span className={`font-display font-extrabold text-lg tracking-tight uppercase transition-colors duration-300 ${
            isDarkHero ? "text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]" : "text-foreground"
          }`}>Визија Мебел</span>
          <span className={`text-[10px] tracking-[0.25em] uppercase transition-colors duration-300 ${
            isDarkHero ? "text-white/70 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] group-hover:text-accent" : "text-muted-foreground group-hover:text-accent"
          }`}>Bitola</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={l.testid}
              className={({ isActive }) =>
                `relative text-xs font-display font-semibold uppercase tracking-[0.15em] py-1 transition-colors duration-300 ${
                  isDarkHero
                    ? `[text-shadow:0_1px_8px_rgba(0,0,0,0.7)] ${isActive ? "text-white" : "text-white/75 hover:text-white"}`
                    : isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                } after:absolute after:left-0 after:-bottom-0.5 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                  isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangToggle className="hidden sm:inline-flex" dark={isDarkHero} />
          <button
            data-testid="mobile-menu-btn"
            className={`lg:hidden p-2 -mr-2 transition-colors duration-300 ${isDarkHero ? "text-white" : "text-foreground"}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden bg-background border-b border-border transition-all duration-500 ${
          open ? "max-h-[520px]" : "max-h-0"
        }`}
        data-testid="mobile-menu"
      >
        <nav className="px-5 py-6 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={`mobile-${l.testid}`}
              className={({ isActive }) =>
                `py-3 border-b border-border font-display font-semibold uppercase tracking-wide text-sm ${
                  isActive ? "text-accent" : "text-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-5"><LangToggle /></div>
        </nav>
      </div>
    </header>
  );
};
