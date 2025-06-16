import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Header from "../components/Dashboard/Header";
import IPOInformation from "../components/IPOInformation";
import IPOInfo from "../components/IPOInfo";
import useTitle from "../components/Title";

const RegisterNewIPO = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ipo-info");
  const [issueType, setIssueType] = useState("");
  const [status, setStatus] = useState("");
  useTitle("Register New IPO")

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Page Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Upcoming IPO Information
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage your IPO Details
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Tabs Sidebar */}
              <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 bg-gray-50">
                <nav className="p-4 space-y-2">
                  <button
                    onClick={() => setActiveTab("ipo-info")}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors duration-200
                      ${activeTab === "ipo-info"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "text-gray-600 hover:bg-white hover:text-gray-900"
                      }
                    `}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 ${activeTab === "ipo-info"
                        ? "bg-indigo-600"
                        : "bg-gray-400"
                        }`}
                    ></div>
                    Company Info
                  </button>
                  <button
                    onClick={() => setActiveTab("ipo-information")}
                    className={`
                      w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg text-left transition-colors duration-200
                      ${activeTab === "ipo-information"
                        ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                        : "text-gray-600 hover:bg-white hover:text-gray-900"
                      }
                    `}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 ${activeTab === "ipo-information"
                        ? "bg-indigo-600"
                        : "bg-gray-400"
                        }`}
                    ></div>
                    IPO Information
                  </button>
                </nav>
              </div>

              {/* Form Content */}
              <div className="flex-1 p-6">

                {activeTab === "ipo-info" && <IPOInfo />}
                {activeTab === "ipo-information" && (
                  <IPOInformation
                    issueType={issueType}
                    setIssueType={setIssueType}
                    setStatus={setStatus}
                    status={status}
                  />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterNewIPO;
