import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "技术", href: "#capabilities" },
  { label: "产品", href: "#products" },
  { label: "场景", href: "#scenes" },
  { label: "科研", href: "#research" },
  { label: "动态", href: "#evidence" },
  { label: "关于", href: "#about" },
];

const Topbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/90 backdrop-blur-md shadow-sm border-b" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding flex items-center justify-between h-16 md:h-18">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="五季医学" className="h-8 w-8" />
          <div className="leading-tight">
            <span className="font-semibold text-foreground text-[#0069e0] text-lg">五季医学</span>
            <span className="hidden lg:block text-[10px] text-muted-foreground leading-tight">
              BEIJING FIVE SEASONS MEDICAL TECHNOLOGY CO.,LTD
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            联系我们
          </a>
          {/* Mobile menu */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b">
          <nav className="flex flex-col section-padding py-4 gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground rounded-md"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg"
            >
              联系我们
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Topbar;
