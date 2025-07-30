// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function AdminLogin() {
//   const [phone, setPhone] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Here you can add your authentication logic
//     // For now, just redirecting to dashboard
//     router.push('/admin/dashboard')
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Admin Login
//           </h2>
//         </div>
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm space-y-4">
//             <div>
//               <label htmlFor="phone" className="sr-only">
//                 Phone Number
//               </label>
//               <input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Phone Number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               Sign in
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { showError, showSuccess } from "../lib/toast";
import { login } from "../store/slice/authSlice";

// Example color/pulse background with CSS
const gradientBg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #743ad5 0%, #d53a9d 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "gradientmove 10s ease infinite",
};

const cardStyle = {
  background: "rgba(255,255,255,0.95)",
  borderRadius: "1.5rem",
  boxShadow: "0 16px 48px 0 rgba(86,37,245,0.2)",
  maxWidth: 360,
  margin: "2rem auto",
  padding: 32,
  animation: "pulse 2s infinite alternate",
};

export default function AdminLogin() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!identifier || !password) {
      showError("Please enter both email and password");
      return;
    }
    const result = await dispatch(login({ identifier, password }));
    if (login.fulfilled.match(result)) {
      showSuccess("Login successful!");
      setTimeout(() => router.push("/admin/dashboard"), 1200);
    } else if (login.rejected.match(result)) {
      showError((result.payload as string) || "Login failed");
    }
  }

  return (
    <div style={gradientBg}>
      <style>
        {`
          @keyframes gradientmove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pulse {
            0% { box-shadow: 0 16px 48px 0 rgba(86,37,245,0.11); }
            100% { box-shadow: 0 32px 64px 0 rgba(213,58,157,0.35); }
          }
        `}
      </style>
      <ToastContainer />
      <form style={cardStyle} onSubmit={handleSubmit}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: 24,
            background: "linear-gradient(90deg, #d53a9d, #743ad5)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: 700,
            fontSize: 32,
          }}>
          Admin Login
        </h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600 }}>Email or Mobile</label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #eee",
              marginTop: 6,
            }}
            placeholder="Enter email or phone"
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 600 }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "1px solid #eee",
              marginTop: 6,
            }}
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "none",
            background: "linear-gradient(90deg, #d53a9d, #743ad5)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            marginTop: 6,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
