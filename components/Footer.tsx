
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#analyse-project" },
];

const serviceLinks = [
  "Performance Marketing",
  "Creative & Content",
  "Web Experiences",
  "SEO & Growth",
];

export default function Footer() {
  const footerRef = useRef<HTMLElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);
  const wolfRef = useRef<HTMLDivElement | null>(null);
  const footerContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const headline = headlineRef.current;
    const orb = orbRef.current;
    const wolf = wolfRef.current;
    const content = footerContentRef.current;

    if (!footer || !headline || !orb || !wolf || !content) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set([headline, orb, wolf, content], {
          clearProps: "all",
        });

        return;
      }

      gsap.from(headline, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(content.children, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: content,
          start: "top 90%",
          once: true,
        },
      });

      gsap.to(orb, {
        yPercent: -35,
        xPercent: 20,
        rotation: 30,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(wolf, {
        yPercent: -15,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.to(".footer-marquee-track", {
        xPercent: -25,
        ease: "none",
        scrollTrigger: {
          trigger: footer,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, footer);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#030304] text-white"
    >
      {/* Atmospheric background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:72px_72px]" />

        <div className="absolute left-[-15%] top-[15%] h-[450px] w-[450px] rounded-full bg-violet-600/15 blur-[150px]" />

        <div className="absolute bottom-[-20%] right-[-10%] h-[550px] w-[550px] rounded-full bg-blue-500/10 blur-[160px]" />

        <div
          ref={orbRef}
          className="absolute right-[8%] top-[12%] h-44 w-44 rounded-full border border-violet-400/20 bg-gradient-to-br from-violet-500/20 via-blue-500/10 to-transparent md:h-72 md:w-72"
        />
      </div>

      {/* Massive closing statement */}
      <div className="relative px-5 pb-20 pt-24 sm:px-8 md:pb-28 md:pt-32 lg:px-12">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
            <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-blue-400" />
            Digital Wolf
          </div>

          <h2
            ref={headlineRef}
            className="max-w-6xl text-[clamp(3.8rem,10vw,10.5rem)] font-semibold leading-[0.82] tracking-[-0.075em]"
          >
            MAKE
            <br />
            <span className="bg-gradient-to-r from-white via-violet-200 to-blue-300 bg-clip-text text-transparent">
              NOISE.
            </span>
          </h2>

          <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/40 md:text-base">
              Your next stage of growth should not look like everyone else.
              Let&apos;s build something people remember.
            </p>

            <a
              href="#analyse-project"
              className="group relative inline-flex w-fit items-center gap-4 overflow-hidden rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-transform duration-300 hover:-translate-y-1"
            >
              <span className="relative z-10">Analyse your project</span>

              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>

              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-violet-300 to-blue-300 transition-transform duration-500 group-hover:translate-x-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Moving statement */}
      <div className="relative overflow-hidden border-y border-white/[0.07] py-5">
        <div className="footer-marquee-track flex w-max whitespace-nowrap">
          <div className="flex items-center gap-8 pr-8 text-[clamp(2rem,4vw,4.5rem)] font-semibold tracking-[-0.06em] text-white/[0.08]">
            <span>STRATEGY</span>
            <span>×</span>
            <span>CREATIVITY</span>
            <span>×</span>
            <span>PERFORMANCE</span>
            <span>×</span>
            <span>GROWTH</span>
            <span>×</span>
            <span>DIGITAL WOLF</span>
          </div>

          <div className="flex items-center gap-8 pr-8 text-[clamp(2rem,4vw,4.5rem)] font-semibold tracking-[-0.06em] text-white/[0.08]">
            <span>STRATEGY</span>
            <span>×</span>
            <span>CREATIVITY</span>
            <span>×</span>
            <span>PERFORMANCE</span>
            <span>×</span>
            <span>GROWTH</span>
            <span>×</span>
            <span>DIGITAL WOLF</span>
          </div>
        </div>
      </div>

      {/* Footer navigation */}
      <div
        ref={footerContentRef}
        className="relative mx-auto grid max-w-[1500px] gap-14 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-20 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-12"
      >
        {/* Brand */}
        <div>
          <div
            ref={wolfRef}
            className="text-5xl font-black tracking-[-0.08em] md:text-6xl"
          >
            DW<span className="text-violet-300">.</span>
          </div>

          <p className="mt-5 max-w-xs text-sm leading-7 text-white/35">
            Digital growth for brands that refuse to blend in.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
            Explore
          </p>

          <nav className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group flex w-fit items-center gap-2 text-sm text-white/55 transition-colors hover:text-white"
              >
                <span>{link.label}</span>
                <span className="translate-x-[-5px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                  ↗
                </span>
              </a>
            ))}
          </nav>
        </div>

        {/* Services */}
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
            Capabilities
          </p>

          <div className="flex flex-col gap-3">
            {serviceLinks.map((service) => (
              <span
                key={service}
                className="text-sm text-white/45 transition-colors hover:text-white/80"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/25">
            Connect
          </p>

          <div className="flex flex-col gap-3 text-sm">
            <a
              href="mailto:hello@digitalwolf.com"
              className="text-white/55 transition-colors hover:text-white"
            >
              hello@digitalwolf.com
            </a>

            <a
              href="#analyse-project"
              className="text-white/55 transition-colors hover:text-white"
            >
              Start a project ↗
            </a>

            <div className="mt-3 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/55 transition-all hover:border-white/30 hover:text-white"
              >
                IG
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/55 transition-all hover:border-white/30 hover:text-white"
              >
                IN
              </a>

              <a
                href="#"
                aria-label="Behance"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-xs text-white/55 transition-all hover:border-white/30 hover:text-white"
              >
                BE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative mx-auto flex max-w-[1500px] flex-col gap-4 px-5 pb-7 pt-2 text-[10px] uppercase tracking-[0.18em] text-white/25 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
        <span>© {new Date().getFullYear()} Digital Wolf</span>

        <div className="flex gap-5">
          <span>Privacy</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
}

