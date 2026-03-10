import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const openings = [
  { title: "Senior Supply Chain Analyst", location: "Shaoxing", dept: "Operations" },
  { title: "Full Stack Engineer", location: "Singapore", dept: "Technology" },
  
  { title: "Product Manager — Digital Platform", location: "Remote", dept: "Technology" },
  { title: "Regional Sourcing Director", location: "Yiwu", dept: "Sourcing" },
  
];

const perks = [
  "Competitive compensation & equity",
  "Flexible & remote work options",
  "Learning & development budget",
  "Global mobility opportunities",
  "Comprehensive health benefits",
  "Sustainability volunteer days",
];

const CareersPage = () => {
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
            Careers
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light leading-tight mb-8"
          >
            Shape the future of<br />
            <span className="text-primary font-medium">global trade</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Join a team of 8,000+ professionals across 40+ countries. At LianZhou, you'll work 
            on challenges that impact global brands, millions of workers, and the planet.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-8">Why LianZhou</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {perks.map((p, i) => (
              <motion.div
                key={p}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3"
              >
                <span className="w-2 h-2 bg-primary rounded-full shrink-0" />
                <span className="text-muted-foreground">{p}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Open Positions</h2>
          <div className="divide-y divide-border">
            {openings.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-pointer"
              >
                <div>
                  <h3 className="text-lg font-medium group-hover:text-primary transition-colors">{o.title}</h3>
                  <p className="text-sm text-muted-foreground">{o.dept}</p>
                </div>
                <span className="text-sm text-muted-foreground">{o.location}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
