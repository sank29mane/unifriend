import { render } from '@testing-library/react';
import TestimonialsSection from '@/app/components/TestimonialsSection';

test('renders first review', () => {
  const { getByText } = render(<TestimonialsSection />);
  expect(getByText(/Unifriend made my arrival in the UK so smooth!/)).toBeInTheDocument();
});