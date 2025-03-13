"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import localFont from 'next/font/local'
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import './login.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SdkInput from "../../components/input";

const SKDsFontAp = localFont({ 
  src: '../../../public/fonts/apercu_regular_pro.otf',
  fallback:['sans-serif' ]
})

const SKDsFontCp = localFont({ 
  src: '../../../public/fonts/Termina.otf',
  fallback:['sans-serif' ]
})

export default function Login() {

  const [activeIndex, setActiveIndex] = useState(0);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  useEffect(()=>{
    const activeSlide = document.querySelector(`.swiper-slide-active`);
    const blobs = activeSlide?.querySelectorAll(".blob") || [];
    if (blobs) {
      gsap.to(blobs, {
        x: (i) => [180, -190, 180, -10, -200][i],
        y: (i) => [-100, 110, 110, -210, -90][i],
        scale: () => gsap.utils.random(1.2, 1.4),
        rotation: () => gsap.utils.random(-360, 360),
        duration: 3,
        ease: "power2.out",
        onComplete: () => {
          blobs.forEach((blob) => {
            gsap.to(blob, {
              x: () => `+=${gsap.utils.random(-10, 10)}`, // Random horizontal drift
              y: () => `+=${gsap.utils.random(-10, 10)}`, // Random vertical drift
              duration: gsap.utils.random(2, 4), // Random duration for smooth float
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1, // Infinite floating
            });
          });
        },
      });
    }
    return () => {
      gsap.killTweensOf(".blob");
      gsap.set(".blob", { x: 0, y: 0, scale: 1, rotation: 0 });
    };
  }, [activeIndex])

  const onAutoplayTimeLeft = (s, time: number, progress: number) => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", (1 - progress).toString());
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };


  return (
    <>
      <div className="grid grid-cols-2 gap-4">

        <div className="h-[100vh] w-full anime-bg p-10 relative">
          <Swiper className={`h-full w-full flex items-center justify-center`} centeredSlides={true} spaceBetween={100} slidesPerView={1} effect="fade" navigation={false} autoplay={{delay: 7000, disableOnInteraction: false}} 
            modules={[Autoplay, Pagination, Navigation]} onAutoplayTimeLeft={onAutoplayTimeLeft}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            pagination={{
              clickable: true,
              type: "custom",
              renderCustom: (swiper, current, total) => {
                return Array.from({ length: total }, (_, i) =>
                  `<span class="custom-bullet ${i + 1 === current ? "active" : ""}" data-index="${i}"></span>`
                ).join("");
              },
            }}
          >
            <SwiperSlide>
              <div className='h-full w-full flex justify-center items-center relative'>
                <svg className="blob absolute" viewBox="0 0 480 480" width={60} height={60}><path fill="#F9B21D" d="M278.5,281Q192,322,198.5,250.5Q205,179,285,209.5Q365,240,278.5,281Z"/></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={30} height={30}><path fill="#F95454" d="M312.5,316Q152,392,157.5,249.5Q163,107,318,173.5Q473,240,312.5,316Z" /></svg>
                <svg className="blob absolute" viewBox="0 0 200 200" width={30} height={30}><path fill="#B1D690" d="M47.7,-19.6C53.1,1,42.6,22.6,25.3,35.3C8,48,-16.1,51.7,-30.1,41.6C-44.1,31.4,-47.9,7.3,-41.2,-15.2C-34.5,-37.7,-17.3,-58.6,2,-59.2C21.2,-59.8,42.4,-40.2,47.7,-19.6Z" transform="translate(100 100)" /></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={30} height={30} ><path fill="#ffde4d" d="M337,348Q240,456,187,348Q134,240,187,191.5Q240,143,337,191.5Q434,240,337,348Z" /></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={35} height={35} ><path fill="#b771e5" d="M290,285.5Q240,331,152.5,285.5Q65,240,152.5,159Q240,78,290,159Q340,240,290,285.5Z" /></svg>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='h-full w-full flex justify-center items-center relative'>
                <svg className="blob absolute" viewBox="0 0 480 480" width={60} height={60}><path fill="#F9B21D" d="M278.5,281Q192,322,198.5,250.5Q205,179,285,209.5Q365,240,278.5,281Z"/></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={30} height={30}><path fill="#F95454" d="M312.5,316Q152,392,157.5,249.5Q163,107,318,173.5Q473,240,312.5,316Z" /></svg>
                <svg className="blob absolute" viewBox="0 0 200 200" width={30} height={30}><path fill="#B1D690" d="M47.7,-19.6C53.1,1,42.6,22.6,25.3,35.3C8,48,-16.1,51.7,-30.1,41.6C-44.1,31.4,-47.9,7.3,-41.2,-15.2C-34.5,-37.7,-17.3,-58.6,2,-59.2C21.2,-59.8,42.4,-40.2,47.7,-19.6Z" transform="translate(100 100)" /></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={30} height={30} ><path fill="#ffde4d" d="M337,348Q240,456,187,348Q134,240,187,191.5Q240,143,337,191.5Q434,240,337,348Z" /></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={35} height={35} ><path fill="#b771e5" d="M290,285.5Q240,331,152.5,285.5Q65,240,152.5,159Q240,78,290,159Q340,240,290,285.5Z" /></svg>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className='h-full w-full flex justify-center items-center relative'>
                <svg className="blob absolute" viewBox="0 0 480 480" width={60} height={60}><path fill="#F9B21D" d="M278.5,281Q192,322,198.5,250.5Q205,179,285,209.5Q365,240,278.5,281Z"/></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={30} height={30}><path fill="#F95454" d="M312.5,316Q152,392,157.5,249.5Q163,107,318,173.5Q473,240,312.5,316Z" /></svg>
                <svg className="blob absolute" viewBox="0 0 200 200" width={30} height={30}><path fill="#B1D690" d="M47.7,-19.6C53.1,1,42.6,22.6,25.3,35.3C8,48,-16.1,51.7,-30.1,41.6C-44.1,31.4,-47.9,7.3,-41.2,-15.2C-34.5,-37.7,-17.3,-58.6,2,-59.2C21.2,-59.8,42.4,-40.2,47.7,-19.6Z" transform="translate(100 100)" /></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={30} height={30} ><path fill="#ffde4d" d="M337,348Q240,456,187,348Q134,240,187,191.5Q240,143,337,191.5Q434,240,337,348Z" /></svg>
                <svg className="blob absolute" viewBox="0 0 480 480" width={35} height={35} ><path fill="#b771e5" d="M290,285.5Q240,331,152.5,285.5Q65,240,152.5,159Q240,78,290,159Q340,240,290,285.5Z" /></svg>
              </div>
            </SwiperSlide>
            <div className="autoplay-progress" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="15"></circle>
              </svg>
              <span className='text-[12px]' ref={progressContent}></span>
            </div>
          </Swiper>
        </div>

        <div className="h-full w-full flex items-center justify-center flex-col gap-3">
            <span className={`${SKDsFontCp.className} text-[25px] font-extrabold tracking-wide`}>Bill Buddy</span>
            <div className={`${SKDsFontAp.className} w-[60%]`}>
                <SdkInput></SdkInput>
            </div>

        </div>

      </div>
    </>
  );
}