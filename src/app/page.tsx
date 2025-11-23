import TestimonialsSection from "@/app/components/TestimonialsSection";
import { LucidePlane, LucideSchool, LucideShoppingBasket, LucideArrowRight } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 -z-10" />
        <div className="container mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center p-2 mb-8 rounded-full bg-white shadow-sm border border-gray-100 animate-fade-in-up">
            <span className="px-3 py-1 text-xs font-semibold tracking-wide uppercase text-secondary bg-secondary/10 rounded-full">New</span>
            <span className="ml-2 text-sm text-gray-600">Trusted by 500+ students</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-secondary mb-6 tracking-tight leading-tight">
            Your Best Friend in a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">New Country</span>
          </h1>

          <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            On-demand helpers for international students. We help you settle in smoothly with airport pickups, BRP collection, bank setup, and more.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/auth/register?role=student"
              className="px-8 py-4 rounded-full bg-secondary text-white hover:bg-secondary-light transition font-semibold shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200 flex items-center justify-center gap-2"
            >
              Find a Helper <LucideArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/auth/register?role=helper"
              className="px-8 py-4 rounded-full bg-white text-secondary hover:bg-gray-50 transition font-semibold shadow-md border border-gray-200 hover:-translate-y-1 transform duration-200"
            >
              Become a Helper
            </a>
          </div>


        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Everything You Need to Settle In</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">We connect you with experienced locals who have been in your shoes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LucidePlane className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Airport Pickup</h3>
              <p className="text-gray-600 leading-relaxed">
                Get greeted at the airport or bus station by a friendly face, no matter when you arrive. Safe and reliable transport to your accommodation.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LucideSchool className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Uni Onboarding</h3>
              <p className="text-gray-600 leading-relaxed">
                Navigating bureaucracy is hard. Helpers assist with BRP collection, SIM card setup, and opening your first UK bank account.
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100">
              <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <LucideShoppingBasket className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">First Groceries</h3>
              <p className="text-gray-600 leading-relaxed">
                Don't get lost in the aisles. Go shopping with someone who knows the best deals and where to find your home comforts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </>
  );
}
