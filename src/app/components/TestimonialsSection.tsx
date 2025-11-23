import React from 'react';
import { LucideQuote } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Unifriend made my arrival in the UK so smooth! From airport pickup to setting up my bank account, they were there every step of the way.",
    author: "Maria S.",
    role: "Student from Spain"
  },
  {
    id: 2,
    text: "As a helper, Unifriend connects me with students who genuinely need assistance. It's a rewarding experience to help new international students settle in.",
    author: "David L.",
    role: "Helper in London"
  },
  {
    id: 3,
    text: "The first grocery trip was a lifesaver! Navigating a new city and finding specific items was made easy with my Unifriend helper.",
    author: "Chen W.",
    role: "Student from China"
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">What Our Users Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Join thousands of students and helpers building a community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
              <div className="mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary-dark">
                  <LucideQuote className="w-5 h-5 fill-current" />
                </div>
              </div>
              <blockquote className="text-gray-600 italic mb-6 flex-grow leading-relaxed">
                "{review.text}"
              </blockquote>
              <div className="mt-auto flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                  {review.author.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="text-secondary font-bold text-sm">{review.author}</p>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
