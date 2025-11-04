import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import tech icons
import icon1 from "@/assets/tech-icons/icon-1.png";
import icon2 from "@/assets/tech-icons/icon-2.png";
import icon3 from "@/assets/tech-icons/icon-3.png";
import icon4 from "@/assets/tech-icons/icon-4.png";
import icon5 from "@/assets/tech-icons/icon-5.png";
import icon6 from "@/assets/tech-icons/icon-6.png";
import icon7 from "@/assets/tech-icons/icon-7.png";
import icon8 from "@/assets/tech-icons/icon-8.png";

gsap.registerPlugin(ScrollTrigger);

const techLogos = [
  { src: icon1, alt: "Tech 1", x: "30vw", y: "-50vh", rotate: 3 },
  { src: icon2, alt: "Tech 2", x: "50vw", y: "-20vh", rotate: -5 },
  { src: icon3, alt: "Tech 3", x: "-30vw", y: "-40vh", rotate: 8 },
  { src: icon4, alt: "Tech 4", x: "55vw", y: "30vh", rotate: -3 },
  { src: icon5, alt: "Tech 5", x: "-45vw", y: "25vh", rotate: 5 },
  { src: icon6, alt: "Tech 6", x: "15vw", y: "40vh", rotate: -7 },
  { src: icon7, alt: "Tech 7", x: "-50vw", y: "-35vh", rotate: 4 },
  { src: icon8, alt: "Tech 8", x: "25vw", y: "-15vh", rotate: -6 },
];

const AnimatedIntro = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const oldWayRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const escapeRef = useRef<HTMLDivElement>(null);
  const escapeBgRef = useRef<HTMLDivElement>(null);
  const finalSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=6000", // Increased duration
        scrub: 1,
        pin: true,
      },
    });

    // Fade in the whole section for a smooth transition
    tl.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.inOut" }
    );

    // The old way of working
    tl.fromTo(
      oldWayRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      "+=0.5"
    ).to(oldWayRef.current, { opacity: 0, y: -50, duration: 1 }, "+=2");

    // Escape the clutter background animation
    tl.fromTo(
      escapeRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=.5"
    )
      .fromTo(
        escapeBgRef.current,
        { scale: 0 },
        { scale: 1, duration: 2, ease: "power2.inOut" }
      );

    // Tech logos appear
    tl.fromTo(
      ".tech-chip",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, stagger: 0.2, duration: 1.5 },
      "-1.5"
    );

    // Text inside escape the clutter fades in
    tl.fromTo(
      escapeRef.current?.querySelector("h2"),
      { opacity: 0 },
      { opacity: 1, duration: 1 },
      "-1"
    );

    // Tech logos scale up, rotate, and fade out
    tl.to(
      ".tech-chip",
      {
        scale: 5,
        opacity: 0,
        filter: "blur(20px)",
        stagger: 0.2,
        duration: 2,
        ease: "power2.in",
      },
      "+=2"
    );

    // Transition to final section
    tl.to(escapeRef.current, { opacity: 0, duration: 1 }, "-=1.5").fromTo(
      finalSectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, ease: "power2.out" },
      "-=.5"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-background overflow-hidden rounded-2xl opacity-0">
      <div className="absolute inset-0 w-full h-full">
        {/* The old way of working Section */}
        <div
          ref={oldWayRef}
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 z-30 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-foreground">
            A maneira antiga de trabalhar
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl">
            Pular entre aplicativos, perder o contexto e se afogar em notificações.
            Parece familiar?
          </p>
        </div>

        {/* Escape the Clutter Section (Background) */}
        <div
          ref={escapeRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 z-10"
        >
          <div
            ref={escapeBgRef}
            className="absolute inset-0 origin-center bg-gradient-harmony"
          />
          <h2 className="relative z-10 text-6xl md:text-8xl font-bold text-center px-4 opacity-0">
            <span className="block text-foreground">Fuja da</span>
            <span className="block text-foreground mt-2">desordem</span>
          </h2>
        </div>

        {/* Tech Logos Grid (Foreground) */}
        <div
          ref={logosRef}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          {techLogos.map((logo, index) => (
            <div
              key={index}
              className="tech-chip absolute opacity-0"
              style={{
                transform: `translate(${logo.x}, ${logo.y}) rotate(${logo.rotate}deg)`,
              }}
            >
              <div className="relative bg-white rounded-3xl p-4 shadow-2xl">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-20 h-20 md:w-24 md:h-24 object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Final Section */}
        <div
          ref={finalSectionRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 z-40"
        >
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="text-gradient-chaos">Caos</span>
              {" → "}
              <span className="text-gradient-harmony">Clareza</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              FluiSaúde substitui suas ferramentas dispersas por um espaço de trabalho único e unificado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedIntro;