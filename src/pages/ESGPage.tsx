import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const esgMetrics = [
  { value: "45%", label: "Reduction in carbon emissions since 2019" },
  { value: "78%", label: "Suppliers meeting sustainability standards" },
  { value: "500K+", label: "Workers reached by well-being programs" },
  { value: "100%", label: "Renewable energy in owned facilities" },
];

const priorities = [
  { title: "Climate Action", desc: "Committed to net-zero by 2030. We track Scope 1, 2, and 3 emissions and work with suppliers to reduce their carbon footprint." },
  { title: "Worker Well-being", desc: "Programs for fair wages, safe conditions, and skills development across our supply chain, reaching 500,000+ workers." },
  { title: "Circular Economy", desc: "Driving waste reduction through sustainable materials, recyclable packaging, and closed-loop production systems." },
  { title: "Ethical Governance", desc: "Transparent reporting, anti-corruption policies, and robust compliance frameworks across all operations." },
];

const ESGPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            ESG Report
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-light leading-tight mb-8">
            Sustainability is<br />
            <span className="text-primary font-medium">our business</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            We integrate environmental, social, and governance principles into every decision, 
            from supplier selection to product delivery.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {esgMetrics.map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl md:text-4xl font-bold text-primary">{m.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Strategic Priorities</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {priorities.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border-l-2 border-primary/20 pl-6">
                <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ESGPage;
