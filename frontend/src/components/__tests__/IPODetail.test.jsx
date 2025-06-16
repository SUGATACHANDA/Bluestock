import { render, screen, waitFor } from '@testing-library/react';
import IPODetail from '../../pages/IPODetail';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { test, expect } from '@jest/globals';

test('renders IPODetail and shows company name', async () => {
    render(
        <MemoryRouter initialEntries={['/ipo/1']}>
            <Routes>
                <Route path="/ipo/:id" element={<IPODetail />} />
            </Routes>
        </MemoryRouter>
    );

    await waitFor(() => {
        expect(screen.getByText(/Test Company/i)).toBeInTheDocument();
    });
});
