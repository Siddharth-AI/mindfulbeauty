import React from "react";

function ApplyPage() {
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
      {/* Left: Burst Circle and (Your) Image Space */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-white p-8">
        <div className="relative flex flex-col items-center">
          {/* Burst effect */}
          <div className="absolute z-0 w-60 h-60 rounded-full bg-white flex items-center justify-center">
            {/* Burst Lines (sample effect using absolute lines) */}
            {[...Array(40)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-16 bg-yellow-400"
                style={{
                  transform: `rotate(${(i * 360) / 40}deg) translateY(-64px)`
                }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-10 bg-pink-500"
                style={{
                  transform: `rotate(${(i * 360) / 20 + 10}deg) translateY(-40px)`
                }}
              />
            ))}
          </div>
          {/* Image Placeholder */}
          <div className="relative z-10 w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg flex items-center justify-center">
            {/* Place your image here later */}
            {/* <img src="/your-image.jpg" alt="user" className="object-cover w-full h-full" /> */}
            <span className="text-gray-400">Your Image Here</span>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-1/2 bg-pink-500 flex flex-col justify-center p-12">
        <div className="mb-8">
          <h1 className="text-white text-4xl font-bold leading-none mb-2">
            mindful
            <br />
            beauty
          </h1>
        </div>
        <div className="bg-white bg-opacity-10 rounded-xl p-8">
          <div className="flex space-x-6 mb-2">
            <span className="text-white font-semibold border-b-2 border-white">Login</span>
            <span className="text-pink-100 cursor-pointer">New to Mindful Beauty</span>
          </div>
          <label className="block text-white mb-1 mt-5">
            Enter your registered mobile no
          </label>
          <span className="block text-pink-100 text-sm mb-2">
            We will send you the 4 digit verification code
          </span>
          <input
            type="text"
            placeholder="Enter your mobile number"
            className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring mb-6"
          />
          <button className="w-full bg-gray-200 text-gray-700 text-lg py-2 rounded-lg hover:bg-gray-300 font-semibold">
            Generate OTP
          </button>
        </div>
      </div>
    </div>
  </div>
}

export default ApplyPage;