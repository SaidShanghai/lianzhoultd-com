import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const pillars = [
  {
    title: "Empower Brands",
    desc: "We enable our partners to bring products to market faster, with greater flexibility and lower risk.",
  },
  {
    title: "Elevate Communities",
    desc: "We invest in the well-being and development of workers and communities across our supply chain.",
  },
  {
    title: "Protect the Planet",
    desc: "We drive sustainability through responsible sourcing, waste reduction, and carbon-neutral goals.",
  },
];

const PurposePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-primary mb-4"
          >
            Our Purpose
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light leading-tight mb-8"
          >
            Building supply chains<br />
            <span className="text-primary font-medium">that matter</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Our purpose is to create a more connected, efficient, and sustainable global 
            supply chain — one that delivers value for brands, workers, and the planet.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Our Three Pillars</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-t-2 border-primary pt-6"
              >
                <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Our Commitment</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that business can be a force for good. Every decision we make — from 
              the suppliers we partner with to the technology we build — is guided by our 
              commitment to creating shared value across the entire supply chain ecosystem.
            </p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Looking Forward</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              By 2030, we aim to achieve net-zero emissions across our operations, ensure 
              100% of our tier-1 suppliers meet our sustainability standards, and empower 
              one million workers through training and development programs.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PurposePage;
