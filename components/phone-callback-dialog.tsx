"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Phone, X } from "lucide-react";
import { COUNTRY_CODES } from "@/lib/country-codes";
import { submitCallRequest } from "@/app/actions/contact";

interface PhoneCallbackDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PhoneCallbackDialog({
  isOpen,
  onOpenChange,
}: PhoneCallbackDialogProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRY_CODES.find((c) => c.code === "IN")!,
  );
  const [name, setName] = useState("");
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close country dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCountryOpen(false);
      }
    }

    if (isCountryOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      searchInputRef.current?.focus();
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCountryOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsSubmitting(true);
    // Simulate API call
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    const data = {
      phoneNumber: selectedCountry.dialCode + phoneNumber,
      name,
    };

    const response = await submitCallRequest(data);
    // const res = response();
    if (response.success) {
      console.log("success");
      console.log(response);
    } else {
      console.log("error");
      console.log(response);
    }

    console.log({
      country: selectedCountry.name,
      countryCode: selectedCountry.code,
      dialCode: selectedCountry.dialCode,
      phoneNumber: phoneNumber,
      name: name,
      fullNumber: `${selectedCountry.dialCode}${phoneNumber}`,
    });

    setIsSubmitting(false);
    setPhoneNumber("");
    onOpenChange(false);
  };

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className=" fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        style={{
          animation: isOpen ? "fadeIn 0.3s ease-out" : "fadeOut 0.2s ease-out",
        }}
        onClick={() => onOpenChange(false)}
      />

      <div
        className="font-sans fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
        style={{
          animation: isOpen
            ? "scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
            : "scaleOut 0.3s ease-out",
        }}
      >
        <div
          className="rounded-2xl shadow-2xl p-8 relative border border-orange-200"
          style={{
            background: "linear-gradient(135deg, #fff8f3 0%, #fffaf6 100%)",
          }}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="absolute top-4 right-4 p-1 hover:bg-orange-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-lg shadow-md">
              <Phone className="w-5 h-5 text-[#DF5B28]" />
            </div>
            <h2 className="text-2xl font-bold bg-[#DF5B28]/80 bg-clip-text text-transparent">
              Get a callback
            </h2>
          </div>
          <p className="text-gray-600 text-sm mb-6">
            Enter your phone number and we'll call you back shortly
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative" ref={countryDropdownRef}>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Country
              </label>
              <button
                type="button"
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className="w-full px-4 py-3 bg-white border-2 border-orange-200 rounded-lg flex items-center justify-between hover:border-orange-300 hover:shadow-md transition-all text-gray-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{selectedCountry.flag}</span>
                  <span className="font-medium">{selectedCountry.name}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-orange-500 transition-transform duration-300 ${
                    isCountryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCountryOpen && (
                <div
                  className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-orange-200 rounded-lg shadow-xl z-10 max-h-60 overflow-hidden flex flex-col"
                  style={{
                    animation: "slideDown 0.2s ease-out",
                  }}
                >
                  <div className="p-2 border-b border-orange-100 sticky top-0 bg-white">
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search country..."
                      className="w-full px-3 py-2 bg-orange-50 border border-orange-200 rounded-md text-gray-800 text-sm placeholder-gray-500 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200"
                      onChange={(e) => {
                        // Could be enhanced with search filtering
                      }}
                    />
                  </div>

                  <div className="overflow-y-auto">
                    {COUNTRY_CODES.map((country) => (
                      <button
                        key={country.code}
                        type="button"
                        onClick={() => {
                          setSelectedCountry(country);
                          setIsCountryOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${
                          selectedCountry.code === country.code
                            ? "bg-linear-to-r from-orange-100 to-pink-100 text-orange-900"
                            : "text-gray-800 hover:bg-orange-50"
                        }`}
                      >
                        <span className="text-lg">{country.flag}</span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">
                            {country.name}
                          </div>
                          <div className="text-xs text-gray-600">
                            {country.dialCode}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2 w-full">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="flex-1 px-4 py-3 2 w-full bg-white border-2 border-orange-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                <div className="flex items-center px-3 py-3 bg-linear-to-br from-orange-100 to-orange-150 border-2 border-orange-200 rounded-lg min-w-fit shadow-sm">
                  <span className="text-gray-800 font-bold text-sm">
                    {selectedCountry.dialCode}
                  </span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneInput}
                  placeholder="Enter your number"
                  className="flex-1 px-4 py-3 bg-white border-2 border-orange-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all"
                  maxLength={15}
                />
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {phoneNumber
                  ? `+${selectedCountry.dialCode.slice(1)}${phoneNumber}`
                  : "Full number will appear here"}
              </p>
            </div>

            <button
              type="submit"
              disabled={!phoneNumber.trim() || isSubmitting}
              className="w-full py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 relative overflow-hidden"
              style={{
                animation: !isSubmitting
                  ? "slideUp 0.4s ease-out 0.2s backwards"
                  : "none",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-orange-600 to-orange-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4" />
                    <span>Request Callback</span>
                  </>
                )}
              </div>
            </button>
          </form>

          <p className="text-xs text-gray-600 text-center mt-4">
            We'll call you within 1 hour
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateZ(0);
          }
          to {
            opacity: 1;
            transform: scale(1) translateZ(0);
          }
        }

        @keyframes scaleOut {
          from {
            opacity: 1;
            transform: scale(1) translateZ(0);
          }
          to {
            opacity: 0;
            transform: scale(0.95) translateZ(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
