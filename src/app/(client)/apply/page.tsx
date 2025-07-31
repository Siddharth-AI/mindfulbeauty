"use client";
import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import {
  toastSuccess,
  toastError,
  toastWarning,
} from "@/app/components/common/toastService";
import {
  checkUserExistence,
  clearError,
  clearExistenceCheck,
  clearSuccess,
  submitRegistrationRequest,
} from "@/app/store/slice/applySlice";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const dispatch = useAppDispatch();
  const {
    loading,
    error,
    success,
    message,
    checkingExistence,
    existenceCheck,
  } = useAppSelector((state) => state.apply);

  const [activeTab, setActiveTab] = useState<"login" | "register">("register");
  const [form, setForm] = useState({
    userType: "salon" as "salon" | "freelancer",
    salonName: "",
    email: "",
    mobile: "",
    location: "",
  });

  const router = useRouter();
  // Handle success/error messages
  useEffect(() => {
    if (success && message) {
      toastSuccess(message);
      // Reset form on success
      setForm({
        userType: "salon",
        salonName: "",
        email: "",
        mobile: "",
        location: "",
      });
      dispatch(clearSuccess());
    }
  }, [success, message, dispatch]);

  useEffect(() => {
    if (error) {
      toastError(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Handle existence check results
  useEffect(() => {
    if (existenceCheck) {
      if (existenceCheck.userExists || existenceCheck.requestExists) {
        toastWarning(existenceCheck.message || "User already exists");
      }
    }
  }, [existenceCheck]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    // Clear existence check when user changes email or mobile
    if (e.target.name === "email" || e.target.name === "mobile") {
      dispatch(clearExistenceCheck());
    }
  };

  const handleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({
      ...f,
      userType: e.target.value as "salon" | "freelancer",
    }));
  };

  const handleBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    // Check existence when user finishes typing email or mobile
    if (
      (e.target.name === "email" || e.target.name === "mobile") &&
      form.email &&
      form.mobile
    ) {
      await dispatch(
        checkUserExistence({
          email: form.email,
          mobile_no: form.mobile,
        })
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "login") {
      // Handle login logic here
      toastWarning("Login functionality not implemented yet");
      return;
    }

    // Check if user exists before submitting
    if (!existenceCheck) {
      const checkResult = await dispatch(
        checkUserExistence({
          email: form.email,
          mobile_no: form.mobile,
        })
      );

      if (checkUserExistence.fulfilled.match(checkResult)) {
        const { userExists, requestExists } = checkResult.payload;
        if (userExists || requestExists) {
          return; // Don't submit if user already exists
        }
      }
    } else if (existenceCheck.userExists || existenceCheck.requestExists) {
      toastError(
        existenceCheck.message || "Cannot submit - user already exists"
      );
      return;
    }

    // Submit registration request
    await dispatch(
      submitRegistrationRequest({
        name: form.salonName,
        email: form.email,
        type: form.userType,
        mobile_no: form.mobile,
        location: form.location,
        remark: "",
      })
    );
    router.push("/"); // Redirect to success page
  };

  const canSubmit =
    !loading &&
    !checkingExistence &&
    (!existenceCheck ||
      (!existenceCheck.userExists && !existenceCheck.requestExists));

  return (
    <div className="bg-pink-200/30 min-h-screen flex items-center justify-center bg-[url('/assets/img/bg-pattern.png')] bg-repeat font-sans">
      <div className="flex bg-white rounded-lg overflow-hidden w-full max-w-[76.8rem]">
        {/* Left Side - Image */}
        <div className="w-1/2 flex items-center justify-center bg-pink-200/30 relative py-10">
          <div className="relative w-110 h-110 rounded-full overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image
                src="/assets/img/burst.svg"
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
              mindful
              <br />
              beauty
            </h1>

            <div className="flex items-center space-x-6 mt-4 text-lg font-semibold">
              <button
                className={`${
                  activeTab === "login"
                    ? "text-white border-b-2 border-white"
                    : "text-pink-200"
                } transition`}
                onClick={() => setActiveTab("login")}>
                Login
              </button>
              <button
                className={`${
                  activeTab === "register"
                    ? "text-white border-b-2 border-white"
                    : "text-pink-200"
                } transition`}
                onClick={() => setActiveTab("register")}>
                New to Mindful Beauty
              </button>
            </div>
          </div>

          {activeTab === "login" ? (
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
                  className="w-full px-4 py-2 rounded border bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white hover:bg-[#202020] font-semibold text-lg rounded py-2 transition disabled:opacity-50">
                {loading ? "Generating..." : "Generate OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex space-x-6 items-center mb-2 justify-center">
                <label className="flex items-center text-white text-lg font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="salon"
                    checked={form.userType === "salon"}
                    onChange={handleRadio}
                    className="accent-black mr-2"
                  />
                  Salon
                </label>
                <label className="flex items-center text-white text-lg font-medium cursor-pointer">
                  <input
                    type="radio"
                    name="userType"
                    value="freelancer"
                    checked={form.userType === "freelancer"}
                    onChange={handleRadio}
                    className=" accent-black mr-2"
                  />
                  Freelancer
                </label>
              </div>

              <div className="flex space-x-3 pt-2">
                <input
                  required
                  name="salonName"
                  value={form.salonName}
                  onChange={handleChange}
                  type="text"
                  placeholder={`${
                    form.userType === "salon" ? "Salon" : "Freelancer"
                  } Name*`}
                  className="bg-white flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
                <input
                  required
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email"
                  placeholder="Email*"
                  className={`bg-white flex-1 px-4 py-2 rounded border focus:outline-none focus:ring-2 text-gray-800 ${
                    existenceCheck?.userExists || existenceCheck?.requestExists
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-pink-200"
                  }`}
                />
              </div>

              <div className="flex space-x-3">
                <input
                  required
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="tel"
                  placeholder="Mobile*"
                  className={`bg-white flex-1 px-4 py-2 rounded border focus:outline-none focus:ring-2 text-gray-800 ${
                    existenceCheck?.userExists || existenceCheck?.requestExists
                      ? "border-red-300 focus:ring-red-200"
                      : "border-gray-200 focus:ring-pink-200"
                  }`}
                />
                <input
                  required
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  type="text"
                  placeholder="Location*"
                  className="bg-white flex-1 px-4 py-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200 text-gray-800"
                />
              </div>

              {/* Show existence check status */}
              {checkingExistence && (
                <div className="text-white text-sm">
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Checking if user already exists...
                  </div>
                </div>
              )}

              {existenceCheck &&
                (existenceCheck.userExists || existenceCheck.requestExists) && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
                    {existenceCheck.message}
                  </div>
                )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full bg-black text-white hover:bg-[#202020] font-semibold text-lg rounded py-2 mt-3 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
