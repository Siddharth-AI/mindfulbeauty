// 'use client';

// import React, { useState } from "react";
// import FooterBar from "../components/layout/Footer";
// import HeadderBar from "../components/layout/Header";
// import { Image } from "lucide-react";

// function Home() {
//   // Track which tab is selected
//   const [activeService, setActiveService] = useState("home");

//   const features = [
//     {
//       number: "01",
//       title: "Transforming Beauty",
//       description:
//         "Step into Mindful Beauty, where enchantment meets elegance, and every bride’s dream look becomes...",
//       cta: "Know More",
//     },
//     {
//       number: "02",
//       title: "Innovative Enchantment",
//       description:
//         "Mindful Beauty is a tapestry where skilled artisans and innovative geniuses collaborate to redefine...",
//       cta: "Know More",
//     },
//     {
//       number: "03",
//       title: "Join Our Community",
//       description:
//         "Step into a realm where beauty and technology dance in perfect harmony. Whether you're a...",
//       cta: "Know More",
//     },
//     {
//       number: "04",
//       title: "Our Commitment to You",
//       description:
//         "With each service, conversation, and interaction, we vow to, Ensure an unparalleled quality of...",
//       cta: "Know More",
//     },
//   ];

//   const services = [
//     { label: "Nail", img: "/assets/img/nails.png" },
//     { label: "Bridal Makeup", img: "/assets/img/makeup.png" },
//     { label: "Hair", img: "/assets/img/hair.png" },
//     { label: "Skin", img: "/assets/img/preBridal.png" },
//     { label: "Pre - Bridal", img: "/assets/img/bridal.png" },
//   ];

//   const bridalPackages = [
//     {
//       label: "Bridal Makeup",
//       img: "/assets/img/bridalMakeup.png", // Replace with your actual image path
//     },
//     {
//       label: "Pre-Bridal Makeup",
//       img: "/assets/img/preBridal.png", // Replace with your actual image path
//     },
//   ];

//   // Optional: Render different content for each service
//   const renderToggledContent = () => {
//     if (activeService === "home") {
//       return (
//         <div className="mt-8 text-center text-pink-600 font-semibold text-lg">
//           {/* Put your Home Services section here */}
//           Showing Home Services...
//         </div>
//       );
//     }
//     return (
//       <div className="mt-8 text-center text-pink-600 font-semibold text-lg">
//         {/* Put your Salon Services section here */}
//         Showing Salon Services...
//       </div>
//     );
//   };

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
//           flex-col
//           items-center
//           justify-center
//           bg-cover
//           bg-center
//         "
//         style={{
//           backgroundImage: "url('/assets/img/background.png')",
//           fontFamily: "Montserrat, sans-serif",
//         }}
//       >
//         {/* Overlay for readability */}
//         <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/5 pointer-events-none" />
//         {/* Increased margin-top for further spacing */}
//         <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 mt-16">
//           {/* Heading full-width without pink background */}
//           <div
//             className="w-screen flex items-center justify-center mb-8"
//             style={{ height: "6rem" }}
//           >
//             <h1
//               className="
//                 text-3xl
//                 md:text-5xl
//                 font-extrabold
//                 text-white
//                 text-center
//                 tracking-tight
//                 px-4
//               "
//               style={{ fontFamily: "Montserrat, sans-serif", lineHeight: 1.2 }}
//             >
//               Where would you like to get your beauty service
//             </h1>
//           </div>

//           {/* Slider/toggle buttons */}
//           <div className="flex gap-0 mb-6 rounded-full shadow-lg overflow-hidden">
//             <button
//               className={`px-6 py-3 font-semibold text-base transition
//                 focus:outline-none
//                 ${activeService === "home"
//                   ? "bg-pink-600 text-white"
//                   : "bg-white text-pink-600 border-r border-pink-200 hover:bg-pink-50"
//                 }
//               `}
//               style={{
//                 borderTopLeftRadius: "999px",
//                 borderBottomLeftRadius: "999px",
//                 fontFamily: "Montserrat, sans-serif",
//               }}
//               onClick={() => setActiveService("home")}
//               type="button"
//             >
//               Home Services
//             </button>
//             <button
//               className={`px-6 py-3 font-semibold text-base transition
//                 focus:outline-none
//                 ${activeService === "salon"
//                   ? "bg-pink-600 text-white"
//                   : "bg-white text-pink-600 border-l border-pink-200 hover:bg-pink-50"
//                 }
//               `}
//               style={{
//                 borderTopRightRadius: "999px",
//                 borderBottomRightRadius: "999px",
//                 fontFamily: "Montserrat, sans-serif",
//               }}
//               onClick={() => setActiveService("salon")}
//               type="button"
//             >
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

