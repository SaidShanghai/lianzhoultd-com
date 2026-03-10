import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect, useState } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      // Start fade 1s before end
      if (video.currentTime >= video.duration - 1 && !fading) {
        setFading(true);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
      // Remove fade after a short delay
      setTimeout(() => setFading(false), 600);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [fading]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: fading ? 0 : 1 }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-foreground/40" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight text-primary-foreground"
        >
          Creating the supply chain{" "}
          <span className="font-semibold">of the future</span>
        </motion.h1>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#strategy" className="text-primary-foreground hover:opacity-70 transition-opacity">
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
