// import React, { useState, useEffect } from "react";
// import loginBg from "/bannercr.png";
// import { Eye, EyeOff } from "lucide-react";
// import { jwtDecode } from "jwt-decode";
// interface LoginModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onLoginSuccess: (role: string) => void;
// }

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// const LoginModal: React.FC<LoginModalProps> = ({
//   isOpen,
//   onClose,
//   onLoginSuccess,
// }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [orgCode, setOrgCode] = useState("");
//   const [orgCodes, setOrgCodes] = useState<any[]>([]);
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   /* Fetch Org Codes */
//   useEffect(() => {
//     if (!isOpen) return;

//     const fetchOrgCodes = async () => {
//       try {
//         const res = await fetch(`${BACKEND_URL}/api/organisation/org-codes`);
//         const data = await res.json();
//         if (data.success) setOrgCodes(data.data);
//       } catch (err) {
//         console.error("Failed to fetch org codes", err);
//       }
//     };

//     fetchOrgCodes();
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(null);

//     if (!orgCode) {
//       setError("Please select organization");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch(`${BACKEND_URL}/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({
//           email,
//           password,
//           org_code: orgCode,
//         }),
//       });

//       const result = await res.json();

//       if (!result.success) {
//         setError(result.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       const token = result.data.token || result.data.data.token;

//       const user: any = jwtDecode(token);

//       if (user.role === "super_admin") {
//         setError("Super Admin cannot login from website.");
//         setLoading(false);
//         return;
//       }

//       onLoginSuccess(user.role);

//       setLoading(false);
//       onClose();
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Something went wrong");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div className="relative w-full max-w-4xl flex flex-col md:flex-row rounded-2xl shadow-2xl bg-[#1C1C28]/90 overflow-hidden">
//         {/* LEFT */}
//         <div className="relative w-full md:w-1/2 h-60 md:h-auto">
//           <img
//             src={loginBg}
//             className="absolute inset-0 w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/50" />
//           <div className="relative z-10 flex flex-col justify-center h-full p-8 text-white">
//             <h3 className="text-3xl font-bold mb-3">Welcome Back</h3>
//             <p className="text-white/90 text-sm">Sign in to continue</p>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="w-full md:w-1/2 p-8">
//           <h2 className="text-3xl font-bold text-center mb-6 text-white">
//             Login
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <select
//               value={orgCode}
//               onChange={(e) => setOrgCode(e.target.value)}
//               className="w-full rounded-xl bg-white/20 text-white px-4 py-2.5"
//             >
//               <option value="" className="text-black">
//                 Select Organization
//               </option>
//               {orgCodes.map((org: any) => (
//                 <option
//                   key={org.org_code}
//                   value={org.org_code}
//                   className="text-black"
//                 >
//                   {org.name}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Email"
//               className="w-full rounded-xl bg-white/20 text-white px-4 py-2.5"
//             />

//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="Password"
//                 className="w-full rounded-xl bg-white/20 text-white px-4 py-2.5 pr-12"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </button>
//             </div>

//             {error && (
//               <div className="bg-red-500/20 text-red-300 text-sm rounded-lg px-4 py-2">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full py-2.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0092B8] via-[#3A8DFF] to-[#9810FA]"
//             >
//               {loading ? "Signing in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;

import React, { useState, useEffect } from "react";
import loginBg from "/bannercr.png";
import { Eye, EyeOff, X } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (role: string) => void;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [orgCode, setOrgCode] = useState("");
  const [orgCodes, setOrgCodes] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchOrgCodes = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/organisation/org-codes`);
        const data = await res.json();
        if (data.success) setOrgCodes(data.data);
      } catch (err) {
        console.error("Failed to fetch org codes", err);
      }
    };

    fetchOrgCodes();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!orgCode) {
      setError("Please select organization");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          org_code: orgCode,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        setError(result.message || "Login failed");
        setLoading(false);
        return;
      }

      const token = result.data.token || result.data.data.token;
      const user: any = jwtDecode(token);

      if (user.role === "super_admin") {
        setError("Super Admin cannot login from website.");
        setLoading(false);
        return;
      }

      onLoginSuccess(user.role);

      setLoading(false);
      onClose();
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/60">
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row rounded-3xl shadow-2xl bg-[#1C1C28] border border-white/10 overflow-hidden">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white/70 hover:text-white transition"
        >
          <X size={24} />
        </button>

        {/* LEFT PANEL */}
        <div className="relative w-full md:w-1/2 h-52 md:h-auto">
          <img
            src={loginBg}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40" />

          <div className="relative z-10 flex flex-col justify-center h-full p-8 text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome Back
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              Sign in to access your dashboard
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <select
              value={orgCode}
              onChange={(e) => setOrgCode(e.target.value)}
              className="w-full rounded-xl bg-white/10 text-white px-4 py-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#3A8DFF]"
            >
              <option value="" className="text-black">
                Select Organization
              </option>
              {orgCodes.map((org: any) => (
                <option
                  key={org.org_code}
                  value={org.org_code}
                  className="text-black"
                >
                  {org.name}
                </option>
              ))}
            </select>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full rounded-xl bg-white/10 text-white placeholder-white/60 px-4 py-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#3A8DFF]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full rounded-xl bg-white/10 text-white placeholder-white/60 px-4 py-3 pr-12 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#3A8DFF]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-300 text-sm rounded-lg px-4 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#0092B8] via-[#3A8DFF] to-[#9810FA] hover:opacity-90 transition"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;