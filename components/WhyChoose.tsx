"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reasons = [
{
number: "01",
title: "DATA FIRST",
description:
"Every decision starts with data. We use insights, testing and performance signals to build strategies that move the right numbers.",
position: "left-top",
},
{
number: "02",
title: "CREATIVE THINKING",
description:
"Strategy gets attention. Creativity makes it memorable. We combine both to create work people actually notice.",
position: "right-top",
},
{
number: "03",
title: "PERFORMANCE DRIVEN",
description:
"Beautiful campaigns mean little without business impact. Every campaign is built around measurable outcomes.",
position: "left-middle",
},
{
number: "04",
title: "FULL-FUNNEL",
description:
"From awareness to conversion, we connect every digital touchpoint into one clear growth journey.",
position: "right-middle",
},
{
number: "05",
title: "FAST EXECUTION",
description:
"Digital moves fast. Our teams test, learn and iterate quickly without letting quality disappear.",
position: "left-bottom",
},
{
number: "06",
title: "LONG-TERM GROWTH",
description:
"We are not here for one viral moment. We build digital systems that compound brand and business growth over time.",
position: "right-bottom",
},
];

export default function WhyChoose() {
const sectionRef = useRef<HTMLElement | null>(null);
const treeRef = useRef<HTMLDivElement | null>(null);
const coreRef = useRef<HTMLDivElement | null>(null);
const trunkRef = useRef<SVGPathElement | null>(null);
const cursorGlowRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
const section = sectionRef.current;
const tree = treeRef.current;
const core = coreRef.current;
const trunk = trunkRef.current;
const cursorGlow = cursorGlowRef.current;

if (!section || !tree || !core || !trunk) {
  return;
}

const ctx = gsap.context(() => {
  /*
   * =======================================================
   * INITIAL STATES
   * =======================================================
   */

  const heading = section.querySelector<HTMLElement>(
    ".why-heading"
  );

  const eyebrow = section.querySelector<HTMLElement>(
    ".why-eyebrow"
  );

  const intro = section.querySelector<HTMLElement>(
    ".why-intro"
  );

  const cards =
    gsap.utils.toArray<HTMLElement>(
      ".why-card"
    );

  const branchPaths =
    gsap.utils.toArray<SVGPathElement>(
      ".why-branch"
    );

  const nodes =
    gsap.utils.toArray<HTMLElement>(
      ".why-node"
    );

  const particles =
    gsap.utils.toArray<HTMLElement>(
      ".why-particle"
    );

  /*
   * =======================================================
   * HEADING REVEAL
   * =======================================================
   */

  const headingTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
      end: "top 25%",
      scrub: 1,
    },
  });

  if (eyebrow) {
    headingTimeline.fromTo(
      eyebrow,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
      }
    );
  }

  if (heading) {
    headingTimeline.fromTo(
      heading,
      {
        opacity: 0,
        y: 80,
        rotateX: -45,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "power4.out",
      },
      "-=0.25"
    );
  }

  if (intro) {
    headingTimeline.fromTo(
      intro,
      {
        opacity: 0,
        y: 35,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
      },
      "-=0.25"
    );
  }

  /*
   * =======================================================
   * SVG TREE DRAWING
   * =======================================================
   */

  const trunkLength =
    trunk.getTotalLength();

  gsap.set(trunk, {
    strokeDasharray: trunkLength,
    strokeDashoffset: trunkLength,
  });

  branchPaths.forEach((path) => {
    const length =
      path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });

  /*
   * Main tree animation
   */

  const treeTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: tree,
      start: "top 75%",
      end: "bottom 60%",
      scrub: 1.2,
    },
  });

  treeTimeline.to(
    trunk,
    {
      strokeDashoffset: 0,
      ease: "none",
      duration: 1.5,
    }
  );

  treeTimeline.to(
    branchPaths,
    {
      strokeDashoffset: 0,
      ease: "none",
      stagger: 0.12,
      duration: 1.5,
    },
    "-=0.8"
  );

  /*
   * =======================================================
   * NODES
   * =======================================================
   */

  treeTimeline.fromTo(
    nodes,
    {
      scale: 0,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      stagger: 0.12,
      ease: "back.out(2)",
      duration: 0.8,
    },
    "-=0.7"
  );

  /*
   * =======================================================
   * CARDS REVEAL
   * =======================================================
   */

  cards.forEach((card, index) => {
    const isLeft =
      index % 2 === 0;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        x: isLeft ? -80 : 80,
        y: 25,
        rotateY: isLeft ? -8 : 8,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        ease: "power3.out",

        scrollTrigger: {
          trigger: card,
          start: "top 82%",
          end: "top 55%",
          scrub: 1,
        },
      }
    );
  });

  /*
   * =======================================================
   * CORE ANIMATION
   * =======================================================
   */

  gsap.fromTo(
    core,
    {
      scale: 0.65,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      ease: "back.out(1.7)",

      scrollTrigger: {
        trigger: tree,
        start: "top 75%",
        end: "top 40%",
        scrub: 1,
      },
    }
  );

  /*
   * Core continuous pulse
   */

  gsap.to(core, {
    scale: 1.08,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });

  /*
   * =======================================================
   * NODE PULSE
   * =======================================================
   */

  nodes.forEach((node, index) => {
    gsap.to(node, {
      scale: 1.18,
      duration: 1.8 + index * 0.15,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.18,
    });
  });

  /*
   * =======================================================
   * PARTICLES
   * =======================================================
   */

  particles.forEach((particle, index) => {
    gsap.to(particle, {
      y: index % 2 === 0 ? -35 : 35,
      x: index % 3 === 0 ? 20 : -20,
      opacity: 0.15,
      duration: 3 + index * 0.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  /*
   * =======================================================
   * CARDS HOVER
   * =======================================================
   */

  cards.forEach((card) => {
    const node =
      card.querySelector<HTMLElement>(
        ".why-card-node"
      );

    const title =
      card.querySelector<HTMLElement>(
        ".why-card-title"
      );

    if (!node || !title) return;

    const enter = () => {
      gsap.to(node, {
        scale: 1.35,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(title, {
        x: 6,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const leave = () => {
      gsap.to(node, {
        scale: 1,
        duration: 0.35,
        ease: "power3.out",
      });

      gsap.to(title, {
        x: 0,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    card.addEventListener(
      "mouseenter",
      enter
    );

    card.addEventListener(
      "mouseleave",
      leave
    );

    gsap.set(card, {
      willChange: "transform, opacity",
    });
  });

  /*
   * =======================================================
   * TREE PARALLAX
   * =======================================================
   */

  gsap.to(tree, {
    y: -50,
    ease: "none",

    scrollTrigger: {
      trigger: section,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
  });
}, section);

/*
 * =======================================================
 * CURSOR GLOW
 * =======================================================
 */

let moveCursor:
  | ((event: MouseEvent) => void)
  | null = null;

const hasFinePointer =
  window.matchMedia(
    "(pointer: fine)"
  ).matches;

if (
  cursorGlow &&
  hasFinePointer
) {
  moveCursor = (
    event: MouseEvent
  ) => {
    gsap.to(cursorGlow, {
      x: event.clientX,
      y: event.clientY,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  window.addEventListener(
    "mousemove",
    moveCursor
  );

  gsap.set(cursorGlow, {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
}

return () => {
  if (moveCursor) {
    window.removeEventListener(
      "mousemove",
      moveCursor
    );
  }

  ctx.revert();
};

}, []);

return (
<section ref={sectionRef} className="relative z-20 overflow-hidden bg-[#050505] text-white" >
{/* =====================================================
CURSOR GLOW
====================================================== */}

  <div
    ref={cursorGlowRef}
    className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[100px] md:block"
  />

  {/* =====================================================
      BACKGROUND
  ====================================================== */}

  <div className="pointer-events-none absolute inset-0">
    <div
      className="absolute inset-0 opacity-[0.035]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize:
          "80px 80px",
      }}
    />

    <div className="absolute left-1/2 top-[20%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/[0.06] blur-[180px]" />

    <div className="absolute bottom-[5%] left-[10%] h-[350px] w-[350px] rounded-full bg-blue-500/[0.05] blur-[150px]" />
  </div>

  {/* =====================================================
      HEADER
  ====================================================== */}

  <div className="relative z-10 mx-auto max-w-[1500px] px-6 pb-10 pt-28 md:px-12 md:pt-36 lg:px-20">
    <div className="why-eyebrow mb-7 flex items-center gap-4 opacity-0">
      <span className="h-px w-10 bg-violet-300/50" />

      <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">
        Why choose us
      </span>

      <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
        04 / Our difference
      </span>
    </div>

    <h2 className="why-heading max-w-[1000px] text-[13vw] font-semibold leading-[0.82] tracking-[-0.075em] opacity-0 md:text-[9vw] lg:text-[7vw]">
      WHY
      <br />
      <span className="text-white/30">
        Digital Wolf?
      </span>
    </h2>

    <p className="why-intro mt-8 max-w-[580px] text-sm leading-7 text-white/45 md:text-base md:leading-8">
      Because digital marketing should not feel like
      a collection of disconnected services. We build
      one connected growth system where strategy,
      creativity, technology and performance work
      together.
    </p>
  </div>

  {/* =====================================================
      GROWTH TREE
  ====================================================== */}

  <div
    ref={treeRef}
    className="relative mx-auto min-h-[1100px] max-w-[1500px] px-6 md:px-12 lg:px-20"
  >
    {/* ===================================================
        FLOATING PARTICLES
    ==================================================== */}

    <div className="why-particle absolute left-[12%] top-[18%] h-1 w-1 rounded-full bg-violet-300/50" />

    <div className="why-particle absolute right-[15%] top-[30%] h-1.5 w-1.5 rounded-full bg-white/30" />

    <div className="why-particle absolute left-[25%] top-[55%] h-1 w-1 rounded-full bg-blue-300/40" />

    <div className="why-particle absolute right-[25%] top-[65%] h-1 w-1 rounded-full bg-violet-300/40" />

    <div className="why-particle absolute left-[8%] top-[75%] h-1.5 w-1.5 rounded-full bg-white/20" />

    {/* ===================================================
        DESKTOP TREE SVG
    ==================================================== */}

    <svg
      className="pointer-events-none absolute left-1/2 top-[80px] hidden h-[900px] w-[1000px] -translate-x-1/2 overflow-visible lg:block"
      viewBox="0 0 1000 900"
      fill="none"
      preserveAspectRatio="none"
    >
      {/* Main trunk */}

      <path
        ref={trunkRef}
        d="M500 820 C500 700 500 610 500 500 C500 390 500 280 500 130"
        stroke="rgba(196,181,253,0.35)"
        strokeWidth="2"
      />

      {/* Left top */}

      <path
        className="why-branch"
        d="M500 300 C420 270 350 235 245 180"
        stroke="rgba(196,181,253,0.25)"
        strokeWidth="1.5"
      />

      {/* Right top */}

      <path
        className="why-branch"
        d="M500 300 C580 270 650 235 755 180"
        stroke="rgba(196,181,253,0.25)"
        strokeWidth="1.5"
      />

      {/* Left middle */}

      <path
        className="why-branch"
        d="M500 480 C415 455 335 430 220 390"
        stroke="rgba(196,181,253,0.22)"
        strokeWidth="1.5"
      />

      {/* Right middle */}

      <path
        className="why-branch"
        d="M500 480 C585 455 665 430 780 390"
        stroke="rgba(196,181,253,0.22)"
        strokeWidth="1.5"
      />

      {/* Left bottom */}

      <path
        className="why-branch"
        d="M500 650 C415 635 335 610 245 580"
        stroke="rgba(196,181,253,0.2)"
        strokeWidth="1.5"
      />

      {/* Right bottom */}

      <path
        className="why-branch"
        d="M500 650 C585 635 665 610 755 580"
        stroke="rgba(196,181,253,0.2)"
        strokeWidth="1.5"
      />
    </svg>

    {/* ===================================================
        CENTER CORE
    ==================================================== */}

    <div
      ref={coreRef}
      className="absolute left-1/2 top-[80px] z-20 flex h-[150px] w-[150px] -translate-x-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] opacity-0 shadow-[0_0_100px_rgba(139,92,246,0.12)] backdrop-blur-xl md:h-[180px] md:w-[180px]"
    >
      <div className="absolute inset-[-18px] rounded-full border border-violet-300/[0.08]" />

      <div className="absolute inset-[-35px] rounded-full border border-white/[0.035]" />

      <div className="text-center">
        <span className="block text-[9px] uppercase tracking-[0.35em] text-white/30">
          Digital
        </span>

        <span className="mt-1 block text-4xl font-semibold tracking-[-0.08em] text-white/85 md:text-5xl">
          DW
        </span>

        <span className="mt-2 block text-[8px] uppercase tracking-[0.3em] text-violet-300/50">
          Growth Core
        </span>
      </div>
    </div>

    {/* ===================================================
        DESKTOP CARDS
    ==================================================== */}

    {reasons.map((reason, index) => {
      const positions: Record<
        string,
        string
      > = {
        "left-top":
          "left-[2%] top-[155px]",
        "right-top":
          "right-[2%] top-[155px]",
        "left-middle":
          "left-[0%] top-[365px]",
        "right-middle":
          "right-[0%] top-[365px]",
        "left-bottom":
          "left-[2%] top-[570px]",
        "right-bottom":
          "right-[2%] top-[570px]",
      };

      return (
        <div
          key={reason.number}
          className={`why-card absolute hidden w-[330px] lg:block ${positions[reason.position]}`}
        >
          <div className="relative rounded-[2px] border border-white/[0.08] bg-white/[0.025] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-violet-300/20">
            {/* Node */}

            <div className="why-card-node absolute -top-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_25px_rgba(196,181,253,0.8)]" />

            <div className="mb-6 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.3em] text-violet-300/60">
                {reason.number}
              </span>

              <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                DW / Advantage
              </span>
            </div>

            <h3 className="why-card-title text-xl font-medium tracking-[-0.03em] text-white/85">
              {reason.title}
            </h3>

            <p className="mt-4 text-sm leading-6 text-white/35">
              {reason.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-8 bg-violet-300/30" />

              <span className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                Built for growth
              </span>
            </div>
          </div>
        </div>
      );
    })}

    {/* ===================================================
        MOBILE FLOW
    ==================================================== */}

    <div className="relative z-30 pt-[290px] lg:hidden">
      <div className="mx-auto max-w-[600px]">
        {reasons.map(
          (reason, index) => (
            <div
              key={reason.number}
              className="why-card relative mb-5 rounded-[2px] border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-xl"
            >
              {/* Mobile connector */}

              {index !==
                reasons.length - 1 && (
                <div className="absolute left-1/2 top-full h-5 w-px bg-violet-300/20" />
              )}

              <div className="why-card-node absolute -left-[5px] top-8 h-2.5 w-2.5 rounded-full bg-violet-300 shadow-[0_0_20px_rgba(196,181,253,0.7)]" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] text-violet-300/60">
                  {reason.number}
                </span>

                <span className="text-[9px] uppercase tracking-[0.25em] text-white/20">
                  DW / Advantage
                </span>
              </div>

              <h3 className="why-card-title mt-5 text-xl font-medium tracking-[-0.03em] text-white/85">
                {reason.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-white/35">
                {reason.description}
              </p>
            </div>
          )
        )}
      </div>
    </div>

    {/* ===================================================
        BOTTOM MESSAGE
    ==================================================== */}

    <div className="absolute bottom-[30px] left-1/2 w-full -translate-x-1/2 text-center">
      <span className="text-[9px] uppercase tracking-[0.4em] text-white/20">
        Strategy × Creativity × Technology × Growth
      </span>
    </div>
  </div>

  {/* =====================================================
      BOTTOM SPACE
  ====================================================== */}

  <div className="h-20" />
</section>

);
}