import React from 'react';
import site_logo from "../assets/site_logo.png"
import {
    Twitter,
    Facebook,
    Youtube,
    Linkedin,
    Instagram,
    Send
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 pt-12 pb-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"> {/* Added sm:grid-cols-2 */}
                    {/* Resources Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Resources</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Trading View</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">NSE Holidays</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">e-Voting CDSL</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">e-Voting NSDL</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Market Timings</a></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">About US</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Community</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Blogs</a></li>
                        </ul>
                    </div>

                    {/* Offerings Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Offerings</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Compare Broker</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Fin Calculators</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">IPO</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">All Brokers</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Products</a></li>
                        </ul>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Links</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Shark Investor</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Mutual Funds</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Sitemap</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Indian Indices</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Bug Bounty Program</a></li>
                        </ul>
                    </div>

                    {/* Policy Column */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-4">Policy</h3>
                        <ul className="space-y-3">
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Refund Policy</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Disclaimer</a></li>
                            <li><a href="#" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">Trust & Security</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section with Social Icons, Company Info, and Disclaimer */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Left Side - Social Icons and Company Info */}
                    <div>
                        {/* Social Media Icons */}
                        <div className="flex space-x-6 mb-8">
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors" aria-label="Twitter">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors" aria-label="Facebook">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors" aria-label="YouTube">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors" aria-label="LinkedIn">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors" aria-label="Instagram">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors" aria-label="Telegram">
                                <Send className="w-5 h-5" />
                            </a>
                        </div>

                        {/* Company Logo and Info */}
                        <div className="mb-8">
                            <div className="flex flex-col items-start mb-4"> {/* Changed items-center to items-start */}
                                <img
                                    src={site_logo}
                                    alt="BlueStock Logo"
                                    className="h-10 w-auto object-contain"
                                    style={{ maxHeight: '40px' }}
                                />
                                <div className="mt-2 flex flex-col items-start"> {/* Changed items-center to items-start */}
                                    <span className="text-base font-semibold text-gray-900 leading-tight">Bluestock Fintech</span>
                                    <span className="text-sm text-gray-600 leading-tight">Pune, Maharashtra</span>
                                    <span className="text-xs text-gray-500 leading-tight">MSME Registration No: UDYAM-MH-01-v0138001</span>
                                </div>
                            </div>
                        </div>

                        {/* Startup India Logo */}
                        <div className="flex items-center">
                            <div className="flex items-center">
                                <span className="text-orange-500 font-bold text-lg">#</span>
                                <span className="font-bold text-orange-500">startup</span>
                                <span className="font-bold text-green-600">india</span>
                                <div className="w-6 h-4 ml-2">
                                    <svg viewBox="0 0 24 16" className="w-full h-full">
                                        <rect x="0" y="0" width="24" height="5.33" fill="#FF9933" />
                                        <rect x="0" y="5.33" width="24" height="5.33" fill="#FFFFFF" />
                                        <rect x="0" y="10.67" width="24" height="5.33" fill="#138808" />
                                        <circle cx="12" cy="8" r="2" fill="#000080" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Disclaimer */}
                    <div>
                        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                            <p>
                                Investment in securities markets are subject to market risks, read all the related documents carefully before investing as prescribed by SEBI. Issued in the interest of the investors.
                            </p>
                            <p>
                                The users can write to{' '}
                                <a href="mailto:hello@bluestock.in" className="text-blue-600 hover:text-blue-700 transition-colors">
                                    hello@bluestock.in
                                </a>{' '}
                                for any app, website related queries. Also you can send IT / Tech related feedback to{' '}
                                <a href="mailto:cto@bluestock.in" className="text-blue-600 hover:text-blue-700 transition-colors">
                                    cto@bluestock.in
                                </a>
                            </p>
                            <p>
                                Disclaimer: We are not a SEBI registered research analyst company. We do not provide any kind of stock recommendations, buy/sell stock tips, or investment and trading advice. All the stock scripts shown in the Bluestock app, website, all social media handles are for educational purposes only.
                            </p>
                            <p>
                                Before making any investment in the financial market, it is advisable to consult with your financial advisor. Remember that stock markets are subject to market risks.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Divider and Copyright */}
                <div className="border-t-2 border-gray-300 pt-6 font-semibold">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-sm text-gray-600">
                            Bluestock Fintech All Rights Reserved.
                        </p>
                        <p className="text-sm text-gray-600">
                            Made with <span className="text-red-500">❤️</span> in Pune, Maharashtra
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;