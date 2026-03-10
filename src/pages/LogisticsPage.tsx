import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const services = [
  { title: "Freight Management", desc: "Ocean, air, and multimodal freight solutions optimized for cost, speed, and reliability." },
  { title: "Warehousing & Distribution", desc: "Strategic warehouse network across key trade corridors with real-time inventory visibility." },
  { title: "Last-Mile Delivery", desc: "Flexible last-mile solutions tailored for e-commerce, wholesale, and direct-to-consumer models." },
  { title: "Customs & Compliance", desc: "Expert trade compliance, documentation, and customs brokerage for seamless cross-border movement." },
];

const stats = [
  { value: "40+", label: "Countries served" },
  { value: "2M+", label: "Shipments per year" },
  { value: "99.2%", label: "On-time delivery rate" },
  { value: "30%", label: "Average cost savings" },
];

const LogisticsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Logistics
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-light leading-tight mb-8">
            Moving goods across<br />
            <span className="text-primary font-medium">the globe</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Our integrated logistics platform orchestrates every touchpoint — from factory floor to 
            store shelf — delivering visibility, flexibility, and speed at every stage.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p className="text-3xl md:text-4xl font-bold text-primary">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {services.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border-l-2 border-primary/20 pl-6">
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LogisticsPage;
