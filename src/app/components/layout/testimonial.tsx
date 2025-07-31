/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";

// Sample reviews using your local asset
const reviews = [
  {
    name: "Priya",
    review:
      "Absolutely loved the facial here! The ambiance is so calming and staff are wonderful.",
    img: "/assets/img/mausha.jpg",
  },
  {
    name: "Kabir",
    review:
      "The massage exceeded my expectations—attention to detail and expertise were fantastic! Booking was super simple and fast. Will definitely return!",
    img: "/assets/img/naina.jpg",
  },
  {
    name: "Megha",
    review:
      "Manicure was top notch and the products smelled amazing! Highly recommend this spa.",
    img: "/assets/img/rhea.jpg",
  },
  {
    name: "Rohan",
    review:
      "Incredible hot stone massage! Comfortable and clean facilities too.",
    img: "/assets/img/priya.jpg",
  },
  {
    name: "Neha",
    review:
      "Staff gave personal attention, listened to my concerns, and made the whole visit relaxing.",
    img: "/assets/img/pra.jpg",
  },
  {
    name: "Arjun",
    review:
      "This is my favorite spot for regular hair spas. Booking online is a breeze!",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Asha",
    review:
      "Refreshing herbal teas at reception and friendly staff. Lovely experience!",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Samir",
    review:
      "The therapist tailored the massage to my exact needs. Felt so much better after!",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Manusha",
    review:
      "Soothing music, attentive staff, and a great range of treatments. Will come again.",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Rahul",
    review:
      "My mom enjoyed her birthday surprise—thank you for making it special!",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Sara",
    review:
      "Staff genuinely cared and gave me great skincare tips post-treatment.",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Daniel",
    review:
      "Perfect blend of professionalism and warmth. Booking appointments is so convenient.",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Jyoti",
    review:
      "Wonderful atmosphere, calming fragrances, and wonderful herbal facials.",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Shaun",
    review:
      "Had a great couple’s massage—relaxed and pampered by the end of it!",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Ritika",
    review:
      "Thrilled with the custom-made packages. Super friendly therapists and staff.",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Amit",
    review:
      "Massage chair here was so comfy! Great pitstop for tired city folks.",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Mina",
    review:
      "My skin has never felt better! Totally in love with their natural products.",
    img: "/assets/img/makeup.png",
  },
  {
    name: "Adarsh",
    review:
      "Flexible timings, fast appointments, and amazing results every time. Thank you!",
    img: "/assets/img/makeup.png",
  },
];

const TESTIMONIALS_PER_PAGE = 3;

function getPageCount(total: number, perPage: number) {
  return Math.ceil(total / perPage);
}

function getPageItems(from: number, arr: string | any[], perPage: number) {
  return Array.from({ length: perPage }).map(
    (_, i) => arr[(from + i) % arr.length]
  );
}

export default function CustomerFeedbackSection() {
  const [page, setPage] = useState(0);
  const pageCount = getPageCount(reviews.length, TESTIMONIALS_PER_PAGE);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount);
    }, 10000); // Changed to 10 seconds (10000 milliseconds)
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pageCount]);

  function handleDotClick(i: SetStateAction<number>) {
    setPage(i);
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Stop auto-play on manual click
    }
    // Optionally, restart the interval after a delay if you want auto-play to resume
    // setTimeout(() => {
    //   intervalRef.current = setInterval(() => {
    //     setPage((prev) => (prev + 1) % pageCount);
    //   }, 10000); // If restarting, use 10000 here too
    // }, 5000); // Resume auto-play after 5 seconds
  }

  const visibleReviews = getPageItems(
    page * TESTIMONIALS_PER_PAGE,
    reviews,
    TESTIMONIALS_PER_PAGE
  );

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 flex flex-col items-center overflow-hidden">
      <h2 className="text-4xl lg:text-5xl font-extrabold mb-12 font-poppins text-gray-800 text-center">
        Our Customer Feedback
      </h2>
      <div className="relative flex flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 lg:gap-10 w-full max-w-7xl px-4 transition-all duration-700 ease-in-out">
        {visibleReviews.map((review, idx) => {
          const isHighlight = idx === 1; // Middle card is highlighted
          return (
            <div
              key={review.name} // Using review.name as key for better uniqueness
              className={`
                relative flex flex-col items-center justify-between
                rounded-2xl
                px-6 pt-8 pb-8 sm:px-8
                min-h-[350px] sm:min-h-[380px] md:min-h-[400px] flex-1
                transform transition-all duration-500 ease-in-out
                ${
                  isHighlight
                    ? "bg-[#FF2280] text-white shadow-xl lg:shadow-2xl scale-105 md:scale-100 z-10"
                    : "bg-white text-gray-900 border border-gray-100 shadow-md md:shadow-lg scale-95 md:scale-90 opacity-80"
                }
              `}
              style={{
                marginTop: isHighlight ? "-32px" : "0",
              }}>
              <span
                className={`text-[3.5rem] sm:text-[4rem] font-serif mb-3 block leading-none
                  ${
                    isHighlight
                      ? "text-white/80 opacity-90"
                      : "text-[#FF2280] opacity-40"
                  } transform scale-y-125`}
                aria-hidden>
                “
              </span>
              <p className="mb-6 text-center text-base sm:text-lg font-normal flex-grow">
                {review.review}
              </p>
              <div className="flex flex-col items-center mt-4">
                <Image
                  src={review.img}
                  width={70}
                  height={70}
                  alt={review.name}
                  className="rounded-full border-4 border-white shadow-lg"
                  style={{ objectFit: "cover" }}
                />
                <span
                  className={`mt-3 font-semibold text-lg ${
                    isHighlight ? "text-white" : "text-gray-900"
                  }`}>
                  {review.name}
                </span>
              </div>
              {/* Pink pointer triangle under highlighted card */}
              {isHighlight && (
                <div className="absolute left-1/2 -bottom-5 -translate-x-1/2 w-0 h-0 border-x-[10px] border-x-transparent border-t-[10px] border-t-[#FF2280]" />
              )}
            </div>
          );
        })}
      </div>
      {/* Pagination dots for pages */}
      <div className="flex justify-center gap-3 mt-12">
        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            aria-label={`Show testimonials ${i * 3 + 1} to ${(i + 1) * 3}`}
            onClick={() => handleDotClick(i)}
            className={`inline-block h-4 w-4 rounded-full transition-all duration-300 ease-in-out
              ${
                i === page
                  ? "bg-[#FF2280] scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
}
