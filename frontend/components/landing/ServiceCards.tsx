"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

interface TooltipData {
  top: number;
  left: number;
  title: string;
  description: string;
}

interface ServiceCard {
  id: string;
  label: string;
  href: string;
  title: string;
  image: string;
  tooltip: TooltipData;
}

const SERVICE_CARDS: ServiceCard[] = [
  {
    id: "refits", label: "Yacht refits & customisation", href: "/services/refits", title: "Luxury design & refits",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbe01d38cc8850a571fb0e_687e00a1a37bbd51d001564a_6826066aa0ad368483ffce0a_JSC07651-resized_processed_by_imagy.avif",
    tooltip: { top: 60, left: 65, title: "Bespoke Yacht Transformations", description: "Elevate your vessel with custom interiors and finishes, blending technical precision with luxury." },
  },
  {
    id: "upholstery", label: "Upholstery services", href: "/services/upholstery", title: "Luxury upholstery services",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbe04f474d4ecf572a2a5e_688b6d8c743b0795c320d402_Aquamare-111-resized_processed_by_imagy.avif",
    tooltip: { top: 50, left: 10, title: "Premium Upholstery", description: "Handcrafted marine upholstery using the finest materials for lasting comfort and style." },
  },
  {
    id: "carpentry", label: "Carpentry services", href: "/services/carpentry", title: "Marine Carpentry & Woodworking",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbe03fd7eeb49812d1c34d_688b6cd36925726e339def28_Aquamare-113-resized_processed_by_imagy.avif",
    tooltip: { top: 50, left: 30, title: "Decades of carpentry expertise", description: "Water damage restoration, custom furniture fabrication, and complete interior refits." },
  },
  {
    id: "technical-installations", label: "Technical installations", href: "/services/technical-installations", title: "Advanced technical installations",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbe000f3ac16b6a9269ea8_687e00858274daac447e41c8_6826068eb29732680e778b35_Aquamare-037-resized_processed_by_imagy.jpg",
    tooltip: { top: 60, left: 20, title: "Integrated Marine Technology", description: "Certified installation of advanced systems for comfort, safety, and seamless onboard integration." },
  },
  {
    id: "marine-engineering", label: "Marine engineering specialists", href: "/services/marine-engineering", title: "Marine engineering excellence",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbe00c16a77bf40cd884be_687e00954e83fc56c5038dba_682606ccc9103f79b8a58bf0_Aquamare-166-resized_processed_by_imagy.avif",
    tooltip: { top: 60, left: 65, title: "Advanced System Expertise", description: "Specialist engineering for mission-critical systems, ensuring peak performance and regulatory compliance." },
  },
  {
    id: "boat-building", label: "Boat building support & design", href: "/services/boat-building", title: "Yacht Design & Build Expertise",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbdfe7511fb854f89adefb_6883f41e70d298ca65ec0489_Aquamare-012-resized_processed_by_imagy.avif",
    tooltip: { top: 50, left: 75, title: "Next-Generation Yacht Development", description: "Partnering on design and build projects with cutting-edge expertise for new vessels and custom builds." },
  },
  {
    id: "grp-paint", label: "Marine GRP & paint services", href: "/services/grp-paint", title: "GRP & Paint Excellence",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/687e00d66e5a3af9b94c8c75_6826078cb133d9424e4a11f6_Aquamare-063-resized.avif",
    tooltip: { top: 10, left: 40, title: "Flawless Finish & Protection", description: "Premium GRP repair and marine paintwork to restore, protect, and enhance your yacht's appearance." },
  },
  {
    id: "3d-scanning", label: "3D scanning & modelling", href: "/services/3d-scanning-modelling", title: "3D Scanning & Modelling Experts",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbe03107e80cfda47bd4df_6842e568311a3cfe4c0c834c_Aquamare-086-resized_processed_by_imagy.jpg",
    tooltip: { top: 10, left: 10, title: "Advanced 3D Vessel Surveys", description: "Unlock pinpoint accuracy and speed up every phase of your marine project with a fully detailed digital twin." },
  },
  {
    id: "maintenance", label: "Core maintenance", href: "/services/maintenance", title: "Precision Maintenance",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/68dbdfd8955b0c267a2f403c_687e0065d38c5155660f0053_6825fc0fd407ba7383b291a4_Aquamare-050-resized_processed_by_imagy.avif",
    tooltip: { top: 75, left: 75, title: "Performance-Optimised Care", description: "Expert maintenance to keep your yacht running safely, smoothly, and always ready for the water." },
  },
  {
    id: "care-programs", label: "Care programs", href: "/services/care-programs", title: "Comprehensive Care Solutions",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/687e0078479297a2f7e2b3b4_682606193d3d763311f298f4_Aquamare-057-resized.avif",
    tooltip: { top: 20, left: 75, title: "Total Vessel Stewardship", description: "Structured care programs for year-round protection, rapid response, and lasting peace of mind." },
  },
  {
    id: "flexiteek", label: "Flexiteek decking solutions", href: "/services/flexiteek-decking", title: "Flexiteek Synthetic Decking",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/6916ed745d2afe8df7cfcd6d_Flexiteek-teck-bow-deck-e1718012392545.avif",
    tooltip: { top: 60, left: 65, title: "Approved to supply and install", description: "Flexiteek's synthetic teak decking combines proven durability, stunning style, and easy maintenance." },
  },
  {
    id: "logistics", label: "Logistics & support", href: "/services/logistics", title: "Seamless Logistics & Support",
    image: "https://cdn.prod.website-files.com/6823b8d01ea974e1ea9f480c/687e00c78ade0b890d5f62ff_68260716aba9b4e2ef4159ef_Aquamare-083-resized.avif",
    tooltip: { top: 40, left: 20, title: "Effortless Operational Support", description: "From secure storage to swift parts supply, we handle every detail so your yachting experience is seamless." },
  },
];

