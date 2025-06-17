import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getIPOById } from "../api/ipoAPI";

const IPOCard = ({
    ipo_id,
    companyName,
    logo,
    priceRange,
    openDate,
    closeDate,
    issueSize,
    lotSize,
    listingDate,
    status,
}) => {
    const [downloading, setDownloading] = useState(false);

    const getStatusColor = () => {
        switch (status?.toLowerCase()) {
            case "open":
                return "text-green-600 bg-green-50";
            case "closed":
                return "text-red-600 bg-red-50";
            default:
                return "text-blue-600 bg-blue-50";
        }
    };

    const formattedDate = (date) => {
        if (!date) return "-";
        const parsed = new Date(date);
        return isNaN(parsed.getTime())
            ? "-"
            : parsed.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
    };

    const ipoDetailUrl = `/ipo/${ipo_id}`;

    const handleDownload = async (type) => {
        try {
            setDownloading(true);
            const ipo = await getIPOById(ipo_id);
            const pdfUrl = type === "rhp" ? ipo.rhp_pdf : ipo.drhp_pdf;
            if (pdfUrl) {
                window.open(pdfUrl, "_blank");
            } else {
                alert(`${type.toUpperCase()} PDF not available for this IPO.`);
            }
        } catch (err) {
            console.error(err);
            alert("Error fetching IPO details.");
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg border shadow-md p-5 hover:shadow-lg transition">
            {/* Logo and company name */}
            <div className="flex items-center gap-3 mb-4">
                <img
                    src={logo}
                    alt={`${companyName} logo`}
                    className="w-12 h-12 rounded-md object-contain"
                />
                <div>
                    <Link
                        to={ipoDetailUrl}
                        className="text-base font-semibold text-gray-900 hover:text-blue-600"
                    >
                        {companyName}
                    </Link>
                    <div
                        className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
                    >
                        {status?.charAt(0).toUpperCase() + status?.slice(1)}
                    </div>
                </div>
            </div>

            {/* IPO Details */}
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-800 mb-4">
                <div>
                    <span className="block text-gray-500">Price Band</span>
                    <span>{priceRange}</span>
                </div>
                <div>
                    <span className="block text-gray-500">Open</span>
                    <span>{formattedDate(openDate)}</span>
                </div>
                <div>
                    <span className="block text-gray-500">Close</span>
                    <span>{formattedDate(closeDate)}</span>
                </div>
                <div>
                    <span className="block text-gray-500">Issue Size</span>
                    <span>{issueSize}</span>
                </div>
                <div>
                    <span className="block text-gray-500">Type</span>
                    <span>{lotSize}</span>
                </div>
                <div>
                    <span className="block text-gray-500">Listing</span>
                    <span>{formattedDate(listingDate)}</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
                <button
                    onClick={() => handleDownload("rhp")}
                    disabled={downloading}
                    className={`flex-1 border border-blue-600 text-blue-600 text-center rounded-md py-2 text-sm font-medium hover:bg-blue-700 hover:text-white transition ${downloading && "opacity-50 cursor-not-allowed"
                        }`}
                >
                    RHP
                </button>
                <button
                    onClick={() => handleDownload("drhp")}
                    disabled={downloading}
                    className={`flex-1 bg-red-500 text-white text-center rounded-md py-2 text-sm font-medium hover:bg-red-600 transition ${downloading && "opacity-50 cursor-not-allowed"
                        }`}
                >
                    DRHP
                </button>
            </div>
        </div>
    );
};

IPOCard.propTypes = {
    ipo_id: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    priceRange: PropTypes.string.isRequired,
    openDate: PropTypes.string,
    closeDate: PropTypes.string,
    issueSize: PropTypes.string.isRequired,
    lotSize: PropTypes.string.isRequired,
    listingDate: PropTypes.string,
    status: PropTypes.string.isRequired,
};

export default IPOCard;
