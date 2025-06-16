import { useState } from "react";
import logo from "../assets/site_logo.png"
import useTitle from "../components/Title";
import { resetPassword } from "../api/userApi";
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        try {
            const res = await resetPassword({ token, newPassword: password });
            alert(res.message);
            setTimeout(() => navigate("/sign-in"), 500);
        } catch (err) {
            alert(err.response?.data?.message || "Error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useTitle("Reset Your Old Password")

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <img
                            src={logo}
                            alt="BlueStock Logo"
                            className="h-10 w-auto object-contain" // Changed from h-full to h-10
                            style={{ maxHeight: '40px' }} // Optional: adjust as needed
                        />
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 drop-shadow-sm">
                        Reset Password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your new password and re-confirm it.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-2 space-y-6">
                    <div className="space-y-4">
                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                                placeholder="••••••••••••"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="conf_pass" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    id="conf_pass"
                                    name="conf_pass"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                                    placeholder="••••••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={togglePasswordVisibility}
                                >
                                    {
                                        showPassword ? (
                                            <EyeOff className='h-5 w-5 text-gray-500' />
                                        ) : (
                                            <Eye className='h-5 w-5 text-gray-500' />
                                        )
                                    }
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <div>
                        <button
                            type="submit"
                            className="disabled:opacity-50 relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin w-5 h-5 mr-1" />
                                    <p>Please Wait...</p>
                                </>
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;