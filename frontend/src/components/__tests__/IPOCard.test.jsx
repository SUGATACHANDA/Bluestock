import { render, screen } from '@testing-library/react';
import IPOCard from '../IPOCard';
import { test, expect } from '@jest/globals';

test('displays IPOCard details correctly', () => {
    render(
        <IPOCard
            ipo_id="1"
            companyName="Test Company"
            logo="logo.png"
            priceRange="₹10 - ₹20"
            openDate="01-Jun-2025"
            closeDate="10-Jun-2025"
            issueSize="₹5 Cr"
            lotSize="BOOK BUILT"
            listingDate="15-Jun-2025"
            status="open"
        />
    );

    expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
    expect(screen.getByText(/₹10 - ₹20/)).toBeInTheDocument();
});
