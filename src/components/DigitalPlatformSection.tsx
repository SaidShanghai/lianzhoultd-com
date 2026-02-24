import { motion } from "framer-motion";

const stats = [
  { value: "40", label: "weeks", subtitle: "Average calendar" },
  { value: "21", label: "weeks", subtitle: "With Li & Fung digital apps" },
];

const DigitalPlatformSection = () => {
  return (
    <section id="digital" className="section-dark py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <h2 className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">
            The LF Digital Platform
          </h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed max-w-4xl text-balance">
            Our goal is to fully digitalize each step of the global supply chain
            so that data can flow seamlessly, providing end-to-end visibility for
            our customers, suppliers and stakeholders.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-primary text-xs font-semibold uppercase tracking-widest mb-8">
            Supply Chain Solutions
          </h3>
          <p className="text-lg font-light leading-relaxed max-w-3xl opacity-80">
            Our supply chain solutions are all about helping our customers and
            suppliers deliver speed, efficiency and profitability. Acting as a
            convener across the supply chain, we have six core tools delivered
            through our materials, 3D design, vendor and production platforms.
          </p>
        </motion.div>

        {/* Speed stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <p className="text-sm uppercase tracking-widest opacity-50 mb-8">
            Enabling speed in the product development cycle
          </p>
          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-2">
                  {stat.subtitle}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-6xl md:text-7xl font-extralight text-primary">
                    {stat.value}
                  </span>
                  <span className="text-xl font-light opacity-60">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DigitalPlatformSection;
