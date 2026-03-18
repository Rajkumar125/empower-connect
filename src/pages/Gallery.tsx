import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import bimaCareer from "@/assets/gallery/bima-sakhi-career.jpeg";
import specialRecruitment from "@/assets/gallery/special-recruitment.jpeg";
import buildFuture from "@/assets/gallery/build-future.jpeg";
import bimaDetails from "@/assets/gallery/bima-sakhi-details.jpeg";
import mahilaBharti from "@/assets/gallery/mahila-bharti.jpeg";
import mahilaCareerAgent from "@/assets/gallery/mahila-career-agent.jpeg";
import ladiesRecruitment from "@/assets/gallery/ladies-recruitment.jpeg";
import womenEmpowerment from "@/assets/gallery/women-empowerment.jpeg";
import goldenOpportunity from "@/assets/gallery/golden-opportunity.jpeg";

const allImages = [
  { src: bimaCareer, alt: "Bima Sakhi Career Opportunity" },
  { src: specialRecruitment, alt: "Special Recruitment Campaign" },
  { src: buildFuture, alt: "Build Your Own Future" },
  { src: bimaDetails, alt: "Bima Sakhi Details" },
  { src: mahilaBharti, alt: "Mahila Abhikarta Bharti Vishesh Yojana" },
  { src: mahilaCareerAgent, alt: "LIC Mahila Career Agent" },
  { src: ladiesRecruitment, alt: "Lady's Special Recruitment" },
  { src: womenEmpowerment, alt: "Women Empowerment" },
  { src: goldenOpportunity, alt: "Golden Opportunity - Jeevan Bima" },
];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Back + Header */}
            <div className="mb-12">
              <Link to="/">
                <Button variant="ghost" size="sm" className="mb-4">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Campaign <span className="text-gradient">Gallery</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Browse all our Bima Sakhi recruitment campaign materials and resources
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {allImages.map((image, index) => (
                <div
                  key={index}
                  className="break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-medium transition-all duration-300"
                  onClick={() => setLightbox(index)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="p-3 bg-card">
                    <p className="text-sm text-muted-foreground font-medium">{image.alt}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={allImages[lightbox].src}
            alt={allImages[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
