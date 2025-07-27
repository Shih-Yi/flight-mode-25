import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-8 py-6 relative z-10">
        <div className="flex space-x-8">
          <a href="#" className="text-sm tracking-wide hover:text-gray-300 transition-colors">About</a>
          <a href="#" className="text-sm tracking-wide hover:text-gray-300 transition-colors">Services</a>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-sm tracking-[0.2em] font-medium">FLIGHT MODE</h1>
        </div>
        
        <div className="flex space-x-8">
          <a href="#" className="text-sm tracking-wide hover:text-gray-300 transition-colors">Cases</a>
          <a href="#" className="text-sm tracking-wide hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-8 relative">
        {/* Creative Studio Label */}
        <div className="absolute top-16 left-8">
          <div className="text-xs tracking-wider opacity-60">
            <div>Worship</div>
            <div>Camp</div>
          </div>
        </div>

        {/* Arrow Icon */}
        <div className="absolute top-16 right-8">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-5xl">
          <h1 className="font-space-grotesk text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tight mb-12">
            <div className="mb-4">ON BOARD</div>
            <div className="mb-4">WITH GOD</div>
            <div className="text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.1em]">2025</div>
          </h1>
        </div>

        {/* Description */}
        <div className="absolute bottom-32 right-8 max-w-sm text-right">
          <p className="text-sm leading-relaxed opacity-80">
            The first full-stack Worship<br/>
            Camp experience integrating Faith<br/>
            technology to deliver best-in-<br/>
            class spiritual experience.
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center">
            <div className="text-xs tracking-wider transform rotate-90 opacity-60">SCROLL TO DISCOVER</div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white ml-2">
              <path d="M12 5V19M12 19L7 14M12 19L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black pointer-events-none"></div>
      
      {/* Subtle grain effect */}
      <div className="absolute inset-0 opacity-[0.02] bg-repeat" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='1' result='noise' seed='1'/%3E%3CfeColorMatrix in='noise' type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
             backgroundSize: '100px 100px'
           }}>
      </div>
    </div>
  );
}
