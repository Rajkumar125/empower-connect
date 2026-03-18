import { Play } from "lucide-react";
import { useState } from "react";

export function ImageShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="showcase" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-4">
              Watch & Learn
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Your <span className="text-gradient">Career Awaits</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Watch this video to learn more about the Bima Sakhi program and how it can transform your life
            </p>
          </div>

          {/* Video Player */}
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-medium bg-card">
            {!isPlaying ? (
              <div
                className="relative cursor-pointer group aspect-video bg-primary/5 flex items-center justify-center"
                onClick={() => setIsPlaying(true)}
              >
                <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-foreground ml-1" />
                </div>
                <p className="absolute bottom-6 text-muted-foreground text-sm">Click to play video</p>
              </div>
            ) : (
              <video
                className="w-full aspect-video"
                controls
                autoPlay
                src="/videos/bhimsakhi-video.mp4"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
