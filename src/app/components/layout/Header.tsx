// import React, { useState, useEffect } from "react";

// // Sample menu data
// const MENU_STRUCTURE = [
//   { type: "auth", label: "Login", icon: "lock" },
//   { type: "auth", label: "Register", icon: "person_add" },
//   { type: "main", label: "Home" },
//   {
//     type: "main",
//     label: "High Thinking",
//     subItems: [
//       "Mindset",
//       "Our Brand",
//       "Our Commitment",
//       "Our Impact",
//     ],
//   },
//   {
//     type: "main",
//     label: "High Talent",
//     subItems: [
//       "Our Team",
//       "Our Services",
//     ],
//   },
//   { type: "main", label: "High Technology" },
//   { type: "main", label: "AI Avatar" },
//   { type: "main", label: "About Us" },
//   { type: "main", label: "Contact" },
// ];

// const HeaderBar = () => {
//   // Simulated user state (replace with real auth logic)
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [user, setUser] = useState(null); // null=guest, or { name: "UserName" }

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(""); // tracks which submenu is open

//   // Scroll listener to change header bg color
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Render icons for Login/Register
//   const renderAuthIcon = (label: string) => (
//     <span
//       className="material-icons align-middle text-pink-600 text-base mr-1"
//       style={{ verticalAlign: "middle" }}
//     >
//       {label === "Login" ? "lock" : "person_add"}
//     </span>
//   );

//   // Menu item component - handles main and submenu items
//   const MenuItem = ({ label, isSubItem, onClick }) => (
//     <div
//       onClick={onClick}
//       // Same font size, weight, and style for sub and main items
//       className={`w-full cursor-pointer px-4 py-2 transition-colors duration-200 
//         ${isSubItem ? "pl-10" : "pl-4"}  /* indent sub items */
//         font-bold text-lg text-gray-900 hover:text-pink-600 select-none`}
//       style={{ fontFamily: "Montserrat, sans-serif" }}
//     >
//       {label}
//     </div>
//   );

//   // Render menu structure
//   const renderMenu = () => (
//     <nav className="mt-6 w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
//       <ul className="space-y-1">
//         {/* User greeting */}
//         <li
//           className="px-4 py-2 text-base font-semibold text-gray-800 border-b border-gray-200"
//           style={{ fontFamily: "Montserrat, sans-serif" }}
//         >
//           {user ? `Hello, ${user.name}` : "Hello, Guest"}
//         </li>

//         {/* Auth Links */}
//         <li className="flex items-center px-4 py-2 space-x-2 font-semibold text-gray-900 select-none">
//           {renderAuthIcon("Login")}
//           <span className="hover:text-pink-600 cursor-pointer">Login</span>
//           <span className="text-gray-300">•</span>
//           {renderAuthIcon("Register")}
//           <span className="hover:text-pink-600 cursor-pointer">Register</span>
//         </li>

//         <li>
//           <hr className="my-2 border-t border-gray-200" />
//         </li>

//         {/* Main Menu Items */}
//         {MENU_STRUCTURE.filter(i => i.type === "main").map((item) => (
//           <li key={item.label} className="">
//             {item.subItems ? (
//               <div>
//                 {/* Dropdown Header */}
//                 <button
//                   onClick={() => setOpenDropdown(openDropdown === item.label ? "" : item.label)}
//                   className={`w-full flex justify-between items-center cursor-pointer px-4 py-2 text-lg font-bold transition-colors duration-200 focus:outline-none 
//                     ${openDropdown === item.label ? "text-pink-600" : "text-gray-900"}`}
//                   style={{ fontFamily: "Montserrat, sans-serif" }}
//                 >
//                   <span>{item.label}</span>
//                   <span
//                     className={`material-icons transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
//                       }`}
//                   >
//                     expand_more
//                   </span>
//                 </button>

