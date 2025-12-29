import { FileText, GraduationCap, Award, Briefcase, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: FileText,
    title: "Submit Application",
    description: "Fill out the application form with your basic details and documents.",
  },
  {
    icon: GraduationCap,
    title: "Complete Training",
    description: "Attend 50+ hours of comprehensive training sessions conducted by experts.",
  },
  {
    icon: Award,
    title: "Pass IRDA Exam",
    description: "Clear the Insurance Regulatory authority examination with our guidance.",
  },
  {
    icon: Briefcase,
    title: "Start Your Journey",
    description: "Receive your license code and begin your career as a Bima Sakhi.",
  },
];

const eligibility = [
  "Age: 18 years and above",
  "Education: Minimum 10th grade pass",
  "Residency: Valid local address proof",
  "Commitment: Willingness to learn and grow",
];

const documents = [
  { name: "Passport-sized photographs", count: "4" },
  { name: "PAN Card", count: "Original + Copy" },
  { name: "Aadhaar Card", count: "Original + Copy" },
  { name: "Educational certificates", count: "10th marksheet" },
  { name: "Bank details", count: "Cancelled cheque/Passbook" },
  { name: "Digital signature", count: "For online registration" },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-primary text-sm font-medium mb-4">
              How to Join
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Simple <span className="text-gradient">4-Step</span> Process
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Your journey to becoming a Bima Sakhi is just four steps away
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative mb-20">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-border" />
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="text-center">
                    {/* Step Number */}
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-hero-gradient flex items-center justify-center shadow-medium mx-auto">
                        <step.icon className="w-10 h-10 text-primary-foreground" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold flex items-center justify-center text-foreground font-bold text-sm shadow-gold">
                        {index + 1}
                      </span>
                    </div>
                    <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility & Documents */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Eligibility */}
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  Eligibility Criteria
                </h3>
              </div>
              <ul className="space-y-4">
                {eligibility.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-gold-dark" />
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            <div className="bg-card rounded-2xl border border-border shadow-soft p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-gold-dark" />
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  Documents Required
                </h3>
              </div>
              <ul className="space-y-3">
                {documents.map((doc, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <span className="text-foreground">{doc.name}</span>
                    <span className="text-sm text-muted-foreground bg-background px-3 py-1 rounded-lg">
                      {doc.count}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fees Section */}
          <div className="mt-12 p-6 md:p-8 bg-hero-gradient rounded-2xl shadow-medium text-center">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground mb-6">
              Registration Fees
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-primary-foreground/70 text-sm mb-1">Registration</p>
                <p className="text-2xl font-bold text-primary-foreground">₹150</p>
              </div>
              <div className="bg-primary-foreground/10 rounded-xl p-4 backdrop-blur-sm">
                <p className="text-primary-foreground/70 text-sm mb-1">IRDA Exam</p>
                <p className="text-2xl font-bold text-primary-foreground">₹500</p>
              </div>
              <div className="bg-gold/20 rounded-xl p-4 backdrop-blur-sm border-2 border-gold">
                <p className="text-primary-foreground/70 text-sm mb-1">Total</p>
                <p className="text-2xl font-bold text-gold">₹650</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm mt-6">
              One-time investment for a lifetime of opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
