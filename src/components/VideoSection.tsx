import { motion } from "framer-motion";

const VideoSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Découvrir Li & Zhou
          </h2>
          <p className="text-2xl md:text-3xl font-light leading-relaxed text-foreground max-w-3xl text-balance">
            Découvrez comment nous transformons la supply chain mondiale.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-video overflow-hidden"
        >
          <iframe
            src="https://player.vimeo.com/video/1167567662?h=&title=0&byline=0&portrait=0"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Li & Zhou video"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