//           {/* Toggleable (slider) content below */}
//           {renderToggledContent()}
//         </div>
//       </section>

//       {/* Second Section */}
//       <section className="w-full bg-white py-16 px-2 md:px-8">
//         <div className="mx-auto max-w-7xl grid grid-cols-1 gap-y-14 gap-x-8 sm:grid-cols-2 md:grid-cols-4">
//           {features.map((feature) => (
//             <div key={feature.number} className="relative flex flex-col items-start">
//               <span
//                 className="absolute left-0 top-0 text-[72px] font-bold text-pink-400 opacity-80 leading-none select-none pointer-events-none z-0"
//                 style={{
//                   fontFamily: "'GFS Didot', serif",
//                   lineHeight: 1,
//                   transform: "translateY(-22px)",
//                 }}
//               >
//                 {feature.number}
//               </span>
//               <div className="pl-[54px] flex flex-col h-full z-10">
//                 <h3
//                   className="text-lg md:text-xl font-extrabold text-gray-900 mb-2"
//                   style={{ fontFamily: "Montserrat, sans-serif" }}
//                 >
//                   {feature.title}
//                 </h3>
//                 <p
//                   className="text-gray-600 text-[15px] mb-2"
//                   style={{ fontFamily: "Montserrat, sans-serif" }}
//                 >
//                   {feature.description}
//                 </p>
//                 <button
//                   className="mt-auto text-pink-600 font-medium underline underline-offset-2 hover:text-pink-800 transition-all text-base pl-0"
//                   style={{ fontFamily: "Montserrat, sans-serif" }}
//                 >
//                   {feature.cta}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Third Section: Featured Services */}
//       <section className="w-full bg-white py-14 flex flex-col items-center">
//         <h2
//           className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight"
//           style={{ fontFamily: "Montserrat, sans-serif" }}
//         >
//           Featured Services
//         </h2>
//         <div className="w-full max-w-full overflow-hidden px-2">
//           <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
//             {services.map((service) => (
//               <div
//                 key={service.label}
//                 className="relative w-full h-[422px] rounded-2xl bg-white shadow-lg overflow-hidden group hover:shadow-pink-200 transition-shadow duration-200 flex"
//               >
//                 <img
//                   src={service.img}
//                   alt={service.label}
//                   className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   loading="lazy"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
//                 <div className="absolute bottom-0 left-0 w-full pb-8 pt-0 px-5 flex flex-col text-center justify-end z-10">
//                   <span
//                     className="text-white text-xl md:text-2xl font-semibold drop-shadow-lg"
//                     style={{ fontFamily: "Montserrat, sans-serif" }}
//                   >
//                     {service.label}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       <br /><br /><br /><br /><br />

//       {/* section 4 for the bridal segment */}
//       <section
//         className="w-full py-14 flex flex-col items-center"
//         style={{
//           backgroundImage: "url('/assets/img/bridalbg.png')"
//         }}
//       >
//         <h2
//           className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 tracking-tight"
//           style={{ fontFamily: "Montserrat, sans-serif" }}
//         >
//           Exclusive Pre Bridal Packages
//         </h2>
//         <div className="w-full max-w-4xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2">
//           {bridalPackages.map((item) => (
//             <div
//               key={item.label}
//               className="relative rounded-2xl overflow-hidden group shadow-lg bg-white flex flex-col items-end h-96"
//             >
//               {/* Image */}
//               <Image
//                 src={item.img}
//                 alt={item.label}
//                 className="absolute w-full h-full object-cover inset-0 group-hover:scale-105 transition-transform duration-300"
//                 loading="lazy"
//               />
//               {/* Overlay for better text contrast */}
//               <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
//               {/* Text label */}
//               <div className="relative z-10 flex flex-1 w-full flex-col justify-end">
//                 <span
//                   className="text-white text-xl sm:text-2xl font-bold pb-6 pl-6 drop-shadow-lg"
//                   style={{ fontFamily: "Montserrat, sans-serif" }}
//                 >
//                   {item.label}
//                 </span>
//               </div>
//             </div>
//           ))}
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
import { Image } from "lucide-react";

