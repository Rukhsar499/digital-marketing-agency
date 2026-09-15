
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /* --------------------------------
         INITIAL STATES
      -------------------------------- */

      gsap.set(eyebrowRef.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(titleRef.current, {
        y: 80,
        opacity: 0,
      });

      gsap.set(descriptionRef.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(actionsRef.current, {
        y: 30,
        opacity: 0,
      });

      gsap.set(visualRef.current, {
        scale: 0.8,
        opacity: 0,
      });

      gsap.set(".hero-card", {
        y: 50,
        opacity: 0,
        scale: 0.9,
      });

      /* --------------------------------
         HERO ENTRANCE
      -------------------------------- */

      tl.to(eyebrowRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
      })
        .to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
          },
          "-=0.3"
        )
        .to(
          descriptionRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.45"
        )
        .to(
          actionsRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
          },
          "-=0.35"
        )
        .to(
          visualRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.7"
        )
        .to(
          ".hero-card",
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.4)",
          },
          "-=0.5"
        );

      /* --------------------------------
         FLOATING ANIMATION
      -------------------------------- */

      gsap.to(".floating-card-one", {
        y: -12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".floating-card-two", {
        y: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".hero-orb", {
        scale: 1.08,
        rotation: 8,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* --------------------------------
         MOUSE PARALLAX
      -------------------------------- */

      const handleMouseMove = (event: MouseEvent) => {
        if (!visualRef.current) return;

        const { innerWidth, innerHeight } = window;

        const x = (event.clientX / innerWidth - 0.5) * 20;
        const y = (event.clientY / innerHeight - 0.5) * 20;

        gsap.to(visualRef.current, {
          x,
          y,
          duration: 0.8,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#08080a] text-white"
    >
      {/* =================================
          BACKGROUND GRID
      ================================= */}

      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* =================================
          BACKGROUND GLOW
      ================================= */}

      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/15 blur-[140px]" />

      {/* =================================
          NAVBAR SPACING
      ================================= */}

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* =================================
              LEFT CONTENT
          ================================= */}

          <div className="relative z-10">
            {/* Eyebrow */}
            <div
              ref={eyebrowRef}
              className="mb-7 flex items-center gap-3"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-purple-400/30 bg-purple-500/10">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3L14.5 9.5L21 12L14.5 14.5L12 21L9.5 14.5L3 12L9.5 9.5L12 3Z"
                    stroke="#c084fc"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-300">
                Digital Growth Studio
              </span>
            </div>

            {/* Main Heading */}
            <h1
              ref={titleRef}
              className="max-w-4xl text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.07em]"
            >
              We make
              <br />

              <span className="relative inline-block">
                brands
                <span className="relative ml-3 inline-flex align-middle">
                  <svg
                    className="h-[0.65em] w-[0.65em] text-purple-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </span>

              <br />

              <span className="bg-gradient-to-r from-purple-300 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                impossible to ignore.
              </span>
            </h1>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="mt-8 max-w-xl text-base leading-7 text-white/55 sm:text-lg"
            >
              We combine strategy, creativity and performance marketing to
              turn attention into measurable business growth.
            </p>

            {/* CTA */}
            <div
              ref={actionsRef}
              className="mt-9 flex flex-col gap-4 sm:flex-row"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition-transform duration-300 hover:scale-105"
              >
                Start a project

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    width="14"
                    height="14"
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
                </span>
              </a>

              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/5"
              >
                Explore our work
              </a>
            </div>

            {/* Trust line */}
            <div className="mt-10 flex items-center gap-4 text-xs text-white/35">
              <div className="flex -space-x-2">
                {["A", "S", "D", "M"].map((letter) => (
                  <span
                    key={letter}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#08080a] bg-white/10 text-[10px] font-semibold text-white"
                  >
                    {letter}
                  </span>
                ))}
              </div>

              <span>
                Trusted by ambitious brands
              </span>
            </div>
          </div>

          {/* =================================
              RIGHT VISUAL
          ================================= */}

          <div
            ref={visualRef}
            className="relative mx-auto flex min-h-[480px] w-full max-w-[620px] items-center justify-center lg:min-h-[600px]"
          >
            {/* Main Orb */}
            <div className="hero-orb absolute h-[330px] w-[330px] rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 opacity-80 blur-[1px] sm:h-[420px] sm:w-[420px]">
              <div className="absolute inset-[2px] rounded-full bg-[#101014]" />

              {/* Orb rings */}
              <div className="absolute inset-8 rounded-full border border-white/10" />
              <div className="absolute inset-20 rounded-full border border-white/10" />
              <div className="absolute inset-32 rounded-full border border-white/10" />

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-fuchsia-500 shadow-2xl shadow-purple-500/30">
                  <svg
                    width="65"
                    height="65"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 17L9 12L13 16L20 8"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <path
                      d="M15 8H20V13"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Card 1 */}
            <div className="hero-card floating-card-one absolute left-0 top-14 rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl sm:left-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M4 17L9 12L13 16L20 8"
                      stroke="#6ee7b7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Conversion
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    +184%
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Card 2 */}
            <div className="hero-card floating-card-two absolute bottom-14 right-0 rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl backdrop-blur-xl sm:right-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-400/10">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="8"
                      stroke="#c084fc"
                      strokeWidth="2"
                    />

                    <path
                      d="M12 8V12L15 14"
                      stroke="#c084fc"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/40">
                    Campaign ROAS
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    4.8x
                  </p>
                </div>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="hero-card absolute right-8 top-20 hidden rounded-full border border-white/10 bg-white/[0.07] px-4 py-2 text-xs text-white/60 backdrop-blur-xl sm:block">
              Growth × Creativity
            </div>

            {/* Bottom badge */}
            <div className="hero-card absolute bottom-20 left-8 hidden rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-xs text-purple-200 backdrop-blur-xl sm:block">
              + Strategy
            </div>
          </div>
        </div>
      </div>

      {/* =================================
          BOTTOM SCROLL INDICATOR
      ================================= */}

      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30 sm:flex">
        <span>Scroll to explore</span>

        <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/15 p-1.5">
          <span className="h-1.5 w-1 rounded-full bg-white/50" />
        </span>
      </div>
    </section>
  );
}

