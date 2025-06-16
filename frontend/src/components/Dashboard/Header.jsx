import React, { useRef, useState } from 'react';
import {
    Search, Bell, ChevronDown, User, Settings, CreditCard,
    Shield, Sun, Moon, HelpCircle, LogOut, Menu, X,
    User2
} from 'lucide-react';

import site_logo from "../../assets/site_logo.png"
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode"

const Header = ({ sidebarOpen, setSidebarOpen }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const dropdownRef = useRef(null);

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/')
    }

    const userMenuItems = [
        { name: 'My Profile', icon: User, action: () => console.log('Profile clicked') },
        { name: 'Account Settings', icon: Settings, action: () => console.log('Settings clicked') },
        { name: 'Billing & Plans', icon: CreditCard, action: () => console.log('Billing clicked') },
        { name: 'Security', icon: Shield, action: () => console.log('Security clicked') },
        { name: 'Dark Mode', icon: darkMode ? Sun : Moon, action: () => setDarkMode(!darkMode), toggle: true },
        { name: 'Help & Support', icon: HelpCircle, action: () => console.log('Help clicked') },
        { name: 'Logout', icon: LogOut, action: () => handleLogout(), danger: true },
    ];

    const token = localStorage.getItem('token')

    let user = {}

    if (token) {
        try {
            user = jwtDecode(token)
        } catch (error) {
            console.log("Invalid token:", error)
        }
    }

    return (
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center space-x-3 lg:space-x-0">
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    {sidebarOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
                </button>

                <div className={`lg:hidden flex items-center space-x-2 ${sidebarOpen ? 'hidden' : 'flex'}`}>
                    <img
                        src={site_logo}
                        alt="BlueStock Logo"
                        className="h-full w-auto object-contain max-h-12 sm:max-h-16"
                    />
                </div>
            </div>

            {/* Search bar only visible on lg and above */}
            <div className="hidden lg:block flex-1 max-w-xs sm:max-w-sm lg:max-w-lg mx-4 lg:mx-auto">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search"
                        className="block w-full pl-9 lg:pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-2 lg:space-x-4">
                <div className="relative">
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Bell className="h-5 w-5 lg:h-6 lg:w-6 text-gray-500" />
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                    </button>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 lg:space-x-3 p-1 lg:p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-7 h-7 lg:w-8 lg:h-8 bg-orange-400 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium text-xs lg:text-sm">
                                <User2 className='w-5 h-5' />
                            </span>
                        </div>
                        <span className="hidden sm:block text-gray-700 font-medium text-sm lg:text-base">Hi, {user.name}</span>
                        <ChevronDown
                            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
                                        <span className="text-white font-medium">
                                            <User2 className='w-5 h-5' />
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                                        <p className="text-xs text-gray-500">{user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="py-2">
                                {userMenuItems.map((item) => (
                                    <React.Fragment key={item.name}>
                                        {item.danger && <div className="border-t border-gray-100 my-2" />}
                                        <button
                                            onClick={() => {
                                                item.action();
                                                if (!item.toggle) setDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${item.danger
                                                ? 'text-red-600 hover:bg-red-50'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="flex items-center space-x-3">
                                                <item.icon className="h-4 w-4" />
                                                <span className="font-medium">{item.name}</span>
                                            </div>
                                            {item.toggle && (
                                                <div className={`w-8 h-4 rounded-full transition-colors ${darkMode ? 'bg-primary-600' : 'bg-gray-300'
                                                    }`}>
                                                    <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-200 mt-0.5 ${darkMode ? 'translate-x-4 ml-0.5' : 'translate-x-0.5'
                                                        }`} />
                                                </div>
                                            )}
                                        </button>
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
