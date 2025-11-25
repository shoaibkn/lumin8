"use client";

import { useReveal } from "@/hooks/use-reveal";
import {
  PreviewCard,
  PreviewCardTrigger,
  PreviewCardPanel,
} from "@/components/animate-ui/components/base/preview-card";
import Image from "next/image";
import { Check } from "lucide-react";

interface BasePreviewCardDemoProps {
  side?: "top" | "bottom" | "left" | "right";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  followCursor?: boolean | "x" | "y";
}

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3);

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-4 transition-all duration-700 md:mb-16 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Capabilities
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">
            / What we bring to the table
          </p>
        </div>

        <div className="grid gap-2 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
          {[
            {
              title: "Creative Development",
              description:
                "Pushing the boundaries of what's possible on the web",
              direction: "top",
              bulletPoints: [
                "Interactive Web Experiences",
                "Custom Animations & Micro-interactions",
                "Concept Ideation & Prototyping",
                "Creative Problem Solving",
                "Immersive User Journeys",
              ],
            },
            {
              title: "Visual Design",
              description:
                "Crafting memorable experiences through thoughtful aesthetics",
              direction: "right",
              bulletPoints: [
                "Brand Identity & Style Systems",
                "High-Fidelity UI Design",
                "Responsive Layouts",
                "Color Theory & Typography",
                "Design Systems & Component Libraries",
              ],
            },
            {
              title: "Ecommerce Development",
              description:
                "Launch Products and establish a strong online presence",
              direction: "left",
              bulletPoints: [
                "Product Placement",
                "Ecommerce Strategy",
                "Brand SEO",
                "Customer Engagement",
                "Analytics Integration",
                "Payment Gateway Integration",
                "Security Implementation",
              ],
            },
            {
              title: "Infrastructure",
              description:
                "Building scalable infrastructure solutions that perform reliably",
              direction: "bottom",
              bulletPoints: [
                "Firewall and Security",
                "Infrastructure Setup",
                "Infrastructure Maintenance",
              ],
            },
          ].map((service, i) => (
            <ServiceCard
              key={i}
              service={service}
              index={i}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: {
    title: string;
    description: string;
    direction: string;
    bulletPoints: string[];
    imageSrc?: string;
  };
  index: number;
  isVisible: boolean;
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0";
        case "right":
          return "translate-x-16 opacity-0";
        case "top":
          return "-translate-y-16 opacity-0";
        case "bottom":
          return "translate-y-16 opacity-0";
        default:
          return "translate-y-12 opacity-0";
      }
    }
    return "translate-x-0 translate-y-0 opacity-100";
  };

  return (
    <PreviewCard followCursor={true}>
      <PreviewCardTrigger
        render={
          <div
            className={`group transition-all duration-700 ${getRevealClass()}`}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
              <span className="font-mono text-xs text-foreground/60">
                0{index + 1}
              </span>
            </div>
            <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">
              {service.title}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">
              {service.description}
            </p>
          </div>
        }
      />
      <PreviewCardPanel
        side="bottom"
        // sideOffset={sideOffset}
        align="center"
        // alignOffset={alignOffset}
        className="w-80 bg-accent/50 border-none p-0"
      >
        <div className="rounded-lg overflow-hidden">
          {/* Badge */}
          {/*{badge && (
            <div className="px-6 pt-6 pb-0">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-linear-to-r from-primary/10 to-accent/10 text-primary">
                {badge}
              </span>
            </div>
          )}*/}

          {/* Image Section */}
          <div className="relative w-full h-64 overflow-hidden mt-4 mx-6 rounded-lg bg-muted">
            <Image
              src={service.imageSrc || "/placeholder.svg"}
              alt={"Service Image"}
              fill
              className="object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-card-foreground mb-2">
              {service.title}
            </h2>
            <p className="text-sm mb-6 leading-relaxed">{service.description}</p>

            {/* Features List */}
            <div className="space-y-3">
              {service.bulletPoints.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 align-middle"
                >
                  <div className="mt-1 rounded-full p-1 shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-card-foreground text-sm leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            {/*<button className="mt-8 w-full py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-300 bg-gradient-accent text-primary-foreground hover:shadow-lg hover:scale-105">
              Learn More
            </button>*/}
          </div>
        </div>
      </PreviewCardPanel>
    </PreviewCard>
  );
}
