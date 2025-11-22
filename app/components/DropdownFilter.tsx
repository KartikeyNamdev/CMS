"use client";

import React from "react";
// Using the ChevronDownIcon to match your filter design
import { ChevronDownIcon } from "@heroicons/react/24/solid";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownFilterProps {
  placeholder: string;
  options: DropdownOption[];
  selectedValue: string;
  onChange: (value: string) => void | null;
  className?: string;
}

/**
 * A reusable, styled dropdown component for dashboard filters.
 */
export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  placeholder,
  options,
  selectedValue,
  onChange,
  className = "",
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="
          appearance-none w-full h-12 py-2 px-4 pr-10
          text-black/50 bg-white placeholder-gray-500
          rounded-xl border border-gray-300
          focus:outline-none
          cursor-pointer transition-all duration-200
        "
      >
        {/* Placeholder Option (Selected if value is empty) */}
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {/* Dynamic Options */}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Chevron Icon Overlay (to hide default browser arrow) */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDownIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default DropdownFilter;
