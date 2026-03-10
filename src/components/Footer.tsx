import { Link } from "react-router-dom";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About Lianzhou", href: "/about" },
      { label: "Our Purpose", href: "/purpose" },
      { label: "Leadership", href: "/leadership" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Supply Chain", href: "/#supply-chain" },
      { label: "Logistics", href: "/logistics" },
      { label: "Digital Platform", href: "/#digital" },
      { label: "Sourcing", href: "/sourcing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "ESG Report", href: "/esg" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Investor Relations", href: "/investor-relations" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-foreground text-background py-16 md:py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <span className="text-2xl font-bold tracking-tight text-primary">
              LIANZHOU
            </span>
            <p className="mt-4 text-sm opacity-60 leading-relaxed">
              Creating the supply chain of the future for brands and retailers worldwide.
            </p>
          </div>
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-4 opacity-50">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm opacity-70 hover:opacity-100 hover:text-primary transition-all"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-background/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40">
            © 2024 LianZhou Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs opacity-40 hover:opacity-100 transition-opacity">
              Privacy Policy
            </a>
            <a href="#" className="text-xs opacity-40 hover:opacity-100 transition-opacity">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
