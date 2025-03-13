"use client";
import React from 'react'
import './common.css'

export default function SdkInput() {
  return (
    <>

      <div className="input-wrapper">
        <input className="input" type="text" placeholder=" " data-placeholder="" required/>
        <span className="placeholder">Email</span>
      </div>

    </>
  )
}
