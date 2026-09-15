
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /* --------------------------------
     NAVBAR ENTRANCE ANIMATION
  -------------------------------- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(navbarRef.current, {
          y: -100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(
          logoRef.current,
          {
            x: -30,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .from(
          navItemsRef.current?.querySelectorAll(".nav-item"),
          {
            y: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .from(
          ctaRef.current,
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
    }, navbarRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /* --------------------------------
     MOBILE MENU ANIMATION
  -------------------------------- */
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const items = menu.querySelectorAll(".mobile-nav-item");

    if (isMenuOpen) {
      gsap.to(menu, {
        height: "auto",
        opacity: 1,
        duration: 0.45,
        ease: "power3.out",
      });

      gsap.fromTo(
        items,
        {
          y: -15,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.35,
          stagger: 0.07,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(menu, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isMenuOpen]);

  const handleMenuToggle = () => {
    setIsMenuOpen((previous) => !previous);
  };

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={navbarRef}
      className="fixed left-0 top-0 z-50 w-full px-4 pt-4 sm:px-6 lg:px-8"
    >
      <nav className="mx-auto max-w-7xl rounded-2xl border border-black/10 bg-white/90 px-5 py-4 shadow-lg shadow-black/5 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-6">
          {/* =========================
              LOGO
          ========================== */}
          <a
            ref={logoRef}
            href="#home"
            className="group flex shrink-0 items-center gap-2"
          >
            {/* SVG Logo Icon */}
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black transition-transform duration-300 group-hover:rotate-6">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M5 5V19"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                <path
                  d="M5 5H12C14.2 5 16 6.8 16 9C16 11.2 14.2 13 12 13H5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M12 13L17.5 19"
                  stroke="#A855F7"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            <span className="text-lg font-bold tracking-tight text-black sm:text-xl">
              Digital<span className="text-purple-600">X</span>
            </span>
          </a>

          {/* =========================
              DESKTOP NAVIGATION
          ========================== */}
          <div
            ref={navItemsRef}
            className="hidden shrink-0 items-center gap-6 lg:gap-8 md:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="nav-item group relative py-2 text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-black"
              >
                {item.label}

                {/* SVG underline */}
                <svg
                  className="absolute bottom-0 left-0 h-1 w-full overflow-visible"
                  viewBox="0 0 100 4"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2H98"
                    pathLength="1"
                    className="fill-none stroke-purple-600 [stroke-width:3] [stroke-dasharray:1] [stroke-dashoffset:1] transition-all duration-300 group-hover:[stroke-dashoffset:0]"
                  />
                </svg>
              </a>
            ))}
          </div>

          {/* =========================
              DESKTOP CTA
          ========================== */}
          <a
            ref={ctaRef}
            href="#contact"
            className="group relative hidden shrink-0 items-center gap-2 overflow-hidden rounded-full bg-black px-5 py-3 text-sm font-semibold text-white md:inline-flex"
          >
            <span className="relative z-10">Let's Talk</span>

            {/* Arrow SVG */}
            <svg
              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />

              <path
                d="M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Hover background */}
            <span className="absolute inset-0 -translate-x-full bg-purple-600 transition-transform duration-300 group-hover:translate-x-0" />
          </a>

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            onClick={handleMenuToggle}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-gray-50 md:hidden"
          >
            <svg
              className={`h-6 w-6 transition-transform duration-300 ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <>
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <path
                    d="M4 7H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M4 12H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M4 17H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* =========================
            MOBILE MENU
        ========================== */}
        <div
          ref={mobileMenuRef}
          className="h-0 overflow-hidden opacity-0 md:hidden"
        >
          <div className="mt-4 border-t border-black/10 pt-3">
            <div className="flex flex-col">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="mobile-nav-item border-b border-black/5 py-4 text-sm font-medium text-gray-700 transition-all duration-300 hover:pl-2 hover:text-purple-600"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile CTA */}
              <a
                href="#contact"
                onClick={closeMobileMenu}
                className="mobile-nav-item mt-4 flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-purple-600"
              >
                <span>Let's Talk</span>

                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

