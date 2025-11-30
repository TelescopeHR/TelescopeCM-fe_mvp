"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select items...",
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement | any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const removeOption = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  //   const selectedLabels = options
  //     .filter((opt) => value.includes(opt.value))
  //     .map((opt) => opt.label);

  return (
    <div ref={containerRef} className={cn("w-full", className)}>
      {/* Display area with selected items */}
      <div
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full px-3 py-2 text-left flex items-center justify-between",
          "rounded-lg border border-input text-sm",
          "hover:bg-accent/50 transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
      >
        <div className="flex flex-wrap gap-2 flex-1">
          {value.length > 0 ? (
            value.map((v) => (
              <div
                key={v}
                className="inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-md px-2 py-1 text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                {options.find((opt) => opt.value === v)?.label}
                <button
                  onClick={() => removeOption(v)}
                  className="hover:opacity-75 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className={cn(
              "z-50",
              "rounded-lg border border-input bg-popover shadow-lg"
            )}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
          >
            <div className="max-h-64 overflow-y-auto p-2">
              {options.length > 0 ? (
                options.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
                      "hover:bg-accent/50 transition-colors"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={value.includes(option.value)}
                      onChange={() => toggleOption(option.value)}
                      className="w-4 h-4 rounded border-input cursor-pointer accent-slate-200 text-slate-200"
                    />
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))
              ) : (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  No options available
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
