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
import PhoneCallbackDialog from "@/components/phone-callback-dialog";
import { Phone } from "lucide-react";

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const scrollThrottleRef = useRef<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

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
      <div className="hidden md:block absolute  right-[calc(20%)] z-10 top-[calc(20%)] opacity-10">
        <svg
          width="920"
          height="796"
          viewBox="0 0 920 796"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M454.528 657.338C493.064 679.907 538.989 686.292 582.166 675.079L723.063 638.49C744.719 633.2 765.096 623.662 783.007 610.429C800.918 597.196 816.007 580.533 827.396 561.409C838.785 542.284 846.247 521.08 849.348 499.028C852.449 476.977 851.128 454.518 845.461 432.958C839.794 411.398 829.893 391.166 816.336 373.44C802.779 355.714 785.835 340.846 766.49 329.701C747.144 318.557 725.783 311.357 703.648 308.522C681.513 305.687 659.046 307.272 637.554 313.185L540.086 338.481L256.116 412.24C242.817 415.699 228.842 415.692 215.529 412.218C202.215 408.744 190.008 401.921 180.073 392.4C170.139 382.879 162.81 370.979 158.787 357.837C154.764 344.696 154.182 330.753 157.097 317.341L70.0794 322.565C71.0537 347.712 75.0745 390.398 86.8445 412.679C98.6145 434.96 115.238 454.331 135.488 469.362C155.738 484.393 179.097 494.701 203.843 499.525C228.589 504.349 254.089 503.567 278.462 497.234L659.864 398.109C670.078 395.455 680.72 394.838 691.184 396.292C701.647 397.746 711.726 401.243 720.847 406.583C729.967 411.923 737.949 419.002 744.337 427.416C750.726 435.829 755.395 445.412 758.08 455.617C760.764 465.823 761.41 476.451 759.981 486.895C758.552 497.34 755.077 507.395 749.753 516.488C744.429 525.58 737.36 533.532 728.951 539.889C720.542 546.246 710.957 550.884 700.744 553.537L559.847 590.126C546.548 593.585 532.573 593.578 519.26 590.104C505.946 586.63 493.739 579.807 483.804 570.286C473.87 560.765 466.541 548.865 462.518 535.723C458.495 522.582 457.913 508.639 460.828 495.227L371.226 518.495C372.309 546.74 380.514 574.274 395.079 598.547C409.643 622.819 430.098 643.044 454.547 657.349L454.528 657.338Z"
            fill="white"
          />
          <path
            d="M660.351 381.484C673.649 378.024 687.623 378.03 700.936 381.502C714.249 384.974 726.457 391.795 736.392 401.314C746.328 410.833 753.658 422.731 757.683 435.871C761.708 449.011 762.293 462.953 759.382 476.365L848.983 453.097C848.004 427.953 841.385 403.335 829.614 381.058C817.842 358.781 801.219 339.415 780.971 324.387C760.722 309.359 737.365 299.054 712.623 294.23C687.88 289.407 662.383 290.19 638.013 296.52L256.576 395.575C235.954 400.93 214.025 397.88 195.612 387.097C177.2 376.313 163.812 358.679 158.395 338.073C152.977 317.467 155.974 295.578 166.725 277.221C177.476 258.864 195.101 245.543 215.723 240.187L356.639 203.609C369.937 200.149 383.91 200.155 397.223 203.627C410.535 207.1 422.742 213.923 432.675 223.443C442.608 232.964 449.936 244.864 453.956 258.005C457.977 271.145 458.557 285.088 455.64 298.498L545.252 275.211C544.276 250.066 537.658 225.447 525.889 203.169C514.119 180.891 497.498 161.523 477.25 146.493C457.003 131.464 433.646 121.156 408.904 116.331C384.161 111.506 358.664 112.287 334.293 118.615L193.386 155.223C150.784 166.945 114.557 194.947 92.5347 233.178C70.5126 271.409 64.4645 316.798 75.6977 359.532C86.931 402.267 114.543 438.916 152.566 461.557C190.589 484.198 235.968 491.013 278.895 480.528L660.351 381.484Z"
            fill="white"
          />
          <path
            d="M660.351 381.484C673.649 378.024 687.623 378.03 700.936 381.502C714.249 384.974 726.457 391.795 736.392 401.314C746.328 410.833 753.658 422.731 757.683 435.871C761.708 449.011 762.293 462.953 759.382 476.365L848.983 453.097C848.004 427.953 841.385 403.335 829.614 381.058C817.842 358.781 801.219 339.415 780.971 324.387C760.722 309.359 737.365 299.054 712.623 294.23C687.88 289.407 662.383 290.19 638.013 296.52L256.576 395.575C235.954 400.93 214.025 397.88 195.612 387.097C177.2 376.313 163.812 358.679 158.395 338.073C152.977 317.467 155.974 295.578 166.725 277.221C177.476 258.864 195.101 245.543 215.723 240.187L356.639 203.609C369.937 200.149 383.91 200.155 397.223 203.627C410.535 207.1 422.742 213.923 432.675 223.443C442.608 232.964 449.936 244.864 453.956 258.005C457.977 271.145 458.557 285.088 455.64 298.498L545.252 275.211C544.276 250.066 537.658 225.447 525.889 203.169C514.119 180.891 497.498 161.523 477.25 146.493C457.003 131.464 433.646 121.156 408.904 116.331C384.161 111.506 358.664 112.287 334.293 118.615L193.386 155.223C150.784 166.945 114.557 194.947 92.5347 233.178C70.5126 271.409 64.4645 316.798 75.6977 359.532C86.931 402.267 114.543 438.916 152.566 461.557C190.589 484.198 235.968 491.013 278.895 480.528L660.351 381.484Z"
            fill="white"
          />
          <path
            d="M660.351 381.484C673.649 378.024 687.623 378.03 700.936 381.502C714.249 384.974 726.457 391.795 736.392 401.314C746.328 410.833 753.658 422.731 757.683 435.871C761.708 449.011 762.293 462.953 759.382 476.365L848.983 453.097C848.004 427.953 841.385 403.335 829.614 381.058C817.842 358.781 801.219 339.415 780.971 324.387C760.722 309.359 737.365 299.053 712.623 294.23C687.88 289.407 662.383 290.19 638.013 296.52L256.576 395.575C235.954 400.93 214.025 397.88 195.612 387.097C177.2 376.313 163.812 358.679 158.395 338.073C152.977 317.467 155.974 295.578 166.725 277.221C177.476 258.864 195.101 245.543 215.723 240.187L356.639 203.609C369.937 200.149 383.91 200.155 397.223 203.627C410.535 207.1 422.742 213.923 432.675 223.443C442.608 232.964 449.936 244.864 453.957 258.005C457.977 271.145 458.557 285.088 455.64 298.498L545.252 275.211C544.276 250.066 537.658 225.447 525.889 203.169C514.119 180.891 497.498 161.523 477.25 146.493C457.003 131.464 433.646 121.156 408.904 116.331C384.161 111.506 358.664 112.287 334.293 118.615L193.386 155.223C150.784 166.945 114.557 194.947 92.5348 233.178C70.5127 271.409 64.4645 316.798 75.6978 359.533C86.931 402.267 114.543 438.916 152.566 461.557C190.589 484.198 235.968 491.013 278.895 480.528L660.351 381.484Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="block md:hidden absolute left-[calc(10%)] z-10 top-[calc(30%)] opacity-10">
        <svg
          width="345"
          height="299"
          viewBox="0 0 345 299"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M170.448 246.502C184.899 254.965 202.121 257.359 218.312 253.155L271.148 239.434C279.27 237.45 286.911 233.873 293.628 228.911C300.344 223.949 306.003 217.7 310.273 210.528C314.544 203.357 317.343 195.405 318.506 187.136C319.669 178.866 319.173 170.444 317.048 162.359C314.923 154.274 311.21 146.687 306.126 140.04C301.042 133.393 294.688 127.817 287.434 123.638C280.179 119.459 272.169 116.759 263.868 115.696C255.568 114.633 247.142 115.227 239.083 117.445L202.532 126.93L96.0435 154.59C91.0563 155.887 85.8159 155.884 80.8233 154.582C75.8307 153.279 71.2528 150.72 67.5275 147.15C63.8021 143.58 61.0537 139.117 59.5452 134.189C58.0367 129.261 57.8184 124.032 58.9112 119.003L26.2798 120.962C26.6452 130.392 28.153 146.399 32.5667 154.755C36.9804 163.11 43.2141 170.374 50.8079 176.011C58.4016 181.647 67.1615 185.513 76.4411 187.322C85.7208 189.131 95.2833 188.837 104.423 186.463L247.449 149.291C251.279 148.296 255.27 148.064 259.194 148.609C263.118 149.155 266.897 150.466 270.317 152.469C273.738 154.471 276.731 157.126 279.126 160.281C281.522 163.436 283.273 167.029 284.28 170.857C285.286 174.684 285.529 178.669 284.993 182.586C284.457 186.502 283.154 190.273 281.157 193.683C279.161 197.093 276.51 200.075 273.357 202.458C270.203 204.842 266.609 206.581 262.779 207.576L209.943 221.297C204.955 222.594 199.715 222.592 194.722 221.289C189.73 219.986 185.152 217.428 181.427 213.857C177.701 210.287 174.953 205.824 173.444 200.896C171.936 195.968 171.717 190.739 172.81 185.71L139.21 194.436C139.616 205.028 142.693 215.353 148.154 224.455C153.616 233.557 161.287 241.142 170.455 246.506L170.448 246.502Z"
            fill="white"
          />
          <path
            d="M247.632 143.057C252.619 141.759 257.859 141.761 262.851 143.063C267.844 144.365 272.421 146.923 276.147 150.493C279.873 154.062 282.622 158.524 284.131 163.452C285.641 168.379 285.86 173.607 284.768 178.637L318.369 169.911C318.002 160.482 315.519 151.251 311.105 142.897C306.691 134.543 300.457 127.281 292.864 121.645C285.271 116.01 276.512 112.145 267.234 110.336C257.955 108.528 248.394 108.821 239.255 111.195L96.216 148.341C88.4828 150.349 80.2593 149.205 73.3546 145.161C66.4499 141.117 61.4296 134.505 59.3981 126.777C57.3666 119.05 58.4903 110.842 62.522 103.958C66.5537 97.0741 73.1631 92.0785 80.8963 90.0703L133.74 76.3536C138.726 75.0557 143.966 75.058 148.959 76.3602C153.951 77.6624 158.528 80.221 162.253 83.7912C165.978 87.3615 168.726 91.8239 170.234 96.7517C171.741 101.68 171.959 106.908 170.865 111.937L204.47 103.204C204.103 93.7749 201.622 84.5428 197.208 76.1885C192.795 67.8343 186.562 60.5712 178.969 54.935C171.376 49.2989 162.617 45.4335 153.339 43.6241C144.061 41.8147 134.499 42.1075 125.36 44.4807L72.5197 58.2087C56.544 62.6043 42.9589 73.1052 34.7006 87.4419C26.4423 101.778 24.1742 118.799 28.3867 134.825C32.5992 150.85 42.9538 164.594 57.2123 173.084C71.4709 181.574 88.488 184.13 104.586 180.198L247.632 143.057Z"
            fill="white"
          />
          <path
            d="M247.632 143.057C252.619 141.759 257.859 141.761 262.851 143.063C267.844 144.365 272.421 146.923 276.147 150.493C279.873 154.062 282.622 158.524 284.131 163.452C285.641 168.379 285.86 173.607 284.768 178.637L318.369 169.911C318.002 160.482 315.519 151.251 311.105 142.897C306.691 134.543 300.457 127.281 292.864 121.645C285.271 116.01 276.512 112.145 267.234 110.336C257.955 108.528 248.394 108.821 239.255 111.195L96.216 148.341C88.4828 150.349 80.2593 149.205 73.3546 145.161C66.4499 141.117 61.4296 134.505 59.3981 126.777C57.3666 119.05 58.4903 110.842 62.522 103.958C66.5537 97.0741 73.1631 92.0785 80.8963 90.0703L133.74 76.3536C138.726 75.0557 143.966 75.058 148.959 76.3602C153.951 77.6624 158.528 80.221 162.253 83.7912C165.978 87.3615 168.726 91.8239 170.234 96.7517C171.741 101.68 171.959 106.908 170.865 111.937L204.47 103.204C204.103 93.7749 201.622 84.5428 197.208 76.1885C192.795 67.8343 186.562 60.5712 178.969 54.935C171.376 49.2989 162.617 45.4335 153.339 43.6241C144.061 41.8147 134.499 42.1075 125.36 44.4807L72.5197 58.2087C56.544 62.6043 42.9589 73.1052 34.7006 87.4419C26.4423 101.778 24.1742 118.799 28.3867 134.825C32.5992 150.85 42.9538 164.594 57.2123 173.084C71.4709 181.574 88.488 184.13 104.586 180.198L247.632 143.057Z"
            fill="white"
          />
          <path
            d="M247.632 143.057C252.619 141.759 257.859 141.761 262.851 143.063C267.844 144.365 272.421 146.923 276.147 150.493C279.873 154.062 282.622 158.524 284.131 163.452C285.641 168.379 285.86 173.607 284.768 178.637L318.369 169.911C318.002 160.482 315.519 151.25 311.105 142.897C306.691 134.543 300.457 127.281 292.864 121.645C285.271 116.01 276.512 112.145 267.234 110.336C257.955 108.528 248.394 108.821 239.255 111.195L96.216 148.341C88.4828 150.349 80.2593 149.205 73.3546 145.161C66.45 141.117 61.4296 134.505 59.3981 126.777C57.3666 119.05 58.4903 110.842 62.522 103.958C66.5537 97.0741 73.1631 92.0785 80.8963 90.0703L133.74 76.3536C138.726 75.0557 143.966 75.058 148.959 76.3602C153.951 77.6624 158.528 80.221 162.253 83.7912C165.978 87.3615 168.726 91.8239 170.234 96.7517C171.742 101.68 171.959 106.908 170.865 111.937L204.47 103.204C204.103 93.7749 201.622 84.5428 197.208 76.1885C192.795 67.8343 186.562 60.5712 178.969 54.935C171.376 49.2989 162.617 45.4335 153.339 43.6241C144.061 41.8147 134.499 42.1075 125.36 44.4807L72.5197 58.2087C56.5441 62.6043 42.9589 73.1053 34.7006 87.4419C26.4423 101.778 24.1743 118.799 28.3867 134.825C32.5992 150.85 42.9538 164.594 57.2123 173.084C71.4709 181.574 88.488 184.13 104.586 180.198L247.632 143.057Z"
            fill="white"
          />
        </svg>
      </div>

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
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 pt-4 pb-0 md:py-6 transition-opacity duration-700 md:px-12 ${
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
        <MagneticButton
          variant="secondary"
          className="hover:bg-white hover:text-accent font-sans"
          onClick={() => scrollToSection(4)}
        >
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
                Next Gen Development Studio
              </p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-6xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                A Tech And
                <br />
                Creative Agency
              </span>
            </h1>
            <p className="mb-8 font-sans max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Specializing in crafting unique digital presence that help
                businesses grow and stand out in their industries.
              </span>
            </p>
            <div className="flex font-sans animate-in fade-in slide-in-from-bottom-4 flex-col gap-2 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                // size="lg"
                variant="primary"
                onClick={() => scrollToSection(4)}
              >
                Get in Touch
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                // size="lg"
                className="disabled:opacity-50"
                onClick={() => setIsOpen(true)}
              >
                <span className="flex flex-row gap-4 w-full justify-center">
                  Or Get a call back
                </span>
              </MagneticButton>
            </div>
            <PhoneCallbackDialog isOpen={isOpen} onOpenChange={setIsOpen} />
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
