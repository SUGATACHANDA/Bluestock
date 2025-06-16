import React, { useState } from 'react';
import { ChevronDown, ExternalLink, LayoutDashboard, Menu, X } from 'lucide-react';
import site_logo from "../assets/site_logo.png"
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const token = localStorage.getItem('token')

    return (
        <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <div className="flex items-center justify-between h-12">
                    {/* Logo and Brand */}
                    <div className="flex items-center space-x-3 h-full">
                        <img
                            src={site_logo}
                            alt="BlueStock Logo"
                            className="h-full w-auto object-contain"
                            style={{ maxHeight: '100%' }}
                        />
                    </div>

                    {/* Desktop Navigation - Centered */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
                        >
                            IPO
                        </a>
                        <a
                            href="#"
                            className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors"
                        >
                            COMMUNITY
                        </a>
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                                <span>PRODUCTS</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                                <span>BROKERS</span>
                                <ExternalLink className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="relative">
                            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                                <span>LIVE NEWS</span>
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    NEW
                                </span>
                            </button>
                        </div>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Desktop Sign In/Up */}
                        {
                            token ?
                                <>
                                    <div className='hidden md:flex items-center space-x-4'>
                                        <a href="/dashboard">
                                            <button className="bg-blue-600 flex hover:bg-blue-700 text-white font-medium text-sm px-2 py-2 rounded-md transition-colors">
                                                <LayoutDashboard className='w-5 h-5 mr-1' />
                                                Dashboard
                                            </button>
                                        </a>
                                    </div>
                                </> :
                                <>
                                    <div className="hidden md:flex items-center space-x-4">
                                        <button className="text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors">
                                            <a href="/sign-in">
                                                Sign In
                                            </a>
                                        </button>
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md transition-colors">
                                            <a href='/sign-up'  >
                                                Sign Up
                                            </a>
                                        </button>
                                    </div>
                                </>
                        }

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 py-4">
                        <div className="flex flex-col space-y-4">
                            {/* Mobile Navigation Links */}
                            <a
                                href="#"
                                className="text-gray-600 hover:text-gray-900 font-medium text-sm px-2 py-1 transition-colors"
                            >
                                IPO
                            </a>
                            <a
                                href="#"
                                className="text-gray-600 hover:text-gray-900 font-medium text-sm px-2 py-1 transition-colors"
                            >
                                COMMUNITY
                            </a>
                            <button className="flex items-center justify-between text-gray-600 hover:text-gray-900 font-medium text-sm px-2 py-1 transition-colors">
                                <span>PRODUCTS</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>
                            <button className="flex items-center justify-between text-gray-600 hover:text-gray-900 font-medium text-sm px-2 py-1 transition-colors">
                                <span>BROKERS</span>
                                <ExternalLink className="w-4 h-4" />
                            </button>
                            <div className="flex items-center justify-between px-2 py-1">
                                <span className="text-gray-600 font-medium text-sm">LIVE NEWS</span>
                                <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                                    NEW
                                </span>
                            </div>

                            {/* Mobile Sign In/Up */}
                            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-100 md:hidden">
                                {
                                    token ?
                                        <>
                                            <a href="/dashboard">
                                                <button className="bg-blue-600 w-full hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md transition-colors">
                                                    Dashboard
                                                </button>
                                            </a>
                                        </> :
                                        <>
                                            <button className="text-gray-600 hover:text-gray-900 font-medium text-sm text-left px-2 py-1 transition-colors">
                                                <a href="/sign-in">
                                                    Sign In
                                                </a>
                                            </button>
                                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-md transition-colors">
                                                <a href="/sign-up">
                                                    Sign Up
                                                </a>
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header >
    );
};

export default Header;