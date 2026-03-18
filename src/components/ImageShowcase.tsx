import bimaCareer from "@/assets/gallery/bima-sakhi-career.jpeg";
import specialRecruitment from "@/assets/gallery/special-recruitment.jpeg";
import buildFuture from "@/assets/gallery/build-future.jpeg";
import bimaDetails from "@/assets/gallery/bima-sakhi-details.jpeg";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const showcaseImages = [
  { src: bimaCareer, alt: "Bima Sakhi Career Opportunity - Earn ₹7,000/month stipend with commission" },
  { src: specialRecruitment, alt: "Special Recruitment Campaign - Join LIC as Woman Career Agent" },
  { src: buildFuture, alt: "Build Your Own Future with LIC Bima Sakhi program" },
  { src: bimaDetails, alt: "Bima Sakhi Mahila Career Agent Yojana - Complete details" },
];

export function ImageShowcase() {
  return (
    <section id="showcase" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-4">
              Opportunities
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your <span className="text-gradient">Career Awaits</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the exciting career opportunities available through the Bima Sakhi program
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {showcaseImages.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Gallery CTA */}
          <div className="text-center">
            <Link to="/gallery">
              <Button variant="gold" size="lg">
                View Full Gallery
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
