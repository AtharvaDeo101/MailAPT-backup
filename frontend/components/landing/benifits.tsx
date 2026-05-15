"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";

const features = [
  {
    title: "One-Click Email Generation",
    description: "Just enter a prompt → AI writes → you send. That simple.",
  },
  {
    title: "Professional & Polished Output",
    description: "Emails are structured, clear, and tailored to your intent.",
  },
  {
    title: "Smart Tone Adjustment",
    description: "Whether formal, friendly, persuasive, or concise. AI adapts instantly.",
  },
  {
    title: "Consistency at Scale",
    description: "Send multiple emails with uniform quality and tone.",
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .dev-code-char {
    opacity: 0;
    filter: blur(8px);
    animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  
  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

const playfair = "'Playfair Display', Georgia, serif";

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="developers"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-3 mb-6"
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
              Core advantages
            </span>

            {/* Heading */}
            <h2
              className="mb-8"
              style={{
                fontFamily: playfair,
                fontWeight: 500,
                fontStyle: "normal",
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "hsl(var(--foreground))",
              }}
            >
              Powered by AI.
              <br />
              <span
                style={{
                  fontStyle: "italic",
                  color: "hsl(var(--muted-foreground) / 0.6)",
                }}
              >
                Sent by you.
              </span>
            </h2>

            {/* Description */}
            <p
              className="mb-12"
              style={{
                fontFamily: playfair,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                color: "hsl(var(--muted-foreground) / 0.72)",
                lineHeight: 1.75,
                letterSpacing: "0.01em",
                maxWidth: "38rem",
              }}
            >
              No more overthinking subject lines, tone, or structure, just type
              what you want, and let AI handle the rest.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3
                    className="mb-1"
                    style={{
                      fontFamily: playfair,
                      fontWeight: 500,
                      fontStyle: "normal",
                      fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                      color: "hsl(var(--foreground))",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: playfair,
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: "0.95rem",
                      color: "hsl(var(--muted-foreground) / 0.72)",
                      lineHeight: 1.7,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side intentionally left empty for future code/demo block */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* You can place your animated code UI here later */}
          </div>
        </div>
      </div>
    </section>
  );
}