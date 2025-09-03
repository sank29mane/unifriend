"use client";

import { useState, useEffect } from "react";

/** ---------- 1. Dummy data (feel free to replace with real reviews) ---------- */
const reviews = [
  {
    id: 1,
    name: "Sofia M.",
    rating: 5,
    text:
      "Unifriend saved me a ton of time. My helper walked me through the campus and helped set up my bank account in minutes!",
  },
  {
    id: 2,
    name: "Liam K.",
    rating: 4,
    text:
      "Great service. The helper was friendly and knew exactly where to pick me up at the airport.",
  },
  {
    id: 3,
    name: "Aya N.",
    rating: 5,
    text:
      "I never would have found a grocery store in the right location without help. Highly recommend!",
  },
];

/** ---------- 2. Star icon helper (same as before) ---------- */
const star = (filled: boolean) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.956a1 1 0 00.95.69h4.154c.969 0 1.371 1.24.588 1.81l-3.366 2.44a1 1 0 00-.364 1.118l1.286 3.956c.3.921-1.002 1.688-1.682 1.118l-3.366-2.44a1 1 0 00-1.176 0l-3.366 2.44c-.68.57-1.982-.197-1.682-1.118l1.286-3.956a1 1 0 00-.364-1.118l-3.366-2.44c-.783-.57-.38-1.81.588-1.81h4.154a1 1 0 00.95-.69l1.286-3.956z" />
  </svg>
);

/** ---------- 3. Component implementation ---------- */
export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const total = reviews.length;

  // Auto‑scroll every 6 s (optional – remove if you prefer static list)
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 6000);
    return () => clearInterval(timer);
  }, [total]);

  const review = reviews[current];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">What our users say</h2>

        <div className="relative mx-auto max-w-xl">
          {/* Card */}
          <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center space-y-4">
            {/* Name */}
            <h3 className="text-xl font-semibold">{review.name}</h3>

            {/* Rating stars */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{star(i < review.rating)}</span>
              ))}
            </div>

            {/* Quote with enhanced styling */}
            <blockquote
              className="testimonial-text text-gray-600 italic relative px-6 py-2"
            >
              {review.text}
            </blockquote>
          </div>

          {/* Navigation dots – optional */}
          <div className="flex justify-center space-x-2 mt-4">
            {reviews.map((r, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === current
                    ? "bg-primary"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
