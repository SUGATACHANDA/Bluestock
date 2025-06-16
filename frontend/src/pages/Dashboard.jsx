/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
    TrendingUp,
    ExternalLink,
    LayoutDashboard,
    FileText,
    PieChart,
    Settings,
    Database,
    Users,
    HelpCircle,
    Search,
    Bell,
    ChevronDown,
    User,
    CreditCard,
    Shield,
    LogOut,
    Moon,
    Sun,
    Menu,
    X
} from 'lucide-react';
import Sidebar from '../components/Dashboard/Sidebar';
import Header from '../components/Dashboard/Header';
import useTitle from '../components/Title';

ChartJS.register(ArcElement, Tooltip, Legend);


const Dashboard = () => {

    useTitle("Admin Dashboard")
    const [sidebarOpen, setSidebarOpen] = useState(false); // Changed default to false for mobile-first

    // Donut chart data for Main Board IPO
    const donutData = {
        labels: ['Upcoming', 'New Listed', 'Ongoing'],
        datasets: [
            {
                data: [15, 25, 2],
                backgroundColor: ['#3b82f6', '#60a5fa', '#93c5fd'],
                borderWidth: 0,
                cutout: '70%',
            },
        ],
    };

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
    };

    const quickLinks = [
        { name: 'NSE India', icon: '🏛️', color: 'bg-red-100', url: 'https://nseindia.com' },
        { name: 'BSE India', icon: 'SE', color: 'bg-blue-100', url: 'https://bseindia.com' },
        { name: 'SEBI', icon: '🏛️', color: 'bg-blue-100', url: 'https://sebi.gov.in' },
        { name: 'Money Control', icon: '💰', color: 'bg-blue-100', url: 'https://moneycontrol.com' },
    ];

    // Updated Circular Charts Component with better spacing and layout
    const CircularChartsSection = () => (
        <div className="relative h-72 flex flex-wrap items-center justify-center gap-6">
            {/* Total IPO - Orange Circle */}
            <div className="w-36 h-36 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                    <div className="text-3xl font-bold">30</div>
                    <div className="text-xs font-medium opacity-90">Total IPO</div>
                </div>
            </div>

            {/* IPO in Gain - Cyan Circle */}
            <div className="w-28 h-28 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                    <div className="text-2xl font-bold">20</div>
                    <div className="text-xs font-medium opacity-90">IPO in Gain</div>
                </div>
            </div>

            {/* IPO in Loss - Purple Circle */}
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-center">
                    <div className="text-xl font-bold">9</div>
                    <div className="text-xs font-medium opacity-90">IPO in Loss</div>
                </div>
            </div>
        </div>
    );

    // Enhanced Donut Chart Component
    const DonutChartSection = () => (
        <div className="relative">
            {/* Chart Container */}
            <div className="relative h-32 sm:h-40 lg:h-48 mb-4 lg:mb-6">
                <Doughnut data={donutData} options={donutOptions} />
            </div>

            {/* Chart Legend */}
            <div className="space-y-2 lg:space-y-3">
                {[
                    { label: 'Upcoming', value: 15, color: 'bg-blue-500' },
                    { label: 'New Listed', value: 25, color: 'bg-blue-400' },
                    { label: 'Ongoing', value: 2, color: 'bg-blue-300' }
                ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors">
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 ${item.color} rounded-full shadow-sm`}></div>
                            <span className="text-sm text-gray-600 group-hover:text-gray-800 font-medium">
                                {item.label}
                            </span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-full">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );

    // Enhanced Quick Links Component with better mobile layout
    const QuickLinksSection = () => (
        <div className="space-y-3 lg:space-y-4">
            {quickLinks.map((link, index) => (
                <div key={index} className="group flex items-center justify-between p-3 lg:p-4 rounded-xl hover:bg-gray-50 hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200">
                    <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-1">
                        <div className={`w-8 h-8 lg:w-10 lg:h-10 ${link.color} rounded-full flex items-center justify-center text-xs lg:text-sm font-bold shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0`}>
                            {link.icon}
                        </div>
                        <span className="text-gray-700 font-semibold group-hover:text-gray-900 text-sm lg:text-base truncate">
                            {link.name}
                        </span>
                    </div>
                    <a href={link.url} target='_blank' className="flex items-center text-primary-600 hover:text-primary-700 group-hover:translate-x-1 transition-transform flex-shrink-0">
                        <span className="text-xs lg:text-sm font-medium mr-1 lg:mr-2 hidden sm:inline">Visit Now</span>
                        <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
                    </a>
                </div>
            ))}
        </div>
    );

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main Dashboard Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto">
                    <div className="p-3 sm:p-4 lg:p-6">
                        {/* Dashboard Header */}
                        <div className="mb-6 lg:mb-8">
                            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1 lg:mb-2">Dashboard</h1>
                            <p className="text-sm lg:text-base text-gray-600">Welcome to your IPO analytics dashboard</p>
                        </div>

                        {/* Main Dashboard Grid - Enhanced responsive layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 xl:gap-8">

                            {/* IPO Dashboard India - Circular Charts */}
                            <div className="lg:col-span-2 xl:col-span-1 bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="mb-4 lg:mb-6">
                                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3">IPO Dashboard India</h2>
                                    <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                                        <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
                                        <span className="text-xs lg:text-sm font-semibold">20 IPO in Gain</span>
                                    </div>
                                </div>

                                <CircularChartsSection />
                            </div>

                            {/* Quick Links */}
                            <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="mb-4 lg:mb-6">
                                    <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-1 lg:mb-2">Quick Links</h2>
                                    <p className="text-xs lg:text-sm text-gray-500">Access important financial platforms</p>
                                </div>

                                <QuickLinksSection />
                            </div>

                            {/* Main Board IPO - Donut Chart */}
                            <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                                <div className="flex items-center justify-between mb-4 lg:mb-6">
                                    <div>
                                        <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-1">Main Board IPO</h2>
                                        <p className="text-xs lg:text-sm text-gray-500">From 01 Jan 2024</p>
                                    </div>
                                    <button className="bg-primary-50 text-primary-600 hover:bg-primary-100 hover:text-primary-700 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-xs lg:text-sm font-semibold transition-colors duration-200">
                                        View Report
                                    </button>
                                </div>

                                <DonutChartSection />
                            </div>
                        </div>

                        {/* Additional Stats Row - Enhanced responsive grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-6 lg:mt-8">
                            {[
                                { label: 'Active IPOs', value: '42', change: '+12%', positive: true },
                                { label: 'Total Investment', value: '₹2.4Cr', change: '+8%', positive: true },
                                { label: 'Success Rate', value: '67%', change: '-3%', positive: false },
                                { label: 'Avg. Returns', value: '24%', change: '+15%', positive: true }
                            ].map((stat, index) => (
                                <div key={index} className="bg-white rounded-xl p-3 lg:p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                                    <div className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                                    <div className="text-xs lg:text-sm text-gray-600 mb-1 lg:mb-2">{stat.label}</div>
                                    <div className={`text-xs font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                                        {stat.change}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;