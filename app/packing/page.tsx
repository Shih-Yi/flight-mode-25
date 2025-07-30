"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function PackingPage() {
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
      
      const scrollDiff = scrollTop - lastScrollY.current;
      if (Math.abs(scrollDiff) > 5) {
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
    
    const initialScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollY.current = initialScrollTop;
    setScrollY(initialScrollTop);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const packingCategories = [
    {
      title: "Clothing Essentials",
      icon: "👕",
      priority: "high",
      items: [
        "Warm Clothes",
        "Sports Clothing",
        "Clothes to Change",
        "Sports Shoes",
        "Indoor Slippers"
      ]
    },
    {
      title: "Personal Care & Protection",
      icon: "🧴",
      priority: "high",
      items: [
        "Sunscreen",
        "Toiletries (Hairbrush, Toothbrush, Toothpaste, Shampoo, Body Wash, Towel, etc.)",
        "Insect Repellent (optional)"
      ]
    },
    {
      title: "Sleeping & Rest",
      icon: "🛏️",
      priority: "high",
      items: [
        "Sleeping Bag"
      ]
    },
    {
      title: "Essential Tools",
      icon: "🔦",
      priority: "high",
      items: [
        "Flashlight"
      ]
    },
    {
      title: "Spiritual & Study Materials",
      icon: "📖",
      priority: "high",
      items: [
        "Bible",
        "Notebooks & Stationery"
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-sky-400/40 bg-sky-900/10';
      case 'medium': return 'border-yellow-400/40 bg-yellow-900/10';
      case 'low': return 'border-green-400/40 bg-green-900/10';
      default: return 'border-white/20 bg-gray-900/10';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Essential';
      case 'medium': return 'Important';
      case 'low': return 'Optional';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Flight Progress Indicator */}
      <div className={`fixed top-0 right-4 md:right-8 h-screen w-1 bg-white/10 z-50 pointer-events-none transition-all duration-1000 ease-out ${
        isScrolling ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}>
        <div 
          className="w-full bg-gradient-to-b from-blue-400 via-purple-500 to-yellow-400 transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        ></div>
        
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
        <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 via-blue-900/20 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-gray-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
        
        <div className="absolute inset-0 opacity-[0.03] bg-repeat" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' result='noise' seed='1'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
               backgroundSize: '100px 100px'
             }}>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-between items-center px-4 md:px-8 py-6 relative z-10">
        <div className="flex space-x-4 md:space-x-8">
          <Link href="/#about" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">About</Link>
          <Link href="/#teams" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">Teams</Link>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <Link href="/" className="text-sm tracking-[0.2em] font-medium hover:text-gray-300 transition-colors">FLIGHT MODE</Link>
        </div>
        
        <div className="flex space-x-4 md:space-x-8">
          <Link href="/#announcements" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">News</Link>
          <Link href="/#contact" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">Contact</Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-10 mt-4">
        {/* Back button */}
        <div className="absolute top-16 left-8 cursor-pointer group">
          <Link href="/">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-110">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Luggage Icon */}
        <div className="absolute top-16 right-8 cursor-pointer group">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-blue-300 transition-all duration-300 transform group-hover:scale-110">
            <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6ZM6.5 4H17.5L19.5 6H4.5L6.5 4ZM5 8H19V20H5V8Z" 
                  fill="currentColor" className="drop-shadow-lg"/>
          </svg>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-6xl mb-20 -mt-48 md:mt-0">
          <h1 className="font-space-grotesk font-bold leading-[0.75] tracking-tight">
            <div className="mb-2 relative text-7xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">
              <span 
                className="bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                PACKING
              </span>
              <span 
                className="absolute inset-0 text-white opacity-20"
                style={{
                  WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                PACKING
              </span>
            </div>
            <div className="mb-6 lg:mb-6 relative text-7xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">
              <span 
                className="bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                LIST
              </span>
              <span 
                className="absolute inset-0 text-white opacity-20"
                style={{
                  WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                LIST
              </span>
            </div>
            
            <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.2em] relative mb-4">
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

        {/* Description */}
        <div className="hidden md:block absolute bottom-32 right-8 max-w-xs text-right">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed opacity-80">
              Essential items for your<br/>
              <span className="font-semibold text-white">Camp Journey</span> <br/>
            </p>
            <div className="w-12 h-px bg-white/30 ml-auto mt-4"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-48 md:bottom-1 left-1/2 transform -translate-x-1/2 group cursor-pointer" onClick={() => document.getElementById('packing-categories')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="relative w-20 h-20 rounded-full border border-white/15 hover:border-white/30 transition-all duration-500 group-hover:scale-110">
            <div className="absolute inset-3 rounded-full bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-transparent border border-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white group-hover:text-blue-300 transition-all duration-300 transform rotate-180 group-hover:translate-y-1">
                <path d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6ZM6.5 4H17.5L19.5 6H4.5L6.5 4ZM5 8H19V20H5V8Z" 
                      fill="currentColor" className="drop-shadow-lg"/>
              </svg>
            </div>
            
            <div className="absolute inset-0 animate-spin" style={{animationDuration: '4s'}}>
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs tracking-wider text-blue-300 whitespace-nowrap">PACK</span>
          </div>
        </div>
      </div>

      {/* Packing Categories Section */}
      <section id="packing-categories" className="relative py-20 px-8 z-10 -mt-16 md:mt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <div className="text-xs tracking-wider opacity-60 mb-8">CAMP ESSENTIALS</div>
            <h2 className="font-space-grotesk text-5xl md:text-6xl font-bold leading-tight mb-8">
              What to Bring
            </h2>
            <p className="text-lg opacity-80 max-w-3xl mx-auto">
              Prepare for an amazing camp experience with this comprehensive packing checklist. 
              Items are organized by priority to help you pack efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {packingCategories.map((category, index) => (
              <div key={index} className="group">
                <div className={`${getPriorityColor(category.priority)} rounded-lg p-6 border transition-all duration-300 hover:border-white/30 backdrop-blur-sm`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-white transition-colors">{category.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          category.priority === 'high' ? 'bg-sky-400/20 text-sky-300' :
                          category.priority === 'medium' ? 'bg-yellow-400/20 text-yellow-300' :
                          'bg-green-400/20 text-green-300'
                        }`}>
                          {getPriorityLabel(category.priority)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3 text-sm opacity-80 hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Tips Section */}
          <div className="mt-16 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-8 backdrop-blur-sm border border-white/10">
            <h3 className="text-2xl font-semibold mb-6 tracking-wide flex items-center space-x-3">
              <span>💡</span>
              <span>Packing Tips</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed opacity-80">
              <div>
                <h4 className="font-semibold text-white mb-2">Essential Reminders:</h4>
                <ul className="space-y-2">
                  <li>• Check the weather forecast for Wainui</li>
                  <li>• Bring extra batteries for your flashlight</li>
                  <li>• Label all personal belongings</li>
                  <li>• Pack warm clothes for cool evenings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2"></h4>
                <ul className="space-y-2">
                  <li>• Test your flashlight before packing</li>
                  <li>• Bring comfortable sports clothing for activities</li>
                  <li>• Pack toiletries in waterproof bags</li>
                  <li>• Don&apos;t forget indoor slippers for comfort</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="flex justify-center mt-16">
            <Link 
              href="/"
              className="group flex items-center space-x-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-3 rounded-full border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-blue-400 group-hover:text-blue-300 transition-colors">
                <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium tracking-wide text-blue-300 group-hover:text-white transition-colors">
                Back to Flight Mode
              </span>
            </Link>
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
                <li><a href="#registration" className="opacity-70 hover:opacity-100 hover:text-sky-300 transition-colors">Registration</a></li>
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
                  <a href="#" className="opacity-60 hover:opacity-100 hover:text-sky-300 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 