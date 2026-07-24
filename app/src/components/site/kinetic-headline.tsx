// Tier-1 mechanic (design-brief.md): kinetic type opener. Words are rendered
// server-side so the SSR/no-JS/reduced-motion state is the complete headline
// (screenshot-safe — review-rubric.md §9b: the reveal fires ON MOUNT, never
// gated behind viewport/IntersectionObserver).
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function KineticHeadline({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const spans = el.querySelectorAll<HTMLSpanElement>("[data-word]");
    if (reduceMotion || spans.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spans,
        { autoAlpha: 0, y: "0.6em", rotateZ: 2 },
        {
          autoAlpha: 1,
          y: "0em",
          rotateZ: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          delay: 0.1,
        },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <h1 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <span data-word className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </h1>
  );
}
