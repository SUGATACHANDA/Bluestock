import React, { useEffect, useMemo, useState } from 'react';
import {
    LayoutDashboard, TrendingUp, FileText, PieChart,
    Settings, Database, Users, HelpCircle, Search
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import site_logo from "../../assets/site_logo.png";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState('');

    // ✅ Stable memoized menu items
    const menuItems = useMemo(() => [
        { name: 'Dashboard', icon: LayoutDashboard, link: "/dashboard" },
        { name: 'Manage IPO', icon: TrendingUp, link: "/manage-ipo" },
        { name: 'IPO Subscription', icon: FileText, link: "/ipo-subscription" },
        { name: 'IPO Allotment', icon: PieChart, link: "/ipo-allotment" },
    ], []);

    const otherItems = useMemo(() => [
        { name: 'Settings', icon: Settings, link: "/settings" },
        { name: 'API Manager', icon: Database, link: "/api-manager" },
        { name: 'Accounts', icon: Users, link: "/accounts" },
        { name: 'Help', icon: HelpCircle, link: "/help" },
    ], []);

    // ✅ No more eslint warning here
    useEffect(() => {
        const allItems = [...menuItems, ...otherItems];
        const current = allItems.find((item) => item.link === location.pathname);
        if (current) setActiveMenu(current.name);
    }, [location.pathname, menuItems, otherItems]);

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
        flex flex-col h-full transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
            >
                <div className="p-4 lg:p-6 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                        <a href="/">
                            <img
                                src={site_logo}
                                alt="BlueStock Logo"
                                className="h-8 w-auto object-contain"
                                style={{ maxHeight: '8%' }}
                            />
                        </a>
                    </div>
                </div>

                {/* Search bar visible ONLY on mobile */}
                <div className="px-3 py-3 lg:hidden border-b border-gray-200">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                </div>

                <div className="flex-1 px-3 lg:px-4 py-4 lg:py-6 overflow-y-auto">
                    {/* MENU */}
                    <div className="mb-6 lg:mb-8">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 lg:mb-4 px-3">MENU</h3>
                        <nav className="space-y-1 lg:space-y-2">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2.5 lg:py-2 rounded-lg text-sm font-medium transition-colors ${isActive || activeMenu === item.name
                                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`
                                    }
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                    <span className="truncate">{item.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* OTHERS */}
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 lg:mb-4 px-3">OTHERS</h3>
                        <nav className="space-y-1 lg:space-y-2">
                            {otherItems.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `flex items-center px-3 py-2.5 lg:py-2 rounded-lg text-sm font-medium transition-colors ${isActive || activeMenu === item.name
                                            ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`
                                    }
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                                    <span className="truncate">{item.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;