"use client";

import { Shader, ChromaFlow, Swirl } from "shaders/react";
import { CustomCursor } from "@/components/custom-cursor";
import { GrainOverlay } from "@/components/grain-overlay";
import { WorkSection } from "@/components/sections/work-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { MagneticButton } from "@/components/magnetic-button";
import { useRef, useEffect, useState } from "react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const scrollThrottleRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas");
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true);
          return true;
        }
      }
      return false;
    };

    if (checkShaderReady()) return;

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId);
      }
    }, 100);

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500);

    return () => {
      clearInterval(intervalId);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      });
      setCurrentSection(index);
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const touchEndX = e.changedTouches[0].clientX;
      const deltaY = touchStartY.current - touchEndY;
      const deltaX = touchStartX.current - touchEndX;

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      container.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      container.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [currentSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();

        if (!scrollContainerRef.current) return;

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        });

        const sectionWidth = scrollContainerRef.current.offsetWidth;
        const newSection = Math.round(
          scrollContainerRef.current.scrollLeft / sectionWidth,
        );
        if (newSection !== currentSection) {
          setCurrentSection(newSection);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentSection]);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return;

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined;
          return;
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth;
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        const newSection = Math.round(scrollLeft / sectionWidth);

        if (
          newSection !== currentSection &&
          newSection >= 0 &&
          newSection <= 4
        ) {
          setCurrentSection(newSection);
        }

        scrollThrottleRef.current = undefined;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current);
      }
    };
  }, [currentSection]);

  return (
    <main className="relative max-h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#DF5B28" // primary
            colorB="#FF6A00" // neon orange
            speed={2}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />

          <ChromaFlow
            baseColor="#FF3E1F" // electric coral
            upColor="#FFB800" // vibrant golden yellow
            downColor="#FF2EC4" // electric pink
            leftColor="#7A1FA2" // deep vibrant purple
            rightColor="#7A1FA2"
            intensity={2}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <span className="font-sans text-xl tracking-tight text-foreground flex flex-row items-center gap-2">
            Lumin
            <svg
              width="33"
              height="19"
              viewBox="0 0 33 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.1093 18.1557C22.8957 18.1518 24.6083 17.44 25.8691 16.1774L29.9835 12.0571C30.6227 11.4353 31.1315 10.693 31.4805 9.87343C31.8294 9.05384 32.0114 8.17327 32.0159 7.28293C32.0204 6.39259 31.8474 5.51023 31.5068 4.68716C31.1663 3.86409 30.665 3.11673 30.0322 2.48853C29.3993 1.86033 28.6475 1.36382 27.8205 1.02787C26.9935 0.691914 26.1077 0.523224 25.2147 0.531604C24.3217 0.539983 23.4393 0.725264 22.6188 1.07667C21.7982 1.42809 21.0559 1.93862 20.435 2.57858L17.5885 5.42831L9.29646 13.733C8.90821 14.1221 8.42635 14.4054 7.89693 14.5558C7.36751 14.7062 6.80824 14.7187 6.2726 14.5921C5.73695 14.4655 5.24285 14.204 4.83753 13.8326C4.4322 13.4613 4.1292 12.9924 3.95751 12.471L1.06395 14.4168C1.60781 15.2639 2.61256 16.6537 3.4704 17.1829C4.32823 17.7121 5.29431 18.0426 6.29735 18.1498C7.3004 18.257 8.31479 18.1384 9.26569 17.8025C10.2166 17.4667 11.0797 16.9223 11.7914 16.2094L22.9273 5.05325C23.2256 4.75454 23.5799 4.51732 23.9701 4.35512C24.3603 4.19293 24.7787 4.10895 25.2014 4.10797C25.6241 4.10699 26.0429 4.18904 26.4339 4.34942C26.8248 4.50981 27.1802 4.74539 27.4798 5.04272C27.7794 5.34005 28.0174 5.69331 28.1801 6.08232C28.3427 6.47133 28.427 6.88848 28.4279 7.30995C28.4289 7.73142 28.3466 8.14895 28.1857 8.53871C28.0249 8.92847 27.7886 9.28283 27.4903 9.58154L23.3759 13.7018C22.9877 14.0909 22.5058 14.3742 21.9764 14.5246C21.447 14.675 20.8877 14.6875 20.3521 14.5609C19.8164 14.4343 19.3223 14.1728 18.917 13.8014C18.5117 13.4301 18.2087 12.9612 18.037 12.4398L15.4205 15.06C16.031 16.0117 16.8725 16.7943 17.8671 17.3355C18.8616 17.8766 19.9771 18.1588 21.1102 18.1557L21.1093 18.1557Z"
                fill="white"
              />
              <path
                d="M22.6068 4.47033C22.995 4.08122 23.4768 3.79788 24.0061 3.64741C24.5355 3.49694 25.0947 3.48437 25.6304 3.6109C26.166 3.73742 26.6601 3.99882 27.0655 4.37009C27.4708 4.74136 27.7739 5.2101 27.9457 5.73149L30.5622 3.11126C30.0183 2.2644 29.2906 1.5501 28.4328 1.02106C27.575 0.492013 26.609 0.161731 25.6061 0.0545741C24.6031 -0.0525828 23.5889 0.0661212 22.6381 0.401927C21.6873 0.737733 20.8243 1.28207 20.1127 1.99479L8.97414 13.1492C8.37195 13.7523 7.55414 14.0921 6.70063 14.094C5.84711 14.0959 5.02781 13.7597 4.42295 13.1593C3.81809 12.5589 3.47722 11.7436 3.47533 10.8927C3.47345 10.0417 3.81069 9.22486 4.41289 8.62182L8.52818 4.50155C8.91633 4.11242 9.39813 3.82909 9.92749 3.67866C10.4569 3.52823 11.0161 3.51573 11.5517 3.64236C12.0873 3.76898 12.5813 4.0305 12.9866 4.40189C13.3918 4.77329 13.6947 5.24213 13.8662 5.76359L16.4827 3.14248C15.9389 2.29555 15.2112 1.58118 14.3535 1.05205C13.4957 0.522928 12.5297 0.192559 11.5268 0.0853172C10.5239 -0.0219242 9.5096 0.0966978 8.55879 0.432434C7.60799 0.768171 6.74491 1.31245 6.03325 2.02513L1.91884 6.14627C0.688162 7.41477 0.00758786 9.11515 0.0242234 10.8799C0.040859 12.6446 0.753366 14.3319 2.00774 15.5771C3.26211 16.8223 4.95759 17.5253 6.72769 17.5342C8.4978 17.5432 10.2003 16.8572 11.4673 15.6248L22.6068 4.47033Z"
                fill="white"
              />
              <path
                d="M22.6068 4.47033C22.995 4.08122 23.4768 3.79788 24.0061 3.64741C24.5355 3.49694 25.0947 3.48437 25.6304 3.6109C26.166 3.73742 26.6601 3.99882 27.0655 4.37009C27.4708 4.74136 27.7739 5.2101 27.9457 5.73149L30.5622 3.11126C30.0183 2.2644 29.2906 1.5501 28.4328 1.02106C27.575 0.492013 26.609 0.161731 25.6061 0.0545741C24.6031 -0.0525828 23.5889 0.0661212 22.6381 0.401927C21.6873 0.737733 20.8243 1.28207 20.1127 1.99479L8.97414 13.1492C8.37195 13.7523 7.55414 14.0921 6.70063 14.094C5.84711 14.0959 5.02781 13.7597 4.42295 13.1593C3.81809 12.5589 3.47722 11.7436 3.47533 10.8927C3.47345 10.0417 3.81069 9.22486 4.41289 8.62182L8.52818 4.50155C8.91633 4.11242 9.39813 3.82909 9.92749 3.67866C10.4569 3.52823 11.0161 3.51573 11.5517 3.64236C12.0873 3.76898 12.5813 4.0305 12.9866 4.40189C13.3918 4.77329 13.6947 5.24213 13.8662 5.76359L16.4827 3.14248C15.9389 2.29555 15.2112 1.58118 14.3535 1.05205C13.4957 0.522928 12.5297 0.192559 11.5268 0.0853172C10.5239 -0.0219242 9.5096 0.0966978 8.55879 0.432434C7.60799 0.768171 6.74491 1.31245 6.03325 2.02513L1.91884 6.14627C0.688162 7.41477 0.00758786 9.11515 0.0242234 10.8799C0.040859 12.6446 0.753366 14.3319 2.00774 15.5771C3.26211 16.8223 4.95759 17.5253 6.72769 17.5342C8.4978 17.5432 10.2003 16.8572 11.4673 15.6248L22.6068 4.47033Z"
                fill="white"
              />
              <path
                d="M22.6068 4.47033C22.995 4.08122 23.4768 3.79788 24.0061 3.64741C24.5355 3.49694 25.0947 3.48437 25.6304 3.6109C26.166 3.73742 26.6601 3.99882 27.0655 4.37009C27.4708 4.74136 27.7739 5.2101 27.9457 5.73149L30.5622 3.11126C30.0183 2.2644 29.2906 1.5501 28.4328 1.02105C27.575 0.492012 26.609 0.16173 25.6061 0.0545729C24.6031 -0.052584 23.5889 0.0661195 22.6381 0.401925C21.6873 0.737731 20.8243 1.28207 20.1127 1.99479L8.97414 13.1492C8.37195 13.7523 7.55414 14.0921 6.70063 14.094C5.84711 14.0959 5.02781 13.7597 4.42295 13.1593C3.81809 12.5589 3.47722 11.7436 3.47533 10.8927C3.47345 10.0417 3.81069 9.22486 4.41289 8.62181L8.52818 4.50155C8.91633 4.11242 9.39813 3.82909 9.9275 3.67866C10.4569 3.52823 11.0161 3.51573 11.5517 3.64235C12.0873 3.76898 12.5813 4.0305 12.9866 4.40189C13.3918 4.77328 13.6947 5.24213 13.8662 5.76359L16.4827 3.14248C15.9389 2.29555 15.2112 1.58118 14.3535 1.05205C13.4957 0.522927 12.5297 0.192557 11.5268 0.0853158C10.5239 -0.0219257 9.5096 0.0966968 8.5588 0.432433C7.60799 0.76817 6.74491 1.31245 6.03325 2.02513L1.91884 6.14627C0.688165 7.41477 0.00758949 9.11515 0.024225 10.8799C0.0408606 12.6446 0.753366 14.3319 2.00774 15.5771C3.26211 16.8223 4.95759 17.5253 6.72769 17.5342C8.4978 17.5432 10.2003 16.8572 11.4673 15.6248L22.6068 4.47033Z"
                fill="white"
              />
            </svg>
          </span>
        </button>
        <div className="hidden items-center gap-8 md:flex px-8 py-4 rounded-full bg-foreground/10">
          {["Home", "Work", "Services", "About", "Contact"].map(
            (item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`group relative font-sans text-sm font-medium transition-colors ${
                  currentSection === index
                    ? "text-foreground"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                    currentSection === index
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ),
          )}
        </div>
        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Connect
        </MagneticButton>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-foreground/90">
                WebGL Powered Design
              </p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                A Tech
                <br />
                And Creative Agency
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Specializing in crafting unique digital presence that help
                businesses grow and stand out in their industries.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(4)}
              >
                Get in Touch
              </MagneticButton>
              <MagneticButton
                size="lg"
                variant="secondary"
                onClick={() => window.open("https://me.lumin8.in", "_blank")}
              >
                Hire Me
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">
                Scroll to explore
              </p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <ServicesSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}
