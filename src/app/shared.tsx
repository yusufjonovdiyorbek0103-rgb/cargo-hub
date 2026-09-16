import { useState, useEffect, useId, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { Menu, X, Mail, ArrowRight, ChevronRight, ChevronDown } from "lucide-react";
import logoMasthead from "../imports/image-1.png";

// ─── NavA — reliable SPA-aware anchor ────────────────────────────────────────
// Renders a plain <a> with a real href (right-click, a11y) while using
// useNavigate for client-side navigation, avoiding Link interception issues
// in sandboxed/iframe preview environments.
export function NavA({
  to,
  href,
  children,
  className,
  style,
  onClick: onClickProp,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}) {
  const navigate = useNavigate();
  return (
    <a
      href={to ?? href ?? "#"}
      onClick={(e) => {
        if (to) {
          e.preventDefault();
          navigate(to);
        }
        onClickProp?.();
      }}
      className={className}
      style={style}
    >
      {children}
    </a>
  );
}

// ─── Brand tokens ────────────────────────────────────────────────────────────
export const NAVY = "#06264A";
export const GOLD = "#C39A3B";
export const LIGHT_GRAY = "#F5F7FA";
export const TEXT_GRAY = "#4B5563";
export const BORDER_GRAY = "#E5E7EB";
export const SERIF = "'Playfair Display', Georgia, serif";

// ─── Nav link definitions ─────────────────────────────────────────────────────
export type DropdownItem = { label: string; to?: string; href?: string };
type PageLink   = { type: "page";     label: string; to: string };
type AnchorLink = { type: "anchor";   label: string; href: string };
type DropdownLink = { type: "dropdown"; label: string; items: DropdownItem[] };
export type NavLink = PageLink | AnchorLink | DropdownLink;

export const NAV_LINKS: NavLink[] = [
  { type: "page", label: "About", to: "/about" },
  { type: "page", label: "Aims & Scope", to: "/aims-scope" },
  {
    type: "dropdown", label: "For Authors", items: [
      { label: "Author Guidelines",     to: "/author-guidelines" },
      { label: "Call for Papers",        to: "/call-for-papers" },
      { label: "Manuscript Template",    to: "/manuscript-template" },
      { label: "Submit Manuscript",      to: "/portal/login" },
      { label: "Manuscript Checklist",   to: "/checklist" },
      { label: "Publication Ethics",     to: "/publication-ethics" },
      { label: "AI Use Policy",          to: "/ai-use-policy" },
      { label: "Plagiarism Policy",      to: "/plagiarism-policy" },
      { label: "Copyright & Fees",       to: "/copyright-fees" },
    ],
  },
  {
    type: "dropdown", label: "Issues", items: [
      { label: "Current Issue",     to: "/current-issue" },
      { label: "Archives",          to: "/archives" },
      { label: "Articles in Press", to: "/articles-in-press" },
      { label: "Browse Articles",   to: "/browse" },
    ],
  },
  {
    type: "dropdown", label: "Editorial", items: [
      { label: "Editorial Board",     to: "/editorial-board" },
      { label: "Reviewer Guidelines", to: "/reviewer-guidelines" },
      { label: "Peer Review Policy",  to: "/peer-review-policy" },
      { label: "Become a Reviewer",   to: "/become-reviewer" },
    ],
  },
  { type: "page", label: "Indexing", to: "/indexing-roadmap" },
  { type: "page", label: "Contact",  to: "/contact" },
];

// ─── Journal Emblem SVG ───────────────────────────────────────────────────────
export function JournalEmblem({ size = 48 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  const lId = `lhalf${id}`;
  const rId = `rhalf${id}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="50" cy="50" r="46" stroke={GOLD} strokeWidth="3" fill="white" />
      <defs>
        <clipPath id={lId}>
          <rect x="0" y="0" width="50" height="100" />
        </clipPath>
        <clipPath id={rId}>
          <rect x="50" y="0" width="50" height="100" />
        </clipPath>
      </defs>
      {/* Globe — left half */}
      <g clipPath={`url(#${lId})`}>
        <circle cx="50" cy="50" r="40" stroke={NAVY} strokeWidth="0.8" fill="none" opacity="0.25" />
        <ellipse cx="50" cy="50" rx="22" ry="40" stroke={NAVY} strokeWidth="0.8" fill="none" opacity="0.22" />
        <line x1="10" y1="33" x2="50" y2="33" stroke={NAVY} strokeWidth="0.7" opacity="0.28" />
        <line x1="10" y1="50" x2="50" y2="50" stroke={NAVY} strokeWidth="0.7" opacity="0.28" />
        <line x1="10" y1="67" x2="50" y2="67" stroke={NAVY} strokeWidth="0.7" opacity="0.28" />
        <path d="M18,38 L26,32 L35,34 L40,40 L37,48 L28,51 L19,47 Z" fill={NAVY} opacity="0.75" />
        <circle cx="27" cy="41" r="2.2" fill={GOLD} />
      </g>
      {/* AI circuit — right half */}
      <g clipPath={`url(#${rId})`}>
        <circle cx="60" cy="33" r="3.5" fill={NAVY} />
        <circle cx="76" cy="27" r="3" fill={NAVY} />
        <circle cx="86" cy="44" r="3.5" fill={NAVY} />
        <circle cx="78" cy="60" r="3" fill={NAVY} />
        <circle cx="62" cy="67" r="3.5" fill={NAVY} />
        <circle cx="71" cy="76" r="2.5" fill={GOLD} />
        <line x1="60" y1="33" x2="76" y2="27" stroke={NAVY} strokeWidth="1.2" />
        <line x1="76" y1="27" x2="86" y2="44" stroke={NAVY} strokeWidth="1.2" />
        <line x1="86" y1="44" x2="78" y2="60" stroke={NAVY} strokeWidth="1.2" />
        <line x1="78" y1="60" x2="62" y2="67" stroke={NAVY} strokeWidth="1.2" />
        <line x1="62" y1="67" x2="71" y2="76" stroke={NAVY} strokeWidth="1" />
        <line x1="60" y1="33" x2="86" y2="44" stroke={NAVY} strokeWidth="0.6" opacity="0.38" />
        <line x1="60" y1="33" x2="78" y2="60" stroke={NAVY} strokeWidth="0.6" opacity="0.38" />
        <line x1="76" y1="27" x2="62" y2="67" stroke={NAVY} strokeWidth="0.6" opacity="0.38" />
        <circle cx="68" cy="30" r="1.8" fill={GOLD} />
        <circle cx="81.5" cy="35.5" r="1.8" fill={GOLD} />
        <circle cx="83" cy="52" r="1.4" fill={GOLD} />
      </g>
      <line x1="50" y1="8" x2="50" y2="92" stroke={GOLD} strokeWidth="1.2" opacity="0.45" />
      <circle cx="19" cy="20" r="1.5" fill={GOLD} opacity="0.7" />
      <circle cx="82" cy="15" r="1.2" fill={GOLD} opacity="0.5" />
    </svg>
  );
}

// ─── Utility Bar ──────────────────────────────────────────────────────────────
export function UtilityBar() {
  return (
    <div
      className="hidden md:block text-xs py-2 px-4"
      style={{ backgroundColor: NAVY, color: "#c8d4e3" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span>ISSN: Coming Soon</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Open Access
          </span>
          <span>Peer-Reviewed</span>
          <span>Monthly Publication</span>
        </div>
        <a
          href="mailto:editorial@cajaidt.org"
          className="flex items-center gap-1.5 transition-colors hover:text-white"
        >
          <Mail size={11} />
          editorial@cajaidt.org
        </a>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const [menuOpen, setMenuOpen]       = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [openDd, setOpenDd]           = useState<string | null>(null);
  const [mobileOpenDd, setMobileOpenDd] = useState<string | null>(null);
  const ddTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOpenDd(null);
    setMobileOpenDd(null);
  }, [location.pathname]);

  const isActive = (to: string) => location.pathname === to;
  const isDdActive = (items: DropdownItem[]) =>
    items.some(item => item.to && location.pathname === item.to);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, to: string) => {
    e.preventDefault();
    navigate(to);
  };

  // Hover-with-delay so mouse can move from trigger into the panel
  const enterDd = (label: string) => {
    if (ddTimer.current) clearTimeout(ddTimer.current);
    setOpenDd(label);
  };
  const leaveDd = () => {
    ddTimer.current = setTimeout(() => setOpenDd(null), 130);
  };

  const baseLinkCls = (active: boolean) =>
    `whitespace-nowrap text-[13px] font-medium transition-opacity cursor-pointer ${active ? "opacity-100" : "opacity-65 hover:opacity-100"}`;
  const baseLinkStyle = (active: boolean): React.CSSProperties =>
    active ? { color: NAVY, borderBottom: `2px solid ${GOLD}`, paddingBottom: "2px" } : { color: NAVY };

  // ── Desktop dropdown panel ────────────────────────────────────────────────
  const DesktopDropdown = ({ link }: { link: Extract<NavLink, { type: "dropdown" }> }) => {
    const active = isDdActive(link.items);
    return (
      <div
        className="relative"
        onMouseEnter={() => enterDd(link.label)}
        onMouseLeave={leaveDd}
      >
        <button
          type="button"
          className={`${baseLinkCls(active || openDd === link.label)} flex items-center gap-1`}
          style={baseLinkStyle(active)}
        >
          {link.label}
          <ChevronDown
            size={12}
            style={{ transition: "transform 0.15s", transform: openDd === link.label ? "rotate(180deg)" : undefined }}
          />
        </button>

        {openDd === link.label && (
          <div
            className="absolute top-full left-0 mt-2 rounded-xl border bg-white shadow-xl py-1.5 z-50"
            style={{ borderColor: BORDER_GRAY, minWidth: "220px" }}
            onMouseEnter={() => enterDd(link.label)}
            onMouseLeave={leaveDd}
          >
            {link.items.map(item => (
              <NavA
                key={item.label}
                to={item.to}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium hover:bg-gray-50 transition-colors"
                style={{
                  color: item.to && isActive(item.to) ? GOLD : NAVY,
                  backgroundColor: item.to && isActive(item.to) ? "rgba(195,154,59,0.06)" : undefined,
                }}
              >
                {item.label}
                {item.to && isActive(item.to) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GOLD }} />
                )}
              </NavA>
            ))}
          </div>
        )}
      </div>
    );
  };

  // ── Mobile accordion dropdown ─────────────────────────────────────────────
  const MobileDropdown = ({ link }: { link: Extract<NavLink, { type: "dropdown" }> }) => {
    const isOpen = mobileOpenDd === link.label;
    return (
      <div>
        <button
          type="button"
          onClick={() => setMobileOpenDd(isOpen ? null : link.label)}
          className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
          style={{ color: NAVY }}
        >
          <span>{link.label}</span>
          <ChevronDown
            size={14}
            style={{ transition: "transform 0.15s", transform: isOpen ? "rotate(180deg)" : undefined, color: TEXT_GRAY }}
          />
        </button>
        {isOpen && (
          <div className="ml-4 mt-0.5 mb-1 pl-3 space-y-0.5 border-l" style={{ borderColor: BORDER_GRAY }}>
            {link.items.map(item => (
              <NavA
                key={item.label}
                to={item.to}
                href={item.href}
                className="block px-2 py-2 text-sm rounded hover:bg-gray-50 transition-colors"
                style={{
                  color: item.to && isActive(item.to) ? GOLD : TEXT_GRAY,
                  fontWeight: item.to && isActive(item.to) ? 600 : 400,
                }}
              >
                {item.label}
              </NavA>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white transition-shadow duration-200"
      style={{
        boxShadow: scrolled ? "0 2px 16px rgba(6,38,74,0.10)" : undefined,
        borderBottom: scrolled ? undefined : `1px solid ${BORDER_GRAY}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-[72px]">

          {/* Wordmark */}
          <a href="/" onClick={(e) => goTo(e, "/")} className="flex items-center gap-3 flex-shrink-0" style={{ textDecoration: "none" }}>
            <JournalEmblem size={44} />
            <div className="leading-tight">
              <div className="font-bold text-base tracking-widest uppercase" style={{ color: NAVY, fontFamily: SERIF, letterSpacing: "0.12em" }}>
                CAJAIDT
              </div>
              <div className="text-[10px] leading-snug hidden sm:block" style={{ color: TEXT_GRAY }}>
                Central Asian Journal of Artificial Intelligence
                <br />and Digital Transformation
              </div>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4">
            {NAV_LINKS.map((link) => {
              if (link.type === "dropdown") return <DesktopDropdown key={link.label} link={link} />;
              if (link.type === "page") return (
                <a key={link.label} href={link.to} onClick={(e) => goTo(e, link.to)}
                  className={baseLinkCls(isActive(link.to))} style={baseLinkStyle(isActive(link.to))}>
                  {link.label}
                </a>
              );
              return (
                <a key={link.label} href={link.href} className={baseLinkCls(false)} style={{ color: NAVY }}>
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA group */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <a href="/portal/login" onClick={(e) => goTo(e, "/portal/login")}
              className="text-xs font-medium transition-opacity opacity-55 hover:opacity-90" style={{ color: NAVY }}>
              Login / Register
            </a>
            <a href="/portal/login" onClick={(e) => goTo(e, "/portal/login")}
              className="px-4 py-2 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}>
              Submit Manuscript
            </a>
          </div>

          {/* Hamburger */}
          <button className="lg:hidden p-2 rounded" type="button"
            onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu" style={{ color: NAVY }}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden py-4 space-y-1 border-t" style={{ borderColor: BORDER_GRAY }}>
            {NAV_LINKS.map((link) => {
              if (link.type === "dropdown") return <MobileDropdown key={link.label} link={link} />;
              if (link.type === "page") return (
                <a key={link.label} href={link.to} onClick={(e) => goTo(e, link.to)}
                  className="block px-3 py-2.5 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                  style={{ color: NAVY, backgroundColor: isActive(link.to) ? `${GOLD}12` : undefined }}>
                  {link.label}
                </a>
              );
              return (
                <a key={link.label} href={link.href}
                  className="block px-3 py-2.5 text-sm font-medium rounded hover:bg-gray-50 transition-colors"
                  style={{ color: NAVY }}>
                  {link.label}
                </a>
              );
            })}
            <div className="pt-3 space-y-2 border-t" style={{ borderColor: BORDER_GRAY }}>
              <a href="/portal/login" onClick={(e) => goTo(e, "/portal/login")}
                className="block px-3 py-2 text-sm font-medium" style={{ color: TEXT_GRAY }}>
                Login / Register
              </a>
              <a href="/portal/login" onClick={(e) => goTo(e, "/portal/login")}
                className="block px-3 py-2.5 text-sm font-semibold text-white text-center rounded transition-opacity hover:opacity-90"
                style={{ backgroundColor: GOLD }}>
                Submit Manuscript
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const FOOTER_JOURNAL = [
  { label: "About", to: "/about" },
  { label: "Aims & Scope", to: "/aims-scope" },
  { label: "Editorial Board", to: "/editorial-board" },
  { label: "Indexing Roadmap", to: "/indexing-roadmap" },
  { label: "Call for Papers", to: "/call-for-papers" },
  { label: "Contact", href: "mailto:editorial@cajaidt.org" },
];
const FOOTER_AUTHORS: Array<{ label: string; to?: string; href?: string }> = [
  { label: "Author Guidelines", to: "/author-guidelines" },
  { label: "Manuscript Template", to: "/manuscript-template" },
  { label: "Submit Manuscript", to: "/portal/login" },
  { label: "Manuscript Checklist", to: "/checklist" },
  { label: "Publication Fees", to: "/copyright-fees" },
];
const FOOTER_POLICIES: Array<{ label: string; to?: string; href?: string }> = [
  { label: "Publication Ethics", to: "/publication-ethics" },
  { label: "Peer Review Policy", to: "/peer-review-policy" },
  { label: "Plagiarism Policy", to: "/plagiarism-policy" },
  { label: "AI Use Policy", to: "/ai-use-policy" },
  { label: "Copyright & License", to: "/copyright-fees" },
  { label: "Reviewer Guidelines", to: "/reviewer-guidelines" },
  { label: "Become a Reviewer", to: "/become-reviewer" },
  { label: "Help Center", to: "/help" },
];
const FOOTER_ISSUES: Array<{ label: string; to: string }> = [
  { label: "Current Issue", to: "/current-issue" },
  { label: "Archives", to: "/archives" },
  { label: "Articles in Press", to: "/articles-in-press" },
];

export function Footer() {
  return (
    <footer>
      <div className="py-16 px-4 sm:px-6" style={{ backgroundColor: "#021d38" }}>
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <JournalEmblem size={40} />
              <div>
                <div className="font-bold text-[15px] text-white" style={{ fontFamily: SERIF }}>
                  CAJAIDT
                </div>
                <div className="text-[11px] leading-snug" style={{ color: "#7a9cbd" }}>
                  Central Asian Journal of AI
                  <br />
                  and Digital Transformation
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed mb-5 max-w-xs" style={{ color: "#7a9cbd" }}>
              An international open-access, peer-reviewed scholarly journal advancing AI, data science, intelligent systems, and digital transformation research.
            </p>
            <div className="space-y-1 text-[11px]" style={{ color: "#4a6a8a" }}>
              <div>ISSN: Coming Soon</div>
              <a href="http://www.cajaidt.org" className="transition-colors hover:text-white block">
                www.cajaidt.org
              </a>
            </div>
          </div>

          {/* Journal links */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: GOLD }}>
              Journal
            </div>
            <ul className="space-y-2.5">
              {FOOTER_JOURNAL.map((item) => (
                <li key={item.label}>
                  <NavA
                    to={"to" in item ? item.to : undefined}
                    href={"href" in item ? item.href : undefined}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "#7a9cbd" }}
                  >
                    {item.label}
                  </NavA>
                </li>
              ))}
            </ul>
          </div>

          {/* For Authors */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: GOLD }}>
              For Authors
            </div>
            <ul className="space-y-2.5">
              {FOOTER_AUTHORS.map((item) => (
                <li key={item.label}>
                  <NavA
                    to={item.to}
                    href={item.href}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "#7a9cbd" }}
                  >
                    {item.label}
                  </NavA>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies + Issues */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: GOLD }}>
              Policies
            </div>
            <ul className="space-y-2.5 mb-7">
              {FOOTER_POLICIES.map((item) => (
                <li key={item.label}>
                  <NavA
                    to={item.to}
                    href={item.href}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "#7a9cbd" }}
                  >
                    {item.label}
                  </NavA>
                </li>
              ))}
            </ul>
            <div className="text-[10px] font-bold uppercase tracking-wider mb-4" style={{ color: GOLD }}>
              Issues
            </div>
            <ul className="space-y-2.5">
              {FOOTER_ISSUES.map((item) => (
                <li key={item.label}>
                  <NavA
                    to={item.to}
                    className="text-xs transition-colors hover:text-white"
                    style={{ color: "#7a9cbd" }}
                  >
                    {item.label}
                  </NavA>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div
        className="py-4 px-4 sm:px-6 border-t"
        style={{ backgroundColor: "#010f1f", borderColor: "#0d2a45" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-[11px] text-center sm:text-left" style={{ color: "#4a6a8a" }}>
            © 2027 Central Asian Journal of Artificial Intelligence and Digital Transformation. All rights reserved.
          </div>
          <div className="text-[11px]" style={{ color: "#4a6a8a" }}>
            Open Access · Peer-reviewed · Monthly Online Journal
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Reusable page building blocks ───────────────────────────────────────────

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageBannerProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle?: string;
}

export function PageBanner({ breadcrumbs, title, subtitle }: PageBannerProps) {
  return (
    <div className="py-10 md:py-14 border-b" style={{ backgroundColor: LIGHT_GRAY, borderColor: BORDER_GRAY }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-[11px] mb-5" style={{ color: TEXT_GRAY }}>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight size={11} opacity={0.5} />}
              {crumb.to ? (
                <NavA to={crumb.to} className="hover:underline transition-colors" style={{ color: GOLD }}>
                  {crumb.label}
                </NavA>
              ) : (
                <span style={{ color: TEXT_GRAY }}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        {/* Gold accent rule */}
        <div className="w-8 h-0.5 mb-5" style={{ backgroundColor: GOLD }} />
        <h1
          className="text-3xl md:text-4xl font-bold mb-3"
          style={{ color: NAVY, fontFamily: SERIF }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-base max-w-2xl leading-relaxed" style={{ color: TEXT_GRAY }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

interface BottomCTAProps {
  title: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function BottomCTA({
  title,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: BottomCTAProps) {
  return (
    <div className="py-16 px-4 sm:px-6 border-t" style={{ borderColor: BORDER_GRAY }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-7" style={{ color: NAVY, fontFamily: SERIF }}>
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={primaryHref}
            className="px-7 py-2.5 text-sm font-semibold text-white rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: GOLD }}
          >
            {primaryLabel}
          </a>
          <a
            href={secondaryHref}
            className="px-7 py-2.5 text-sm font-semibold rounded border-2 transition-opacity hover:opacity-70"
            style={{ color: NAVY, borderColor: NAVY }}
          >
            {secondaryLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <div
          className="text-[11px] font-bold tracking-widest uppercase mb-3"
          style={{ color: GOLD }}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className="text-2xl md:text-3xl font-bold mb-4"
        style={{ color: NAVY, fontFamily: SERIF }}
      >
        {title}
      </h2>
      <div
        className={`w-10 h-0.5 mb-4 ${center ? "mx-auto" : ""}`}
        style={{ backgroundColor: GOLD }}
      />
      {subtitle && (
        <p className="text-[14px] leading-relaxed max-w-2xl" style={{ color: TEXT_GRAY }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function ProseSection({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] leading-relaxed" style={{ color: TEXT_GRAY }}>
      {children}
    </p>
  );
}

// ─── Quick links sidebar ──────────────────────────────────────────────────────
export interface SidebarLink {
  label: string;
  to?: string;
  href?: string;
}

export function QuickLinksSidebar({
  title,
  links,
  primaryAction,
  note,
}: {
  title: string;
  links: SidebarLink[];
  primaryAction?: { label: string; href: string };
  note?: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border overflow-hidden" style={{ borderColor: BORDER_GRAY }}>
        <div className="px-5 py-4" style={{ backgroundColor: NAVY }}>
          <h3 className="text-sm font-bold text-white tracking-wide">{title}</h3>
        </div>
        <ul className="divide-y divide-gray-100">
          {links.map((link, i) => (
            <li key={i}>
              <NavA
                to={link.to}
                href={link.href}
                className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors"
              >
                <span className="text-xs font-medium" style={{ color: NAVY }}>{link.label}</span>
                <ChevronRight size={12} style={{ color: GOLD }} />
              </NavA>
            </li>
          ))}
        </ul>
        {primaryAction && (
          <div className="px-5 py-4 border-t" style={{ borderColor: BORDER_GRAY }}>
            <a
              href={primaryAction.href}
              className="block text-center px-4 py-2 text-xs font-semibold text-white rounded transition-opacity hover:opacity-90"
              style={{ backgroundColor: GOLD }}
            >
              {primaryAction.label}
            </a>
          </div>
        )}
      </div>
      {note && (
        <div className="rounded-xl p-4" style={{ backgroundColor: LIGHT_GRAY, border: `1px solid ${BORDER_GRAY}` }}>
          <div className="text-[11px] leading-relaxed" style={{ color: TEXT_GRAY }}>{note}</div>
        </div>
      )}
    </div>
  );
}

// ─── Info / highlight box ─────────────────────────────────────────────────────
type InfoBoxType = "rule" | "warning" | "note" | "sample";

export function InfoBox({
  type = "note",
  title,
  children,
}: {
  type?: InfoBoxType;
  title?: string;
  children: React.ReactNode;
}) {
  const cfg: Record<InfoBoxType, { bg: string; accent: string }> = {
    rule:    { bg: "rgba(6,38,74,0.04)",   accent: NAVY },
    warning: { bg: "rgba(195,154,59,0.07)", accent: GOLD },
    note:    { bg: LIGHT_GRAY,              accent: BORDER_GRAY },
    sample:  { bg: "#f0f9ff",              accent: "#3B82F6" },
  };
  const { bg, accent } = cfg[type];
  return (
    <div
      className="rounded-xl p-6"
      style={{ backgroundColor: bg, border: `1px solid ${BORDER_GRAY}`, borderLeft: `4px solid ${accent}` }}
    >
      {title && (
        <div className="text-sm font-bold mb-3" style={{ color: accent === BORDER_GRAY ? NAVY : accent }}>
          {title}
        </div>
      )}
      <div className="text-[14px] leading-relaxed" style={{ color: TEXT_GRAY }}>{children}</div>
    </div>
  );
}

// ─── Policy card grid ─────────────────────────────────────────────────────────
export function PolicyCardGrid({ items, cols = 3 }: { items: string[]; cols?: 2 | 3 | 4 }) {
  const gridClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[cols];
  return (
    <div className={`grid ${gridClass} gap-3`}>
      {items.map((item, i) => (
        <div
          key={i}
          className="flex items-start gap-3 rounded-lg px-4 py-3.5"
          style={{ backgroundColor: "white", border: `1px solid ${BORDER_GRAY}` }}
        >
          <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: GOLD }} />
          <span className="text-[13px] font-medium leading-snug" style={{ color: NAVY }}>{item}</span>
        </div>
      ))}
    </div>
  );
}

export { logoMasthead };
