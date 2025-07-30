'use client';

function HeadderBar() {
  return (
    <>
      <header className="bg-white border-b w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          {/* Left: Logo and Tagline */}
          <div className="flex items-center">
            <div className="rounded-full border-4 border-yellow-300 w-7 h-7 flex items-center justify-center mr-2">
              {/* Empty div or place logo img in center */}
              {/* <img src="/logo.png" alt="logo" className="w-4 h-4" /> */}
            </div>
            {/* Brand and Tagline */}
            <div>
              <span className="text-pink-600 font-bold text-2xl leading-none inline-block" style={{ letterSpacing: "-1.5px" }}>
                mindful<br />beauty
              </span>
              <div className="text-[10px] text-blue-500 font-medium tracking-widest mt-0.5" style={{ fontSize: "10px" }}>
                RE / IMAGINE YOURSELF
              </div>
            </div>
          </div>

          {/* Right: Menu Icon */}
          <div className="flex items-center">
            <button
              aria-label="Menu"
              className="ml-2 p-2 hover:bg-pink-50 rounded-md transition"
            >
              {/* Custom menu icon - 3 horizontal lines */}
              <span className="block w-6 h-1 bg-pink-500 rounded mb-1"></span>
              <span className="block w-5 h-1 bg-pink-500 rounded mb-1 ml-auto"></span>
              <span className="block w-4 h-1 bg-pink-500 rounded ml-auto"></span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default HeadderBar;