"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedTetrahedron } from "./animated-tetrahedron";

const playfair = "'Playfair Display', Georgia, serif";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`relative border border-foreground transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Spotlight effect */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,0,0,0.15), transparent 40%)`,
            }}
          />

          <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left content */}
              <div className="flex-1">
                {/* Eyebrow */}
                <p
                  className="mb-6 inline-flex items-center gap-3"
                  style={{
                    fontFamily: playfair,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "0.875rem",
                    letterSpacing: "0.12em",
                    color: "hsl(var(--muted-foreground) / 0.55)",
                  }}
                >
                  <span
                    className="w-8 h-px"
                    style={{ background: "hsl(var(--foreground) / 0.3)" }}
                  />
                  Get started
                </p>

                {/* Heading */}
                <h2
                  className="mb-8"
                  style={{
                    fontFamily: playfair,
                    fontWeight: 500,
                    fontStyle: "normal",
                    fontSize: "clamp(2.4rem, 7vw, 5.5rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 0.95,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Ready to write
                  <br />
                  <span
                    style={{
                      fontStyle: "italic",
                      color: "hsl(var(--foreground))",
                    }}
                  >
                    something great?
                  </span>
                </h2>

                {/* Description */}
                <p
                  className="mb-12 max-w-xl"
                  style={{
                    fontFamily: playfair,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                    color: "hsl(var(--muted-foreground) / 0.72)",
                    lineHeight: 1.75,
                    letterSpacing: "0.01em",
                  }}
                >
                  Join and start reading and sending email efficiently with the
                  help of a single click.
                </p>

                {/* Small note */}
                <p
                  style={{
                    fontFamily: playfair,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "0.9rem",
                    color: "hsl(var(--muted-foreground) / 0.65)",
                    letterSpacing: "0.04em",
                  }}
                >
                  Free to use.
                </p>
              </div>

              {/* Right animation */}
              <div className="hidden lg:flex items-center justify-center w-[500px] h-[500px] -mr-16">
                <AnimatedTetrahedron />
              </div>
            </div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 border-b border-l border-foreground/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-t border-r border-foreground/10" />
        </div>
      </div>
    </section>
  );
}