import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const capabilities = [
  { title: "Product Development", desc: "From concept to production-ready samples, our teams work closely with brands to develop winning products." },
  { title: "Supplier Management", desc: "We vet, onboard, and continuously monitor 15,000+ suppliers to ensure quality and compliance." },
  { title: "Raw Material Sourcing", desc: "Global access to sustainable fabrics, trims, and materials at competitive prices." },
  { title: "Quality Assurance", desc: "Rigorous inspection protocols and real-time quality tracking at every production stage." },
];

const categories = ["Apparel & Fashion", "Footwear", "Home & Living", "Beauty & Personal Care", "Toys & Hardgoods", "Food & Beverage"];

const SourcingPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Sourcing
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-light leading-tight mb-8">
            The right product,<br />
            <span className="text-primary font-medium">from the right source</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Our global sourcing network spans 40+ countries, connecting brands with vetted, 
            sustainable suppliers who deliver quality, speed, and value.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {capabilities.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border-t-2 border-primary pt-6">
                <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-8">Product Categories</h2>
          <div className="flex flex-wrap gap-4">
            {categories.map((c) => (
              <span key={c} className="px-5 py-3 border border-border text-sm hover:border-primary hover:text-primary transition-colors cursor-default">
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SourcingPage;
