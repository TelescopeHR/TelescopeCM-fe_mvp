"use client";

import type React from "react";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface OTPInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  onComplete,
  disabled = false,
  placeholder = "−",
}: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleChange = (index: number, newValue: string) => {
    const sanitized = newValue.replace(/[^0-9]/g, "").slice(-1);

    const newOTP = value.split("");
    newOTP[index] = sanitized;

    const result = newOTP.join("");
    onChange(result);

    // Move to next input
    if (sanitized && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger onComplete if all fields filled
    if (
      sanitized &&
      result.length === length &&
      result.split("").every((char) => char)
    ) {
      onComplete?.(result);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      const newOTP = value.split("");
      if (value[index]) {
        newOTP[index] = "";
        onChange(newOTP.join(""));
      } else if (index > 0) {
        newOTP[index - 1] = "";
        onChange(newOTP.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, length);

    onChange(paste);

    // Focus the last filled input or the first empty one
    const focusIndex = Math.min(paste.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (paste.length === length) {
      onComplete?.(paste);
    }
  };

  return (
    <div className="flex gap-3 justify-between w-full ">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] ?? ""}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onFocus={() => setActiveIndex(index)}
          onBlur={() => setActiveIndex(null)}
          onPaste={handlePaste}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "w-16 h-16 text-center text-2xl font-semibold rounded-lg border-2 transition-all outline-none",
            "bg-background text-foreground placeholder-muted-foreground",
            activeIndex === index
              ? "border-blue-500 shadow-md shadow-blue-500/20"
              : "border-input hover:border-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      ))}
    </div>
  );
}
