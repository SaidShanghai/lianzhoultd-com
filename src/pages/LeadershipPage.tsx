import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const leaders = [
  { name: "Said", role: "Chief Executive Officer", bio: "25+ years in global supply chain management. Previously led Asia-Pacific operations for a Fortune 500 retailer." },
  { name: "Marie Lin", role: "Chief Operating Officer", bio: "Expert in supply chain transformation and digital operations. Oversaw the integration of AI across LianZhou's platform." },
  { name: "Linda Zhang", role: "Chief Financial Officer", bio: "Seasoned financial leader with deep expertise in international trade finance and strategic growth planning." },
  { name: "Elena Rodriguez", role: "Chief Sustainability Officer", bio: "Pioneer in sustainable sourcing practices. Leads LianZhou's ESG strategy and carbon-neutral initiatives." },
  { name: "David Park", role: "Chief Technology Officer", bio: "Former tech executive who built and scaled enterprise SaaS platforms. Leads LianZhou's digital transformation." },
  { name: "Aisha Patel", role: "President, Global Sourcing", bio: "Manages relationships with 15,000+ suppliers across 40+ countries. 20 years of sourcing expertise." },
];

const LeadershipPage = () => {
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
            Leadership
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light leading-tight mb-8"
          >
            The team behind<br />
            <span className="text-primary font-medium">the vision</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
          >
            Our leadership team combines decades of supply chain expertise with a passion for 
            innovation, sustainability, and building lasting partnerships.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {leaders.map((l, i) => (
              <motion.div
                key={l.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-background p-8 border border-border"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <span className="text-primary text-xl font-bold">
                    {l.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{l.name}</h3>
                <p className="text-sm text-primary mb-3">{l.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{l.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LeadershipPage;
