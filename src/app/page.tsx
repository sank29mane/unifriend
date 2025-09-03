import { TestimonialsSection } from "@/components/TestimonialsSection";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/5">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img src="/unifriend-logo.png" alt="Unifriend Logo" className="w-24 h-24" />
          </div>
          <h1 className="text-5xl font-extrabold text-secondary mb-4">Welcome to Unifriend</h1>
          <p className="mt-4 text-lg text-secondary/80 max-w-2xl mx-auto">
            On-demand helpers for international students — get help with
            airport pickups, BRP collection, bank setup, groceries and more.
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/auth/register?role=student"
              className="px-6 py-3 rounded-md bg-secondary text-white hover:bg-secondary/90 transition shadow-md font-semibold"
            >
              Sign up as Student
            </a>
            <a
              href="/auth/register?role=helper"
              className="px-6 py-3 rounded-md bg-primary text-secondary hover:bg-primary/90 transition shadow-md font-semibold border border-secondary"
            >
              Sign up as Helper
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-lg shadow-lg bg-white border-l-4 border-primary">
          <h3 className="text-xl font-semibold text-secondary">Airport Pickup</h3>
          <p className="mt-2 text-secondary/70">
            Get greeted at the airport or bus station, no matter when you arrive.
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-lg bg-white border-l-4 border-primary">
          <h3 className="text-xl font-semibold text-secondary">Uni Onboarding</h3>
          <p className="mt-2 text-secondary/70">
            Helpers assist with BRP collection, SIM setup, and bank accounts.
          </p>
        </div>
        <div className="p-6 rounded-lg shadow-lg bg-white border-l-4 border-primary">
          <h3 className="text-xl font-semibold text-secondary">First Groceries</h3>
          <p className="mt-2 text-secondary/70">
            Don't get lost — go shopping with someone who knows the area.
          </p>
        </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </>
  );
}
