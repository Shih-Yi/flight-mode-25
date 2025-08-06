"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Countdown Timer Component
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date to October 25, 2025 midnight Auckland time
    const targetDate = new Date('2025-10-25T00:00:00+12:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 landscape:grid-cols-4 md:grid-cols-4 gap-3 landscape:gap-4 md:gap-4 max-w-3xl mx-auto">
      {[
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HOURS', value: timeLeft.hours },
        { label: 'MINUTES', value: timeLeft.minutes },
        { label: 'SECONDS', value: timeLeft.seconds }
      ].map((item, index) => (
        <div key={index} className="group">
          <div className="bg-black/60 rounded-lg p-3 landscape:p-4 md:p-6 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm relative overflow-hidden">
            {/* Digital Display Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400/5 to-transparent pointer-events-none"></div>
            
            {/* LED-style number display */}
            <div className="text-center">
              <div className="text-3xl landscape:text-4xl md:text-5xl font-mono font-bold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors filter drop-shadow-lg"
                   style={{
                     textShadow: '0 0 10px rgba(96, 165, 250, 0.7), 0 0 20px rgba(96, 165, 250, 0.3), 0 0 30px rgba(96, 165, 250, 0.1)'
                   }}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-xs font-mono tracking-wider opacity-70 text-blue-100">
                {item.label}
              </div>
            </div>
            
            {/* Scanning line effect */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400/60 to-transparent animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClientHome() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');
  const lastScrollY = useRef(0);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      ) - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      
                   // 检测滚动方向 - 使用ref来避免闭包问题
      const scrollDiff = scrollTop - lastScrollY.current;
      if (Math.abs(scrollDiff) > 5) { // 增大阈值避免误判
        if (scrollDiff > 0) {
          setScrollDirection('down');
        } else {
          setScrollDirection('up');
        }
      }
      
      lastScrollY.current = scrollTop;
      setScrollY(scrollTop);
      setScrollProgress(progress);
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 2000);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    
    // 初始化lastScrollY
    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollY.current = initialScrollTop;
    setScrollY(initialScrollTop);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Flight Progress Indicator */}
      <div className={`fixed top-0 right-4 md:right-8 h-screen w-1 bg-white/10 z-50 pointer-events-none transition-all duration-1000 ease-out ${
        isScrolling ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        {/* Progress track */}
        <div 
          className="w-full bg-gradient-to-b from-blue-400 via-purple-500 to-yellow-400 transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        ></div>
        
        {/* Flying airplane indicator */}
        <div 
          className="absolute w-6 h-6 transition-all duration-300 ease-out z-10"
          style={{ 
            top: `${scrollProgress * 100}%`,
            left: 'calc(50% - 0.51px)',
            transform: 'translate(-50%, -50%)'
          }}
        >
                     <svg 
             width="24" 
             height="24" 
             viewBox="0 0 24 24" 
             fill="none" 
             className={`text-blue-400 transition-all duration-300 ${
               isScrolling ? 'text-blue-400 scale-125' : 'text-blue-200'
             }`}
                         style={{
               filter: isScrolling ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.9))' : 'none',
               transform: scrollDirection === 'down' ? 'rotate(180deg)' : 'rotate(0deg)',
               transition: 'transform 0.3s ease'
             }}
          >
            <path 
              d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-gray-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' result='noise' seed='1'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               backgroundSize: '100px 100px'
             }}>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-6 relative z-50">
        <div className="flex space-x-4 md:space-x-8">
          <a href="#about" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">About</a>
          <a href="#teams" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">Teams</a>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className="hover:scale-105 transition-transform duration-300">
            <img 
              src="/flight-mode-logo.png" 
              alt="Flight Mode" 
              className="h-12 md:h-12 lg:h-14 w-auto"
            />
          </Link>
        </div>
        
        <div className="flex space-x-4 md:space-x-8">
          <a href="#announcements" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">News</a>
          <a href="#links" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-10 pt-8 md:pt-0 -mt-30 md:-mt-16 lg:-mt-8">
        {/* Creative Studio Label */}
                 {/* Desktop version - two lines */}
         <div className="absolute top-48 left-8 transform -rotate-90 origin-top-left hidden min-[1200px]:flex lg:mt-12">
           <div className="flex flex-col space-y-2">
            
          <div className="flex items-center space-x-3">
            <div className="w-16 h-px bg-white/30"></div>
            <div className="text-xs tracking-[0.3em] opacity-60 font-medium">
              JOURNEY
            </div>
          </div>

           <div className="flex items-center space-x-3">
            <div className="w-16 h-px bg-white/30"></div>
            <div className="text-xs tracking-[0.3em] opacity-60 font-medium">
              TOGETHER
            </div>
          </div>

           <div className="mt-12"></div>
            
          </div>
        </div>
          
          {/* Mobile and Tablet version - one line, closer to edge */}
          <div className="absolute top-48 left-5 transform -rotate-90 origin-top-left block min-[1200px]:hidden mt-30">
                          <div className="flex items-center space-x-3">
                <div className="w-8 lg:w-12 h-px bg-white/30"></div>
              <div className="text-xs lg:text-sm tracking-[0.3em] opacity-60 font-medium">
                FLIGHT MODE
              </div>
            </div>
          </div>

        {/* Paper Airplane Icon */}
        <div className="absolute top-16 right-8 cursor-pointer group md:top-16 landscape:top-4 mt-24">
          <a href="#about">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-blue-300 transition-all duration-300 transform rotate-315 group-hover:scale-110 group-hover:rotate-[57deg]">
            <path d="M3 3L21 12L3 21L8 12L3 3Z" 
                  fill="currentColor" className="drop-shadow-lg"/>
          </svg>
          </a>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-6xl mb-12 landscape:mb-8 md:mb-20">
          <h1 className="font-space-grotesk font-bold leading-[0.75] tracking-tight">
            {/* Mobile: One word per line, Desktop: Two words per line */}
            <div className="mb-2 relative text-7xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">
              {/* Background image text */}
              <div>
                <span 
                  className="block md:inline bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  ON
                </span>
                <span className="md:ml-6 hidden md:inline"> </span>
                <span 
                  className="block md:inline bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  BOARD
                </span>
              </div>
              {/* Text stroke for better visibility */}
              <div 
                className="absolute inset-0 text-white opacity-20"
              >
                <span 
                  className="block md:inline"
                  style={{
                    WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  ON
                </span>
                <span className="md:ml-6 hidden md:inline"> </span>
                <span 
                  className="block md:inline"
                  style={{
                    WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  BOARD
                </span>
              </div>
            </div>
            <div className="mb-4 landscape:mb-3 lg:mb-6 relative text-7xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">
              {/* Background image text */}
              <div>
                <span 
                  className="block md:inline bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  WITH
                </span>
                <span className="md:ml-6 hidden md:inline"> </span>
                <span 
                  className="block md:inline bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  GOD
                </span>
              </div>
              {/* Text stroke for better visibility */}
              <div 
                className="absolute inset-0 text-white opacity-20"
              >
                <span 
                  className="block md:inline"
                  style={{
                    WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  WITH
                </span>
                <span className="md:ml-6 hidden md:inline"> </span>
                <span 
                  className="block md:inline"
                  style={{
                    WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  GOD
                </span>
              </div>
            </div>

                          {/* Date Display Above Main Heading */}
        <div className="text-center mb-6 landscape:mb-4">
          <div className={`text-white text-lg landscape:text-base font-medium tracking-wide transition-all duration-300 ${
            isScrolling ? 'text-yellow-400' : 'text-white'
          }`}
          style={{
            filter: isScrolling ? 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.6))' : 'none',
            textShadow: isScrolling ? '0 0 20px rgba(255, 215, 0, 0.5)' : 'none'
          }}>
            25-27 October
          </div>
        </div>
        
            <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.2em] relative mb-4">
              {/* Background image text */}
              <span 
                className="bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                2025
              </span>
              {/* Text stroke for better visibility with gold shimmer */}
              <span 
                className={`absolute inset-0 text-white transition-all duration-300 ${
                  isScrolling ? 'opacity-50' : 'opacity-15'
                }`}
                style={{
                  WebkitTextStroke: isScrolling 
                    ? '2px rgba(255, 215, 0, 0.7)' 
                    : '2px rgba(255, 255, 255, 0.4)',
                  WebkitTextFillColor: 'transparent',
                  filter: isScrolling ? 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.4))' : 'none'
                }}
              >
                2025
              </span>
            </div>
          </h1>
        </div>


        {/* Description - Mobile and Tablet Version (All orientations) */}
        <div className="block min-[1200px]:hidden absolute bottom-38 portrait:bottom-48 right-4 max-w-xs text-right portrait:transform portrait:-rotate-90 portrait:origin-bottom-right">
          <div className="space-y-2 portrait:space-y-1">
            <p className="text-xs leading-relaxed opacity-80 portrait:opacity-50">
              Praise & Worship<br/>
              <span className="font-semibold text-white portrait:opacity-90">Camp 2025</span>
            </p>
            <div className="w-12 h-px bg-white/30 ml-auto portrait:mt-1"></div>
          </div>
        </div>

        {/* Description - Desktop Version */}
        <div className="hidden min-[1200px]:block absolute bottom-16 right-8 max-w-xs text-right">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed opacity-80">
              Praise & Worship<br/>
              <span className="font-semibold text-white">Camp 2025</span> <br/>
            </p>
            <div className="w-12 h-px bg-white/30 ml-auto mt-4"></div>
          </div>
        </div>

        {/* Flight Mode Scroll Indicator */}
          <div className="absolute bottom-20 landscape:bottom-8 md:bottom-1 left-1/2 transform -translate-x-1/2 group cursor-pointer" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
            {/* Outer ring */}
            <div className="relative w-16 landscape:w-14 md:w-20 h-16 landscape:h-14 md:h-20 rounded-full border border-white/15 hover:border-white/30 transition-all duration-500 group-hover:scale-110">
            
                                        {/* Inner circle with gradient */}
              <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent border border-white/10 backdrop-blur-sm flex items-center justify-center">
                {/* Airplane icon pointing down */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-blue-300 transition-all duration-300 transform rotate-180 group-hover:translate-y-1 landscape:w-3 landscape:h-3">
                  <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" 
                        fill="currentColor" className="drop-shadow-lg"/>
                </svg>
              </div>
            
                          {/* Rotating dot indicator */}
              <div className="absolute inset-0 animate-spin" style={{animationDuration: '4s'}}>
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full landscape:w-1.5 landscape:h-1.5"></div>
              </div>
          </div>
          
          {/* Flight mode text */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs tracking-wider text-blue-300 whitespace-nowrap">BOARDING</span>
          </div>
          
                      {/* Animated trail pointing to blue dot */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-1 h-6 bg-gradient-to-b from-transparent via-blue-400/50 to-blue-400/80 animate-bounce"></div>
            </div>
        </div>
      </div>

      {/* Camp Introduction Section */}
      <section id="about" className="relative py-8 landscape:py-12 md:py-32 px-8 z-10 -mt-8 landscape:mt-0 md:mt-0">
        {/* Section background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs tracking-wider opacity-60 mb-8">01 / CAMP 2025</div>
              <h2 className="font-space-grotesk text-5xl md:text-6xl font-bold leading-tight mb-8">
                PRAISE &<br/>
                WORSHIP<br/>
                CAMP
              </h2>
              <div className="space-y-6 text-sm leading-relaxed opacity-80">
                <p>
                  Welcome to the official website for our upcoming Praise & Worship Camp 2025!
                </p>
                <p>
                  This is a space for our Praise and Worship Team, Choir, and Cantonese Worship Team to connect, prepare, and journey together as we get ready for an unforgettable weekend of worship, fellowship, and spiritual renewal. 

                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-6 tracking-wide">Camp Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-sm opacity-70">Date</span>
                    <span className="text-sm font-medium">25-27 October, 2025</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b border-white/10 pb-3 space-y-1 md:space-y-0">
                    <span className="text-sm opacity-70">Location</span>
                    <span className="text-sm font-medium text-right md:text-right break-words max-w-full md:max-w-xs">Wainui Park Camp, Wainui Valley Rd, Wainui 7582</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-sm opacity-70">Participants</span>
                    <span className="text-sm font-medium">Worship Team Members</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-70">Registration</span>
                    {process.env.NEXT_PUBLIC_REGISTRATION_URL ? (
                      <a 
                        href={process.env.NEXT_PUBLIC_REGISTRATION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        Register Now →
                      </a>
                    ) : (
                      <span className="text-sm font-medium">Coming Soon</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section Navigation Button */}
        <div className="flex justify-center mt-16 relative z-20">
          <a 
            href="#boarding"
            className="group flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-all duration-300 relative"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-y-0.5 transition-transform duration-300">
                <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">DEPARTURE</span>
          </a>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="boarding" className="relative py-12 landscape:py-16 md:py-20 px-8 z-10 overflow-hidden">
        {/* Airport Terminal Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/15 to-blue-900/10"></div>
        
        {/* Animated Airport Elements */}
        <div className="absolute top-20 left-10 opacity-20 animate-pulse">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 opacity-15 animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          {/* Airport Departure Board Style Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="text-xs tracking-[0.3em] opacity-60 font-mono">DEPARTURE GATE 07</div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            
            <h2 className="font-mono text-4xl md:text-6xl font-bold mb-4 tracking-wider">
              FLIGHT MODE25
            </h2>
            <div className="text-lg opacity-80 mb-8">Boarding in Progress...</div>
            
            {/* Airport Status Bar */}
            <div className="flex justify-center space-x-8 text-sm mb-12">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="font-mono">ON TIME</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span className="font-mono">GATE OPEN</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="font-mono">BOARDING</span>
              </div>
            </div>
          </div>
          
          {/* Departure Board Style Countdown */}
          <div className="bg-black/40 rounded-lg p-8 border border-white/20 backdrop-blur-sm mb-12 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-sm font-mono tracking-wider opacity-70 mb-2">TIME TO DEPARTURE</div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </div>
            
            <CountdownTimer />
            
            {/* Terminal Display Effect */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 text-sm font-mono opacity-60">
                <span>▶</span>
                <span className="animate-pulse">Passengers please proceed to boarding area</span>
                <span>◀</span>
              </div>
            </div>
          </div>
          
          {/* Flight Information Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-lg p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono tracking-wider opacity-60">FLIGHT</div>
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              </div>
              <div className="text-lg font-mono font-bold">FLIGHT MODE25</div>
              <div className="text-sm opacity-80">Praise & Worship</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-lg p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono tracking-wider opacity-60">DESTINATION</div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="text-lg font-mono font-bold">WAINUI</div>
              <div className="text-sm opacity-80">Park Camp</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-lg p-6 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono tracking-wider opacity-60">GATE</div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div className="text-lg font-mono font-bold">07</div>
              <div className="text-sm opacity-80">Now Boarding</div>
            </div>
          </div>
          
          {/* Airport Announcement */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-3 bg-blue-900/20 px-6 py-3 rounded-full border border-blue-400/30">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
              </svg>
              <span className="text-sm font-mono tracking-wide text-blue-300">
                Final boarding call for Flight Mode 2025
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-400">
                <path d="M19 7L12 1L5 7V20H19V7ZM12 3.69L16.71 8H7.29L12 3.69ZM17 18H7V9H17V18Z" fill="currentColor"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Section Navigation Button */}
        <div className="flex justify-center mt-16 relative z-20">
          <a 
            href="#quick-access"
            className="group flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-all duration-300 relative"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-y-0.5 transition-transform duration-300">
                <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">TAKEOFF</span>
          </a>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section id="quick-access" className="relative py-20 px-8 z-10">
        {/* Section background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-purple-900/10 to-blue-900/5"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs tracking-wider opacity-60 mb-12 text-center">03 / QUICK ACCESS</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Schedule", subtitle: "Camp Program", href: "#schedule", available: false, status: "To Be Announced"},
              { title: "Teams", subtitle: "Worship Teams", href: "#teams", available: true },
              { title: "Packing List", subtitle: "What to Bring", href: "/packing", available: true },
              { title: "News", subtitle: "Latest Updates", href: "#announcements", available: true },
              { title: "Register", subtitle: "Sign Up", href: process.env.NEXT_PUBLIC_REGISTRATION_URL || "#", available: !!process.env.NEXT_PUBLIC_REGISTRATION_URL, external: true },
              { title: "Contact", subtitle: "Quick Links", href: "#links", available: true }
            ].map((item, index) => (
              <div key={index} className={`group relative ${item.available ? 'cursor-pointer' : 'cursor-default'}`}>
                <div className={`bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg p-6 border border-white/10 transition-all duration-300 backdrop-blur-sm relative overflow-hidden ${
                  item.available 
                    ? 'hover:border-white/20 hover:transform hover:scale-105' 
                    : 'hover:border-sky-400/30 hover:from-sky-900/10 hover:to-blue-900/10'
                }`}>
                  <div className="text-xs tracking-wider opacity-50 mb-2">{item.subtitle}</div>
                  <h3 className={`text-lg font-medium transition-colors ${
                    item.available ? 'group-hover:text-white' : 'group-hover:text-sky-300'
                  }`}>{item.title}</h3>
                  
                  {/* Available items - show arrow */}
                  {item.available && (
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  )}
                  
                  {/* Unavailable items - show status */}
                  {!item.available && (
                    <div className="mt-4">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="text-xs tracking-wider text-sky-400 bg-sky-400/10 px-2 py-1 rounded border border-sky-400/20">
                          {item.status}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Subtle loading dots animation for unavailable items */}
                  {!item.available && (
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-60 transition-opacity">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-sky-400/60 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
                        <div className="w-1 h-1 bg-sky-400/60 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1 h-1 bg-sky-400/60 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Clickable link only for available items */}
                {item.available && (
                  item.external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10"></a>
                  ) : item.href.startsWith('/') ? (
                    <Link href={item.href} className="absolute inset-0 z-10"></Link>
                  ) : (
                    <a href={item.href} className="absolute inset-0 z-10"></a>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Navigation Button */}
        <div className="flex justify-center mt-16 relative z-20">
          <a 
            href="#announcements"
            className="group flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-all duration-300 relative"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-y-0.5 transition-transform duration-300">
                <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">CRUISING</span>
          </a>
        </div>
      </section>

      {/* FB Video Section */}
      <section id="announcements" className="relative py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="text-xs tracking-wider opacity-60 mb-4">04 / VIDEOS</div>
              <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold">Camp Updates</h2>
            </div>
            {process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL && (
              <a 
                href={process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm tracking-wide hover:text-gray-300 transition-colors flex items-center space-x-2"
              >
                <span>Join FB Group</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor"/>
              </svg>
            </a>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { 
                date: "27.07.2025", 
                title: "Early bird pricing ends on 31 July! ", 
                category: "Announcement", 
                isNew: true,
                description: 
                  "✈️ Flight Mode: Onboard with God – Important Update!\n\nEarly bird pricing ends on 31 July! If you haven't paid yet, please do so by then to secure your seat at the discounted rate.\n\n🗓️ From 1 August, the camp fee returns to the standard price:\n• $120 for adults\n• $60 for children\n\nOur camp is currently fully booked, but we're still accepting registrations for the waiting list. We'll contact you if a spot becomes available.\n\n🏕️ Can't stay overnight? No problem! Join us for a Day Trip for just $40, including breakfast, lunch, dinner and all activities!\n\nWe're looking forward to taking off with you. Let's focus on God and journey together! ✨",
                videoUrl: process.env.NEXT_PUBLIC_FB_VIDEO_1 || "#",
                thumbnail: process.env.NEXT_PUBLIC_FB_THUMBNAIL_1,
                available: !!process.env.NEXT_PUBLIC_FB_VIDEO_1
              },
              { 
                date: "26.07.2025", 
                title: "Counting down ⏰", 
                category: "Video", 
                isNew: true,
                description: "Counting down ⏰ 90 more sleeps till we take off together ✈️ \n\n #FlightMode25 #OnBoardWithGod",
                videoUrl: process.env.NEXT_PUBLIC_FB_VIDEO_2 || "#",
                thumbnail: process.env.NEXT_PUBLIC_FB_THUMBNAIL_2,
                available: !!process.env.NEXT_PUBLIC_FB_VIDEO_2
              },
              { 
                date: "23.07.2025", 
                title: "🎤 A greeting from our Flight Mode speaker ✈️", 
                category: "Greeting from speaker", 
                isNew: true,
                description: "Pastor Ricky Wong is excited to journey with us this October — see you at camp! \n\n#FlightMode2025",
                videoUrl: process.env.NEXT_PUBLIC_FB_VIDEO_3 || "#",
                thumbnail: process.env.NEXT_PUBLIC_FB_THUMBNAIL_3,
                available: !!process.env.NEXT_PUBLIC_FB_VIDEO_3
              },
              { 
                date: "10.07.2025", 
                title: "Captain Speaking", 
                category: "Announcement", 
                isNew: false,
                description: "Dear brothers and sisters @everyone, this is Captain 🧑‍✈️ Daniel Wu speaking… #flightmode25",
                videoUrl: process.env.NEXT_PUBLIC_FB_VIDEO_4 || "#",
                thumbnail: process.env.NEXT_PUBLIC_FB_THUMBNAIL_4,
                available: !!process.env.NEXT_PUBLIC_FB_VIDEO_4
              },
            ].filter(video => video.available).map((video, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                {/* Video Thumbnail */}
                <div 
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => {
                    // Create and open video modal with YouTube embed
                    const videoModal = document.createElement('div');
                    videoModal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                    videoModal.innerHTML = `
                      <div class="relative bg-black rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
                        <button class="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2" onclick="this.parentElement.parentElement.remove()">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                          </svg>
                        </button>
                        <iframe 
                          width="100%" 
                          height="500" 
                          src="${video.videoUrl}" 
                          title="Camp Video" 
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                          allowFullScreen
                          style="border-radius: 8px;">
                        </iframe>
                      </div>
                    `;
                    document.body.appendChild(videoModal);
                    
                    // Close on background click
                    videoModal.addEventListener('click', (e) => {
                      if (e.target === videoModal) {
                        videoModal.remove();
                      }
                    });
                  }}
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* FB Video Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-blue-600/90 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-400/30 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white ml-1">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                      </svg>
                    </div>
                  </div>
                  
                  {/* FB Video Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-2 bg-blue-600/90 px-3 py-1 rounded-full border border-blue-400/30">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-xs text-white font-medium">Video</span>
                    </div>
                  </div>
                  
                  {/* NEW Badge */}
                  {video.isNew && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded font-medium animate-pulse">NEW</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-xs opacity-50">{video.date}</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30">{video.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors leading-tight">
                    {video.title}
                  </h3>
                  
                  <div className="text-sm leading-relaxed opacity-80 mb-4 space-y-2">
                    {Array.isArray(video.description) ? (
                      video.description.map((paragraph, idx) => (
                        <p key={idx} className={idx === 0 ? "font-medium text-blue-300" : ""}>
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <div>
                        <p 
                          className="whitespace-pre-line cursor-pointer hover:text-blue-200 transition-colors"
                          style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Create modal for full description
                            const modal = document.createElement('div');
                            modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                            modal.innerHTML = `
                              <div class="relative bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/20">
                                <div class="p-6 border-b border-white/10">
                                  <div class="flex items-center justify-between">
                                    <h3 class="text-xl font-semibold text-white">${video.title}</h3>
                                    <button class="text-white hover:text-gray-300 bg-black/50 rounded-full p-2" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                      </svg>
                                    </button>
                                  </div>
                                  <div class="flex items-center space-x-3 mt-2">
                                    <span class="text-xs opacity-50">${video.date}</span>
                                    <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30">${video.category}</span>
                                  </div>
                                </div>
                                <div class="p-6 overflow-y-auto max-h-[60vh]">
                                  <div class="text-sm leading-relaxed text-gray-300 whitespace-pre-line">${video.description}</div>
                                </div>
                              </div>
                            `;
                            document.body.appendChild(modal);
                            
                            // Close on background click
                            modal.addEventListener('click', (e) => {
                              if (e.target === modal) {
                                modal.remove();
                              }
                            });
                          }}
                        >
                          {video.description}
                        </p>
                        {video.description.length > 50 && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Create modal for full description
                              const modal = document.createElement('div');
                              modal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                              modal.innerHTML = `
                                <div class="relative bg-gray-900 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden border border-white/20">
                                  <div class="p-6 border-b border-white/10">
                                    <div class="flex items-center justify-between">
                                      <h3 class="text-xl font-semibold text-white">${video.title}</h3>
                                      <button class="text-white hover:text-gray-300 bg-black/50 rounded-full p-2" onclick="this.parentElement.parentElement.parentElement.parentElement.remove()">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                          <line x1="18" y1="6" x2="6" y2="18"></line>
                                          <line x1="6" y1="6" x2="18" y2="18"></line>
                                        </svg>
                                      </button>
                                    </div>
                                    <div class="flex items-center space-x-3 mt-2">
                                      <span class="text-xs opacity-50">${video.date}</span>
                                      <span class="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded border border-blue-500/30">${video.category}</span>
                                    </div>
                                  </div>
                                  <div class="p-6 overflow-y-auto max-h-[60vh]">
                                    <div class="text-sm leading-relaxed text-gray-300 whitespace-pre-line">${video.description}</div>
                                  </div>
                                </div>
                              `;
                              document.body.appendChild(modal);
                              
                              // Close on background click
                              modal.addEventListener('click', (e) => {
                                if (e.target === modal) {
                                  modal.remove();
                                }
                              });
                            }}
                            className="inline-flex items-center space-x-2 mt-3 px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-400/50 rounded-md text-blue-400 hover:text-blue-300 transition-all duration-200 text-sm font-medium group"
                          >
                            <span>Read more</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  
                                     {/* Play Video Button */}
                   <div className="flex items-center justify-between">
                                           <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Create and open video modal with YouTube embed
                          const videoModal = document.createElement('div');
                          videoModal.className = 'fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4';
                          videoModal.innerHTML = `
                            <div class="relative bg-black rounded-lg max-w-4xl w-full max-h-full overflow-hidden">
                              <button class="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2" onclick="this.parentElement.parentElement.remove()">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                  <line x1="18" y1="6" x2="6" y2="18"></line>
                                  <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                              </button>
                              <iframe 
                                width="100%" 
                                height="500" 
                                src="${video.videoUrl}" 
                                title="Camp Video" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                style="border-radius: 8px;">
                              </iframe>
                            </div>
                          `;
                          document.body.appendChild(videoModal);
                          
                          // Close on background click
                          videoModal.addEventListener('click', (e) => {
                            if (e.target === videoModal) {
                              videoModal.remove();
                            }
                          });
                        }}
                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-2 group/btn"
                      >
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="group-hover/btn:scale-110 transition-transform">
                         <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
                       </svg>
                                               <span>Play Video</span>
                     </button>
                    
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Navigation Button */}
        <div className="flex justify-center mt-16 relative z-20">
          <a 
            href="#teams"
            className="group flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-all duration-300 relative"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-y-0.5 transition-transform duration-300">
                <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">ALTITUDE</span>
          </a>
        </div>
      </section>

      {/* Teams Preview Section */}
      <section id="teams" className="relative py-32 px-8 z-10">
        {/* Section background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/8 to-purple-900/5"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs tracking-wider opacity-60 mb-12 text-center">05 / OUR TEAMS</div>
          <h2 className="font-space-grotesk text-5xl md:text-6xl font-bold text-center mb-20">
            Worship Teams
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Praise & Worship Team",
                subtitle: "Worship",
                description: "",
                members: ""
              },
              {
                title: "Choir",
                subtitle: "Choir",
                description: "",
                members: ""
              },
              {
                title: "Cantonese Worship Team",
                subtitle: "Worship",
                description: "",
                members: ""
              }
            ].map((team, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-lg p-8 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:scale-105 backdrop-blur-sm">
                  <div className="text-xs tracking-wider opacity-50 mb-3">{team.subtitle}</div>
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-white transition-colors">{team.title}</h3>
                  <p className="text-sm leading-relaxed opacity-80 mb-6">{team.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs opacity-60">{team.members}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Section Navigation Button */}
        <div className="flex justify-center mt-16 relative z-20">
          <a 
            href="#links"
            className="group flex flex-col items-center space-y-2 text-white/60 hover:text-white transition-all duration-300 relative"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform group-hover:translate-y-0.5 transition-transform duration-300">
                <path d="M7 13L12 18L17 13M7 6L12 11L17 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xs tracking-wider opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">LANDING</span>
          </a>
        </div>
      </section>

      {/* Quick Links Footer */}
      <section id="links" className="relative py-20 px-8 border-t border-white/10 z-10">
        {/* Footer background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs tracking-wider opacity-60 mb-12 text-center">06 / QUICK LINKS</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Camp Details", href: "#details" },
              { label: "Schedule", href: "#schedule" },
              { label: "Accommodation", href: "#accommodation" },
              { label: "Transportation", href: "#transport" },
              { label: "Fees", href: "#fees" },
              { label: "Packing List", href: "/packing" },
              { label: "FAQ", href: "#faq" },
              { label: "Emergency Contact", href: "#emergency" }
            ].map((link, index) => (
              <a key={index} href={link.href} className="text-sm hover:text-white transition-colors opacity-70 hover:opacity-100">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-8 border-t border-white/5 z-10">
        {/* Footer background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-950/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-space-grotesk font-bold tracking-wide mb-4">FLIGHT MODE</h3>
                <p className="text-sm leading-relaxed opacity-70 max-w-md">
                  Join us for an unforgettable weekend of worship, fellowship, and spiritual renewal. 
                  Together we journey in faith, growing closer to God and each other.
                </p>
              </div>
              
              {/* Camp Details */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-sky-400">
                    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="opacity-80">25-27 October, 2025</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-sky-400 mt-0.5">
                    <path d="M12 13.43C13.7231 13.43 15.12 12.0331 15.12 10.31C15.12 8.58687 13.7231 7.19 12 7.19C10.2769 7.19 8.88 8.58687 8.88 10.31C8.88 12.0331 10.2769 13.43 12 13.43Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M3.62001 8.49C5.59001 -0.169998 18.42 -0.159997 20.38 8.5C21.53 13.58 18.37 17.88 15.6 20.54C13.59 22.48 10.41 22.48 8.39001 20.54C5.63001 17.88 2.47001 13.57 3.62001 8.49Z" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span className="opacity-80">Wainui Park Camp, Wainui Valley Rd, Wainui 7582</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#about" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">About Camp</a></li>
                <li><a href="#teams" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">Our Teams</a></li>
                <li><a href="#schedule" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">Schedule</a></li>
                {process.env.NEXT_PUBLIC_REGISTRATION_URL ? (
                  <li>
                    <a 
                      href={process.env.NEXT_PUBLIC_REGISTRATION_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors"
                    >
                      Registration
                    </a>
                  </li>
                ) : (
                  <li><a href="#registration" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">Registration</a></li>
                )}
              </ul>
            </div>
            
            {/* Camp Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide">Camp Info</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#accommodation" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">Accommodation</a></li>
                <li><a href="#transport" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">Transportation</a></li>
                <li><a href="/packing" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">Packing List</a></li>
                <li><a href="#faq" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm opacity-60">
                © 2025 Flight Mode Camp. All rights reserved.
              </div>
              
              {/* Social Links */}
              <div className="flex items-center space-x-6">
                <span className="text-xs tracking-wider opacity-40">FOLLOW US</span>
                <div className="flex space-x-4">
                  {process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL ? (
                    <a 
                      href={process.env.NEXT_PUBLIC_FACEBOOK_GROUP_URL} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-60 hover:opacity-100 hover:text-sky-300 transition-colors"
                      title="Join our Facebook Private Group"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  ) : (
                    <a href="#" className="opacity-60 hover:opacity-100 hover:text-sky-300 transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 