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

    const IPO_LIMIT = 6

    const [ipoData, setIpoData] = useState([]);
    const [filteredIpoData, setFilteredIpoData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [visibleCount, setVisibleCount] = useState(IPO_LIMIT); // default number of IPOs to show

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
                        priceRange: ipo.price_band,
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
        setVisibleCount(IPO_LIMIT); // Reset count whenever search/filter changes
    }, [searchTerm, statusFilter, ipoData]);

    const handleShowMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    const faqData = [
        {
            question: "How to Subscribe to an IPO?",
            answer: `1. Login to your broker's platform.\n2. Go to IPO section.\n3. Select the IPO & enter your bid.\n4. Confirm and submit the application.`,
        },
        {
            question: "Should I buy an IPO on the first day?",
            answer: "It depends on market sentiment, company fundamentals, and risk appetite. Consult financial advisors before investing.",
        },
        {
            question: "What is issue size in IPO?",
            answer: "Issue size refers to the total value of shares offered by the company during the IPO.",
        },
        {
            question: "How many shares are in one lot of an IPO?",
            answer: "Lot size differs by IPO and is mentioned in the prospectus. Usually, it ranges from 10 to 100 shares per lot.",
        },
        {
            question: "Who decides the IPO price band?",
            answer: "The company in consultation with merchant bankers decides the IPO price band for book-building IPOs.",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Upcoming IPOs</h1>
                    <p className="text-gray-600">
                        Find details about all upcoming and ongoing IPOs in one place.
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
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                            {filteredIpoData.slice(0, visibleCount).map((ipo) => (
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
                        {visibleCount < filteredIpoData.length && (
                            <div className="text-center mt-6">
                                <button
                                    onClick={handleShowMore}
                                    className="px-4 py-2 mb-5 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                                >
                                    Show More
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center text-gray-500 py-12">No IPOs found matching your search criteria.</div>
                )}

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
                    <p className="text-gray-600 mb-8">Find answers to common questions about IPOs.</p>
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
