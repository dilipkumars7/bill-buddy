"use client";
import React from 'react'
import './common.css'

interface SdkInputProps {
  type?: string;
  label: string;
  variant?: string;
}

export default function SdkInput({ type, label, variant }: SdkInputProps) {
  if(variant === 'login'){
    return (
      <div className="input-wrapper">
        <input className="input" type={type} placeholder=" " data-placeholder="" required/>
        <span className="placeholder">{label}</span>
        {/* <div className='text-[#da2020] text-[12.5px] pl-1'>Error</div> */}
      </div>
    )
  }
  
}
