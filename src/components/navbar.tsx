"use client";
import React from 'react'
import './common.css'
import SdkAvatar from './avatar';
import localFont from "next/font/local";

const SKDsFontAp = localFont({ 
  src: '../../public/fonts/apercu_regular_pro.otf',
  fallback:['sans-serif' ]
})


export default function SdkNavbar() {
  return (
    <div className={`${SKDsFontAp.className} tracking-wide h-[56px] z-10 fixed w-full top-0`}>
      <header className='nav-header relative flex'>
        <div className='w-full flex gap-5'>
          <div className='flex items-center gap-4'>
            <span className='text-lg font-bold'>Logo</span>
          </div>
          <div className='flex items-center gap-4'>
            <button className='font-bold'>Home</button>
            <button className='font-bold'>About</button>
            <button className='font-bold'>Create</button>
          </div>
        </div>
        <div className='flex items-center h-full gap-4'>
          <SdkAvatar size={34} email="Dilip.Sivam@gmail.com" />
        </div>
      </header>
    </div>
  )
}
