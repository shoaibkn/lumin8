"use client";

import { useReveal } from "@/hooks/use-reveal";
import {
  PreviewLinkCard,
  PreviewLinkCardTrigger,
  PreviewLinkCardPanel,
  PreviewLinkCardImage,
} from "@/components/animate-ui/components/base/preview-link-card";
import { MagneticButton } from "../magnetic-button";
import { Github, GithubIcon, PersonStanding, User } from "lucide-react";

interface BasePreviewLinkCardDemoProps {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  followCursor?: boolean | "x" | "y";
  href: string;
}

interface BasePreviewCardDemoProps {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  followCursor?: boolean | "x" | "y";
}

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3);

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-16 ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Featured
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / Recent projects
          </p>
        </div>

        <div className="space-y-6 md:space-y-8">
          {[
            {
              number: "01",
              title: "Blabber Social",
              category: "AI Powered Instagram Automations",
              year: "2025",
              direction: "left",
              link: "https://blabber.lumin8.in",
            },
            {
              number: "02",
              title: "AI SEO | lumin8",
              category: "AI Powered SEO platform",
              year: "2025",
              direction: "right",
              link: "https://seo.lumin8.in",
            },
            {
              number: "03",
              title: "Kamabliss Holidays",
              category: "Nextgen Portfolio website for Destination Booking",
              year: "2024",
              direction: "left",
              link: "https://www.kamablissholiday.com/",
            },
          ].map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              index={i}
              isVisible={isVisible}
              //@ts-expect-error linter
              link={project.link}
            />
          ))}
        </div>
        <span className="w-full gap-4 flex justify-end mt-8">
          <MagneticButton>
            <span className="flex flex-row items-center gap-4">
              <Github />
              More Projects
            </span>
          </MagneticButton>
          <MagneticButton variant="secondary">
            <span className="flex flex-row items-center gap-4">
              <User />
              Personal Portfolio
            </span>
          </MagneticButton>
        </span>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isVisible,
}: {
  project: {
    number: string;
    title: string;
    category: string;
    year: string;
    direction: string;
    link: string;
  };
  index: number;
  isVisible: boolean;
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left"
        ? "-translate-x-16 opacity-0"
        : "translate-x-16 opacity-0";
    }
    return "translate-x-0 opacity-100";
  };

  return (
    <PreviewLinkCard href={project.link} followCursor={true}>
      <PreviewLinkCardTrigger target="_blank">
        <div
          className={`group flex items-center justify-between border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()}`}
          style={{
            transitionDelay: `${index * 150}ms`,
            marginLeft: index % 2 === 0 ? "0" : "auto",
            maxWidth: index % 2 === 0 ? "85%" : "90%",
          }}
        >
          <div className="flex items-baseline gap-4 md:gap-8">
            <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
              {project.number}
            </span>
            <div>
              <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
                {project.title}
              </h3>
              <p className="font-mono text-xs text-foreground/50 md:text-sm">
                {project.category}
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-foreground/30 md:text-sm">
            {project.year}
          </span>
        </div>
      </PreviewLinkCardTrigger>
      <PreviewLinkCardPanel
        side="right"
        // sideOffset={sideOffset}
        align="center"
        // alignOffset={alignOffset}
        target="_blank"
      >
        <PreviewLinkCardImage alt="Animate UI Docs" />
      </PreviewLinkCardPanel>
    </PreviewLinkCard>
  );
}
