import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";

const openings = [
  { title: "Senior Supply Chain Analyst", location: "Shaoxing", dept: "Operations" },
  { title: "Full Stack Engineer", location: "Casablanca", dept: "Technology" },
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
  const [selectedJob, setSelectedJob] = useState<typeof openings[0] | null>(null);

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
                onClick={() => setSelectedJob(o)}
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

      {/* Modal */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
            onClick={() => setSelectedJob(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border p-8 md:p-10 max-w-lg w-full relative"
            >
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>

              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-2">{selectedJob.dept} · {selectedJob.location}</p>
              <h3 className="text-2xl font-light mb-4">{selectedJob.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Interested in this position? Send us your CV and a short introduction — we'd love to hear from you.
              </p>

              <a
                href={`mailto:jobs@lianzhoultd.com?subject=Application — ${selectedJob.title} (${selectedJob.location})`}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                <Mail size={16} />
                jobs@lianzhoultd.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default CareersPage;
