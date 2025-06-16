import { useState } from "react";
import logo from "../assets/site_logo.png"
import useTitle from "../components/Title";
import { forgotPassword } from "../api/userApi";
import { Loader2 } from "lucide-react"


const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showResetLink, setShowResetLink] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setShowResetLink(false)
        try {
            const res = await forgotPassword(email);
            setShowResetLink(true)
            alert(res.message);
            setEmail("");
        } catch (err) {
            alert(err.response?.data?.message || "Error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    useTitle("Forgot Password? No Worry...")

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {/* Logo */}
                <div className="text-center">
                    <div className="flex items-center justify-center">
                        <img
                            src={logo}
                            alt="BlueStock Logo"
                            className="h-10 w-auto object-contain"
                            style={{ maxHeight: '40px' }}
                        />
                    </div>
                </div>

                {/* Heading */}
                {!showResetLink && <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 drop-shadow-sm">
                        Forgot Password?
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email address to get the password reset link.
                    </p>
                </div>}

                {/* Form */}
                {!showResetLink && (
                    <form onSubmit={handleSubmit} className="mt-2 space-y-6">
                        <div className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                                    placeholder="hello@bluestock.in"
                                    required
                                />
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
                                    'Send Reset Link'
                                )}
                            </button>
                        </div>

                        {/* Footer */}
                        <div className="text-center">
                            <a href="/sign-in" className="text-gray-500 hover:text-gray-600 font-medium">
                                Back to login
                            </a>
                        </div>
                    </form>
                )}
                {showResetLink && (
                    <div className="text-center text-2xl mt-2 text-green-600 font-medium">
                        Password reset link sent! Please check your email.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;