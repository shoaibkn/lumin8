"use client";

import { Facebook, Github, Instagram, Mail, MapPin } from "lucide-react";
import { useReveal } from "@/hooks/use-reveal";
import { useState, type FormEvent } from "react";
import { MagneticButton } from "@/components/magnetic-button";
import { submitContactForm } from "@/app/actions/contact";
import Link from "next/link";
import { Button } from "../ui/button";

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  async function handleSubmit() {
    setIsSubmitting(true);
    postMessage(null);

    const data = {
      name: formData.name as string,
      email: formData.email as string,
      message: formData.message as string,
    };

    const result = await submitContactForm(data);

    setIsSubmitting(false);
    postMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      // Reset form
      setSubmitSuccess(true);
      const form = document.getElementById("contact-form") as HTMLFormElement;
      form?.reset();
    }
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                Let's
                <br />
                talk
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-base">
                / Get in touch
              </p>
            </div>

            <div className="space-y-4 md:space-y-8">
              <a
                href="mailto:hello@lumin8.in"
                className={`group block transition-all duration-700 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Mail className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">
                    Email
                  </span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-foreground/70 md:text-2xl">
                  hello@lumin8.in
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-foreground/60" />
                  <span className="font-mono text-xs text-foreground/60">
                    Location
                  </span>
                </div>
                <p className="text-base text-foreground md:text-2xl">
                  Agra, IN
                </p>
              </div>

              <div
                className={`flex gap-2 pt-2 transition-all duration-700 md:pt-4 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {/*{["Twitter", "Instagram", "LinkedIn", "Dribbble"].map(
                  (social, i) => (
                    <Link
                      key={social}
                      href="#"
                      className="border-b border-transparent font-mono text-xs text-foreground/60 transition-all hover:border-foreground/60 hover:text-foreground/90"
                    >
                      {social}
                    </Link>
                  ),
                )}*/}
                {/*<Link href={"https://www.twitter.com/shoaibkn"}>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="bg-transparent border-accent-foreground rounded-full"
                  >
                    <Twitter />
                  </Button>
                </Link>*/}
                <Link href={"https://www.instagram.com/lumin8in"}>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="bg-transparent border-accent-foreground rounded-full"
                  >
                    <Instagram />
                  </Button>
                </Link>
                <Link href={"https://www.facebook.com/shoaib.khan.9609"}>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="bg-transparent border-accent-foreground rounded-full"
                  >
                    <Facebook />
                  </Button>
                </Link>
                <Link href={"https://github.com/shoaibkn"}>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="bg-transparent border-accent-foreground rounded-full"
                  >
                    <Github />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Minimal form */}
          <div className="flex flex-col justify-center">
            <form
              id="contact-form"
              action={handleSubmit}
              className="space-y-4 md:space-y-6"
            >
              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder="Your name"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/60 md:mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border-b border-foreground/30 bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:border-foreground/50 focus:outline-none md:py-2 md:text-base"
                  placeholder="Tell us about your project..."
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="w-full disabled:opacity-50"
                  onClick={isSubmitting ? undefined : undefined}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-foreground/80">
                    Message sent successfully!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
