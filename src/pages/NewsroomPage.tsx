import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const news = [
  { date: "Feb 2024", title: "LianZhou Launches AI-Powered Supply Chain Visibility Platform", excerpt: "New platform provides real-time tracking and predictive analytics across the entire supply chain." },
  { date: "Jan 2024", title: "LianZhou Expands Operations in Vietnam and Bangladesh", excerpt: "Three new offices strengthen our presence in key manufacturing hubs across Southeast Asia." },
  { date: "Dec 2023", title: "Annual Sustainability Report Shows 45% Carbon Reduction", excerpt: "Exceeding our interim targets, we continue our journey toward net-zero emissions by 2030." },
  { date: "Nov 2023", title: "Partnership with Leading European Retailer for End-to-End Supply Chain", excerpt: "Multi-year agreement to manage sourcing, logistics, and digital integration for 2,000+ SKUs." },
  { date: "Oct 2023", title: "LianZhou Named Top Supply Chain Innovator by Industry Forum", excerpt: "Recognized for our digital-first approach and commitment to sustainable sourcing practices." },
  { date: "Sep 2023", title: "Worker Well-being Program Reaches 500,000 Workers Milestone", excerpt: "Our investment in training, health, and fair wages continues to scale across supplier factories." },
];

const NewsroomPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.3em] text-primary mb-4">
            Newsroom
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-light leading-tight mb-8">
            Latest from<br />
            <span className="text-primary font-medium">LianZhou</span>
          </motion.h1>
        </div>
      </section>

      <section className="pb-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto divide-y divide-border">
          {news.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="py-8 group cursor-pointer"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{n.date}</p>
              <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
              <p className="text-muted-foreground">{n.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NewsroomPage;
