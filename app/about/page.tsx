"use client";

import { motion } from "framer-motion";
import { TextReveal } from "@/components/motion/text-reveal";
import { FadeIn } from "@/components/motion/fade-in";
import { Users, Target, Lightbulb, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="max-w-4xl mx-auto text-center">
          <TextReveal className="text-5xl md:text-6xl font-bold mb-6">
            About Lumin8
          </TextReveal>
          <FadeIn delay={0.3}>
            <p className="text-xl text-muted-foreground">
              We are a tech and creative agency dedicated to building
              exceptional digital experiences.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="w-full h-[400px] rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <Lightbulb className="w-32 h-32 text-primary" />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              At Lumin8, we believe in the power of technology and creativity to
              transform businesses. Our mission is to deliver innovative
              solutions that not only meet but exceed our clients' expectations.
            </p>
            <p className="text-muted-foreground">
              We combine cutting-edge technology with creative design thinking
              to build digital products that are both beautiful and functional.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
              Our Values
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <FadeIn key={value.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            Our Team
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            A diverse group of creative minds and technical experts working
            together to deliver excellence
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <FadeIn key={member.name} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="text-center"
              >
                <div className="w-48 h-48 rounded-full bg-linear-to-br from-primary/20 to-primary/5 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-20 h-20 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>
    </div>
  );
}

const values = [
  {
    title: "Innovation",
    description: "We constantly push boundaries and explore new technologies.",
    icon: Lightbulb,
  },
  {
    title: "Quality",
    description: "Excellence in every line of code and pixel of design.",
    icon: Award,
  },
  {
    title: "Collaboration",
    description: "Working closely with clients to achieve shared goals.",
    icon: Users,
  },
  {
    title: "Focus",
    description: "Dedicated attention to detail and user experience.",
    icon: Target,
  },
];

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in tech and design.",
  },
  {
    name: "Sam Chen",
    role: "Lead Developer",
    bio: "Full-stack expert passionate about clean code.",
  },
  {
    name: "Jordan Brooks",
    role: "Creative Director",
    bio: "Award-winning designer with an eye for detail.",
  },
];
