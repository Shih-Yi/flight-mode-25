import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-black"></div>
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
      <nav className="flex justify-between items-center px-4 md:px-8 py-6 relative z-10">
        <div className="flex space-x-4 md:space-x-8">
          <a href="#about" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">About</a>
          <a href="#teams" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">Teams</a>
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <h1 className="text-sm tracking-[0.2em] font-medium">FLIGHT MODE</h1>
        </div>
        
        <div className="flex space-x-4 md:space-x-8">
          <a href="#announcements" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">News</a>
          <a href="#contact" className="text-xs md:text-sm tracking-wide hover:text-gray-300 transition-colors">Contact</a>
        </div>
      </nav>

      {/* Main Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-10">
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
        <div className="text-center max-w-6xl">
          <h1 className="font-space-grotesk font-bold leading-[0.75] tracking-tight mb-12">
            <div className="mb-2 relative text-7xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">
              {/* Background image text */}
              <span 
                className="bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ON BOARD
              </span>
              {/* Text stroke for better visibility */}
              <span 
                className="absolute inset-0 text-white opacity-20"
                style={{
                  WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                ON BOARD
              </span>
            </div>
            <div className="mb-8 relative text-7xl md:text-9xl lg:text-[12rem] xl:text-[13rem]">
              {/* Background image text */}
              <span 
                className="bg-clip-text text-transparent bg-cover bg-center bg-fixed"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1522158637959-30385a09e0da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                WITH GOD
              </span>
              {/* Text stroke for better visibility */}
              <span 
                className="absolute inset-0 text-white opacity-20"
                style={{
                  WebkitTextStroke: '3px rgba(255, 255, 255, 0.3)',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                WITH GOD
              </span>
            </div>
            <div className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light tracking-[0.2em] relative">
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
              {/* Text stroke for better visibility */}
              <span 
                className="absolute inset-0 text-white opacity-15"
                style={{
                  WebkitTextStroke: '2px rgba(255, 255, 255, 0.2)',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                2025
              </span>
            </div>
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
          <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center cursor-pointer hover:border-white/50 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 5V19M12 19L7 14M12 19L17 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Camp Introduction Section */}
      <section id="about" className="relative py-32 px-8 z-10">
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
                  A revolutionary experience combining traditional worship with modern technology. 
                  We will host this unprecedented worship camp in summer 2025, inviting the 
                  Praise & Worship Team, Choir, and Cantonese Worship Team to join this spiritual journey.
                </p>
                <p>
                  Through music, worship, fellowship, and learning, we will explore the depths of faith together 
                  and experience a more intimate relationship with God.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-8 backdrop-blur-sm border border-white/10">
                <h3 className="text-xl font-semibold mb-6 tracking-wide">Camp Information</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-sm opacity-70">Date</span>
                    <span className="text-sm font-medium">July 15-18, 2025</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-sm opacity-70">Location</span>
                    <span className="text-sm font-medium">TBD</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-sm opacity-70">Participants</span>
                    <span className="text-sm font-medium">Worship Team Members</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm opacity-70">Registration</span>
                    <span className="text-sm font-medium">Opening Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="relative py-20 px-8 z-10">
        {/* Section background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/5 via-purple-900/10 to-blue-900/5"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs tracking-wider opacity-60 mb-12 text-center">02 / QUICK ACCESS</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Schedule", subtitle: "Camp Program", href: "#schedule" },
              { title: "Teams", subtitle: "Worship Teams", href: "#teams" },
              { title: "Registration", subtitle: "Sign Up", href: "#registration" },
              { title: "Contact", subtitle: "Get in Touch", href: "#contact" }
            ].map((item, index) => (
              <a key={index} href={item.href} className="group">
                <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                  <div className="text-xs tracking-wider opacity-50 mb-2">{item.subtitle}</div>
                  <h3 className="text-lg font-medium group-hover:text-white transition-colors">{item.title}</h3>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Announcements Section */}
      <section id="announcements" className="relative py-20 px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <div className="text-xs tracking-wider opacity-60 mb-4">03 / LATEST NEWS</div>
              <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold">Latest Updates</h2>
            </div>
            <a href="#" className="text-sm tracking-wide hover:text-gray-300 transition-colors flex items-center space-x-2">
              <span>View All</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
          
          <div className="space-y-6">
            {[
              { date: "2024.12.15", title: "Camp Planning Meeting Notice", category: "Important", isNew: true },
              { date: "2024.12.10", title: "Team Recruitment Started", category: "Recruitment", isNew: true },
              { date: "2024.12.05", title: "Camp Theme Confirmed", category: "Update", isNew: false },
              { date: "2024.12.01", title: "Venue Planning Completed", category: "Progress", isNew: false }
            ].map((news, index) => (
              <div key={index} className="group border-b border-white/10 pb-6 hover:border-white/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-xs opacity-50">{news.date}</span>
                      <span className="text-xs bg-white/10 px-2 py-1 rounded">{news.category}</span>
                      {news.isNew && <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">NEW</span>}
                    </div>
                    <h3 className="text-lg font-medium group-hover:text-white transition-colors">{news.title}</h3>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teams Preview Section */}
      <section id="teams" className="relative py-32 px-8 z-10">
        {/* Section background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/5 via-blue-900/8 to-purple-900/5"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs tracking-wider opacity-60 mb-12 text-center">04 / OUR TEAMS</div>
          <h2 className="font-space-grotesk text-5xl md:text-6xl font-bold text-center mb-20">
            Worship Teams
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Praise & Worship Team",
                subtitle: "Contemporary Worship",
                description: "Leading congregational worship through contemporary music and heartfelt praise",
                members: "15+ Members"
              },
              {
                title: "Choir",
                subtitle: "Traditional & Modern",
                description: "Blending traditional and contemporary styles through harmonious vocals",
                members: "25+ Members"
              },
              {
                title: "Cantonese Worship Team",
                subtitle: "Cultural Heritage",
                description: "Worshiping in native language, preserving cultural depth and warmth of faith",
                members: "12+ Members"
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
      </section>

      {/* Quick Links Footer */}
      <section className="relative py-20 px-8 border-t border-white/10 z-10">
        {/* Footer background */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/10 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-xs tracking-wider opacity-60 mb-12 text-center">05 / QUICK LINKS</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Camp Details", href: "#details" },
              { label: "Schedule", href: "#schedule" },
              { label: "Accommodation", href: "#accommodation" },
              { label: "Transportation", href: "#transport" },
              { label: "Fees", href: "#fees" },
              { label: "Packing List", href: "#packing" },
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
    </div>
  );
}
