import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect, useCallback } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    // When playing forward and near the end, reverse
    if (video.playbackRate > 0 && video.currentTime >= video.duration - 0.3) {
      video.playbackRate = -1;
    }
    // When playing backward and near the start, go forward
    if (video.playbackRate < 0 && video.currentTime <= 0.3) {
      video.playbackRate = 1;
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
      return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [handleTimeUpdate]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
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
