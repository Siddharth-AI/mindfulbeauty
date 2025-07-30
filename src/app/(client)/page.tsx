'use client';

import React, { useEffect, useRef, useState } from "react";
import FooterBar from "../components/layout/Footer";
import HeadderBar from "../components/layout/Header";
import { Image, Link } from "lucide-react";
import CustomerFeedbackSection from "../components/layout/testimonial";

function Home() {
  // Track which tab is selected
  const [activeService, setActiveService] = useState("home");
  const [startIdx, setStartIdx] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % reviews.length);
    }, 15000); // 15 seconds

    return () => clearInterval(intervalRef.current);
  }, []);

  // Helper to get 3 reviews, wrap-around if needed
  const getVisibleReviews = () => {
    return [0, 1, 2].map((offset) => reviews[(startIdx + offset) % reviews.length]);
  };

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

  const [activeTab, setActiveTab] = useState("salon")

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

  const steps = [
    {
      img: "/assets/img/img1.png",
      step: "01",
      title: "Search or Try a service",
      desc: "Find the perfect home or salon beauty service.",
    },
    {
      img: "/assets/img/img2.png",
      step: "02",
      title: "Schedule an appointment",
      desc: "Select a convenient date and time.",
    },
    {
      img: "/assets/img/img3.png",
      step: "03",
      title: "Pay, track and receive",
      desc: "Complete payment, track the booking, and enjoy the service.",
    },
    {
      img: "/assets/img/img4.png",
      step: "04",
      title: "Rate and review",
      desc: "Share your experience and feedback.",
    },
  ];

  const faqs = {
    "Home Service": [
      {
        question: "What home services do you offer?",
        answer: "We offer a wide range of home services including facials, manicures, pedicures, massages, hair spas, and waxing. Our skilled professionals bring the salon experience right to your doorstep."
      },
      {
        question: "How do I book a home service appointment?",
        answer: "You can easily book a home service appointment through our website or mobile app. Simply select your desired service, date, time, and location, and confirm your booking. You can also call us directly."
      },
      {
        question: "What areas do you provide home services in?",
        answer: "Our home services are currently available in major metropolitan areas including Delhi, Mumbai, Bangalore, Chennai, and Hyderabad. Please check our website for a complete list of service areas."
      },
      {
        question: "Is there a minimum booking amount for home services?",
        answer: "Yes, there is a minimum booking amount of ₹500 for all home service appointments. This helps us ensure the best quality service and manage our logistics efficiently."
      },
      {
        question: "What products do you use for home services?",
        answer: "We use only high-quality, professional-grade products from reputable brands for all our home services, ensuring safety, effectiveness, and a premium experience. Our products are suitable for various skin and hair types."
      }
    ],
    "Salon Service": [
      {
        question: "Do I need an appointment for salon services?",
        answer: "While walk-ins are welcome, we highly recommend booking an appointment for salon services to ensure availability and minimize your waiting time, especially during peak hours."
      },
      {
        question: "What are your salon operating hours?",
        answer: "Our salon typically operates from 10:00 AM to 8:00 PM, Monday through Saturday. We are closed on Sundays and major public holidays. Please check our website for specific holiday hours."
      },
      {
        question: "Can I choose my stylist/therapist for salon services?",
        answer: "Yes, you can request a specific stylist or therapist when booking your salon appointment, subject to their availability. We'll do our best to accommodate your preference."
      },
      {
        question: "Do you offer group bookings or packages?",
        answer: "Absolutely! We offer various group booking options and customized packages for special occasions like bridal parties, birthdays, and corporate events. Please contact us for details and pricing."
      },
      {
        question: "What safety measures are in place at your salon?",
        answer: "We prioritize the health and safety of our clients and staff. Our salon adheres to strict hygiene protocols, including regular sanitization, use of disposable tools where possible, and mandatory mask-wearing for staff."
      }
    ]
  };

  const [activeTab1, setActiveTab1] = useState("Home Service");
  const [openIndex, setOpenIndex] = useState(null); // State to manage which FAQ item is open

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setOpenIndex(null); // Close any open FAQ item when switching tabs
  };

  const handleToggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentFAQs = faqs[activeTab1];

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
      <section className="max-w-3xl mx-auto min-h-screen py-12 flex flex-col items-center">
        {/* Main Heading */}
        <h1 className="text-[2.25rem] leading-[2.5rem] font-extrabold mb-8 text-center">
          Recommended Best
        </h1>

        {/* Tabs */}
        <div className="flex space-x-14 mb-8">
          <button
            className={`text-[1.125rem] font-semibold pb-1 border-b-2 ${activeTab === "salon"
              ? "border-pink-500 text-pink-600"
              : "border-transparent text-gray-900"
              }`}
            onClick={() => setActiveTab("salon")}
          >
            Salon from your Location
          </button>
          <button
            className={`text-[1.125rem] font-semibold pb-1 border-b-2 ${activeTab === "specialist"
              ? "border-pink-500 text-pink-600"
              : "border-transparent text-gray-900"
              }`}
            onClick={() => setActiveTab("specialist")}
          >
            Specialist from your Location
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center mt-16">
          <h2 className="text-[1.25rem] font-bold mb-2">Oops! Nothing Here</h2>
          <p
            className="text-base text-gray-600 text-center mb-8"
            style={{ maxWidth: "80vw" }}
          >
            No salon/freelancer nearby at the moment, but we’re growing! Come back in a month—we might be closer than you think.
          </p>
          {/* Illustration Placeholder */}
          <div className="bg-gray-100 rounded-xl p-8">
            <svg width="120" height="96" fill="none" viewBox="0 0 80 64" aria-hidden="true">
              <rect width="80" height="64" rx="12" fill="#E5E7EB" />
              <path
                d="M24 40h32M32 48h16"
                stroke="#D1D5DB"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <rect x="28" y="24" width="24" height="16" rx="2" fill="#D1D5DB" />
              <path d="M32 28v4" stroke="#9CA3AF" strokeWidth="2" />
              <circle cx="36" cy="32" r="1" fill="#6B7280" />
            </svg>
          </div>
        </div>
      </section>

      {/* this is secton 6 */}


      <section className="bg-mindfulLightPink py-[60px] overflow-x-hidden bg-pink-50">
        <div className="container mx-auto px-4 relative">
          <div className="text-center">
            <h2 className="font-Montserrat text-[40px] text-mindfulBlack font-bold mb-[30px] max-lg:text-[35px] max-md:text-[30px] max-md:mb-[20px] max-sm:text-[24px]">
              Bridal Beauty Service Booking Flow
            </h2>
          </div>

          {/* SVG curved dotted line (desktop only) */}
          <svg
            className="hidden lg:block absolute left-0 right-0 top-[160px] w-full h-[200px] z-0 pointer-events-none"
            width="100%"
            height="200"
            viewBox="0 0 1200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M140 100 Q320 0 440 100 Q560 200 840 100 Q1020 0 1060 100"
              stroke="#33A6DB"
              strokeWidth="4"
              strokeDasharray="10,15"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          <div className="relative z-10 bg-bookingFlowBgImg bg-no-repeat bg-top bg-contain">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 translate-y-10">
              {steps.map(({ img, step, title, desc }, i) => (
                <div className="text-center" key={i}>
                  <div className="relative mb-4">
                    <img
                      src={img}
                      alt={title}
                      className="w-fit mx-auto"
                    />
                    <div className="absolute top-0 right-[80px] rounded-full w-14 h-14 flex items-center justify-center bg-[#33A6DB] shadow-lg">
                      <span className="text-[22px] font-bold font-Montserrat text-white leading-none">{step}</span>
                    </div>
                  </div>
                  <div className="w-48 mx-auto">
                    <h5 className="text-lg text-mindfulBlack font-semibold mb-2 leading-tight">{title}</h5>
                    <p className="text-mindfulBlack mb-2">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* section 7 */}

      <CustomerFeedbackSection />

      {/* section 8 */}

      <section className="py-16 bg-gray-50 font-poppins relative overflow-hidden">
        {/* Background pattern - you might need to adjust the path */}
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: "url('/assets/img/background-pattern.png')", // Adjust path to your actual pattern image
            backgroundRepeat: "repeat",
            backgroundSize: "200px", // Adjust size of the pattern elements
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-12">
            Frequently Asked Questions
          </h2>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-10 space-x-6 md:space-x-10">
            {["Home Service", "Salon Service"].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`
                text-xl md:text-2xl font-semibold pb-2 relative
                ${activeTab === tab
                    ? "text-[#FF2280] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FF2280] after:scale-x-100 after:transition-transform after:duration-300"
                    : "text-gray-600 hover:text-gray-800 transition-colors after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-transparent after:scale-x-0 hover:after:bg-gray-400 hover:after:scale-x-75 after:transition-all after:duration-300"
                  }
              `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-6">
            {currentFAQs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 ease-in-out"
              >
                <button
                  className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
                  onClick={() => handleToggleFAQ(index)}
                  aria-expanded={openIndex === index ? "true" : "false"}
                >
                  <span className="text-lg md:text-xl font-medium text-gray-800">
                    {faq.question}
                  </span>
                  <span className="text-2xl text-[#FF2280] transition-transform duration-300">
                    {openIndex === index ? '-' : '+'}
                  </span>
                </button>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${openIndex === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                  <p className="px-6 pb-6 text-gray-600 text-base md:text-lg">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* section 9 */}

      <section className="flex justify-center my-8">
        <Link href="/login" passHref>
          {/* Parent div must be relative and fixed size for Image fill */}
          <div className="relative w-full max-w-[1550px] h-[306px] rounded-xl shadow-lg cursor-pointer overflow-hidden">
            <Image
              src="/assets/banner-section8.png" // Make sure this image exists in /public/assets/
              alt="Register as a Professional Banner"
              fill  /* Correct boolean prop usage */
              className="object-cover"
              priority
            />
          </div>
        </Link>
      </section>

      {/* footer section */}
      <FooterBar />
    </>
  );
}

export default Home;



{/* <div class="relative"><div class="xl:h-[80px] lg:h-[80px] md:h-[65px] sm:h-[70px] h-[70px] text-center bg-mindfulBlack mix-blend-overlay"></div><div class="absolute top-1 left-0 right-0 text-center max-lg:top-4 max-md:top-5 max-sm:top-2"><h1 class="font-Montserrat font-light leading-custom-line-height w-full xl:text-[50px] lg:text-[45px] md:text-[35px] sm:text-[30px] text-[24px] text-mindfulWhite">Where would you like to get your beauty service</h1></div></div> */ }