import { render, screen, waitFor } from '@testing-library/react';
import IPOListing from '../IPOListing';
import { BrowserRouter } from 'react-router-dom';
import { test, expect } from '@jest/globals';

test('renders IPO listing and displays fetched IPOs', async () => {
    render(
        <BrowserRouter>
            <IPOListing />
        </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Search by company name/i)).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
    });
});
