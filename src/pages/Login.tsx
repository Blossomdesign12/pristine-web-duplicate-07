
// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Building2, Mail, Lock, ArrowRight } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";
// import Header from "@/components/Header";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { login, isLoading } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(email, password);
//       // Redirect will be handled in the auth context
//       const from = location.state?.from?.pathname || "/dashboard";
//       navigate(from, { replace: true });
//     } catch (error) {
//       console.error("Login error:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
//       <Header/>
//       <div className="w-full max-w-md">
//         <div className="mb-8 text-center">
//           <Link to="/" className="inline-block">
//             <div className="flex items-center justify-center space-x-2">
//               {/* <Building2 className="h-8 w-8 text-estate-primary" strokeWidth={2.5} />
//               <span className="font-bold text-2xl">FindHome</span> */}
//             </div>
//           </Link>
//           <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
//           <p className="mt-2 text-gray-600">Sign in to continue to your account</p>
//         </div>

//         <div className="bg-white p-8 rounded-lg shadow-md">
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div className="space-y-2">
//               <Label htmlFor="email">Email address</Label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="name@example.com"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex items-center justify-between">
//                 <Label htmlFor="password">Password</Label>
//                 <Link to="/forgot-password" className="text-sm text-estate-primary hover:underline">
//                   Forgot password?
//                 </Link>
//               </div>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-estate-primary hover:bg-estate-primary/90"
//               disabled={isLoading}
//             >
//               {isLoading ? "Signing in..." : "Sign in"}
//               {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
//             </Button>
//           </form>

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               Don't have an account?{" "}
//               <Link to="/register" className="text-estate-primary hover:underline font-medium">
//                 Create an account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import Modal from "react-modal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { FaGoogle, FaFacebook } from "react-icons/fa6";

Modal.setAppElement("#root");

const Login = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
      onClose();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center mt-[70px] justify-center z-90"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-gray-600">Sign in to continue to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link to="/forgot-password" className="text-sm text-estate-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-estate-primary hover:bg-estate-primary/90 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </form>

        {/* Social Login Buttons */}
        <div className="mt-6 space-y-3">
          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">or continue with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex space-x-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <FaGoogle className="h-5 w-5 mr-2" />
              Google
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
              <FaFacebook className="h-5 w-5 mr-2 text-blue-600" />
              Facebook
            </button>
          </div>
        </div>

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-estate-primary hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default Login;
