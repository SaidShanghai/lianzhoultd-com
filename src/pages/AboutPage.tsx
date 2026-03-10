import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const values = [
  { title: "Integrity", desc: "We operate with transparency and accountability in every relationship." },
  { title: "Innovation", desc: "We continuously evolve our processes and technology to stay ahead." },
  { title: "Sustainability", desc: "We are committed to responsible sourcing and environmental stewardship." },
  { title: "Partnership", desc: "We build long-term relationships rooted in trust and mutual growth." },
];

const milestones = [
  { year: "2005", text: "Founded in Hong Kong as a supply chain solutions provider." },
  { year: "2010", text: "Expanded operations across Southeast Asia with 12 new offices." },
  { year: "2015", text: "Launched our digital supply chain platform, connecting 5,000+ suppliers." },
  { year: "2018", text: "Reached $2B in annual sourcing volume across 40+ countries." },
  { year: "2021", text: "Achieved carbon-neutral operations across all owned facilities." },
  { year: "2024", text: "Serving 200+ brands and retailers with AI-powered supply chain orchestration." },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs uppercase tracking-[0.3em] text-primary mb-4"
          >
            About LianZhou
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light leading-tight mb-8"
          >
            Orchestrating the world's<br />
            <span className="text-primary font-medium">supply chains</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            LianZhou is a global supply chain orchestrator. We design, source, and deliver 
            products for the world's leading brands and retailers, connecting them with a 
            network of trusted suppliers across 40+ countries.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-8">Our Story</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <p className="text-lg leading-relaxed text-muted-foreground">
              For nearly two decades, LianZhou has been at the forefront of global trade, 
              helping brands navigate the complexities of multi-country sourcing, production, 
              and logistics. We combine deep industry expertise with cutting-edge technology 
              to deliver agile, end-to-end supply chain solutions.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              From our roots in Hong Kong, we have grown into a global organization with 
              offices in over 15 countries. Our team of 8,000+ professionals works tirelessly 
              to ensure quality, speed, and sustainability in every order we manage.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Key Milestones</h2>
          <div className="space-y-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-8 items-start border-l-2 border-primary/20 pl-8"
              >
                <span className="text-2xl font-bold text-primary min-w-[80px]">{m.year}</span>
                <p className="text-muted-foreground">{m.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
