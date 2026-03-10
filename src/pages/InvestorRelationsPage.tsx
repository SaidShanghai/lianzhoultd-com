import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const commitments = [
  { title: "Transparent Governance", desc: "We uphold the highest standards of corporate governance, ensuring accountability, integrity, and transparency in all our operations." },
  { title: "Sustainable Growth", desc: "Our strategy is focused on long-term, sustainable value creation through disciplined capital allocation and operational excellence." },
  { title: "Stakeholder Engagement", desc: "We maintain an open and proactive dialogue with our shareholders, analysts, and the broader investment community." },
  { title: "Risk Management", desc: "A robust risk management framework underpins our decision-making, protecting value and building resilience across our business." },
];

const InvestorRelationsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Investor Relations
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-light leading-tight mb-8">
            Building trust through<br />
            <span className="text-primary font-medium">transparency</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            At LianZhou, we are committed to maintaining open, transparent, and consistent 
            communication with our investors and the financial community. Our goal is to 
            provide clear insight into our strategy, performance, and long-term vision.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Our Commitments</h2>
          <div className="grid md:grid-cols-2 gap-10">
            {commitments.map((c, i) => (
              <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="border-l-2 border-primary/20 pl-6">
                <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Our Approach</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We believe that strong investor relations are built on trust, consistency, and 
              accessibility. We regularly engage with our shareholders through quarterly updates, 
              annual general meetings, and dedicated investor events.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our leadership team is committed to ensuring that the investment community has a 
              clear understanding of our strategic direction, market positioning, and the 
              initiatives driving our growth.
            </p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Get in Touch</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              For investor inquiries, please reach out to our dedicated Investor Relations team. 
              We welcome questions from current and prospective shareholders, analysts, and 
              members of the financial community.
            </p>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Email:</span> ir@lianzhoultd.com
              </p>
              <p className="text-muted-foreground">
                <span className="font-medium text-foreground">Phone:</span> +86 131 205 78200
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestorRelationsPage;
