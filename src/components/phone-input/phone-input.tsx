"use client";

import { ChevronDown } from "lucide-react";

interface PhoneNumberInputProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const countryCodes = [
  { code: "+1", country: "US/CA" },
  //   { code: "+44", country: "UK" },
  //   { code: "+91", country: "IN" },
  //   { code: "+86", country: "CN" },
  //   { code: "+81", country: "JP" },
  //   { code: "+49", country: "DE" },
  //   { code: "+33", country: "FR" },
  //   { code: "+61", country: "AU" },
  //   { code: "+55", country: "BR" },
  //   { code: "+7", country: "RU" },
];

export function PhoneNumberInput({
  value = "",
  onChange,
}: PhoneNumberInputProps) {
  // Parse the value to extract country code and phone number
  const getCountryCodeAndNumber = (fullValue: string) => {
    if (!fullValue) return { countryCode: "+1", phoneNumber: "" };

    // Find which country code the value starts with
    const matchedCode = countryCodes.find(({ code }) =>
      fullValue.startsWith(code)
    );

    if (matchedCode) {
      return {
        countryCode: matchedCode.code,
        phoneNumber: fullValue.slice(matchedCode.code.length),
      };
    }

    return { countryCode: "+1", phoneNumber: fullValue };
  };

  const { countryCode, phoneNumber } = getCountryCodeAndNumber(value);

  const handleCountryCodeChange = (newCode: string) => {
    onChange?.(newCode + phoneNumber);
  };

  const handlePhoneNumberChange = (newNumber: string) => {
    // Only allow digits
    const cleanedNumber = newNumber.replace(/\D/g, "");
    onChange?.(countryCode + cleanedNumber);
  };

  return (
    <div className="relative h-10 flex items-center border border-input rounded bg-background overflow-hidden">
      {/* Country Code Select */}
      <div className="relative flex items-center border-r border-input">
        <select
          value={countryCode}
          onChange={(e) => handleCountryCodeChange(e.target.value)}
          className="appearance-none bg-transparent pl-4 pr-8 py-3.5 text-foreground font-medium cursor-pointer focus:outline-none focus:ring-0 text-sm"
        >
          {countryCodes.map(({ code }) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 w-4 h-4 text-muted-foreground pointer-events-none" />
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => handlePhoneNumberChange(e.target.value)}
        placeholder="Enter phone number"
        className="flex-1 bg-transparent placeholder:text-sm px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
      />
    </div>
  );
}