//                 {/* Submenu Items (only show if open) */}
//                 {openDropdown === item.label && (
//                   <ul className="ml-0">
//                     {item.subItems.map((subLabel) => (
//                       <li key={subLabel}>
//                         <MenuItem label={subLabel} isSubItem />
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             ) : (
//               <MenuItem label={item.label} />
//             )}

//             {/* Divider after High Thinking and High Talent */}
//             {["High Thinking", "High Talent"].includes(item.label) && (
//               <hr className="my-2 border-t border-gray-200" />
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-white shadow" : "bg-transparent"
//           }`}
//         style={{ fontFamily: "Montserrat, sans-serif" }}
//       >
//         <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
//           {/* Logo & Tagline */}
//           <div className="flex items-center select-none">
//             <div className="rounded-full border-4 border-yellow-300 w-7 h-7 flex items-center justify-center mr-2" />
//             <div>
//               <span
//                 className="text-pink-600 font-bold text-2xl leading-none inline-block"
//                 style={{ letterSpacing: "-1.5px" }}
//               >
//                 mindful<br />beauty
//               </span>
//               <div
//                 className="text-[10px] text-blue-500 font-medium tracking-widest mt-0.5"
//                 style={{ fontSize: "10px" }}
//               >
//                 RE / IMAGINE YOURSELF
//               </div>
//             </div>
//           </div>
//           {/* Menu Icon */}
//           <div>
//             <button
//               aria-label="Menu"
//               className="ml-2 p-2 hover:bg-pink-50 rounded-md transition"
//               onClick={() => setIsMenuOpen(true)}
//             >
//               <span className="block w-6 h-1 bg-pink-500 rounded mb-1"></span>
//               <span className="block w-5 h-1 bg-pink-500 rounded mb-1 ml-auto"></span>
//               <span className="block w-4 h-1 bg-pink-500 rounded ml-auto"></span>
//             </button>
//           </div>
//         </div>
//         {/* Pink underline */}
//         <div
//           className={`h-1 w-full transition-colors duration-300 ${isScrolled ? "bg-pink-600" : "bg-transparent"
//             }`}
//         />
//       </header>

//       {/* Menu Drawer */}
//       {isMenuOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-40"
//             onClick={() => setIsMenuOpen(false)}
//             style={{ transition: "background 0.3s" }}
//           />
//           {/* Side Menu */}
//           <aside
//             className="fixed top-0 right-0 h-full w-1/4 bg-white z-50 shadow-2xl flex flex-col"
//             style={{
//               minWidth: "260px",
//               maxWidth: "425px",
//               transition: "transform 0.3s",
//               fontFamily: "Montserrat, sans-serif",
//             }}
//           >
//             <button
//               aria-label="Close Menu"
//               className="self-end m-4 text-gray-800 text-2xl font-bold"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               &times;
//             </button>
//             {renderMenu()}
//           </aside>
//         </>
//       )}
//     </>
//   );
// };

// export default HeaderBar;

import React, { useState, useEffect } from "react";

// Menu data
const MENU_STRUCTURE = [
  { type: "auth", label: "Login", icon: "lock" },
  { type: "auth", label: "Register", icon: "person_add" },
  { type: "main", label: "Home" },
  {
    type: "main",
    label: "High Thinking",
    subItems: [
      "Mindset",
      "Our Brand",
      "Our Commitment",
      "Our Impact",
    ],
  },
  {
    type: "main",
    label: "High Talent",
    subItems: [
      "Our Team",
      "Our Services",
    ],
  },
  { type: "main", label: "High Technology" },
  { type: "main", label: "AI Avatar" },
  { type: "main", label: "About Us" },
  { type: "main", label: "Contact" },
];

const HeaderBar = () => {
  // Replace this with real auth logic
  const [user, setUser] = useState(null); // null=guest, or { name: "User" }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(""); // tracks which submenu is open

  // Handle header color on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Icon for Login/Register using Material Icons
  const renderAuthIcon = (label) => (
    <span
      className="material-icons align-middle text-pink-600 text-base mr-1"
      style={{ verticalAlign: "middle" }}
    >
      {label === "Login" ? "lock" : "person_add"}
    </span>
  );

  // Main and submenu item, styled the same (submenu indented)
  const MenuItem = ({ label, isSubItem }) => (
    <div
      className={`w-full cursor-pointer px-4 py-2 transition-colors duration-200
        ${isSubItem ? "pl-10" : "pl-4"}
        font-bold text-lg text-gray-900 hover:text-pink-600 select-none`}
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      {label}
    </div>
  );

  // Whole navigation menu including user greeting and submenus
  const renderMenu = () => (
    <nav className="mt-6 w-full" style={{ fontFamily: "Montserrat, sans-serif" }}>
      <ul className="space-y-1">
        <li
          className="px-4 py-2 text-base font-semibold text-gray-800 border-b border-gray-200"
        >
          {user ? `Hello, ${user.name}` : "Hello, Guest"}
        </li>
        <li className="flex items-center px-4 py-2 space-x-2 font-semibold text-gray-900 select-none">
          {renderAuthIcon("Login")}
          <span className="hover:text-pink-600 cursor-pointer">Login</span>
          <span className="text-gray-300">•</span>
          {renderAuthIcon("Register")}
          <span className="hover:text-pink-600 cursor-pointer">Register</span>
        </li>
        <li>
          <hr className="my-2 border-t border-gray-200" />
        </li>
        {MENU_STRUCTURE.filter(i => i.type === "main").map((item) => (
          <li key={item.label}>
            {item.subItems ? (
              <div>
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.label ? "" : item.label)}
                  className={`w-full flex justify-between items-center cursor-pointer px-4 py-2 text-lg font-bold transition-colors duration-200 focus:outline-none
                    ${openDropdown === item.label ? "text-pink-600" : "text-gray-900"}`}
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  <span>{item.label}</span>
                  <span
                    className={`material-icons transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""
                      }`}
                  >
                    expand_more
                  </span>
                </button>
                {openDropdown === item.label && (
                  <ul>
                    {item.subItems.map((subLabel) => (
                      <li key={subLabel}>
                        <MenuItem label={subLabel} isSubItem />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <MenuItem label={item.label} />
            )}
            {["High Thinking", "High Talent"].includes(item.label) && (
              <hr className="my-2 border-t border-gray-200" />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${isScrolled ? "bg-white shadow" : "bg-transparent"
          }`}
        style={{ fontFamily: "Montserrat, sans-serif" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center select-none">
            <div className="rounded-full border-4 border-yellow-300 w-7 h-7 flex items-center justify-center mr-2" />
            <div>
              <span
                className="text-pink-600 font-bold text-2xl leading-none inline-block"
                style={{ letterSpacing: "-1.5px" }}
              >
                mindful<br />beauty
              </span>
              <div
                className="text-[10px] text-blue-500 font-medium tracking-widest mt-0.5"
                style={{ fontSize: "10px" }}
              >
                RE / IMAGINE YOURSELF
              </div>
            </div>
          </div>
          <div>
            <button
              aria-label="Menu"
              className="ml-2 p-2 hover:bg-pink-50 rounded-md transition"
              onClick={() => setIsMenuOpen(true)}
            >
              <span className="block w-6 h-1 bg-pink-500 rounded mb-1"></span>
              <span className="block w-5 h-1 bg-pink-500 rounded mb-1 ml-auto"></span>
              <span className="block w-4 h-1 bg-pink-500 rounded ml-auto"></span>
            </button>
          </div>
        </div>
        <div
          className={`h-1 w-full transition-colors duration-300 ${isScrolled ? "bg-pink-600" : "bg-transparent"
            }`}
        />
      </header>

      {/* 25% width side menu and 75% transparent glass overlay */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-white bg-opacity-25 backdrop-blur-md z-40"
            onClick={() => setIsMenuOpen(false)}
            style={{ transition: "background 0.3s" }}
          />
          <aside
            className="fixed top-0 right-0 h-full w-1/4 bg-white z-50 shadow-2xl flex flex-col"
            style={{
              minWidth: "260px",
              maxWidth: "425px",
              transition: "transform 0.3s",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            <button
              aria-label="Close Menu"
              className="self-end m-4 text-gray-800 text-2xl font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>
            {renderMenu()}
          </aside>
        </>
      )}
    </>
  );
};

export default HeaderBar;
