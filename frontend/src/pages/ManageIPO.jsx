import React, { useState, useEffect, useCallback } from "react";
import { Eye, Trash2, Edit, X } from "lucide-react";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import useTitle from "../components/Title";
import { getAllIPOs, deleteIPO } from "../api/ipoApi";
import { getCompanyById } from "../api/companyApi";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ipoData, setIpoData] = useState([]);
  const [selectedIPO, setSelectedIPO] = useState(null);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useTitle("Manage IPO");

  const fetchIPOs = useCallback(async () => {
    setLoading(true);
    try {
      const ipos = await getAllIPOs();
      const iposWithCompany = await Promise.all(
        ipos.map(async (ipo) => {
          const company = await getCompanyById(ipo.company_id);
          return {
            ...ipo,
            company: company.company_name,
            statusColor: getStatusColor(ipo.status),
          };
        })
      );
      setIpoData(iposWithCompany);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIPOs();
  }, [fetchIPOs]);

  const getStatusColor = (status) => {
    switch (status) {
      case "UPCOMING": return "bg-orange-100 text-orange-800";
      case "OPEN": return "bg-green-100 text-green-800";
      case "CLOSED": return "bg-gray-100 text-gray-800";
      case "LISTED": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("en-IN") : "-";
  };

  const formatPriceBand = (priceBand) => {
    if (!priceBand) return "-";
    const [min, max] = priceBand.split("-").map((v) => v.trim());
    return `₹${min} - ₹${max}`;
  };

  const formatIssueType = (type) => {
    if (!type) return "-";
    return type.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleDelete = async (ipoId) => {
    try {
      if (window.confirm("Are you sure you want to delete this IPO?")) {
        await deleteIPO(ipoId);
        fetchIPOs();
        setShowMenuModal(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete IPO");
    }
  };

  const openActions = (ipo) => {
    setSelectedIPO(ipo);
    setShowMenuModal(true);
  };

  const closeActions = () => {
    setShowMenuModal(false);
    setSelectedIPO(null);
  };

  const actionMenuItems = [
    { name: "Update", icon: Edit, action: (ipo) => navigate(`/manage-ipo/update/${ipo.ipo_id}`) },
    { name: "View", icon: Eye, action: (ipo) => navigate(`/ipo/${ipo.ipo_id}`) },
    { name: "Delete", icon: Trash2, action: (ipo) => handleDelete(ipo.ipo_id), danger: true },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-2xl font-semibold text-gray-900">Upcoming IPO | Dashboard</h1>
            <a href="/manage-ipo/register-ipo">
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Register New IPO
              </button>
            </a>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-600 animate-pulse">Loading IPOs...</div>
            ) : ipoData.length === 0 ? (
              <div className="p-6 text-center text-gray-600">No IPOs available.</div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="overflow-x-auto hidden sm:block">
                  <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                      <tr>
                        <th className="px-4 py-3 text-left">Company</th>
                        <th className="px-4 py-3 text-left">Price Band</th>
                        <th className="px-4 py-3 text-left">Open</th>
                        <th className="px-4 py-3 text-left">Close</th>
                        <th className="px-4 py-3 text-left">Issue Size</th>
                        <th className="px-4 py-3 text-left">Issue Type</th>
                        <th className="px-4 py-3 text-left">Listing Date</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ipoData.map((ipo) => (
                        <tr key={ipo.ipo_id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-gray-900">{ipo.company}</td>
                          <td className="px-4 py-3">{formatPriceBand(ipo.price_band)}</td>
                          <td className="px-4 py-3">{formatDate(ipo.open_date)}</td>
                          <td className="px-4 py-3">{formatDate(ipo.close_date)}</td>
                          <td className="px-4 py-3">{ipo.issue_size}</td>
                          <td className="px-4 py-3">{formatIssueType(ipo.issue_type)}</td>
                          <td className="px-4 py-3">{formatDate(ipo.listing_date)}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${ipo.statusColor}`}>
                              {ipo.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => openActions(ipo)}
                              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 py-1.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              Actions
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden p-3 space-y-3">
                  {ipoData.map((ipo) => (
                    <div key={ipo.ipo_id} className="border rounded-lg p-3 bg-gray-50 shadow-sm">
                      <div className="font-semibold text-gray-800">{ipo.company}</div>
                      <div className="text-sm text-gray-600">Price Band: {ipo.price_band}</div>
                      <div className="text-sm text-gray-600">Open: {formatDate(ipo.open_date)}</div>
                      <div className="text-sm text-gray-600">Close: {formatDate(ipo.close_date)}</div>
                      <div className="text-sm text-gray-600">Issue Size: {ipo.issue_size}</div>
                      <div className="text-sm text-gray-600">Type: {formatIssueType(ipo.issue_type)}</div>
                      <div className="text-sm text-gray-600">Listing: {formatDate(ipo.listing_date)}</div>
                      <div className={`mt-1 text-xs inline-flex px-2 py-1 rounded-full font-medium ${ipo.statusColor}`}>
                        {ipo.status}
                      </div>
                      <button
                        onClick={() => openActions(ipo)}
                        className="w-full mt-2 flex items-center justify-center border border-gray-300 rounded-md px-3 py-2 text-gray-700 bg-white text-sm font-medium hover:bg-gray-50"
                      >
                        Actions
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      {showMenuModal && selectedIPO && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-5 relative animate-fadeIn">
            <button onClick={closeActions} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Actions for {selectedIPO.company}</h3>
            <div className="space-y-2">
              {actionMenuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    item.action(selectedIPO);
                    closeActions();
                  }}
                  className={`w-full flex items-center px-4 py-2.5 text-sm rounded ${item.danger ? "text-red-600 hover:bg-red-50" : "text-gray-700 hover:bg-gray-100"}`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
