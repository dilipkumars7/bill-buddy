"use client";
import React, { forwardRef } from "react";
import "./common.css";

interface SdkInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  variant?: string;
  error?: string;
  icon?: React.ReactNode;
}

const SdkInput = forwardRef<HTMLInputElement, SdkInputProps>(
  ({ type, label, variant, error, icon, ...rest }, ref) => {
    const inputClassName = `input ${error ? "invalid" : ""}`;

    if (variant === "login") {
      return (
        <div className="input-wrapper">
          <input className={`${inputClassName}`} type={type} placeholder=" " ref={ref} {...rest} />
          <span className={`placeholder ${error ? "text-red-500" : ""}`}>{label}</span>
          {icon && <span className="inputicon">{icon}</span>}

          {error && <p className="text-[#da2020] text-[13px] mt-1 absolute">{error}</p>}
        </div>
      );
    }

    return null;
  }
);

SdkInput.displayName = "SdkInput";
export default SdkInput;
