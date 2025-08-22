import React from 'react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Unifriend made my arrival in the UK so smooth! From airport pickup to setting up my bank account, they were there every step of the way.",
    author: "Maria S.",
  },
  {
    id: 2,
    text: "As a helper, Unifriend connects me with students who genuinely need assistance. It's a rewarding experience to help new international students settle in.",
    author: "David L.",
  },
  {
    id: 3,
    text: "The first grocery trip was a lifesaver! Navigating a new city and finding specific items was made easy with my Unifriend helper.",
    author: "Chen W.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-primary mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-lg shadow-lg">
              <blockquote
                className="testimonial-text text-gray-600 italic relative px-6 py-2"
              >
                {review.text}
              </blockquote>
              <p className="mt-4 text-gray-800 font-semibold">- {review.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