function Home() {
  // Track which tab is selected
  const [activeService, setActiveService] = useState("home");

  const features = [
    {
      number: "01",
      title: "Transforming Beauty",
      description:
        "Step into Mindful Beauty, where enchantment meets elegance, and every bride’s dream look becomes...",
      cta: "Know More",
    },
    {
      number: "02",
      title: "Innovative Enchantment",
      description:
        "Mindful Beauty is a tapestry where skilled artisans and innovative geniuses collaborate to redefine...",
      cta: "Know More",
    },
    {
      number: "03",
      title: "Join Our Community",
      description:
        "Step into a realm where beauty and technology dance in perfect harmony. Whether you're a...",
      cta: "Know More",
    },
    {
      number: "04",
      title: "Our Commitment to You",
      description:
        "With each service, conversation, and interaction, we vow to, Ensure an unparalleled quality of...",
      cta: "Know More",
    },
  ];

  const services = [
    { label: "Nail", img: "/assets/img/nails.png" },
    { label: "Bridal Makeup", img: "/assets/img/makeup.png" },
    { label: "Hair", img: "/assets/img/hair.png" },
    { label: "Skin", img: "/assets/img/preBridal.png" },
    { label: "Pre - Bridal", img: "/assets/img/bridalMakeup.png" },
  ];

  const bridalPackages = [
    { label: "Bridal Makeup", img: "/assets/img/bridalMakeup.png" },
    { label: "Pre-Bridal Makeup", img: "/assets/img/preBridal.png" },
  ];

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
          fontFamily: "Montserrat, sans-serif",
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
                fontFamily: "Montserrat, sans-serif",
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
                fontFamily: "Montserrat, sans-serif",
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

      {/* Second Section */}
      <section className="w-full bg-white py-16 px-2 md:px-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-y-14 gap-x-8 sm:grid-cols-2 md:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.number} className="relative flex flex-col items-start">
              <span
                className="absolute left-0 top-0 text-[72px] font-bold text-pink-400 opacity-80 leading-none select-none pointer-events-none z-0"
                style={{
                  fontFamily: "'GFS Didot', serif",
                  lineHeight: 1,
                  transform: "translateY(-22px)",
                }}
              >
                {feature.number}
              </span>
              <div className="pl-[54px] flex flex-col h-full z-10">
                <h3
                  className="text-lg md:text-xl font-extrabold text-gray-900 mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-gray-600 text-[15px] mb-2"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {feature.description}
                </p>
                <button
                  className="mt-auto text-pink-600 font-medium underline underline-offset-2 hover:text-pink-800 transition-all text-base pl-0"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {feature.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Third Section: Featured Services */}
      <section className="w-full bg-white py-14 flex flex-col items-center">
        <h2
          className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Featured Services
        </h2>
        <div className="w-full max-w-full overflow-hidden px-2">
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-5">
            {services.map((service) => (
              <div
                key={service.label}
                className="relative w-full h-[422px] rounded-2xl bg-white shadow-lg overflow-hidden group hover:shadow-pink-200 transition-shadow duration-200 flex"
              >
                <img
                  src={service.img}
                  alt={service.label}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full pb-8 pt-0 px-5 flex flex-col text-center justify-end z-10">
                  <span
                    className="text-white text-xl md:text-2xl font-semibold drop-shadow-lg"
                    style={{ fontFamily: "Montserrat, sans-serif" }}
                  >
                    {service.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Bridal Packages */}
      <section
        className="w-full py-14 flex flex-col items-center"
        style={{
          backgroundImage: "url('/assets/img/bridalbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2
          className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-10 tracking-tight"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Exclusive Pre Bridal Packages
        </h2>
        <div className="w-full max-w-4xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2">
          {bridalPackages.map((item) => (
            <div
              key={item.label}
              className="relative rounded-2xl overflow-hidden group shadow-lg bg-white flex flex-col items-end h-96"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.label}
                className="absolute w-full h-full object-cover inset-0 group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent pointer-events-none" />
              {/* Text label */}
              <div className="relative z-10 flex flex-1 w-full flex-col justify-end">
                <span
                  className="text-white text-xl sm:text-2xl font-bold pb-6 pl-6 drop-shadow-lg"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* this is Section 5 */}



      {/* footer section */}
      <FooterBar />
    </>
  );
}

export default Home;
