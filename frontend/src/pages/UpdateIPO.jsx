import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getIPOById, updateIPO } from "../api/ipoApi";
import { getCompanyById } from "../api/companyApi";
import { Loader2 } from "lucide-react";

const UpdateIPO = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const ipo = await getIPOById(id);
                const companyData = await getCompanyById(ipo.company_id);
                setCompany(companyData);

                document.title = `${companyData.company_name} | BlueStock IPO App`;

                reset({
                    company_id: ipo.company_id,
                    price_band: ipo.price_band,
                    open_date: ipo.open_date?.slice(0, 10),
                    close_date: ipo.close_date?.slice(0, 10),
                    issue_size: ipo.issue_size,
                    issue_type: ipo.issue_type,
                    listing_date: ipo.listing_date?.slice(0, 10),
                    status: ipo.status,
                    ipo_price: ipo.ipo_price,
                    listing_price: ipo.listing_price,
                    listing_gain: ipo.listing_gain,
                    current_market_price: ipo.current_market_price,
                    current_return: ipo.current_return,
                });
            } catch (err) {
                console.error(err);
                alert("Failed to fetch IPO data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await updateIPO(id, data);
            alert("IPO updated successfully!");
            navigate("/manage-ipo");
        } catch (err) {
            console.error(err);
            alert("Failed to update IPO");
        }
    };

    const LabeledInput = ({ label, name, ...props }) => (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                {...register(name)}
                {...props}
                className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
        </div>
    );

    return (
        <>
            {!isLoading ? (
                <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-semibold text-gray-900">Update IPO</h2>
                        <button
                            onClick={() => navigate("/manage-ipo")}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            ← Back to Dashboard
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                            <input
                                className="w-full border rounded px-3 py-2 text-sm bg-gray-100"
                                value={company?.company_name || ""}
                                disabled
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <LabeledInput label="Price Band (e.g., ₹125-₹150)" name="price_band" />
                            <LabeledInput label="Open Date" name="open_date" type="date" />
                            <LabeledInput label="Close Date" name="close_date" type="date" />
                            <LabeledInput label="Issue Size" name="issue_size" />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Issue Type</label>
                                <select
                                    {...register("issue_type")}
                                    className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                >
                                    <option value="">Select Issue Type</option>
                                    <option value="book-building">Book Building</option>
                                    <option value="fixed-price">Fixed Price</option>
                                    <option value="rights-issue">Rights Issue</option>
                                </select>
                            </div>
                            <LabeledInput label="Listing Date" name="listing_date" type="date" />
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    {...register("status")}
                                    className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                >
                                    <option value="">Select Status</option>
                                    <option value="UPCOMING">Upcoming</option>
                                    <option value="OPEN">Open</option>
                                    <option value="CLOSED">Closed</option>
                                    <option value="LISTED">Listed</option>
                                </select>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900">Listing Details</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <LabeledInput label="IPO Price (₹)" name="ipo_price" />
                            <LabeledInput label="Listing Price (₹)" name="listing_price" />
                            <LabeledInput label="Listing Gain (%)" name="listing_gain" />
                            <LabeledInput label="Current Market Price (₹)" name="current_market_price" />
                            <LabeledInput label="Current Return (%)" name="current_return" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
                        >
                            {isSubmitting ? "Updating IPO..." : "Update IPO"}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex items-center justify-center h-screen">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                </div>
            )}
        </>
    );
};

export default UpdateIPO;
