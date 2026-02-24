import { motion } from "framer-motion";
import heroImage from "@/assets/hero-supply-chain.jpg";

const steps = [
  { title: "Retail", description: "The supply chain journey follows the creation and movement of goods around the world. That journey begins and ends with the consumer." },
  { title: "Design", description: "From concept to design brief, the design process translates trends into products that meet the needs of today's demanding consumer." },
  { title: "Sourcing", description: "Finding the right materials and factories that share our commitment to quality, compliance and sustainability." },
  { title: "Production", description: "Merchandisers, designers, quality engineers and product development experts work with factories to ensure products meet requirements." },
  { title: "Logistics", description: "Logistics solutions start from the moment the product leaves the factory to the time it reaches the hands of a happy shopper." },
];

const SupplyChainSection = () => {
  return (
    <section id="supply-chain" className="py-24 md:py-32 bg-secondary">
      <div className="px-6 md:px-12 max-w-6xl mx-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Supply Chain Innovation
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-foreground max-w-4xl text-balance">
            We convene the global supply chain creating customized, end-to-end
            solutions for brands and retailers.
          </p>
        </motion.div>
      </div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="w-full h-[50vh] mb-16 overflow-hidden"
      >
        <img
          src={heroImage}
          alt="Global supply chain logistics"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>

      {/* Supply chain steps */}
      <div className="px-6 md:px-12 max-w-6xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-primary text-xs font-semibold uppercase tracking-widest mb-12"
        >
          Supply Chain Orchestration
        </motion.h3>
        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="text-5xl font-extralight text-primary/20 mb-3">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h4 className="text-lg font-semibold text-foreground mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupplyChainSection;
