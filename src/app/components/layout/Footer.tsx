import React from "react";

function FooterBar() {
  return (
    <>
      <footer className="bg-white border-t mt-12 text-gray-700 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div>
            <div className="flex items-center mb-2">
              {/* <img src="/logo.png" alt="Mindful Beauty Logo" className="h-10 mr-2" /> */}
              <span className="font-semibold text-lg text-pink-600">mindful<br />beauty</span>
            </div>
            <p className="mt-2 text-gray-600 text-base font-normal leading-relaxed">
              Mindful Beauty offers a magical journey where Augmented Intelligence and skilled artisans create unique bridal looks that reflect each bride’s desires. Their innovative approach blends beauty and technology, ensuring personalized care and artistry for an unforgettable experience.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold mb-2 text-base">Quick links</h3>
            <ul className="space-y-1 text-gray-700">
              <li><a href="#" className="hover:text-pink-600">About Us</a></li>
              <li><a href="#" className="hover:text-pink-600">Reviews</a></li>
              <li><a href="#" className="hover:text-pink-600">Contact us</a></li>
              <li><a href="#" className="hover:text-pink-600">Register as a professional</a></li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-bold mb-2 text-base">Contact Us</h3>
            <p className="mb-1">Mindful Beauty<br />
              Chiteth Building, PC Road, Vytilla,<br />
              Kochi - 681019
            </p>
            <p className="flex items-center mb-1">
              <span className="material-icons text-pink-600 text-base mr-2">phone</span>
              +91 9249091961
            </p>
            <p className="flex items-center mb-1">
              <span className="material-icons text-pink-600 text-base mr-2">email</span>
              partnership@mindfulbeauty.ai
            </p>
            <div className="mt-3 flex space-x-3">
              <a href="#" aria-label="Instagram" className="text-pink-600 hover:scale-110"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="Facebook" className="text-pink-600 hover:scale-110"><i className="fab fa-facebook"></i></a>
              <a href="#" aria-label="LinkedIn" className="text-pink-600 hover:scale-110"><i className="fab fa-linkedin"></i></a>
              <a href="#" aria-label="Email" className="text-pink-600 hover:scale-110"><i className="fas fa-envelope"></i></a>
            </div>
          </div>

          {/* Newsletter signup */}
          <div>
            <h3 className="font-bold mb-2 text-base">Signup for Newsletter</h3>
            <p className="mb-3 text-gray-600 text-base">
              Join a community dedicated to transforming beauty and celebrating individual journeys to the altar.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 rounded border border-gray-300 focus:ring-pink-500 focus:border-pink-500"
              />
              <button
                type="submit"
                className="bg-pink-600 text-white rounded px-5 py-2 hover:bg-pink-700 transition-all"
              >
                Submit &rarr;
              </button>
            </form>
          </div>
        </div>
        {/* Bottom bar */}
        <hr />
        <div className=" py-4 px-4 text-xs text-gray-500 max-w-7xl mx-auto">
          <div className="flex flex-wrap md:justify-start gap-2 mb-2">
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
        <hr />
        <div className="flex flex-wrap justify-between items-center px-10 py-4 font-bold">
          <span>© 2025 Mindful Beauty | All rights reserved.</span>
          <div>
            <a href="#" className="hover:text-pink-600">Terms & Conditions</a>
            {" | "}
            <a href="#" className="hover:text-pink-600">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  )
};

export default FooterBar;
