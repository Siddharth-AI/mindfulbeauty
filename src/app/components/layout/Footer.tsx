import React from "react";

function FooterBar() {
  return (
    <footer className="bg-white border-t mt-12 text-gray-700" style={{ fontFamily: "Montserrat" }}>
      <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row md:justify-between md:items-start gap-15">
        {/* Left Column (mindful beauty & description) */}
        <div className="flex-1 md:max-w-xs">
          <div className="mb-2">
            <span className="font-bold text-2xl text-pink-600 leading-tight">mindful<br />beauty</span>
          </div>
          <p className="mt-2 text-gray-600 text-base font-normal leading-relaxed">
            Mindful Beauty offers a magical journey where Augmented Intelligence and skilled artisans create unique bridal looks that reflect each bride’s desires. Their innovative approach blends beauty and technology, ensuring personalized care and artistry for an unforgettable experience.
          </p>
        </div>

        {/* Middle Columns (Quick Links and Contact) */}
        <div className="flex-1 flex flex-col md:flex-row gap-12 md:gap-20">
          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-3 text-lg text-gray-900 tracking-wide">Quick links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-pink-600 transition">About Us</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">Reviews</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">Contact us</a></li>
              <li><a href="#" className="hover:text-pink-600 transition">Register as a professional</a></li>
            </ul>
          </div>
          {/* Contact info */}
          <div>
            <h3 className="font-semibold mb-3 text-lg text-gray-900 tracking-wide">Contact Us</h3>
            <div className="mb-2 leading-relaxed text-sm">
              <div>Mindful Beauty</div>
              <div>Chiteth Building, PC Road, Vytilla,</div>
              <div>Kochi - 681019</div>
            </div>
            <div className="mb-2 flex items-center gap-2 text-sm">
              <span className="material-icons text-pink-600 text-base">phone</span>
              <span>+91 9249091961</span>
            </div>
            <div className="mb-4 flex items-center gap-2 text-sm">
              <span className="material-icons text-pink-600 text-base">email</span>
              <span>partnership@mindfulbeauty.ai</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="text-pink-600 hover:scale-110"><i className="fab fa-instagram text-lg"></i></a>
              <a href="#" aria-label="Facebook" className="text-pink-600 hover:scale-110"><i className="fab fa-facebook text-lg"></i></a>
              <a href="#" aria-label="LinkedIn" className="text-pink-600 hover:scale-110"><i className="fab fa-linkedin text-lg"></i></a>
              <a href="#" aria-label="Email" className="text-pink-600 hover:scale-110"><i className="fas fa-envelope text-lg"></i></a>
            </div>
          </div>
        </div>

        {/* Right Column (Newsletter signup) */}
        <div className="flex-1 md:max-w-xs">
          <h3 className="font-semibold mb-3 text-lg text-gray-900 tracking-wide">Signup for Newsletter</h3>
          <p className="mb-4 text-gray-600 text-base">
            Join a community dedicated to transforming beauty and celebrating individual journeys to the altar.
          </p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded border border-gray-300 focus:ring-pink-500 focus:border-pink-500 text-sm"
            />
            <button
              type="submit"
              className="bg-pink-600 text-white rounded px-5 py-2 hover:bg-pink-700 text-sm font-medium transition"
            >
              Submit &rarr;
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4 px-4 text-xs text-gray-800 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 mb-2">
          <span>Anchal</span>
          <span>| Attingal Byp</span>
          <span>| Guruvayur</span>
          <span>| Hyderabad</span>
          <span>| Kerala</span>
          <span>| Kerala</span>
          <span>| Kodiveedu</span>
          <span>| Kollam</span>
          <span>| Kottarakkara</span>
          <span>| Kottayam</span>
          <span>| Kottiyam</span>
          <span>| Kowdiar</span>
          <span>| Koyilandy</span>
          <span>| Kozhikode</span>
          <span>| Nagpur</span>
          <span>| Nandavanam</span>
          <span>| Salem</span>
          <span>| Thiruvalla</span>
          <span>| Thiruvananthapuram</span>
          <span>| Tiruchirappalli</span>
          <span>| Tiruvannamalai</span>
          <span>| Virudhachalam</span>
          <span>| Virudhunagar</span>
        </div>
      </div>

      <hr className="border-gray-200" />
      <div className="flex flex-wrap justify-between items-center px-4 py-4 text-xs max-w-7xl mx-auto">
        <span className="font-medium">© 2025 Mindful Beauty | All rights reserved.</span>
        <div>
          <a href="#" className="hover:text-pink-600">Terms & Conditions</a>
          {" | "}
          <a href="#" className="hover:text-pink-600">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

export default FooterBar;