// ── Config ─────────────────────────────────────────────────────────────────
const CARD_W         = 350;   // card width px
const CARD_H         = 400;   // card height px
const VISIBLE        = 3;     // cards visible at once
const FAN_DEG        = 52;    // total arc spread in degrees (gap between cards)
const ARC_R          = 1100;  // arc radius — larger = flatter fan
const SCROLL_STEP    = 340;   // px of scroll to advance one card
// Cards shift DOWN this far below vertical centre of stage:
const STAGE_Y_BIAS   = 400;   // positive = push cards further down


// ── CardTooltip ────────────────────────────────────────────────────────────
function CardTooltip({ tooltip }: { tooltip: TooltipData }) {
  const tipRef = useRef<HTMLDivElement>(null);
  const show = () => { if (tipRef.current) { tipRef.current.style.opacity = "1"; tipRef.current.style.transform = "translateY(0)"; } };
  const hide = () => { if (tipRef.current) { tipRef.current.style.opacity = "0"; tipRef.current.style.transform = "translateY(8px)"; } };
  return (
    <div className="absolute z-20" style={{ top: `${tooltip.top}%`, left: `${tooltip.left}%` }} onMouseEnter={show} onMouseLeave={hide}>
      <button className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white border border-white/30 hover:bg-white/30 transition-colors" aria-label={tooltip.title}>
        <span className="absolute inset-0 rounded-full border border-white/20 scale-[1.7] pointer-events-none" />
      </button>
      <div ref={tipRef} className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-52 -translate-x-1/2 rounded-2xl border border-white/20 bg-black/88 p-3.5 backdrop-blur-md"
        style={{ opacity: 0, transform: "translateY(8px)", transition: "opacity 200ms ease, transform 200ms ease" }}>
        <p className="text-xs font-semibold text-white mb-1 leading-snug">{tooltip.title}</p>
        <p className="text-[11px] text-white/65 leading-relaxed">{tooltip.description}</p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────
export function ServiceCards() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let stInstance: any = null;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const stage   = stageRef.current;
      if (!section || !stage) return;

      const total  = SERVICE_CARDS.length;
      const stageW = stage.offsetWidth;
      const stageH = stage.offsetHeight;

      // ── Arc pivot ─────────────────────────────────────────────────────
      // Pivot is centred horizontally, shifted below the bottom of stage
      // so the arc cups upward into view. STAGE_Y_BIAS pushes cards lower.
      const pivotX = stageW / 2;
      const pivotY = stageH + ARC_R * 0.22 + STAGE_Y_BIAS;

      // Convert arc angle to absolute (x, y) on screen
      const arcPos = (deg: number) => {
        const r = (deg * Math.PI) / 180;
        return {
          x: pivotX + ARC_R * Math.sin(r) - CARD_W / 2,
          y: pivotY - ARC_R * Math.cos(r) - CARD_H / 2,
        };
      };

      // Slot 0 = leftmost, Slot VISIBLE-1 = rightmost
      // FAN_DEG governs total spread → more degrees = bigger gap between cards
      const slotAngle = (slot: number): number =>
        -FAN_DEG / 2 + (slot / (VISIBLE - 1)) * FAN_DEG;

      // ── Below-arc "exit" position ─────────────────────────────────────
      // Cards that get dismissed sink BELOW the arc (further down the circle)
      // and fade out — instead of flying upward.
      const exitAngle = (baseAngle: number) => baseAngle - FAN_DEG * 0.7;
      // "below" means rotating further clockwise past the leftmost slot,
      // which geometrically moves the card downward along the circle.

      // ── Title entrance ────────────────────────────────────────────────
      const lines = titleRef.current?.querySelectorAll<HTMLElement>(".t-line");
      if (lines?.length) {
        gsap.from(lines, { yPercent: 110, duration: 1, stagger: 0.13, ease: "power3.out", delay: 0.3 });
      }

      // ── Total scroll = only dismissable cards ─────────────────────────
      const dismissable     = total - VISIBLE;
      const totalScrollDist = dismissable * SCROLL_STEP;

      stInstance = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: `+=${totalScrollDist}`,
        pin: stage,
        pinSpacing: true,
      });

      // ── Place cards at initial positions ─────────────────────────────
      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        if (i < VISIBLE) {
          // In the opening fan
          const angle = slotAngle(i);
          const pos   = arcPos(angle);
          gsap.set(card, { x: pos.x, y: pos.y, rotation: angle, zIndex: i + 1, opacity: 1 });
        } else {
          // Waiting off-screen — start at rightmost arc position, pushed down
          const angle = slotAngle(VISIBLE - 1) + FAN_DEG * 0.5;
          const pos   = arcPos(angle);
          gsap.set(card, { x: pos.x, y: pos.y + 100, rotation: angle, zIndex: 0, opacity: 0 });
        }
      });

      // ── Animate cards per scroll step ─────────────────────────────────
      for (let step = 0; step < dismissable; step++) {
        const scrollStart = step * SCROLL_STEP;
        const scrollEnd   = scrollStart + SCROLL_STEP;
        const stCfg = {
          trigger: section,
          start: `top+=${scrollStart} top`,
          end:   `top+=${scrollEnd} top`,
          scrub: 1,
        };

        // ── EXIT: front card (step) sinks downward along the arc ─────────
        // It continues rotating left/downward past slot-0, growing smaller
        // and fading out, as if swallowed by the arc below.
        const exitCard = cardRefs.current[step];
        if (exitCard) {
          const fromAngle = slotAngle(0);
          const toAngle   = exitAngle(fromAngle);         // further left = down on the circle
          const fromPos   = arcPos(fromAngle);
          const toPos     = arcPos(toAngle);

          gsap.fromTo(exitCard,
            { x: fromPos.x, y: fromPos.y, rotation: fromAngle, opacity: 1, scale: 1 },
            {
              x: toPos.x,
              y: toPos.y + 40,   // small extra push to feel like it sinks under
              rotation: toAngle,
              opacity: 0,
              scale: 0.88,
              zIndex: 0,
              ease: "none",
              scrollTrigger: stCfg,
            }
          );
        }

        // ── SHIFT: remaining visible cards slide left one slot ────────────
        for (let s = 1; s < VISIBLE; s++) {
          const cardIdx = step + s;
          const card    = cardRefs.current[cardIdx];
          if (!card) continue;

          const fromAngle = slotAngle(s);
          const toAngle   = slotAngle(s - 1);
          const fromPos   = arcPos(fromAngle);
          const toPos     = arcPos(toAngle);

          gsap.fromTo(card,
            { x: fromPos.x, y: fromPos.y, rotation: fromAngle, opacity: 1 },
            {
              x: toPos.x,
              y: toPos.y,
              rotation: toAngle,
              opacity: 1,
              zIndex: cardIdx + 1,
              ease: "none",
              scrollTrigger: stCfg,
            }
          );
        }

        // ── ENTER: next waiting card rises into rightmost slot ────────────
        const enterIdx  = step + VISIBLE;
        const enterCard = cardRefs.current[enterIdx];
        if (enterCard) {
          const toAngle   = slotAngle(VISIBLE - 1);
          const toPos     = arcPos(toAngle);
          const fromAngle = toAngle + FAN_DEG * 0.55;
          const fromPos   = arcPos(fromAngle);

          gsap.fromTo(enterCard,
            { x: fromPos.x, y: fromPos.y + 100, rotation: fromAngle, opacity: 0, scale: 0.9 },
            {
              x: toPos.x,
              y: toPos.y,
              rotation: toAngle,
              opacity: 1,
              scale: 1,
              zIndex: enterIdx + 1,
              ease: "none",
              scrollTrigger: stCfg,
            }
          );
        }
      }
    };

    init().catch(console.error);
    return () => { stInstance?.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-background">
      <div ref={stageRef} className="relative w-full overflow-hidden" style={{ height: "100svh" }}>

        {/* ── Section title ── */}
        <div ref={titleRef} className="absolute top-8 left-0 right-0 z-50 text-center px-6 pointer-events-none select-none">
          <p
            className="text-3xl md:text-5xl font-semibold text-foreground leading-tight tracking-tight"
            aria-label="Your complete partner for luxury yacht transformations and outstanding support"
          >
            {["Instent Mail Generation"].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span className="t-line block">{line}</span>
              </span>
            ))}
          </p>
        </div>

        {/* ── Scroll hint ── */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1.5 pointer-events-none select-none opacity-60">
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-muted-foreground/50 animate-pulse" />
        </div>

        {/* ── Card layer ── */}
        <div role="list" className="absolute inset-0" style={{ pointerEvents: "none" }}>
          {SERVICE_CARDS.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              role="listitem"
              className="absolute"
              style={{ width: CARD_W, height: CARD_H, pointerEvents: "auto" }}
            >
              <Link
                href={card.href}
                aria-label={card.label}
                className="group relative block w-full h-full overflow-hidden rounded-3xl shadow-2xl border border-white/10"
                style={{ textDecoration: "none" }}
              >
                <CardTooltip tooltip={card.tooltip} />
                {/* Scrim */}
                <div className="absolute inset-0 bg-black/25 z-[1] transition-opacity duration-500 group-hover:bg-black/10" />
                {/* Photo */}
                <img
                  src={card.image}
                  alt={card.label}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 z-[2] px-5 py-4 bg-gradient-to-t from-black/85 via-black/50 to-transparent">
                  <h2 className="text-sm font-semibold text-white leading-snug">{card.title}</h2>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}