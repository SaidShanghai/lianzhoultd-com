import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const directionRef = useRef<"forward" | "backward">("forward");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const step = 1 / 30; // ~30fps seek speed

    const onEnded = () => {
      // Video finished playing forward, now seek backward
      video.pause();
      directionRef.current = "backward";
      seekBackward();
    };

    const seekBackward = () => {
      if (!video) return;
      if (video.currentTime <= 0.05) {
        // Reached the start, play forward again
        directionRef.current = "forward";
        video.currentTime = 0;
        video.play();
        return;
      }
      video.currentTime = Math.max(0, video.currentTime - step);
      rafRef.current = requestAnimationFrame(seekBackward);
    };

    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("ended", onEnded);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
