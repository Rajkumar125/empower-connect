import { Wallet, Clock, GraduationCap, TrendingUp, Users, Award } from "lucide-react";
import specialRecruitment from "@/assets/gallery/special-recruitment.jpeg";

const features = [
  {
    icon: Wallet,
    title: "Fixed Monthly Stipend",
    description: "Receive guaranteed income during your initial training and development period.",
  },
  {
    icon: Clock,
    title: "Flexible Working Hours",
    description: "Work at your convenience – perfect for homemakers, students, and professionals.",
  },
  {
    icon: GraduationCap,
    title: "Comprehensive Training",
    description: "Free structured training sessions covering all aspects of insurance advisory.",
  },
  {
    icon: TrendingUp,
    title: "Unlimited Earnings",
    description: "No cap on your income – earn based on your performance and dedication.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Join a supportive network of successful women entrepreneurs across India.",
  },
  {
    icon: Award,
    title: "Recognition & Rewards",
    description: "Earn bonuses, incentives, and recognition for outstanding performance.",
  },
];

const stipendData = [
  { year: "1st Year", monthly: "₹7,000", total: "₹84,000" },
  { year: "2nd Year", monthly: "₹6,000", total: "₹72,000" },
  { year: "3rd Year", monthly: "₹5,000", total: "₹60,000" },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold-dark text-sm font-medium mb-4">
              Program Benefits
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Key <span className="text-gradient">Features</span> & Benefits
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to build a successful career as a Bima Sakhi
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gold/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold-gradient group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-gold-dark group-hover:text-foreground transition-colors" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Stipend Table with Image */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-border shadow-soft">
              <img
                src={specialRecruitment}
                alt="Special Recruitment Campaign - Join LIC"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div>
              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Guaranteed Stipend Structure
                </h3>
                <p className="text-muted-foreground">
                  Receive fixed monthly income for your first 3 years as a Bima Sakhi
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border shadow-medium overflow-hidden">
                <div className="grid grid-cols-3 bg-primary text-primary-foreground font-heading font-semibold text-sm md:text-base">
                  <div className="p-4 md:p-5 text-center border-r border-primary-foreground/20">Year</div>
                  <div className="p-4 md:p-5 text-center border-r border-primary-foreground/20">Monthly Stipend</div>
                  <div className="p-4 md:p-5 text-center">Annual Total</div>
                </div>
                {stipendData.map((row, index) => (
                  <div
                    key={row.year}
                    className={`grid grid-cols-3 text-sm md:text-base ${
                      index !== stipendData.length - 1 ? "border-b border-border" : ""
                    } hover:bg-accent/50 transition-colors`}
                  >
                    <div className="p-4 md:p-5 text-center font-medium text-foreground border-r border-border">{row.year}</div>
                    <div className="p-4 md:p-5 text-center text-foreground border-r border-border">{row.monthly}</div>
                    <div className="p-4 md:p-5 text-center font-semibold text-primary">{row.total}</div>
                  </div>
                ))}
                <div className="grid grid-cols-3 bg-gold/10 text-sm md:text-base font-bold">
                  <div className="p-4 md:p-5 text-center text-foreground border-r border-border col-span-2">
                    Total Guaranteed Stipend (3 Years)
                  </div>
                  <div className="p-4 md:p-5 text-center text-gold-dark text-lg md:text-xl">₹2,16,000</div>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                * Plus unlimited commission earnings from your insurance sales
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
