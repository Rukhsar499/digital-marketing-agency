
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const dwRef = useRef<HTMLDivElement | null>(null);

  const introRef = useRef<HTMLDivElement | null>(null);
  const storyRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const statsRef = useRef<HTMLDivElement | null>(null);

  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /*
     * =========================================
     * GSAP CONTEXT
     * =========================================
     */

    const ctx = gsap.context(() => {
      if (
        !sectionRef.current ||
        !dwRef.current ||
        !introRef.current ||
        !storyRef.current ||
        !headlineRef.current ||
        !statsRef.current
      ) {
        return;
      }

      /*
       * =========================================
       * SPLIT TEXT CHARACTERS
       * =========================================
       */

      const characters =
        headlineRef.current.querySelectorAll(".about-char");

      /*
       * Initial character state
       */

      gsap.set(characters, {
        y: 100,
        opacity: 0,
        rotateX: -70,
        filter: "blur(10px)",
      });

      /*
       * =========================================
       * INITIAL STATES
       * =========================================
       */

      gsap.set(dwRef.current, {
        scale: 0.55,
        opacity: 0.95,
      });

      gsap.set(storyRef.current, {
        opacity: 0,
        y: 60,
      });

      gsap.set(statsRef.current, {
        opacity: 0,
        y: 40,
      });

      /*
       * =========================================
       * MAIN SCROLL TIMELINE
       * =========================================
       */

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2200",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      /*
       * =========================================
       * 01 — DW STARTS SMALL
       * =========================================
       */

      tl.to(dwRef.current, {
        scale: 1.5,
        duration: 1,
        ease: "power2.inOut",
      })

        /*
         * =========================================
         * 02 — INTRO MOVES AWAY
         * =========================================
         */

        .to(
          introRef.current,
          {
            opacity: 0,
            y: -80,
            duration: 0.6,
            ease: "power2.inOut",
          },
          "<"
        )

        /*
         * =========================================
         * 03 — DW GROWS
         * =========================================
         */

        .to(dwRef.current, {
          scale: 5,
          duration: 1,
          ease: "power2.inOut",
        })

        /*
         * =========================================
         * 04 — STORY APPEARS
         * =========================================
         */

        .to(
          storyRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.45"
        )

        /*
         * =========================================
         * 05 — DW BECOMES HUGE
         * =========================================
         */

        .to(dwRef.current, {
          scale: 10,
          duration: 1,
          ease: "power2.inOut",
        })

        /*
         * =========================================
         * 06 — CHARACTER BY CHARACTER REVEAL
         * =========================================
         */

        .to(
          characters,
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: {
              each: 0.035,
              from: "start",
            },
            ease: "power4.out",
          },
          "-=0.45"
        )

        /*
         * =========================================
         * 07 — DW PEAK
         * =========================================
         */

        .to(dwRef.current, {
          scale: 16,
          duration: 1,
          ease: "power2.inOut",
        })

        /*
         * =========================================
         * 08 — DW SHRINKS
         * =========================================
         */

        .to(dwRef.current, {
          scale: 3.5,
          duration: 1,
          ease: "power3.inOut",
        })

        /*
         * =========================================
         * 09 — STATS APPEAR
         * =========================================
         */

        .to(
          statsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.5"
        )

        /*
         * =========================================
         * 10 — FINAL DW MOVEMENT
         * =========================================
         */

        .to(dwRef.current, {
          scale: 5.5,
          duration: 1,
          ease: "power2.inOut",
        });

      /*
       * =========================================
       * FLOATING DOTS
       * =========================================
       */

      const dots = sectionRef.current.querySelectorAll(".about-dot");

      dots.forEach((dot, index) => {
        gsap.to(dot, {
          y: index % 2 === 0 ? -30 : 30,
          x: index % 2 === 0 ? 20 : -20,
          duration: 2.5 + index * 0.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    /*
     * =========================================
     * CURSOR GLOW
     * =========================================
     *
     * IMPORTANT:
     * This is intentionally OUTSIDE gsap.context().
     * Therefore ctx is already initialized and
     * there is no "Cannot access ctx before
     * initialization" problem.
     */

    const cursorGlow = cursorGlowRef.current;

    let moveCursor: ((event: MouseEvent) => void) | null =
      null;

    const hasFinePointer =
      window.matchMedia("(pointer: fine)").matches;

    if (cursorGlow && hasFinePointer) {
      moveCursor = (event: MouseEvent) => {
        gsap.to(cursorGlow, {
          x: event.clientX,
          y: event.clientY,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      window.addEventListener("mousemove", moveCursor);

      gsap.set(cursorGlow, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }

    /*
     * =========================================
     * CLEANUP
     * =========================================
     */

    return () => {
      if (moveCursor) {
        window.removeEventListener("mousemove", moveCursor);
      }

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative isolate h-screen overflow-hidden bg-[#050505] text-white"
    >
      {/* =========================================
          CURSOR GLOW
      ========================================= */}

      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.07] blur-[80px] md:block"
      />

      {/* =========================================
          BACKGROUND GRID
      ========================================= */}

      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.055]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* =========================================
          BACKGROUND GLOWS
      ========================================= */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/[0.08] blur-[150px]" />

      <div className="pointer-events-none absolute -right-40 top-20 z-0 h-[400px] w-[400px] rounded-full bg-blue-500/[0.07] blur-[150px]" />

      {/* =========================================
          FLOATING DOTS
      ========================================= */}

      <div className="about-dot absolute left-[12%] top-[22%] z-[2] h-2 w-2 rounded-full bg-white/30" />

      <div className="about-dot absolute left-[78%] top-[25%] z-[2] h-1.5 w-1.5 rounded-full bg-violet-400/50" />

      <div className="about-dot absolute left-[20%] top-[72%] z-[2] h-1.5 w-1.5 rounded-full bg-blue-400/40" />

      <div className="about-dot absolute left-[85%] top-[70%] z-[2] h-2 w-2 rounded-full bg-white/20" />

      {/* =========================================
          TOP LABEL
      ========================================= */}

      <div className="absolute left-6 top-8 z-40 text-[10px] uppercase tracking-[0.35em] text-white/30 md:left-12">
        About DW
      </div>

      {/* =========================================
          GIANT DW
      ========================================= */}

      <div
        ref={dwRef}
        className="pointer-events-none absolute left-1/2 top-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 select-none"
      >
        <span className="block text-[20vw] font-black leading-none tracking-[-0.08em] text-white/[0.035]">
          DW
        </span>
      </div>

      {/* =========================================
          INTRO
      ========================================= */}

      <div
        ref={introRef}
        className="absolute inset-0 z-20 flex items-center justify-center px-6"
      >
        <div className="text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-white/35">
            Scroll to discover
          </p>

          <h2 className="text-[clamp(3rem,8vw,8rem)] font-semibold leading-[0.9] tracking-[-0.06em]">
            We build
            <br />
            <span className="text-white/25">
              digital impact.
            </span>
          </h2>

          <div className="mx-auto mt-10 h-12 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </div>

      {/* =========================================
          STORY
      ========================================= */}

      <div
        ref={storyRef}
        className="absolute inset-0 z-30 flex items-center justify-center px-6"
      >
        <div className="w-full max-w-6xl">
          {/* LABEL */}

          <div className="mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-white/20" />

            <span className="text-xs uppercase tracking-[0.35em] text-white/35">
              Who we are
            </span>
          </div>

          {/* =========================================
              SPLIT TEXT HEADLINE
          ========================================= */}

          <h2
            ref={headlineRef}
            className="max-w-5xl text-[clamp(3rem,7vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]"
            style={{ perspective: "1000px" }}
          >
            {/* DW */}

            {"DW".split("").map((char, index) => (
              <span
                key={`dw-${index}`}
                className="about-char inline-block"
              >
                {char}
              </span>
            ))}

            <span className="inline-block">&nbsp;</span>

            {/* IS */}

            {"is".split("").map((char, index) => (
              <span
                key={`is-${index}`}
                className="about-char inline-block text-white/40"
              >
                {char}
              </span>
            ))}

            <span className="inline-block">&nbsp;</span>

            {/* NOT */}

            {"not".split("").map((char, index) => (
              <span
                key={`not-${index}`}
                className="about-char inline-block"
              >
                {char}
              </span>
            ))}

            <span className="inline-block">&nbsp;</span>

            {/* ORDINARY */}

            {"ordinary.".split("").map((char, index) => (
              <span
                key={`ordinary-${index}`}
                className="about-char inline-block text-violet-400"
              >
                {char}
              </span>
            ))}
          </h2>

          {/* =========================================
              DESCRIPTION
          ========================================= */}

          <div className="mt-12 grid max-w-5xl gap-10 md:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
                We are a digital marketing company built around
                one idea: attention means nothing without impact.
              </p>

              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/35 md:text-base">
                Strategy, performance marketing, creative,
                content and digital experiences come together to
                turn brands into something people remember.
              </p>
            </div>

            <div className="flex items-end md:justify-end">
              <p className="max-w-xs text-sm leading-relaxed text-white/30">
                We don&apos;t follow the digital landscape.
                <br />
                <span className="text-white/60">
                  We create our own direction.
                </span>
              </p>
            </div>
          </div>

          {/* =========================================
              STATS
          ========================================= */}

          <div
            ref={statsRef}
            className="mt-16 grid max-w-4xl grid-cols-3 border-t border-white/10 pt-8"
          >
            <div>
              <p className="text-2xl font-semibold md:text-4xl">
                360°
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/30">
                Strategy
              </p>
            </div>

            <div className="border-l border-white/10 pl-5 md:pl-10">
              <p className="text-2xl font-semibold md:text-4xl">
                DATA
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/30">
                Driven
              </p>
            </div>

            <div className="border-l border-white/10 pl-5 md:pl-10">
              <p className="text-2xl font-semibold md:text-4xl">
                BOLD
              </p>

              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/30">
                Creative
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM META
      ========================================= */}

      <div className="absolute bottom-8 left-6 right-6 z-40 flex items-center gap-4 md:left-12 md:right-12">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">
          02
        </span>

        <div className="h-px flex-1 bg-white/[0.06]" />

        <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">
          DW
        </span>
      </div>
    </section>
  );
}

