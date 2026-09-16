
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "What does Digital Wolf actually do?",
    answer:
      "We combine strategy, creative, performance marketing, content and digital experiences to build brands that get attention and drive measurable growth.",
  },
  {
    question: "Can you work with an existing marketing team?",
    answer:
      "Absolutely. We can work alongside your internal team or take complete ownership of your digital growth activities.",
  },
  {
    question: "How do you build a digital marketing strategy?",
    answer:
      "We begin with your business goals, audience, competition and existing performance. We then build a strategy around the channels and creative directions that can create meaningful growth.",
  },
  {
    question: "Do you also build websites and landing pages?",
    answer:
      "Yes. We create conversion-focused websites and landing pages that connect creative design, user experience and marketing performance.",
  },
  {
    question: "How do we start a project with Digital Wolf?",
    answer:
      "Tell us about your business, goals and current challenges. We analyse the opportunity and then define the right direction and scope for the project.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "The timeline depends on the objective, channel and starting point. Some campaigns produce early signals quickly, while sustainable growth comes through continuous optimisation.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const visualInnerRef = useRef<HTMLDivElement | null>(null);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const list = listRef.current;
    const visual = visualRef.current;
    const visualInner = visualInnerRef.current;

    if (!section || !heading || !list || !visual || !visualInner) {
      return;
    }

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * ---------------------------------------------
         * HEADING REVEAL
         * ---------------------------------------------
         *
         * IMPORTANT:
         * Section ko y position nahi de rahe.
         * Isliye actual Testimonials overlap intact rahega.
         */

        gsap.fromTo(
          heading.querySelectorAll(".faq-heading-item"),
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              once: true,
            },
          }
        );

        /*
         * ---------------------------------------------
         * FAQ ROW REVEAL
         * ---------------------------------------------
         */

        gsap.fromTo(
          list.querySelectorAll(".faq-row"),
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: list,
              start: "top 82%",
              once: true,
            },
          }
        );

        /*
         * ---------------------------------------------
         * RIGHT VISUAL PARALLAX
         * ---------------------------------------------
         */

        gsap.fromTo(
          visualInner,
          {
            y: 70,
          },
          {
            y: -70,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );

        /*
         * ---------------------------------------------
         * SMALL FLOATING ELEMENTS
         * ---------------------------------------------
         */

        gsap.to(".faq-float-one", {
          y: -12,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".faq-float-two", {
          y: 10,
          duration: 2.7,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        /*
         * ---------------------------------------------
         * DESKTOP MOUSE PARALLAX
         * ---------------------------------------------
         */

        const finePointer = window.matchMedia(
          "(pointer: fine)"
        ).matches;

        if (finePointer) {
          const handleMouseMove = (event: MouseEvent) => {
            const x =
              (event.clientX / window.innerWidth - 0.5) * 12;

            const y =
              (event.clientY / window.innerHeight - 0.5) * 12;

            gsap.to(visual, {
              x,
              y,
              duration: 1,
              ease: "power3.out",
              overwrite: "auto",
            });
          };

          window.addEventListener(
            "mousemove",
            handleMouseMove
          );

          return () => {
            window.removeEventListener(
              "mousemove",
              handleMouseMove
            );
          };
        }

        return undefined;
      });

      return () => media.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="
        relative
        z-30
        -mt-[180px]
        overflow-hidden
        rounded-t-[42px]
        bg-[#060608]
        text-white
        md:-mt-[230px]
        md:rounded-t-[60px]
        lg:-mt-[300px]
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.8) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "70px 70px",
          }}
        />

        {/* Top gradient atmosphere */}
        <div
          className="
            absolute
            left-1/2
            top-0
            h-[500px]
            w-[1000px]
            -translate-x-1/2
            bg-gradient-to-b
            from-violet-500/[0.10]
            via-blue-500/[0.035]
            to-transparent
            blur-[80px]
          "
        />

        {/* Right glow */}
        <div
          className="
            absolute
            -right-[250px]
            top-[25%]
            h-[600px]
            w-[600px]
            rounded-full
            bg-violet-600/[0.07]
            blur-[150px]
          "
        />
      </div>

      {/* =====================================================
          TOP OVERLAP EDGE
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-0
          right-0
          top-0
          z-20
          h-[2px]
          bg-gradient-to-r
          from-transparent
          via-violet-400/60
          to-transparent
        "
      />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          max-w-[1500px]
          px-5
          pb-28
          pt-20
          sm:px-8
          md:pb-36
          md:pt-28
          lg:px-12
          lg:pt-32
        "
      >
        <div
          className="
            grid
            gap-16
            lg:grid-cols-[0.78fr_1.22fr]
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT — STICKY
          ================================================== */}

          <div
            ref={headingRef}
            className="
              relative
              z-20
              lg:sticky
              lg:top-28
              lg:self-start
            "
          >
            <div className="faq-heading-item mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-violet-400" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-violet-300">
                FAQ / DIGITAL WOLF
              </span>
            </div>

            <h2
              className="
                faq-heading-item
                max-w-[620px]
                text-[clamp(3.2rem,7vw,7rem)]
                font-semibold
                leading-[0.84]
                tracking-[-0.07em]
              "
            >
              LET&apos;S
              <br />
              CLEAR THE
              <br />
              <span
                className="
                  bg-gradient-to-r
                  from-white
                  via-violet-200
                  to-blue-300
                  bg-clip-text
                  text-transparent
                "
              >
                NOISE.
              </span>
            </h2>

            <p
              className="
                faq-heading-item
                mt-8
                max-w-[420px]
                text-sm
                leading-7
                text-white/45
                md:text-base
              "
            >
              Everything you need to know before we turn
              your next idea into something people remember.
            </p>

            <div className="faq-heading-item mt-10">
              <span
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.025]
                  px-4
                  py-2.5
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-white/40
                "
              >
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Strategy × Creative × Growth
              </span>
            </div>
          </div>

          {/* =================================================
              RIGHT COLUMN
          ================================================== */}

          <div className="relative">
            {/* =================================================
                STICKY VISUAL
            ================================================== */}

            <div
              ref={visualRef}
              className="
                pointer-events-none
                absolute
                -right-10
                -top-10
                z-0
                hidden
                h-[700px]
                w-[620px]
                lg:block
              "
            >
             
            </div>

            {/* =================================================
                FAQ LIST
            ================================================== */}

            <div
              ref={listRef}
              className="
                relative
                z-10
                space-y-3
                lg:pt-16
              "
            >
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={faq.question}
                    className="
                      faq-row
                      overflow-hidden
                      rounded-[25px]
                      border
                      border-transparent
                      bg-gradient-to-br
                      from-white/[0.08]
                      via-white/[0.025]
                      to-violet-500/[0.06]
                      p-px
                    "
                  >
                    <div
                      className={`
                        overflow-hidden
                        rounded-[24px]
                        transition-all
                        duration-500
                        ${
                          isOpen
                            ? "bg-gradient-to-br from-violet-500/[0.12] via-[#0b0b0e] to-blue-500/[0.08]"
                            : "bg-[#09090c]"
                        }
                      `}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setOpenIndex(
                            isOpen ? null : index
                          )
                        }
                        className="
                          flex
                          w-full
                          items-center
                          justify-between
                          gap-5
                          px-5
                          py-6
                          text-left
                          sm:px-7
                          md:py-7
                        "
                      >
                        <div className="flex items-start gap-5">
                          <span
                            className="
                              mt-1
                              text-[9px]
                              font-medium
                              tracking-[0.25em]
                              text-violet-300/50
                            "
                          >
                            0{index + 1}
                          </span>

                          <span
                            className="
                              text-sm
                              font-medium
                              leading-6
                              text-white/90
                              md:text-base
                              lg:text-[17px]
                            "
                          >
                            {faq.question}
                          </span>
                        </div>

                        {/* CSS PLUS — no SVG */}

                        <span
                          className={`
                            relative
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            border
                            transition-all
                            duration-500
                            ${
                              isOpen
                                ? "rotate-45 border-violet-300/30 bg-violet-500/10"
                                : "border-white/[0.08] bg-white/[0.025]"
                            }
                          `}
                        >
                          <span className="absolute h-px w-3 bg-white/60" />
                          <span className="absolute h-3 w-px bg-white/60" />
                        </span>
                      </button>

                      {/* Answer */}

                      <div
                        className={`
                          grid
                          transition-all
                          duration-500
                          ${
                            isOpen
                              ? "grid-rows-[1fr] opacity-100"
                              : "grid-rows-[0fr] opacity-0"
                          }
                        `}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 pb-7 pl-[3.6rem] pr-8 sm:px-7 sm:pl-[4.1rem]">
                            <p className="max-w-2xl text-sm leading-7 text-white/40">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}

            <div
              className="
                relative
                z-10
                mt-10
                overflow-hidden
                rounded-[28px]
                border
                border-violet-400/15
                bg-gradient-to-r
                from-violet-500/[0.08]
                via-white/[0.025]
                to-blue-500/[0.06]
                p-6
                sm:p-8
              "
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl" />

              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-lg font-medium">
                    Still have questions?
                  </p>

                  <p className="mt-2 max-w-md text-sm leading-6 text-white/40">
                    Tell us what you are trying to build.
                    We&apos;ll figure out the right direction
                    together.
                  </p>
                </div>

                <a
                  href="#analyse"
                  className="
                    group
                    inline-flex
                    shrink-0
                    items-center
                    justify-center
                    gap-3
                    rounded-full
                    bg-white
                    px-6
                    py-3.5
                    text-xs
                    font-semibold
                    text-black
                    transition-transform
                    duration-300
                    hover:scale-105
                  "
                >
                  Start a conversation

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

