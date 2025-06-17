import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Download, AlertTriangle, ArrowLeft, Loader2,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IPOCard from '../components/IPOCard';
import { getIPOById, getAllIPOs } from '../api/ipoApi';
import { getCompanyById } from '../api/companyApi';


const IPODetail = () => {
    const { id } = useParams();
    const [ipoData, setIpoData] = useState(null);
    const [companyData, setCompanyData] = useState(null);
    const [relatedIPOs, setRelatedIPOs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    const RELATED_IPO_LIMIT = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ipo = await getIPOById(id);
                const company = await getCompanyById(ipo.company_id);
                setIpoData(ipo);
                setCompanyData(company);
                document.title = `${company.company_name} | Bluestock IPO App`;

                const allIPOs = await getAllIPOs();
                const related = await Promise.all(
                    allIPOs
                        .filter((r) => r.ipo_id !== ipo.ipo_id && r.company_id !== ipo.company_id)
                        .slice(0, RELATED_IPO_LIMIT) // 👈 Using limit here
                        .map(async (r) => {
                            try {
                                const relatedCompany = await getCompanyById(r.company_id);
                                return {
                                    ...r,
                                    company_name: relatedCompany?.company_name || "Unnamed Company",
                                    company_logo:
                                        relatedCompany?.company_logo ||
                                        `https://placehold.co/48x48/64748b/FFFFFF?text=${relatedCompany?.company_name?.charAt(0) || "I"}`,
                                };
                            } catch (err) {
                                console.error(`Error fetching company for IPO ${r.ipo_id}`, err);
                                return {
                                    ...r,
                                    company_name: "Unnamed Company",
                                    company_logo: `https://placehold.co/48x48/64748b/FFFFFF?text=?`,
                                };
                            }
                        })
                );

                setRelatedIPOs(related);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'open':
                return 'text-green-600 bg-green-50 border-green-200';
            case 'closed':
                return 'text-red-600 bg-red-50 border-red-200';
            default:
                return 'text-blue-600 bg-blue-50 border-blue-200';
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '-';
        const parsed = new Date(dateStr);
        return isNaN(parsed) ? '-' : parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const parseList = (input) => {
        if (Array.isArray(input)) return input;
        if (typeof input === 'string') return input.split('\n').filter(Boolean);
        return [];
    };

    const formatPriceBand = (priceBand) => {
        if (!priceBand) return '-';
        const parts = priceBand.split('-');
        if (parts.length === 2) {
            return `₹${parts[0].trim()} - ₹${parts[1].trim()}`;
        }
        return `₹${priceBand}`;
    };

    const formatIssueType = (issueType) => {
        return issueType ? issueType.replace(/-/g, ' ').toUpperCase() : '-';
    };

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    if (!ipoData || !companyData) {
        return (
            <div className="h-screen flex justify-center items-center text-red-500">
                Failed to load IPO details.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6">
                    <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to IPO Listings
                    </Link>
                </div>

                {/* Header */}
                <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                            <img src={companyData.company_logo} alt={companyData.company_name} className="w-16 h-16 rounded-lg object-contain" />
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">{companyData.company_name}</h1>
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ipoData.status)}`}>
                                    {ipoData.status}
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2 sm:gap-4 w-full max-w-md lg:max-w-lg">
                            <a href={ipoData.rhp_pdf || '#'} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <button className="w-full border border-blue-600 text-blue-600 px-4 py-2 sm:px-6 sm:py-3 rounded-md font-medium hover:bg-blue-600 hover:text-white transition flex items-center justify-center text-sm sm:text-base shadow-sm hover:shadow-md">
                                    <Download className="w-4 h-4 mr-2" />
                                    <p className='hidden sm:inline mr-2'>Download</p> RHP
                                </button>
                            </a>
                            <a href={ipoData.drhp_pdf || '#'} target="_blank" rel="noopener noreferrer" className="flex-1">
                                <button className="w-full border border-red-500 bg-red-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-medium hover:bg-red-600 transition flex items-center justify-center text-sm sm:text-base shadow-sm hover:shadow-md">
                                    <Download className="w-4 h-4 mr-2" />
                                    <p className='hidden sm:inline mr-2'>Download</p> DRHP
                                </button>
                            </a>
                        </div>




                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-6">Key IPO Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <span className="block text-gray-500 text-sm">Price Band</span>
                                    <span className="font-medium text-lg">{formatPriceBand(ipoData.price_band)}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-sm">Open</span>
                                    <span className="font-medium text-lg">{formatDate(ipoData.open_date)}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-sm">Close</span>
                                    <span className="font-medium text-lg">{formatDate(ipoData.close_date)}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-sm">Issue Size</span>
                                    <span className="font-medium text-lg">{ipoData.issue_size}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-sm">Issue Type</span>
                                    <span className="font-medium text-lg">{formatIssueType(ipoData.issue_type?.replace(/-/g, ' '))}</span>
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-sm">Listing Date</span>
                                    <span className="font-medium text-lg">{formatDate(ipoData.listing_date)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-lg shadow border border-gray-200">
                            <div className="border-b border-gray-200 flex px-6 space-x-6">
                                {['overview', 'financials', 'risks'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`py-4 px-1 border-b-2 text-sm font-medium transition ${activeTab === tab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                                    >
                                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    </button>
                                ))}
                            </div>
                            <div className="p-6">
                                {activeTab === 'overview' && (
                                    <>
                                        <h3 className="text-lg font-semibold mb-3">Company Overview</h3>
                                        <p className="text-gray-600 mb-3">{companyData.companyOverview || 'No overview available.'}</p>

                                        <h3 className="text-lg font-semibold mt-3">Business Description</h3>
                                        <ul className="space-y-2">
                                            {parseList(companyData.businessDescription).map((obj, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                                                    <span className="text-gray-700">{obj}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        <h3 className="text-lg font-semibold mt-3">Objectives</h3>
                                        <ul className="space-y-2">
                                            {parseList(companyData.objectives).map((obj, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                                                    <span className="text-gray-700">{obj}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                                {activeTab === 'financials' && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-6">Financial Highlights</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">{companyData.revenue || '-'}</div>
                                                <div className="text-sm text-gray-500">Revenue</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">{companyData.netProfit || '-'}</div>
                                                <div className="text-sm text-gray-500">Net Profit</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">{companyData.totalAssets || '-'}</div>
                                                <div className="text-sm text-gray-500">Total Assets</div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                                <div className="text-2xl font-bold text-gray-900 mb-1">{companyData.bookValue || '-'}</div>
                                                <div className="text-sm text-gray-500">Book Value</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {activeTab === 'risks' && (
                                    <>
                                        <h3 className="text-lg font-semibold mb-3">Risk Factors</h3>
                                        <ul className="space-y-3">
                                            {parseList(companyData.riskFactors).map((risk, idx) => (
                                                <li key={idx} className="flex items-start p-3 rounded bg-red-50 border border-red-200">
                                                    <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-1" />
                                                    <span className="text-gray-700">{risk}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
                            <div className="space-y-3 text-sm text-gray-800">
                                <div className="flex justify-between"><span>Issue Type</span><span>{formatIssueType(ipoData.issue_type?.replace(/-/g, ' '))}</span></div>
                                <div className="flex justify-between"><span>Min Investment</span><span>{ipoData.min_investment || '-'}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related IPOs */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Related IPOs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {relatedIPOs.map((ipo) => (
                            <IPOCard
                                key={ipo.ipo_id}
                                ipo_id={ipo.ipo_id}
                                companyName={ipo.company_name}
                                logo={ipo.company_logo}
                                priceRange={formatPriceBand(ipo.price_band)}
                                openDate={formatDate(ipo.open_date)}
                                closeDate={formatDate(ipo.close_date)}
                                issueSize={ipo.issue_size}
                                lotSize={ipo.issue_type?.replace(/-/g, ' ')}
                                listingDate={formatDate(ipo.listing_date)}
                                status={ipo.status.toLowerCase()}
                                rhp_pdf={ipo.rhp_pdf}
                                drhp_pdf={ipo.drhp_pdf}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default IPODetail;
