import React, { useEffect, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import IPOCard from '../components/IPOCard';
import FAQCard from '../components/FAQCard';
import Footer from '../components/Footer';
import { Search, Loader2 } from 'lucide-react';
import useTitle from '../components/Title';
import { getAllIPOs } from '../api/ipoApi';
import { getCompanyById } from '../api/companyApi';

const IPOListing = () => {
    useTitle("Your Destination for all IPOs");

    const [ipoData, setIpoData] = useState([]);
    const [filteredIpoData, setFilteredIpoData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return isNaN(date.getTime())
            ? "-"
            : new Intl.DateTimeFormat("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }).format(date);
    };

    const formatPriceBand = (priceBand) => {
        if (!priceBand) return "-";
        const [min, max] = priceBand.split("-").map((v) => v.trim());
        return `₹${min} - ₹${max}`;
    };

    const fetchIPOData = useCallback(async () => {
        setIsLoading(true);
        setError('');
        try {
            const ipos = await getAllIPOs();
            const iposWithCompany = await Promise.all(
                ipos.map(async (ipo) => {
                    const company = await getCompanyById(ipo.company_id);
                    return {
                        id: ipo.ipo_id,
                        companyName: company?.company_name || 'Unnamed Company',
                        logo: company?.company_logo || `https://placehold.co/48x48/64748b/FFFFFF?text=${company?.company_name?.charAt(0) || 'I'}`,
                        priceRange: `${ipo.price_band}`,
                        openDate: formatDate(ipo.open_date),
                        closeDate: formatDate(ipo.close_date),
                        issueSize: ipo.issue_size,
                        lotSize: ipo.issue_type?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
                        listingDate: formatDate(ipo.listing_date),
                        status: ipo.status.toLowerCase(),
                    };
                })
            );
            setIpoData(iposWithCompany);
        } catch (err) {
            console.error(err);
            setError('Failed to load IPO data.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchIPOData();
    }, [fetchIPOData]);

    useEffect(() => {
        const filtered = ipoData.filter((ipo) => {
            const nameMatch = ipo.companyName.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'all' || ipo.status === statusFilter;
            return nameMatch && statusMatch;
        });
        setFilteredIpoData(filtered);
    }, [searchTerm, statusFilter, ipoData]);

    const faqData = [
        {
            question: "How to Subscribe to an IPO?",
            answer: `Step 1: Login to your respective service provider.
Step 2: Click on the IPO button.
Step 3: Select the IPO you want to bid and enter the relevant details.
Step 4: Your subscription will be completed once you make the payment or give permission.`
        },
        {
            question: "Should I buy an IPO first day?",
            answer: "It depends on various factors including the company's fundamentals, market conditions, and your investment strategy. It's recommended to do thorough research before making any investment decisions."
        },
        {
            question: "How do you know if an IPO is good?",
            answer: "Evaluate the company's business model, financial health, growth prospects, management quality, and market conditions. Review the prospectus and consider expert opinions."
        },
        {
            question: "How to check IPO start date?",
            answer: "You can check IPO start dates on our platform, company websites, stock exchange websites, or financial news portals. We provide updated information on all upcoming IPOs."
        },
        {
            question: "What is issue size?",
            answer: "Issue size refers to the total amount of money a company aims to raise through its IPO. It's calculated by multiplying the number of shares offered by the price per share."
        },
        {
            question: "How many shares in a lot?",
            answer: "The number of shares in a lot varies for each IPO. This information is specified in the IPO prospectus and is displayed on our platform for each listing."
        },
        {
            question: "How is the lot size calculated?",
            answer: "Lot size is determined by the company and regulatory authorities based on the share price and minimum investment amount requirements set by exchanges."
        },
        {
            question: "Who decides the IPO price band?",
            answer: "The IPO price band is decided by the company in consultation with merchant bankers and book running lead managers based on market conditions and company valuation."
        },
        {
            question: "What is IPO GMP?",
            answer: "IPO GMP (Grey Market Premium) is the premium amount at which IPO shares are traded in the grey market before they are officially listed on stock exchanges."
        },
        {
            question: "How many lots should I apply for IPO?",
            answer: "You can apply for multiple lots based on your investment capacity and risk appetite. However, there are maximum limits set by regulations for retail and institutional investors."
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming IPO</h1>
                    <p className="text-gray-600">
                        Find information on all IPOs that have been filed with the Securities and Exchange Commission and are expected to go public.
                    </p>
                </div>

                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by company name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="w-full sm:w-48">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="block w-full cursor-pointer pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="all">All Status</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                    </div>
                ) : error ? (
                    <div className="text-center text-red-500 py-12">{error}</div>
                ) : filteredIpoData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                        {filteredIpoData.map((ipo) => (
                            <IPOCard
                                key={ipo.id}
                                companyName={ipo.companyName}
                                logo={ipo.logo}
                                priceRange={formatPriceBand(ipo.priceRange)}
                                openDate={ipo.openDate}
                                closeDate={ipo.closeDate}
                                issueSize={ipo.issueSize}
                                lotSize={ipo.lotSize}
                                listingDate={ipo.listingDate}
                                status={ipo.status}
                                ipo_id={ipo.id}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-12">No IPOs found matching your search criteria.</div>
                )}

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions?</h2>
                    <p className="text-gray-600 mb-8">
                        Find answers to common questions that come in your mind related to IPO
                    </p>
                    <div className="w-full">
                        {faqData.map((faq, index) => (
                            <FAQCard
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                isOpen={index === 0}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default IPOListing;
