import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const financials = [
  { label: "Revenue (FY2023)", value: "$3.2B" },
  { label: "Adjusted EBITDA", value: "$410M" },
  { label: "Net Income", value: "$195M" },
  { label: "Dividend Yield", value: "2.8%" },
];

const reports = [
  "Annual Report 2023",
  "Interim Report H1 2024",
  "ESG & Sustainability Report 2023",
  "Corporate Governance Report 2023",
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
            Delivering value<br />
            <span className="text-primary font-medium">for shareholders</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Transparent governance, disciplined capital allocation, and sustainable growth 
            drive long-term value for our shareholders.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-12">Financial Highlights</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {financials.map((f, i) => (
              <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <p className="text-3xl md:text-4xl font-bold text-primary">{f.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{f.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-8">Reports & Filings</h2>
          <div className="divide-y divide-border">
            {reports.map((r) => (
              <a key={r} href="#" className="py-5 flex items-center justify-between group">
                <span className="group-hover:text-primary transition-colors">{r}</span>
                <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">PDF ↓</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 md:px-12 bg-secondary">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Investor Contact</h2>
            <p className="text-muted-foreground">ir@lianzhou.com</p>
            <p className="text-muted-foreground">+852 2300 2300</p>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Stock Information</h2>
            <p className="text-muted-foreground">HKEX: 0494.HK</p>
            <p className="text-muted-foreground">Listed on Hong Kong Stock Exchange</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InvestorRelationsPage;
