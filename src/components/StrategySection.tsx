import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cards = [
  {
    icon: "🌱",
    title: "ESG Strategy",
    description:
      "We responsibly manage our environmental, social and governance performance and work with our customers, suppliers and industry partners to further the sustainability of supply chains.",
  },
  {
    icon: "💡",
    title: "Our Purpose",
    description:
      "At Li & Fung, value has tangible meaning and we strive to deliver value to our stakeholders with each and every interaction. We live by our values of humility, entrepreneurship and family.",
  },
];

const StrategySection = () => {
  return (
    <section id="strategy" className="py-24 md:py-32 px-6 md:px-12 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            Our Strategy
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-foreground max-w-4xl text-balance">
            Our vision is simple but bold – we aspire to create the supply chain
            of the future to help our customers navigate the digital economy.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group border border-border p-8 md:p-10 hover:border-primary transition-colors duration-300 cursor-pointer"
            >
              <span className="text-4xl mb-6 block">{card.icon}</span>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {card.description}
              </p>
              <span className="inline-flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
                Find out more <ArrowRight className="w-4 h-4" />
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StrategySection;
