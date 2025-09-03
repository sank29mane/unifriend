import { render } from '@testing-library/react';
import TestimonialsSection from '@/components/TestimonialsSection';

test('renders first review', () => {
  const { getByText } = render(<TestimonialsSection />);
  expect(getByText(/Unifriend saved me a ton of time/)).toBeInTheDocument();
});