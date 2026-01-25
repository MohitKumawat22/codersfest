"use client";
import React, { useState, useEffect } from "react";
import { X, Cookie, Settings } from "lucide-react";

export default function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [preferences, setPreferences] = useState({
        essential: true,
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAcceptAll = () => {
        const allAccepted = {
            essential: true,
            analytics: true,
            marketing: true
        };
        setPreferences(allAccepted);
        localStorage.setItem("cookieConsent", JSON.stringify(allAccepted));
        setShowBanner(false);
    };

    const handleRejectAll = () => {
        const essentialOnly = {
            essential: true,
            analytics: false,
            marketing: false
        };
        setPreferences(essentialOnly);
        localStorage.setItem("cookieConsent", JSON.stringify(essentialOnly));
        setShowBanner(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem("cookieConsent", JSON.stringify(preferences));
        setShowBanner(false);
        setShowSettings(false);
    };

    if (!showBanner) return null;

    return (
        <>
            {/* Cookie Banner */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-gray-200 shadow-2xl">
                <div className="max-w-screen-xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                            <Cookie className="text-[#D4A373] mt-1 flex-shrink-0" size={24} />
                            <div>
                                <h3 className="font-bold text-[#33211D] mb-2">We Value Your Privacy</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                                    By clicking "Accept All", you consent to our use of cookies.
                                    <a href="/cookie-policy" className="text-[#D4A373] hover:underline ml-1">Learn more</a>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setShowSettings(true)}
                                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                            >
                                <Settings size={16} />
                                Customize
                            </button>
                            <button
                                onClick={handleRejectAll}
                                className="px-6 py-2 border-2 border-[#33211D] text-[#33211D] rounded-lg hover:bg-[#33211D] hover:text-white transition-colors text-sm font-bold"
                            >
                                Reject All
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="px-6 py-2 bg-[#33211D] text-white rounded-lg hover:bg-black transition-colors text-sm font-bold"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                            <h2 className="text-2xl font-serif font-bold text-[#33211D]">Cookie Preferences</h2>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Essential Cookies */}
                            <div className="border-b border-gray-100 pb-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#33211D] mb-1">Essential Cookies</h3>
                                        <p className="text-sm text-gray-600">
                                            Required for the website to function properly. Cannot be disabled.
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        <div className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1 cursor-not-allowed">
                                            <div className="w-4 h-4 bg-white rounded-full translate-x-6"></div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Examples: Shopping cart, user authentication, security features
                                </p>
                            </div>

                            {/* Analytics Cookies */}
                            <div className="border-b border-gray-100 pb-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#33211D] mb-1">Analytics Cookies</h3>
                                        <p className="text-sm text-gray-600">
                                            Help us understand how visitors interact with our website.
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        <button
                                            onClick={() => setPreferences({ ...preferences, analytics: !preferences.analytics })}
                                            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${preferences.analytics ? 'bg-[#33211D]' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-0'
                                                }`}></div>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Examples: Google Analytics, page views, session duration
                                </p>
                            </div>

                            {/* Marketing Cookies */}
                            <div className="pb-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#33211D] mb-1">Marketing Cookies</h3>
                                        <p className="text-sm text-gray-600">
                                            Used to deliver personalized advertisements and track campaign performance.
                                        </p>
                                    </div>
                                    <div className="ml-4">
                                        <button
                                            onClick={() => setPreferences({ ...preferences, marketing: !preferences.marketing })}
                                            className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${preferences.marketing ? 'bg-[#33211D]' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${preferences.marketing ? 'translate-x-6' : 'translate-x-0'
                                                }`}></div>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Examples: Facebook Pixel, Google Ads, retargeting
                                </p>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3">
                            <button
                                onClick={() => setShowSettings(false)}
                                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSavePreferences}
                                className="flex-1 px-6 py-3 bg-[#33211D] text-white rounded-lg hover:bg-black transition-colors font-bold"
                            >
                                Save Preferences
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
