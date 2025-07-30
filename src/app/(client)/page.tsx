// 'use client';

// import FooterBar from "../components/layout/Footer";
// import HeadderBar from "../components/layout/Header";

// function Home() {
//   return (
//     <>
//       <HeadderBar />

//       {/* Hero Section */}
//       <section
//         className="
//           relative
//           w-full
//           min-h-screen
//           flex
//           items-center
//           justify-center
//           bg-cover
//           bg-center
//         "
//         style={{
//           backgroundImage: "url('/assets/img/background.png')",
//           fontFamily: "Montserrat, sans-serif"
//         }}
//       >
//         {/* Overlay for readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/5 pointer-events-none" />
//         <div className="relative z-10 w-full flex flex-col items-center justify-center px-4">

//           {/* Vibrant color band with heading */}
//           <div
//             className="
//               px-6 py-4
//               mb-8
//               bg-gradient-to-r from-pink-600 to-pink-400/90
//               rounded-lg
//               shadow-lg
//               w-full
//               max-w-2xl
//               flex
//               items-center
//               justify-center
//             "
//           >
//             <h1
//               className="w-full text-xl md:text-3xl lg:text-4xl font-bold text-center text-white tracking-wide"
//               style={{
//                 fontFamily: "Montserrat, sans-serif",
//                 lineHeight: "1.2",
//                 letterSpacing: "-1px"
//               }}
//             >
//               Where would you like to get your beauty service
//             </h1>
//           </div>

//           {/* Service buttons */}
//           <div className="flex gap-4 mb-6">
//             <button className="px-6 py-3 rounded-full bg-white shadow font-semibold text-pink-600 border border-pink-200 hover:bg-pink-50 transition">
//               Home Services
//             </button>
//             <button className="px-6 py-3 rounded-full bg-white shadow font-semibold text-pink-600 border border-pink-200 hover:bg-pink-50 transition">
//               Salon Services
//             </button>
//           </div>

//           {/* Search Bar */}
//           <form className="flex w-full max-w-xl rounded-full shadow bg-white overflow-hidden">
//             <input
//               className="flex-1 px-4 py-3 outline-none text-gray-700 text-base"
//               type="text"
//               placeholder="What are you looking for?"
//               aria-label="Service"
//               style={{ fontFamily: "Montserrat, sans-serif" }}
//             />
//             <input
//               className="w-40 px-3 py-3 outline-none text-gray-700 text-base border-l border-gray-200"
//               type="text"
//               placeholder="Location / Pincode"
//               aria-label="Location"
//               style={{ fontFamily: "Montserrat, sans-serif" }}
//             />
//             <button
//               className="bg-pink-600 px-6 text-white font-semibold text-base rounded-full hover:bg-pink-700 transition ml-2"
//               type="submit"
//               style={{ fontFamily: "Montserrat, sans-serif" }}
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </section>

//       <FooterBar />
//     </>
//   );
// }

// export default Home;


'use client';

import React, { useState } from "react";
import FooterBar from "../components/layout/Footer";
import HeadderBar from "../components/layout/Header";

function Home() {
  // Track which tab is selected
  const [activeService, setActiveService] = useState("home");

  // Optional: Render different content for each service
  const renderToggledContent = () => {
    if (activeService === "home") {
      return (
        <div className="mt-8 text-center text-pink-600 font-semibold text-lg">
          {/* Put your Home Services section here */}
          Showing Home Services...
        </div>
      );
    }
    return (
      <div className="mt-8 text-center text-pink-600 font-semibold text-lg">
        {/* Put your Salon Services section here */}
        Showing Salon Services...
      </div>
    );
  };

  return (
    <>
      <HeadderBar />

      {/* Hero Section */}
      <section
        className="
          relative
          w-full
          min-h-screen
          flex
          flex-col
          items-center
          justify-center
          bg-cover
          bg-center
        "
        style={{
          backgroundImage: "url('/assets/img/background.png')",
          fontFamily: "Montserrat, sans-serif"
        }}
      >
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/5 pointer-events-none" />
        {/* Increased margin-top for further spacing */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 mt-16">

          {/* Heading full-width without pink background */}
          <div
            className="w-screen flex items-center justify-center mb-8"
            style={{ height: "6rem" }}
          >
            <h1
              className="
                text-3xl
                md:text-5xl
                font-extrabold
                text-white
                text-center
                tracking-tight
                px-4
              "
              style={{ fontFamily: "Montserrat, sans-serif", lineHeight: 1.2 }}
            >
              Where would you like to get your beauty service
            </h1>
          </div>

          {/* Slider/toggle buttons */}
          <div className="flex gap-0 mb-6 rounded-full shadow-lg overflow-hidden">
            <button
              className={`px-6 py-3 font-semibold text-base transition
                focus:outline-none
                ${activeService === "home"
                  ? "bg-pink-600 text-white"
                  : "bg-white text-pink-600 border-r border-pink-200 hover:bg-pink-50"
                }
              `}
              style={{
                borderTopLeftRadius: "999px",
                borderBottomLeftRadius: "999px",
                fontFamily: "Montserrat, sans-serif"
              }}
              onClick={() => setActiveService("home")}
              type="button"
            >
              Home Services
            </button>
            <button
              className={`px-6 py-3 font-semibold text-base transition
                focus:outline-none
                ${activeService === "salon"
                  ? "bg-pink-600 text-white"
                  : "bg-white text-pink-600 border-l border-pink-200 hover:bg-pink-50"
                }
              `}
              style={{
                borderTopRightRadius: "999px",
                borderBottomRightRadius: "999px",
                fontFamily: "Montserrat, sans-serif"
              }}
              onClick={() => setActiveService("salon")}
              type="button"
            >
              Salon Services
            </button>
          </div>

          {/* Search Bar */}
          <form className="flex w-full max-w-xl rounded-full shadow bg-white overflow-hidden">
            <input
              className="flex-1 px-4 py-3 outline-none text-gray-700 text-base"
              type="text"
              placeholder="What are you looking for?"
              aria-label="Service"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            />
            <input
              className="w-40 px-3 py-3 outline-none text-gray-700 text-base border-l border-gray-200"
              type="text"
              placeholder="Location / Pincode"
              aria-label="Location"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            />
            <button
              className="bg-pink-600 px-6 text-white font-semibold text-base rounded-full hover:bg-pink-700 transition ml-2"
              type="submit"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Search
            </button>
          </form>

          {/* Toggleable (slider) content below */}
          {renderToggledContent()}
        </div>
      </section>

      <FooterBar />
    </>
  );
}

export default Home;
