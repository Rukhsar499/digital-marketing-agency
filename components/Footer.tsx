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
const visualRef = useRef<HTMLDivElement | null>(null);
const browserRef = useRef<SVGSVGElement | null>(null);
const cursorRef = useRef<SVGPathElement | null>(null);
const chartRef = useRef<SVGPathElement | null>(null);
const footerContentRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
const footer = footerRef.current;
const headline = headlineRef.current;
const visual = visualRef.current;
const browser = browserRef.current;
const cursor = cursorRef.current;
const chart = chartRef.current;
const content = footerContentRef.current;

if (
  !footer ||
  !headline ||
  !visual ||
  !browser ||
  !cursor ||
  !chart ||
  !content
) {
  return;
}

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const ctx = gsap.context(() => {
  /*
   * =====================================================
   * REDUCED MOTION
   * =====================================================
   */

  if (reduceMotion) {
    gsap.set(
      [headline, visual, browser, cursor, chart, content],
      {
        clearProps: "all",
      }
    );

    return;
  }

  /*
   * =====================================================
   * HEADLINE REVEAL
   * =====================================================
   */

  gsap.fromTo(
    headline,
    {
      y: 100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        once: true,
      },
    }
  );

  /*
   * =====================================================
   * FOOTER CONTENT REVEAL
   * =====================================================
   */

  gsap.fromTo(
    content.children,
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: content,
        start: "top 90%",
        once: true,
      },
    }
  );

  /*
   * =====================================================
   * WEBSITE VISUAL REVEAL
   * =====================================================
   */

  gsap.fromTo(
    visual,
    {
      opacity: 0,
      y: 80,
      scale: 0.9,
      rotate: 4,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 75%",
        once: true,
      },
    }
  );

  /*
   * =====================================================
   * BROWSER FLOAT
   * =====================================================
   */

  gsap.to(browser, {
    y: -12,
    rotate: -1.5,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  /*
   * =====================================================
   * CURSOR FLOAT
   * =====================================================
   */

  gsap.to(cursor, {
    x: 8,
    y: -10,
    rotation: 8,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  /*
   * =====================================================
   * CHART DRAW
   * =====================================================
   */

  const chartLength = chart.getTotalLength();

  gsap.set(chart, {
    strokeDasharray: chartLength,
    strokeDashoffset: chartLength,
  });

  gsap.to(chart, {
    strokeDashoffset: 0,
    duration: 2,
    delay: 0.4,
    ease: "power2.out",
    scrollTrigger: {
      trigger: footer,
      start: "top 75%",
      once: true,
    },
  });

  /*
   * =====================================================
   * CHART CONTINUOUS GLOW
   * =====================================================
   */

  gsap.to(chart, {
    opacity: 0.55,
    duration: 1.8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  /*
   * =====================================================
   * VISUAL PARALLAX
   * =====================================================
   */

  gsap.to(visual, {
    yPercent: -12,
    ease: "none",
    scrollTrigger: {
      trigger: footer,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });

  /*
   * =====================================================
   * MARQUEE
   * =====================================================
   */

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
<footer ref={footerRef} className="relative overflow-hidden bg-[#030304] text-white" >
{/* =====================================================
BACKGROUND
====================================================== */}

  <div className="pointer-events-none absolute inset-0">
    {/* Grid */}
    <div
      className="
        absolute inset-0
        opacity-[0.035]
        [background-image:linear-gradient(to_right,rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.8)_1px,transparent_1px)]
        [background-size:72px_72px]
      "
    />

    {/* Violet atmosphere */}
    <div
      className="
        absolute
        left-[-15%]
        top-[10%]
        h-[450px]
        w-[450px]
        rounded-full
        bg-violet-600/15
        blur-[150px]
      "
    />

    {/* Blue atmosphere */}
    <div
      className="
        absolute
        bottom-[-20%]
        right-[-10%]
        h-[550px]
        w-[550px]
        rounded-full
        bg-blue-500/10
        blur-[160px]
      "
    />

    {/* Small violet glow */}
    <div
      className="
        absolute
        right-[25%]
        top-[20%]
        h-[180px]
        w-[180px]
        rounded-full
        bg-violet-500/[0.06]
        blur-[100px]
      "
    />
  </div>

  {/* =====================================================
      MASSIVE CLOSING STATEMENT
  ====================================================== */}

  <div className="relative px-5 pb-20 pt-24 sm:px-8 md:pb-28 md:pt-32 lg:px-12">
    <div className="mx-auto max-w-[1500px]">
      {/* Eyebrow */}

      <div className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
        <span className="h-px w-8 bg-gradient-to-r from-violet-400 to-blue-400" />

        <span>Digital Wolf</span>

        <span className="text-white/15">
          Digital Growth Studio
        </span>
      </div>

      {/* =================================================
          HERO CLOSING AREA
      ================================================== */}

      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* LEFT */}

        <div>
          <h2
            ref={headlineRef}
            className="
              max-w-6xl
              text-[clamp(3.8rem,10vw,10.5rem)]
              font-semibold
              leading-[0.82]
              tracking-[-0.075em]
            "
          >
            MAKE
            <br />

            <span className="bg-gradient-to-r from-white via-violet-200 to-blue-300 bg-clip-text text-transparent">
              NOISE.
            </span>
          </h2>

          <div className="mt-12 flex flex-col gap-8 md:mt-16 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-sm leading-7 text-white/40 md:text-base">
              Your next stage of growth should not look like
              everyone else. Let&apos;s build something people
              remember.
            </p>

            <a
              href="#analyse-project"
              className="
                group
                relative
                inline-flex
                w-fit
                items-center
                gap-4
                overflow-hidden
                rounded-full
                bg-white
                px-7
                py-4
                text-sm
                font-semibold
                text-black
                transition-transform
                duration-300
                hover:-translate-y-1
              "
            >
              <span className="relative z-10">
                Analyse your project
              </span>

              <span
                className="
                  relative
                  z-10
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-black
                  text-white
                  transition-transform
                  duration-300
                  group-hover:rotate-45
                "
              >
                ↗
              </span>

              <span
                className="
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-violet-300
                  to-blue-300
                  transition-transform
                  duration-500
                  group-hover:translate-x-0
                "
              />
            </a>
          </div>
        </div>

        {/* =================================================
            WEBSITE DEVELOPMENT SVG VISUAL
        ================================================== */}

        <div
          ref={visualRef}
          className="
            relative
            mx-auto
            w-full
            max-w-[570px]
            lg:mx-0
          "
        >
          {/* Ambient glow */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[260px]
              w-[260px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-violet-500/[0.08]
              blur-[100px]
            "
          />

          {/* SVG */}

          <svg
            ref={browserRef}
            viewBox="0 0 620 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10 w-full overflow-visible"
            aria-label="Digital growth website interface"
          >
            {/* =================================================
                OUTER BROWSER
            ================================================== */}

            <rect
              x="50"
              y="45"
              width="520"
              height="350"
              rx="18"
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(196,181,253,0.25)"
              strokeWidth="1"
            />

            {/* Browser top */}

            <path
              d="M50 82H570"
              stroke="rgba(255,255,255,0.09)"
            />

            {/* Browser dots */}

            <circle
              cx="76"
              cy="64"
              r="4"
              fill="rgba(196,181,253,0.55)"
            />

            <circle
              cx="92"
              cy="64"
              r="4"
              fill="rgba(255,255,255,0.2)"
            />

            <circle
              cx="108"
              cy="64"
              r="4"
              fill="rgba(255,255,255,0.12)"
            />

            {/* Address bar */}

            <rect
              x="150"
              y="56"
              width="250"
              height="16"
              rx="8"
              fill="rgba(255,255,255,0.045)"
            />

            <circle
              cx="165"
              cy="64"
              r="3"
              fill="rgba(167,139,250,0.7)"
            />

            <rect
              x="176"
              y="61"
              width="82"
              height="5"
              rx="2.5"
              fill="rgba(255,255,255,0.12)"
            />

            {/* =================================================
                HERO CONTENT
            ================================================== */}

            <rect
              x="82"
              y="112"
              width="285"
              height="115"
              rx="10"
              fill="rgba(255,255,255,0.025)"
              stroke="rgba(255,255,255,0.07)"
            />

            {/* Heading lines */}

            <rect
              x="103"
              y="137"
              width="135"
              height="8"
              rx="4"
              fill="rgba(255,255,255,0.7)"
            />

            <rect
              x="103"
              y="154"
              width="105"
              height="6"
              rx="3"
              fill="rgba(196,181,253,0.55)"
            />

            <rect
              x="103"
              y="177"
              width="180"
              height="5"
              rx="2.5"
              fill="rgba(255,255,255,0.15)"
            />

            <rect
              x="103"
              y="189"
              width="145"
              height="5"
              rx="2.5"
              fill="rgba(255,255,255,0.1)"
            />

            {/* CTA */}

            <rect
              x="103"
              y="205"
              width="78"
              height="10"
              rx="5"
              fill="url(#footerGradient)"
            />

            {/* =================================================
                PERFORMANCE PANEL
            ================================================== */}

            <rect
              x="385"
              y="112"
              width="153"
              height="115"
              rx="10"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.07)"
            />

            <text
              x="405"
              y="137"
              fill="rgba(255,255,255,0.35)"
              fontSize="8"
              letterSpacing="2"
            >
              PERFORMANCE
            </text>

            <text
              x="405"
              y="170"
              fill="rgba(255,255,255,0.85)"
              fontSize="25"
              fontWeight="600"
            >
              +248%
            </text>

            <text
              x="405"
              y="190"
              fill="rgba(196,181,253,0.65)"
              fontSize="8"
              letterSpacing="1"
            >
              GROWTH SIGNAL
            </text>

            {/* =================================================
                CHART
            ================================================== */}

            <path
              ref={chartRef}
              d="
                M82 300
                C130 280 145 292 180 270
                C220 245 245 275 280 245
                C320 210 345 250 380 220
                C420 185 445 210 475 180
                C500 155 520 175 538 145
              "
              stroke="url(#footerGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Chart base */}

            <path
              d="M82 300H538"
              stroke="rgba(255,255,255,0.07)"
            />

            {/* Chart nodes */}

            <circle
              cx="180"
              cy="270"
              r="4"
              fill="#C4B5FD"
            />

            <circle
              cx="280"
              cy="245"
              r="4"
              fill="#C4B5FD"
            />

            <circle
              cx="380"
              cy="220"
              r="4"
              fill="#A5B4FC"
            />

            <circle
              cx="475"
              cy="180"
              r="4"
              fill="#93C5FD"
            />

            <circle
              cx="538"
              cy="145"
              r="5"
              fill="#BFDBFE"
            />

            {/* =================================================
                BOTTOM MINI CARDS
            ================================================== */}

            <rect
              x="82"
              y="325"
              width="145"
              height="42"
              rx="8"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.06)"
            />

            <text
              x="98"
              y="343"
              fill="rgba(255,255,255,0.3)"
              fontSize="7"
              letterSpacing="1.5"
            >
              CONVERSION
            </text>

            <text
              x="98"
              y="358"
              fill="rgba(255,255,255,0.75)"
              fontSize="12"
              fontWeight="600"
            >
              8.6%
            </text>

            <rect
              x="242"
              y="325"
              width="145"
              height="42"
              rx="8"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.06)"
            />

            <text
              x="258"
              y="343"
              fill="rgba(255,255,255,0.3)"
              fontSize="7"
              letterSpacing="1.5"
            >
              REACH
            </text>

            <text
              x="258"
              y="358"
              fill="rgba(255,255,255,0.75)"
              fontSize="12"
              fontWeight="600"
            >
              2.4M
            </text>

            <rect
              x="402"
              y="325"
              width="136"
              height="42"
              rx="8"
              fill="rgba(255,255,255,0.02)"
              stroke="rgba(255,255,255,0.06)"
            />

            <text
              x="418"
              y="343"
              fill="rgba(255,255,255,0.3)"
              fontSize="7"
              letterSpacing="1.5"
            >
              ROI
            </text>

            <text
              x="418"
              y="358"
              fill="rgba(255,255,255,0.75)"
              fontSize="12"
              fontWeight="600"
            >
              4.8×
            </text>

            {/* =================================================
                FLOATING CODE CHIP
            ================================================== */}

            <g opacity="0.9">
              <rect
                x="12"
                y="190"
                width="92"
                height="46"
                rx="10"
                fill="rgba(8,8,12,0.85)"
                stroke="rgba(196,181,253,0.2)"
              />

              <text
                x="30"
                y="211"
                fill="rgba(196,181,253,0.75)"
                fontSize="11"
                fontFamily="monospace"
              >
                {"</>"}
              </text>

              <text
                x="30"
                y="225"
                fill="rgba(255,255,255,0.3)"
                fontSize="6"
                letterSpacing="1"
              >
                WEB EXPERIENCE
              </text>
            </g>

            {/* =================================================
                FLOATING MARKETING CHIP
            ================================================== */}

            <g opacity="0.9">
              <rect
                x="475"
                y="385"
                width="125"
                height="48"
                rx="10"
                fill="rgba(8,8,12,0.9)"
                stroke="rgba(147,197,253,0.2)"
              />

              <circle
                cx="495"
                cy="409"
                r="7"
                fill="rgba(147,197,253,0.15)"
                stroke="rgba(147,197,253,0.5)"
              />

              <path
                d="M492 409L495 412L500 405"
                stroke="rgba(191,219,254,0.8)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <text
                x="510"
                y="407"
                fill="rgba(255,255,255,0.5)"
                fontSize="7"
                letterSpacing="1"
              >
                GROWTH
              </text>

              <text
                x="510"
                y="419"
                fill="rgba(255,255,255,0.25)"
                fontSize="6"
                letterSpacing="0.8"
              >
                SYSTEM ACTIVE
              </text>
            </g>

            {/* =================================================
                CURSOR
            ================================================== */}

            <path
              ref={cursorRef}
              d="
                M455 255
                L480 286
                L468 287
                L477 304
                L469 309
                L460 291
                L451 300
                Z
              "
              fill="white"
              stroke="rgba(196,181,253,0.8)"
              strokeWidth="1"
            />

            {/* =================================================
                CONNECTION DOTS
            ================================================== */}

            <circle
              cx="42"
              cy="110"
              r="2"
              fill="rgba(196,181,253,0.5)"
            />

            <circle
              cx="590"
              cy="125"
              r="2"
              fill="rgba(147,197,253,0.5)"
            />

            <circle
              cx="28"
              cy="365"
              r="1.5"
              fill="rgba(255,255,255,0.3)"
            />

            <circle
              cx="585"
              cy="320"
              r="1.5"
              fill="rgba(196,181,253,0.4)"
            />

            {/* =================================================
                GRADIENT
            ================================================== */}

            <defs>
              <linearGradient
                id="footerGradient"
                x1="82"
                y1="300"
                x2="538"
                y2="145"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  stopColor="#C4B5FD"
                />

                <stop
                  offset="0.5"
                  stopColor="#A5B4FC"
                />

                <stop
                  offset="1"
                  stopColor="#93C5FD"
                />
              </linearGradient>
            </defs>
          </svg>

          {/* Bottom label */}

          <div className="relative z-10 mt-[-8px] flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-violet-300/20" />

            <span className="text-[8px] uppercase tracking-[0.35em] text-white/20">
              Strategy · Creative · Technology · Growth
            </span>

            <span className="h-px w-8 bg-blue-300/20" />
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* =====================================================
      MOVING STATEMENT
  ====================================================== */}

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

  {/* =====================================================
      FOOTER NAVIGATION
  ====================================================== */}

  <div
    ref={footerContentRef}
    className="
      relative
      mx-auto
      grid
      max-w-[1500px]
      gap-14
      px-5
      py-16
      sm:px-8
      md:grid-cols-2
      md:py-20
      lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]
      lg:px-12
    "
  >
    {/* Brand */}

    <div>
      <div className="text-5xl font-black tracking-[-0.08em] md:text-6xl">
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
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-xs
              text-white/55
              transition-all
              hover:border-white/30
              hover:text-white
            "
          >
            IG
          </a>

          <a
            href="#"
            aria-label="LinkedIn"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-xs
              text-white/55
              transition-all
              hover:border-white/30
              hover:text-white
            "
          >
            IN
          </a>

          <a
            href="#"
            aria-label="Behance"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              text-xs
              text-white/55
              transition-all
              hover:border-white/30
              hover:text-white
            "
          >
            BE
          </a>
        </div>
      </div>
    </div>
  </div>

  {/* =====================================================
      BOTTOM
  ====================================================== */}

  <div
    className="
      relative
      mx-auto
      flex
      max-w-[1500px]
      flex-col
      gap-4
      px-5
      pb-7
      pt-2
      text-[10px]
      uppercase
      tracking-[0.18em]
      text-white/25
      sm:px-8
      md:flex-row
      md:items-center
      md:justify-between
      lg:px-12
    "
  >
    <span>
      © {new Date().getFullYear()} Digital Wolf
    </span>

    <div className="flex gap-5">
      <span>Privacy</span>
      <span>Terms</span>
    </div>
  </div>
</footer>

);
}