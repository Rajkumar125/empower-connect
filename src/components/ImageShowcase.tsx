import { Play } from "lucide-react";
import { useRef, useState } from "react";

export function ImageShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (!isPlaying && videoRef.current) {
      setIsPlaying(true);
      videoRef.current.muted = false;
      videoRef.current.play().catch(console.error);
    }
  };

  return (
    <section id="showcase" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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

          <div className="relative rounded-2xl overflow-hidden border border-border shadow-medium bg-card">
            <div className="relative aspect-video">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/videos/bhimsakhi-video.mp4#t=0.5"
                controls={isPlaying}
                muted
                playsInline
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer group"
                  onClick={handlePlay}
                >
                  <div className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 text-foreground ml-1" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
