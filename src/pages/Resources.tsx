import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is LIC Bima Sakhi?",
    a: "LIC Bima Sakhi is a three-year stipendiary scheme launched by LIC in December 2024 to empower women by training them as insurance agents with monthly stipends and career opportunities.",
  },
  {
    q: "Who can apply for LIC Bima Sakhi?",
    a: "Women aged 18–70 years, with at least a 10th pass qualification, and permanent residency in India are eligible.",
  },
  {
    q: "Are there any restrictions on applicants?",
    a: "Yes. Relatives of LIC employees/agents, retired LIC staff, ex-agents seeking reappointment, and government/PSU employees are not eligible.",
  },
  {
    q: "What is the stipend structure under the scheme?",
    a: "Year 1: ₹7,000/month\nYear 2: ₹6,000/month\nYear 3: ₹5,000/month",
  },
  {
    q: "Is LIC Bima Sakhi a permanent job?",
    a: "No. It is not a salaried job. Participants are trained and then appointed as LIC agents, with opportunities for career growth.",
  },
  {
    q: "What kind of training is provided?",
    a: "Training includes LIC product knowledge, financial literacy, and insurance awareness programs over three years.",
  },
  {
    q: "How can one apply for LIC Bima Sakhi?",
    a: "Applications are accepted online through the LIC portal, followed by IRDAI exam, document verification, and interview at LIC branches.",
  },
  {
    q: "What career opportunities are available after training?",
    a: "After completing the scheme, women can work as LIC agents and may be promoted to Development Officer roles based on performance.",
  },
  {
    q: "What is the main objective of LIC Bima Sakhi?",
    a: "The scheme aims to empower women, increase insurance awareness in rural areas, and support financial inclusion under \u201CViksit Bharat 2047.\u201D",
  },
  {
    q: "How many women does LIC plan to recruit under this scheme?",
    a: "LIC targets 1,00,000 women in the first year, with plans to expand to 2,00,000 in subsequent years.",
  },
];

const terms = [
  { title: "Eligibility", body: "Only women meeting age, education, and residency criteria." },
  { title: "Exclusions", body: "Relatives of LIC staff, government/PSU employees, ex-agents." },
  { title: "Stipend", body: "Paid monthly during training, subject to attendance and performance." },
  { title: "Non-employment clause", body: "Participation does not constitute LIC employment." },
  { title: "Termination", body: "LIC reserves the right to terminate participation for misconduct or non-performance." },
  { title: "Compliance", body: "Participants must comply with IRDAI and LIC regulations." },
];

const privacy = [
  { title: "Data collection", body: "Personal details collected during application." },
  { title: "Data usage", body: "Used only for recruitment, training, and communication." },
  { title: "Data sharing", body: "Shared only with LIC-authorized entities." },
  { title: "Data protection", body: "Secure storage, compliance with Indian data protection laws." },
  { title: "User rights", body: "Right to access, correct, or request deletion of personal data." },
];

const grievance = [
  { title: "Contact", body: "+91 8962295977" },
  { title: "Mail", body: "jameskindo90@gmail.com" },
  { title: "Resolution timeline", body: "Complaints addressed within 30 days." },
];

const sections = [
  { id: "faqs", title: "Frequently Asked Questions (FAQs)", items: faqs.map((f) => ({ title: f.q, body: f.a })) },
  { id: "terms", title: "Terms & Conditions", items: terms },
  { id: "privacy", title: "🔒 Privacy Policy", items: privacy },
  { id: "grievance", title: "📞 Grievance Redressal", items: grievance },
];

const Resources = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
        <div className="mb-10">
          <Link to="/" className="text-sm text-primary hover:underline">
            ← Back to Home
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mt-4">
            Resources
          </h1>
          <p className="text-muted-foreground mt-2">
            Find answers, policies and support information about the LIC Bima Sakhi program.
          </p>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                {section.title}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.items.map((item, idx) => (
                  <AccordionItem key={idx} value={`${section.id}-${idx}`}>
                    <AccordionTrigger className="text-left font-semibold">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground whitespace-pre-line">
                      {item.body}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
