
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "PERFORMANCE\nMARKETING",
    description:
      "We turn media budgets into measurable growth through data, experimentation and performance-led campaigns.",
    tags: ["PAID MEDIA", "SEARCH", "SOCIAL", "DATA"],
    accent: "01",
  },
  {
    number: "02",
    title: "CREATIVE\n& CONTENT",
    description:
      "Ideas built to stop the scroll, build recognition and make your brand impossible to ignore.",
    tags: ["CREATIVE", "CONTENT", "SOCIAL", "BRANDING"],
    accent: "02",
  },
  {
    number: "03",
    title: "SOCIAL\nMEDIA",
    description:
      "We build social ecosystems that turn attention into conversations, communities and long-term brand value.",
    tags: ["STRATEGY", "COMMUNITY", "CONTENT", "GROWTH"],
    accent: "03",
  },
  {
    number: "04",
    title: "DIGITAL\nEXPERIENCES",
    description:
      "From landing pages to digital products, we create experiences designed around people, performance and purpose.",
    tags: ["UX", "UI", "WEB", "EXPERIENCE"],
    accent: "04",
  },
  {
    number: "05",
    title: "WEB\nDEVELOPMENT",
    description:
      "From high-converting landing pages to scalable digital platforms, we build experiences that are fast, flexible and designed for growth.",
    tags: ["FRONTEND", "BACKEND", "WEB", "DEVELOPMENT"],
    accent: "05",
  },
  {
    number: "06",
    title: "WEB\nDEVELOPMENT",
    description:
      "We engineer modern web experiences combining clean interfaces, strong performance and scalable technology.",
    tags: ["NEXT.JS", "UI", "WEB", "TECH"],
    accent: "06",
  },
  {
    number: "07",
    title: "SEO &\nANALYTICS",
    description:
      "We turn search visibility and data into actionable growth through technical SEO, content strategy and analytics.",
    tags: ["SEO", "ANALYTICS", "DATA", "SEARCH"],
    accent: "07",
  },
  {
    number: "08",
    title: "APP\nDEVELOPMENT",
    description:
      "We create intuitive digital products and mobile experiences designed around real users and measurable business outcomes.",
    tags: ["MOBILE", "UX", "UI", "PRODUCT"],
    accent: "08",
  },
  {
    number: "09",
    title: "GRAPHIC\nDESIGN",
    description:
      "Visual identities, campaigns and digital assets designed to give brands a recognizable and consistent visual language.",
    tags: ["BRANDING", "IDENTITY", "CAMPAIGNS", "DESIGN"],
    accent: "09",
  },
  {
    number: "10",
    title: "VIDEO\nEDITING",
    description:
      "We transform raw footage into sharp, engaging visual stories built for social platforms, campaigns and digital experiences.",
    tags: ["REELS", "MOTION", "EDITING", "CONTENT"],
    accent: "10",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const cursorGlow = cursorGlowRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const slides =
        gsap.utils.toArray<HTMLElement>(".service-slide");

      if (!slides.length) return;

      const serviceCount = slides.length;

      /*
       * =======================================================
       * MAIN HORIZONTAL SLIDER
       * =======================================================
       *
       * Example:
       *
       * 10 services
       * = 10 viewport scroll units
       *
       * There is NO extra +0.8 / +1 / extra blank scroll.
       */

      const sliderTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",

          end: () => `+=${window.innerWidth * serviceCount}`,

          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /*
       * Move all slides horizontally.
       *
       * 10 slides:
       * first slide = 0%
       * last slide  = -900%
       */

      sliderTimeline.to(track, {
        xPercent: -(100 * (serviceCount - 1)),
        ease: "none",
        duration: serviceCount - 1,
      });

      /*
       * =======================================================
       * INDIVIDUAL SLIDE ANIMATIONS
       * =======================================================
       */

      slides.forEach((slide, index) => {
        const number =
          slide.querySelector<HTMLElement>(".service-number");

        const title =
          slide.querySelector<HTMLElement>(".service-title");

        const description =
          slide.querySelector<HTMLElement>(".service-description");

        const tags =
          slide.querySelectorAll<HTMLElement>(".service-tag");

        const line =
          slide.querySelector<HTMLElement>(".service-line");

        const visual =
          slide.querySelector<HTMLElement>(".service-visual");

        const orbit =
          slide.querySelector<HTMLElement>(".service-orbit");

        /*
         * -------------------------------------------------------
         * NUMBER
         * -------------------------------------------------------
         */

        if (number) {
          gsap.fromTo(
            number,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: sliderTimeline,
                start: "left 80%",
                end: "left 45%",
                scrub: true,
              },
            }
          );
        }

        /*
         * -------------------------------------------------------
         * TITLE
         * -------------------------------------------------------
         */

        if (title) {
          gsap.fromTo(
            title,
            {
              opacity: 0,
              y: 100,
              rotateX: -35,
              transformOrigin: "50% 100%",
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              ease: "power4.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: sliderTimeline,
                start: "left 75%",
                end: "left 35%",
                scrub: true,
              },
            }
          );
        }

        /*
         * -------------------------------------------------------
         * DESCRIPTION
         * -------------------------------------------------------
         */

        if (description) {
          gsap.fromTo(
            description,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: sliderTimeline,
                start: "left 65%",
                end: "left 35%",
                scrub: true,
              },
            }
          );
        }

        /*
         * -------------------------------------------------------
         * TAGS
         * -------------------------------------------------------
         */

        if (tags.length) {
          gsap.fromTo(
            tags,
            {
              opacity: 0,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: sliderTimeline,
                start: "left 60%",
                end: "left 30%",
                scrub: true,
              },
            }
          );
        }

        /*
         * -------------------------------------------------------
         * LINE
         * -------------------------------------------------------
         */

        if (line) {
          gsap.fromTo(
            line,
            {
              scaleX: 0,
              transformOrigin: "left center",
            },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: sliderTimeline,
                start: "left 70%",
                end: "left 30%",
                scrub: true,
              },
            }
          );
        }

        /*
         * -------------------------------------------------------
         * VISUAL INTRO
         * -------------------------------------------------------
         */

        if (visual) {
          gsap.fromTo(
            visual,
            {
              opacity: 0,
              scale: 0.65,
              rotate: -12,
            },
            {
              opacity: 1,
              scale: 1,
              rotate: 0,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: sliderTimeline,
                start: "left 80%",
                end: "left 35%",
                scrub: true,
              },
            }
          );

          /*
           * Continuous floating animation
           *
           * y only — does not interfere with the
           * horizontal slider movement.
           */

          gsap.to(visual, {
            y: index % 2 === 0 ? -18 : 18,
            duration: 3 + index * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }

        /*
         * -------------------------------------------------------
         * ORBIT ROTATION
         * -------------------------------------------------------
         */

        if (orbit) {
          gsap.to(orbit, {
            rotate: index % 2 === 0 ? 360 : -360,
            duration: 18 + index * 2,
            repeat: -1,
            ease: "none",
          });
        }

        /*
         * -------------------------------------------------------
         * SLIDE ACTIVE SCALE
         * -------------------------------------------------------
         *
         * Visual becomes slightly larger when it reaches
         * the center of the viewport.
         */

        if (visual) {
          ScrollTrigger.create({
            trigger: slide,
            containerAnimation: sliderTimeline,
            start: "left right",
            end: "right left",
            scrub: true,

            onUpdate: (self) => {
              const scale =
                0.92 +
                Math.sin(self.progress * Math.PI) * 0.08;

              gsap.set(visual, {
                scale,
              });
            },
          });
        }
      });

      /*
       * =======================================================
       * TOP LABEL
       * =======================================================
       */

      const sectionLabel =
        section.querySelector<HTMLElement>(".services-label");

      if (sectionLabel) {
        gsap.fromTo(
          sectionLabel,
          {
            opacity: 0,
            y: -20,
          },
          {
            opacity: 1,
            y: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 55%",
              scrub: true,
            },
          }
        );
      }

      /*
       * =======================================================
       * PROGRESS BAR
       * =======================================================
       */

      const progressBar =
        section.querySelector<HTMLElement>(
          ".services-progress-bar"
        );

      if (progressBar) {
        gsap.fromTo(
          progressBar,
          {
            scaleX: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",

              end: () =>
                `+=${window.innerWidth * serviceCount}`,

              scrub: true,
            },
          }
        );
      }

      /*
       * =======================================================
       * PROGRESS NUMBER
       * =======================================================
       */

      const progressCount =
        section.querySelector<HTMLElement>(
          ".services-progress-count"
        );

      if (progressCount) {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",

          end: () =>
            `+=${window.innerWidth * serviceCount}`,

          scrub: true,

          onUpdate: (self) => {
            const current = Math.min(
              serviceCount,
              Math.floor(
                self.progress * serviceCount
              ) + 1
            );

            progressCount.textContent =
              String(current).padStart(2, "0");
          },
        });
      }
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

      window.addEventListener(
        "mousemove",
        moveCursor
      );

      gsap.set(cursorGlow, {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }

    /*
     * =======================================================
     * CLEANUP
     * =======================================================
     */

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
    <section
      ref={sectionRef}
      className="relative z-30 h-screen overflow-hidden bg-[#050505] text-white"
    >
      {/* =====================================================
          CURSOR GLOW
      ====================================================== */}

      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[90px] md:block"
      />

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        <div className="absolute left-[15%] top-[20%] h-[450px] w-[450px] rounded-full bg-violet-600/10 blur-[150px]" />

        <div className="absolute bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <div className="absolute left-0 right-0 top-0 z-30 px-6 py-6 md:px-12 md:py-8">
        <div className="services-label flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-white/40" />

            <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-white/50">
              Services
            </span>
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            03 / What we do
          </span>
        </div>
      </div>

      {/* =====================================================
          HORIZONTAL SLIDER
      ====================================================== */}

      <div
        ref={trackRef}
        className="flex h-full"
        style={{
          width: `${services.length * 100}vw`,
        }}
      >
        {services.map((service, index) => (
          <article
            key={service.number}
            className="service-slide relative flex h-screen w-screen shrink-0 items-center px-6 pt-16 md:px-12 lg:px-20"
          >
            {/* =================================================
                HUGE BACKGROUND NUMBER
            ================================================== */}

            <div className="pointer-events-none absolute right-[-5%] top-[5%] select-none text-[30vw] font-bold leading-none tracking-[-0.08em] text-white/[0.025]">
              {service.accent}
            </div>

            {/* =================================================
                CONTENT
            ================================================== */}

            <div className="relative z-10 mx-auto grid w-full max-w-[1500px] grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                {/* Number */}

                <div className="service-number mb-8 flex items-center gap-4">
                  <span className="text-sm font-medium tracking-[0.2em] text-violet-300">
                    {service.number}
                  </span>

                  <span className="h-px w-16 bg-white/20" />

                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
                    DW Digital
                  </span>
                </div>

                {/* Title */}

                <h2 className="service-title whitespace-pre-line text-[15vw] font-semibold leading-[0.82] tracking-[-0.07em] sm:text-[12vw] md:text-[10vw] lg:text-[7.4vw]">
                  {service.title}
                </h2>

                {/* Line */}

                <div className="service-line mt-8 h-px w-full max-w-[600px] bg-white/20" />

                {/* Description */}

                <p className="service-description mt-7 max-w-[550px] text-sm leading-7 text-white/55 md:text-base md:leading-8">
                  {service.description}
                </p>

                {/* Tags */}

                <div className="mt-8 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="service-tag rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-[9px] font-medium tracking-[0.2em] text-white/50 backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* =================================================
                  VISUAL
              ================================================== */}

              <div className="relative hidden h-[500px] items-center justify-center lg:flex">
                <div className="service-visual relative h-[360px] w-[360px]">
                  {/* Outer orbit */}

                  <div
                    className="service-orbit absolute inset-0 rounded-full border border-white/10"
                    style={{
                      transform: `rotate(${index * 25}deg)`,
                    }}
                  >
                    <div className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-violet-300 shadow-[0_0_30px_rgba(196,181,253,0.8)]" />
                  </div>

                  {/* Middle orbit */}

                  <div className="absolute inset-[35px] rounded-full border border-white/[0.08]">
                    <div className="absolute bottom-[-4px] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/60" />
                  </div>

                  {/* Core */}

                  <div className="absolute left-1/2 top-1/2 h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-violet-300/20 via-violet-500/10 to-transparent blur-[1px]" />

                  {/* DW Core */}

                  <div className="absolute left-1/2 top-1/2 flex h-[110px] w-[110px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] backdrop-blur-xl">
                    <span className="text-4xl font-semibold tracking-[-0.08em] text-white/80">
                      DW
                    </span>
                  </div>

                  {/* Decorative line */}

                  <div className="absolute left-[10%] top-1/2 h-px w-[80%] rotate-[28deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                  <div className="absolute left-1/2 top-[10%] h-[80%] w-px rotate-[28deg] bg-gradient-to-b from-transparent via-white/15 to-transparent" />

                  {/* Floating label */}

                  <div className="absolute -right-10 top-12 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                      {service.tags[0]}
                    </span>
                  </div>

                  <div className="absolute -bottom-2 -left-8 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-md">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                      360° Growth
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                SLIDE INDEX
            ================================================== */}

            <div className="absolute bottom-8 left-6 flex items-center gap-4 md:left-12">
              <span className="text-[10px] tracking-[0.3em] text-white/25">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="h-px w-12 bg-white/10" />

              <span className="text-[10px] uppercase tracking-[0.25em] text-white/20">
                Scroll to explore
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* =====================================================
          BOTTOM PROGRESS
      ====================================================== */}

      <div className="absolute bottom-0 left-0 right-0 z-40 px-6 pb-5 md:px-12">
        <div className="flex items-center gap-5">
          <span className="services-progress-count w-5 text-[10px] tracking-[0.2em] text-white/40">
            01
          </span>

          <div className="relative h-px flex-1 overflow-hidden bg-white/10">
            <div className="services-progress-bar absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-white/60" />
          </div>

          <span className="text-[10px] tracking-[0.2em] text-white/20">
            {String(services.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}

