import { Target, Heart, Lightbulb, Shield } from "lucide-react";
import bimaCareer from "@/assets/gallery/bima-sakhi-career.jpeg";

const values = [
  {
    icon: Target,
    title: "Mission Driven",
    description: "Empowering women across India with financial independence and career growth opportunities.",
  },
  {
    icon: Heart,
    title: "Community First",
    description: "Building strong networks of support among women entrepreneurs in every community.",
  },
  {
    icon: Lightbulb,
    title: "Skill Development",
    description: "Comprehensive training programs designed to build confidence and professional expertise.",
  },
  {
    icon: Shield,
    title: "Trusted Partner",
    description: "Backed by India's most trusted insurance organization with decades of excellence.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-medium mb-4">
              About the Program
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your Path to{" "}
              <span className="text-gradient">Financial Freedom</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
              The Bima Sakhi program is a revolutionary initiative designed to empower women 
              by providing them with the tools, training, and support needed to build successful 
              careers in the insurance sector.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Left - Image */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-hero-gradient p-1 shadow-medium">
                <div className="w-full h-full rounded-3xl overflow-hidden">
                  <img
                    src={bimaCareer}
                    alt="Join 50,000+ Successful Women - Bima Sakhi Career"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gold/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10" />
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  What is Bima Sakhi?
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Bima Sakhi is a prestigious program that enables women to become licensed 
                  insurance advisors, providing them with a platform to earn with dignity 
                  while serving their communities. As a Bima Sakhi, you become a trusted 
                  financial advisor, helping families secure their futures.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                  Why Choose This Program?
                </h3>
                <ul className="space-y-3">
                  {[
                    "No prior experience required – we train you completely",
                    "Work from your area – be close to family",
                    "Guaranteed stipend during training period",
                    "Unlimited earning potential based on performance",
                    "Be your own boss with flexible working hours",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-gold" />
                      </span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
