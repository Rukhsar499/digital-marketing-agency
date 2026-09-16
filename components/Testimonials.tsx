
"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  
  
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Founder",
    company: "Northstar",
    quote:
      "Digital Wolf completely changed the way we approach growth. The strategy was sharp, the creative was bold, and the results followed.",
    
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Marketing Director",
    company: "Verve Labs",
    quote:
      "They understood our audience from day one and turned that understanding into campaigns that actually performed.",
   
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "Co-Founder",
    company: "Forma",
    quote:
      "The biggest difference was the thinking behind every decision. We stopped guessing and started scaling with confidence.",
    
  },
  {
    id: 4,
    name: "Nisha Sharma",
    role: "Brand Lead",
    company: "Aster",
    quote:
      "From positioning to performance, the team brought everything together into one clear growth system.",
   
  },
  {
    id: 5,
    name: "Aditya Rao",
    role: "CEO",
    company: "Elevate",
    quote:
      "What stood out was their ability to combine creative thinking with real business outcomes. Every campaign had a purpose.",
    
  },
  {
    id: 6,
    name: "Maya Sen",
    role: "Growth Head",
    company: "Nexa",
    quote:
      "Our digital presence finally feels like our brand. More importantly, the numbers are moving in the right direction.",
   
  },
  {
    id: 7,
    name: "Kabir Malhotra",
    role: "Founder",
    company: "Monarch",
    quote:
      "They didn't just execute our brief. They challenged it, improved it and built something much stronger.",
    
  },
  {
    id: 8,
    name: "Ananya Bose",
    role: "Marketing Head",
    company: "Luma",
    quote:
      "The combination of strategy, design and performance made a noticeable difference to our entire marketing funnel.",
   
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const autoplayRef =
    useRef<gsap.core.Tween | null>(null);

  const currentIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);

  const totalReviews = testimonials.length;

  /*
   * Cards visible according to screen size.
   *
   * Mobile  = 1
   * Tablet  = 2
   * Desktop = 4
   */
  const getCardsPerView = useCallback(() => {
    if (typeof window === "undefined") {
      return 4;
    }

    if (window.innerWidth < 768) {
      return 1;
    }

    if (window.innerWidth < 1100) {
      return 2;
    }

    return 4;
  }, []);

  /*
   * Example:
   *
   * 8 reviews
   * 4 visible
   *
   * Maximum starting position = 4
   */
  const getMaxIndex = useCallback(() => {
    return Math.max(
      totalReviews - getCardsPerView(),
      0
    );
  }, [getCardsPerView, totalReviews]);

  /*
   * Move carousel.
   */
  const moveToSlide = useCallback(
    (index: number, animate = true) => {
      const track = trackRef.current;

      if (!track) {
        return;
      }

      const cardsPerView = getCardsPerView();

      const maxIndex = Math.max(
        totalReviews - cardsPerView,
        0
      );

      const nextIndex = Math.max(
        0,
        Math.min(index, maxIndex)
      );

      currentIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      /*
       * Because each card width is:
       *
       * 100 / cardsPerView
       *
       * the translation is calculated dynamically.
       */
      const percentage =
        (nextIndex * 100) / cardsPerView;

      gsap.to(track, {
        xPercent: -percentage,
        duration: animate ? 0.85 : 0,
        ease: "power3.out",
        overwrite: true,
      });

      /*
       * Small content reveal.
       */
      if (animate) {
        const cards =
          track.querySelectorAll<HTMLElement>(
            "[data-testimonial-card]"
          );

        gsap.fromTo(
          cards,
          {
            y: 14,
            opacity: 0.75,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.035,
            ease: "power2.out",
            overwrite: true,
          }
        );
      }
    },
    [
      getCardsPerView,
      totalReviews,
    ]
  );

  /*
   * Autoplay.
   */
  const startAutoplay = useCallback(() => {
    autoplayRef.current?.kill();

    if (
      totalReviews <= getCardsPerView()
    ) {
      return;
    }

    autoplayRef.current =
      gsap.delayedCall(5, () => {
        const maxIndex = getMaxIndex();

        const current =
          currentIndexRef.current;

        const next =
          current >= maxIndex
            ? 0
            : current + 1;

        moveToSlide(next);
      });
  }, [
    getCardsPerView,
    getMaxIndex,
    moveToSlide,
    totalReviews,
  ]);

  const handleNext = () => {
    const maxIndex = getMaxIndex();

    const current =
      currentIndexRef.current;

    const next =
      current >= maxIndex
        ? 0
        : current + 1;

    moveToSlide(next);
    startAutoplay();
  };

  const handlePrevious = () => {
    const current =
      currentIndexRef.current;

    const maxIndex = getMaxIndex();

    const previous =
      current <= 0
        ? maxIndex
        : current - 1;

    moveToSlide(previous);
    startAutoplay();
  };

  /*
   * Pause autoplay while user is interacting.
   */
  const handleMouseEnter = () => {
    autoplayRef.current?.pause();
  };

  const handleMouseLeave = () => {
    autoplayRef.current?.resume();
  };

  /*
   * Card hover.
   */
  const handleCardEnter = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = event.currentTarget;

    gsap.to(card, {
      y: -8,
      duration: 0.35,
      ease: "power3.out",
    });

    const glow =
      card.querySelector<HTMLElement>(
        "[data-card-glow]"
      );

    if (glow) {
      gsap.to(glow, {
        opacity: 1,
        scale: 1.15,
        duration: 0.45,
        ease: "power3.out",
      });
    }
  };

  const handleCardLeave = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const card = event.currentTarget;

    gsap.to(card, {
      y: 0,
      duration: 0.4,
      ease: "power3.out",
    });

    const glow =
      card.querySelector<HTMLElement>(
        "[data-card-glow]"
      );

    if (glow) {
      gsap.to(glow, {
        opacity: 0,
        scale: 1,
        duration: 0.45,
        ease: "power3.out",
      });
    }
  };

  /*
   * GSAP section entrance.
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reduceMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.from(headingRef.current, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        });

        gsap.from(viewportRef.current, {
          y: 60,
          opacity: 0,
          scale: 0.97,
          duration: 1,
          delay: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });

        /*
         * Background atmosphere.
         */
        gsap.to("[data-bg-orb]", {
          scale: 1.2,
          opacity: 0.7,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        /*
         * Decorative floating dots.
         */
        gsap.to("[data-floating-dot]", {
          y: -15,
          x: 10,
          duration: 4,
          repeat: -1,
          yoyo: true,
          stagger: 0.5,
          ease: "sine.inOut",
        });
      }

      moveToSlide(0, false);
    }, section);

    /*
     * Responsive recalculation.
     */
    const handleResize = () => {
      const maxIndex = getMaxIndex();

      const current = Math.min(
        currentIndexRef.current,
        maxIndex
      );

      moveToSlide(current, false);
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    /*
     * Keyboard support.
     */
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "ArrowRight") {
        handleNext();
      }

      if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    startAutoplay();

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      autoplayRef.current?.kill();

      ctx.revert();
    };
  }, [
    getMaxIndex,
    moveToSlide,
    startAutoplay,
  ]);

  /*
   * Restart autoplay when slide changes.
   */
  useEffect(() => {
    startAutoplay();

    return () => {
      autoplayRef.current?.kill();
    };
  }, [
    activeIndex,
    startAutoplay,
  ]);

  const maxIndex = getMaxIndex();

  const progress =
    maxIndex === 0
      ? 100
      : ((activeIndex + 1) /
          (maxIndex + 1)) *
        100;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050505] py-24 text-white sm:py-28 md:py-32 lg:py-36"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Purple atmosphere */}
      <div
        data-bg-orb
        className="pointer-events-none absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-violet-600/15 blur-[140px]"
      />

      {/* Blue atmosphere */}
      <div
        data-bg-orb
        className="pointer-events-none absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[150px]"
      />

      {/* Decorative dots */}
      <div
        data-floating-dot
        className="pointer-events-none absolute left-[8%] top-[25%] h-1.5 w-1.5 rounded-full bg-violet-300/70"
      />

      <div
        data-floating-dot
        className="pointer-events-none absolute right-[18%] top-[18%] h-2 w-2 rounded-full bg-blue-300/60"
      />

      <div
        data-floating-dot
        className="pointer-events-none absolute bottom-[20%] left-[25%] h-1.5 w-1.5 rounded-full bg-white/40"
      />

      <div className="relative">
        {/* Heading */}
        <div
          ref={headingRef}
          className="mx-auto mb-12 max-w-[1400px] px-5 sm:mb-14 md:px-8 lg:mb-16 lg:px-10"
        >
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-violet-400" />

                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
                  Client Perspective
                </span>
              </div>

              <h2 className="text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
                Results speak
                <br />
                <span className="text-white/30">
                  louder.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/40 lg:pb-2 lg:text-right">
              Real stories from brands that trusted us
              to turn strategy, creativity and
              performance into measurable growth.
            </p>
          </div>
        </div>

        {/* ==================================================
            CAROUSEL AREA
           ================================================== */}

        <div
          ref={viewportRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {/* Left content boundary */}
          <div className="mx-auto max-w-[1400px] px-5 md:px-8 lg:px-10">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                What our clients say
              </span>

              <span className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                {String(activeIndex + 1).padStart(
                  2,
                  "0"
                )}
                {" / "}
                {String(
                  Math.max(maxIndex + 1, 1)
                ).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* 
             IMPORTANT:

             The track starts from the main container.

             But the RIGHT SIDE can extend to viewport edge.
          */}
          <div className="overflow-hidden pl-5 md:pl-[max(2rem,calc((100vw-1400px)/2+2.5rem))]">
            <div
              ref={trackRef}
              className="flex will-change-transform"
            >
              {testimonials.map(
                (testimonial, index) => (
                  <div
                    key={testimonial.id}
                    data-testimonial-card
                    className="w-[calc(100vw-2.5rem)] shrink-0 pr-3 sm:w-[calc(100vw-3.5rem)] md:w-[calc(50vw-2.25rem)] md:pr-4 lg:w-[calc(25vw-1.1rem)]"
                  >
                    <article
                      onMouseEnter={
                        handleCardEnter
                      }
                      onMouseLeave={
                        handleCardLeave
                      }
                      className="group relative flex min-h-[500px] flex-col overflow-hidden rounded-[30px] border border-transparent bg-gradient-to-br from-violet-500/35 via-blue-500/15 to-white/[0.04] p-px"
                    >
                      {/* Inner card */}
                      <div className="relative flex min-h-[500px] flex-1 flex-col overflow-hidden rounded-[29px] bg-[#0a0a0c]">
                        {/* Inner gradient */}
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_100%_0%,rgba(124,58,237,0.16),transparent_38%),linear-gradient(145deg,rgba(255,255,255,0.035),transparent_50%)]" />

                        {/* Hover glow */}
                        <div
                          data-card-glow
                          className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 scale-100 rounded-full bg-violet-500/20 opacity-0 blur-[80px]"
                        />

                        

                        {/* Card content */}
                        <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7 lg:p-8">
                          {/* Top row */}
                          

                          {/* Quote */}
                          <div className="mt-9 flex-1">
                            <svg
                              viewBox="0 0 40 32"
                              className="mb-5 h-6 w-7 text-white/15"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M0 32V20.8C0 13.2 2.4 7.2 7.2 2.8C10.2 1 13.4 0 16.8 0V7.2C13.8 7.2 11.4 8.2 9.6 10.2C8 12 7.2 14.2 7.2 16.8H16V32H0ZM24 32V20.8C24 13.2 26.4 7.2 31.2 2.8C34.2 1 37.4 0 40.8 0V7.2C37.8 7.2 35.4 8.2 33.6 10.2C32 12 31.2 14.2 31.2 16.8H40V32H24Z" />
                            </svg>

                            <p className="text-[17px] font-light leading-[1.65] tracking-[-0.018em] text-white/75 sm:text-[18px]">
                              {testimonial.quote}
                            </p>
                          </div>

                          {/* Client */}
                          <div className="mt-8 flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/40 to-blue-500/20 text-[11px] font-medium text-white">
                              {testimonial.name
                                .split(" ")
                                .map(
                                  (part) =>
                                    part[0]
                                )
                                .join("")
                                .slice(0, 2)}
                            </div>

                            <div className="min-w-0">
                              <div className="truncate text-sm font-medium text-white/90">
                                {testimonial.name}
                              </div>

                              <div className="mt-1 truncate text-[9px] uppercase tracking-[0.15em] text-white/30">
                                {testimonial.role}
                                {" · "}
                                {testimonial.company}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* ==================================
                            RIGHT / BOTTOM RESULT PANEL
                           ================================== */}

                        
                            
                      </div>
                    </article>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="mx-auto mt-8 flex max-w-[1400px] flex-col gap-6 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
            {/* Progress */}
            <div className="flex flex-1 items-center gap-4">
              <span className="shrink-0 text-[9px] uppercase tracking-[0.25em] text-white/25">
                Progress
              </span>

              <div className="relative h-px w-full max-w-[360px] overflow-hidden bg-white/10">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet-400 to-blue-400 transition-[width] duration-500"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                aria-label="Previous testimonial"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/45 transition-all duration-300 hover:border-violet-400/40 hover:bg-violet-400/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M19 12H5M11 18L5 12L11 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.025] text-white/45 transition-all duration-300 hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mx-auto mt-20 flex max-w-[1400px] flex-col gap-3 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            DIGITAL WOLF
          </span>

          <span className="text-sm text-white/30">
            Build something worth talking about.
          </span>
        </div>
      </div>
    </section>
  );
}

