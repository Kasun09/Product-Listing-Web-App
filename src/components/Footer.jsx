import React from 'react';
import { ShoppingBag, Facebook, Twitter, Instagram, Linkedin, Mail, ArrowRight, Heart, MapPin, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-blue-200/50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-800 transition-colors duration-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-600 p-1.5 rounded-lg">
                                <ShoppingBag className="h-6 w-6 text-white" />
                            </div>
                            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                                Shop<span className="text-indigo-600">Hub</span>
                            </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Discover the most trending products with premium quality and best prices. Your one-stop shop for everything you need.
                        </p>
                        <div className="flex gap-4">
                            <SocialIcon icon={<Facebook className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
                            <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <FooterLink href="#">Home</FooterLink>
                            <FooterLink href="#">Shop All</FooterLink>
                            <FooterLink href="#">New Arrivals</FooterLink>
                            <FooterLink href="#">Featured</FooterLink>
                            <FooterLink href="#">Electronics</FooterLink>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Customer Care</h3>
                        <ul className="space-y-4">
                            <FooterLink href="#">Contact Us</FooterLink>
                            <FooterLink href="#">FAQ</FooterLink>
                            <FooterLink href="#">Shipping & Returns</FooterLink>
                            <FooterLink href="#">Terms & Conditions</FooterLink>
                            <FooterLink href="#">Privacy Policy</FooterLink>
                        </ul>
                    </div>

                    {/* Newsletter - Distinctive Feature */}
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white mb-6">Stay Updated</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
                            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
                        </p>
                        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center justify-center gap-2">
                                Subscribe
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 dark:text-slate-500 text-sm text-center md:text-left">
                        © {new Date().getFullYear()} ShopHub. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-500">
                        <p className="flex items-center gap-1">
                            Made by Kasun.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Helper Components
const SocialIcon = ({ icon, href }) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-all duration-300"
    >
        {icon}
    </a>
);

const FooterLink = ({ href, children }) => (
    <li>
        <a
            href={href}
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 group"
        >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300"></span>
            {children}
        </a>
    </li>
);

export default Footer;
