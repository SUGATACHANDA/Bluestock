import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllCompanies } from "../api/companyApi";
import { createIPO } from "../api/ipoAPI";

const IPOInformation = () => {
  const [companies, setCompanies] = useState([]);
  const [rhpFile, setRhpFile] = useState(null);
  const [drhpFile, setDrhpFile] = useState(null);



  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      company_id: "",
      price_band: "",
      open_date: "",
      close_date: "",
      issue_size: "",
      issue_type: "",
      listing_date: "",
      status: "",
      ipo_price: "",
      listing_price: "",
      listing_gain: "",
      current_market_price: "",
      current_return: "",
    },
  });

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getAllCompanies();
        setCompanies(res);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const onSubmit = async (data) => {
    try {
      await createIPO(data, rhpFile, drhpFile);
      alert("IPO created successfully!");
      reset();
      setRhpFile(null);
      setDrhpFile(null);
    } catch (err) {
      console.error(err?.response?.data || err);
      alert(err?.response?.data?.message || "Error creating IPO");
    }
  };

  const LabeledInput = ({ label, name, ...props }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        {...register(name)}
        {...props}
        className="w-full border rounded p-2 text-sm"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <h2 className="text-xl font-semibold text-gray-900">IPO Information</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Company</label>
        <select
          {...register("company_id")}
          className="block w-full p-2 rounded border"
          required
        >
          <option value="">Select Company</option>
          {companies.map((c) => (
            <option key={c.company_id} value={c.company_id}>
              {c.company_name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput label="Price Band (₹125-₹150)" name="price_band" placeholder="Enter Price Band" />
        <LabeledInput label="IPO Opening Date" name="open_date" type="date" />
        <LabeledInput label="IPO Closing Date" name="close_date" type="date" />
        <LabeledInput label="Total Issue Size (e.g., ₹500 Cr)" name="issue_size" placeholder="Enter Issue Size" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type of Issue</label>
          <select {...register("issue_type")} className="w-full p-2 rounded border">
            <option value="">Select Issue Type</option>
            <option value="book-building">Book Building</option>
            <option value="fixed-price">Fixed Price</option>
            <option value="rights-issue">Rights Issue</option>
          </select>
        </div>
        <LabeledInput label="Expected Listing Date" name="listing_date" type="date" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">IPO Status</label>
          <select {...register("status")} className="w-full p-2 rounded border">
            <option value="">Select Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="open">Open</option>
            <option value="closed">Closed</option>
            <option value="listed">Listed</option>
          </select>
        </div>
      </div>

      <h3 className="font-semibold text-lg">Listed IPO Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LabeledInput label="IPO Price (₹)" name="ipo_price" placeholder="Enter IPO Price" />
        <LabeledInput label="Listing Price (₹)" name="listing_price" placeholder="Enter Listing Price" />
        <LabeledInput label="Listing Gain (%)" name="listing_gain" placeholder="e.g., 12.5" />
        <LabeledInput label="Current Market Price (CMP ₹)" name="current_market_price" placeholder="CMP" />
        <LabeledInput label="Current Return (%)" name="current_return" placeholder="e.g., 5.25" />
      </div>

      <h3 className="font-semibold text-lg">Upload IPO Documents (PDF Only)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload RHP PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setRhpFile(e.target.files[0])}
            className="block w-full text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload DRHP PDF</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setDrhpFile(e.target.files[0])}
            className="block w-full text-sm"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        {isSubmitting ? "Saving IPO..." : "Create IPO"}
      </button>
    </form>
  );
};

export default IPOInformation;
