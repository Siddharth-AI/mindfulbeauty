'use client';
import React, { useState } from 'react';
import Image from 'next/image';

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');

  const [form, setForm] = useState({
    userType: 'Salon',
    salonName: '',
    email: '',
    mobile: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, userType: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/assets/img/bg-pattern.png')] bg-repeat font-sans">
      <div className="flex bg-white rounded-lg overflow-hidden w-full max-w-[76.8rem]">
        {/* Left Side - Image */}
        <div className="w-1/2 flex items-center justify-center bg-white relative py-10">
          <div className="relative w-110 h-110 rounded-full overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/img/burst.svg" // Make sure burst image exists or use PNG uploaded
                alt="Burst"
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute inset-0 z-10 rounded-full overflow-hidden">
              <Image
                src="/assets/img/loginimg.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 bg-[#FF2280] flex flex-col justify-center px-10 py-10 rounded-r-lg">
          <div className="mb-8">
            <h1 className="text-white text-5xl font-extrabold leading-tight mb-3">
              mindful<br />beauty
            </h1>

            <div className="flex items-center space-x-6 mt-4 text-lg font-semibold">
              <button
                className={`${activeTab === 'login' ? 'text-white border-b-2 border-white pb-1' : 'text-pink-200'
                  } transition`}
                onClick={() => setActiveTab('login')}
              >
                Login
              </button>
              <button
                className={`${activeTab === 'register' ? 'text-white border-b-2 border-white pb-1' : 'text-pink-200'
                  } transition`}
                onClick={() => setActiveTab('register')}
              >
                New to Mindful Beauty
              </button>
            </div>
          </div>

          {activeTab === 'login' ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-white font-semibold mb-1">
                  Enter your registered mobile no
                </label>
                <p className="text-pink-100 mb-2 text-sm">
                  We will send you the 4 digit verification code
                </p>
                <input
                  required
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gray-300 text-white hover:bg-gray-400 font-semibold text-lg rounded py-2 transition"
              >
                Generate OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex space-x-6 items-center mb-2">
                <label className="flex items-center text-white text-lg font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="Salon"
                    checked={form.userType === 'Salon'}
                    onChange={handleRadio}
                    className="accent-white mr-2"
                  />
                  Salon
                </label>
                <label className="flex items-center text-white text-lg font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="Freelancer"
                    checked={form.userType === 'Freelancer'}
                    onChange={handleRadio}
                    className="accent-white mr-2"
                  />
                  Freelancer
                </label>
              </div>

              <div className="flex space-x-3">
                <input
                  required
                  name="salonName"
                  value={form.salonName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Salon Name*"
                  className="flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
                <input
                  required
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email*"
                  className="flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
              </div>

              <div className="flex space-x-3">
                <input
                  required
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Mobile*"
                  className="flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
                <input
                  required
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  type="text"
                  placeholder="Location*"
                  className="flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-300 text-white hover:bg-gray-400 font-semibold text-lg rounded py-2 mt-3 transition"
              >
                Register
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
